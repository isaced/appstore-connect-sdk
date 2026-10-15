// Publish smoke test: pack the real artifact, install it into a clean
// directory, and assert every public entrypoint behaves. Runs BEFORE
// `npm publish` in CI so a broken bundle can never reach the registry.
import { execFileSync } from "node:child_process";
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
