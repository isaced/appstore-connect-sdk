// Publish smoke test: pack the real artifact, install it into a clean
// directory, and assert every public entrypoint behaves. Runs BEFORE
// `npm publish` in CI so a broken bundle can never reach the registry.
import { execFileSync } from "node:child_process";
import { generateKeyPairSync } from "node:crypto";
import { createServer } from "node:http";
import { mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const npm = process.platform === "win32" ? "npm.cmd" : "npm";
const run = (cmd, args, cwd) =>
  execFileSync(cmd, args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "inherit"] }).trim();

const results = [];
let failed = false;
const check = (name, fn) => {
  try {
    const detail = fn();
    results.push(`  PASS ${name}${detail ? ` — ${detail}` : ""}`);
  } catch (e) {
    failed = true;
    results.push(`  FAIL ${name}: ${e.message}`);
  }
};

const repoRoot = process.cwd();
const tgz = join(repoRoot, run(npm, ["pack", "--silent"], repoRoot).split("\n").pop());
const work = mkdtempSync(join(tmpdir(), "sdk-smoke-"));
try {
  writeFileSync(join(work, "package.json"), '{"name":"smoke","type":"module"}\n');
  run(npm, ["install", "--no-audit", "--no-fund", "--registry", "https://registry.npmjs.org", `file:${tgz}`], work);

  const pkgDir = join(work, "node_modules", "appstore-connect-sdk");
  const pkg = JSON.parse(run("node", ["--input-type=module", "-e", `import fs from "node:fs";process.stdout.write(fs.readFileSync(${JSON.stringify(join(pkgDir, "package.json"))},"utf8"))`], work));
  const dist = (entry) => join(pkgDir, pkg.exports[entry].import.replace(/^\.\//, ""));

  const sdk = await import(dist("./sdk"));
  check("/sdk entry", () => {
    if (typeof sdk.createClient !== "function") throw new Error("missing createClient");
    if (typeof sdk.appsGetCollection !== "function") throw new Error("missing request functions");
    if (!sdk.createClient({ bearerToken: "smoke" })) throw new Error("createClient falsy");
    return `${Object.keys(sdk).length} exports`;
  });

  const client = await import(dist("./client"));
  check("/client entry", () => {
    if (typeof client.createClient !== "function") throw new Error("missing createClient");
    return "ok";
  });

  const schemas = await import(dist("./schemas"));
  check("/schemas entry", () => {
    const n = Object.keys(schemas).length;
    if (n < 100) throw new Error(`only ${n} exports`);
    return `${n} JSON schemas`;
  });

  const zodEntry = await import(dist("./zod"));
  check("/zod entry", () => {
    const n = Object.keys(zodEntry).length;
    if (n < 100) throw new Error(`only ${n} exports`);
    return `${n} zod schemas`;
  });

  const root = await import(dist("."));
  check("root entry (backward compat)", () => {
    if (typeof root.createClient !== "function") throw new Error("missing createClient");
    const n = Object.keys(root).length;
    if (n < 1000) throw new Error(`only ${n} exports`);
    return `${n} exports`;
  });

  const { z } = await import(join(work, "node_modules", "zod", "index.js"));
  check("single zod instance (external deps, #58)", () => {
    const schema = zodEntry.zApp ?? root.zApp;
    if (!schema) throw new Error("no zApp schema found");
    if (!(schema instanceof z.ZodObject)) throw new Error("schema not instance of consumer's zod");
    return "instanceof holds across SDK/consumer boundary";
  });

  const cjsOut = run("node", ["-e", 'const m=require("appstore-connect-sdk");const z=require("appstore-connect-sdk/zod");if(typeof m.createClient!=="function")throw new Error("cjs root broken");if(Object.keys(z).length<100)throw new Error("cjs /zod broken");process.stdout.write("ok")'], work);
  check("cjs require path", () => (cjsOut === "ok" ? "root + /zod" : new Error(cjsOut)));

  // privateKeyPath end-to-end: the lazy dynamic import("node:fs/promises")
  // must survive both the ESM and CJS bundles.
  const keyPem = generateKeyPairSync("ec", {
    namedCurve: "prime256v1",
    privateKeyEncoding: { type: "pkcs8", format: "pem" },
    publicKeyEncoding: { type: "spki", format: "pem" },
  }).privateKey;
  const keyPath = join(work, "AuthKey_SMOKEKEY01.p8");
  writeFileSync(keyPath, keyPem);

  const esmJwt = await (async () => {
    let captured;
    const srv = createServer((req, res) => {
      captured = req.headers.authorization;
      res.writeHead(200, { "content-type": "application/json" });
      res.end("{}");
    });
    await new Promise((r) => srv.listen(0, "127.0.0.1", r));
    const c = client.createClient({ privateKeyPath: keyPath, baseUrl: `http://127.0.0.1:${srv.address().port}` });
    await c.get({ url: "/p", security: [{ scheme: "bearer", type: "http" }] });
    srv.close();
    return captured;
  })();
  check("dist privateKeyPath (esm)", () => {
    const jwt = esmJwt?.startsWith("Bearer eyJ") ? esmJwt.slice(7) : null;
    if (!jwt) throw new Error(`no bearer token: ${esmJwt}`);
    const kid = JSON.parse(Buffer.from(jwt.split(".")[0], "base64url").toString("utf8")).kid;
    if (kid !== "SMOKEKEY01") throw new Error(`kid=${kid}`);
    return "signed from .p8, kid inferred from filename";
  });

  writeFileSync(
    join(work, "check-keyfile.cjs"),
    `const { createClient } = require("appstore-connect-sdk/client");
const http = require("node:http");
(async () => {
  let captured;
  const srv = http.createServer((req, res) => { captured = req.headers.authorization; res.writeHead(200, { "content-type": "application/json" }); res.end("{}"); });
  await new Promise((r) => srv.listen(0, "127.0.0.1", r));
  const c = createClient({ privateKeyPath: process.argv[2], baseUrl: "http://127.0.0.1:" + srv.address().port });
  await c.get({ url: "/p", security: [{ scheme: "bearer", type: "http" }] });
  srv.close();
  const jwt = captured && captured.startsWith("Bearer eyJ") ? captured.slice(7) : null;
  if (!jwt) { console.error("no bearer: " + captured); process.exit(1); }
  const kid = JSON.parse(Buffer.from(jwt.split(".")[0], "base64url").toString("utf8")).kid;
  if (kid !== "SMOKEKEY01") { console.error("kid=" + kid); process.exit(1); }
  process.stdout.write("ok");
})().catch((e) => { console.error(e && e.message); process.exit(1); });
`,
  );
  const cjsKeyOut = run("node", ["check-keyfile.cjs", keyPath], work);
  check("dist privateKeyPath (cjs)", () => (cjsKeyOut === "ok" ? "require path works" : new Error(cjsKeyOut)));
} finally {
  rmSync(work, { recursive: true, force: true });
  rmSync(tgz, { force: true });
}

console.log(results.join("\n"));
if (failed) {
  console.error("SMOKE FAILED");
  process.exit(1);
}
console.log(`SMOKE PASSED (${results.length} checks)`);
