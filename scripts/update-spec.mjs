#!/usr/bin/env node
// Downloads the latest App Store Connect OpenAPI spec from Apple and, when the
// version or content changed (or the local filename is stale), replaces the
// committed spec, updates references and re-runs @hey-api/openapi-ts codegen.
//
// Usage: node scripts/update-spec.mjs
// Exit 0 = success (no changes if already up to date), non-zero = failure.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const SPEC_ZIP_URL =
  "https://developer.apple.com/sample-code/app-store-connect/app-store-connect-openapi-specification.zip";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");

const SPEC_FILE_RE = /^app_store_connect_api_.+_openapi\.json$/;

function readLocalSpec() {
  const files = readdirSync(root).filter((f) => SPEC_FILE_RE.test(f));
  if (files.length !== 1) {
    throw new Error(`Expected exactly one committed spec file, found: ${files.join(", ")}`);
  }
  const content = readFileSync(join(root, files[0]), "utf8");
  return { file: files[0], content, version: JSON.parse(content).info.version };
}

async function downloadRemoteSpec() {
  const res = await fetch(SPEC_ZIP_URL, {
    redirect: "follow",
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  if (!res.ok) {
    throw new Error(`Failed to download spec zip: HTTP ${res.status}`);
  }
  const dir = mkdtempSync(join(tmpdir(), "asc-spec-"));
  const zipPath = join(dir, "spec.zip");
  try {
    writeFileSync(zipPath, Buffer.from(await res.arrayBuffer()));
    const entries = execFileSync("unzip", ["-Z1", zipPath], { encoding: "utf8" })
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.endsWith(".json") && !l.startsWith("__MACOSX/"));
    if (entries.length !== 1) {
      throw new Error(`Expected exactly one JSON entry in spec zip, found: ${entries.join(", ")}`);
    }
    const content = execFileSync("unzip", ["-p", zipPath, entries[0]], { maxBuffer: 64 * 1024 * 1024 });
    const text = content.toString("utf8");
    const version = JSON.parse(text).info.version;
    return { text, version };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Replace a string in repo files; returns total replacement count.
function replaceInFiles(from, to, files) {
  if (from === to) return 0;
  let count = 0;
  for (const rel of files) {
    const abs = join(root, rel);
    const src = readFileSync(abs, "utf8");
    if (!src.includes(from)) continue;
    writeFileSync(abs, src.split(from).join(to));
    count += src.split(from).length - 1;
  }
  return count;
}

// The codegen config consumes the derived spec.generated.json (no versioned
// filename to track); READMEs may still mention the committed spec name.
const REF_FILES = ["README.md", "README_zh.md"];

const local = readLocalSpec();
const remote = await downloadRemoteSpec();
const expectedFile = `app_store_connect_api_${remote.version}_openapi.json`;

console.log(`Local spec:  ${local.file} (version ${local.version})`);
console.log(`Apple spec:  version ${remote.version}`);

// Apple sometimes republishes the same spec version with different content.
const versionChanged = local.version !== remote.version;
const contentChanged = local.content !== remote.text;

if (!versionChanged && !contentChanged && local.file === expectedFile) {
  console.log("Up to date, nothing to do.");
  process.exit(0);
}

if (contentChanged && !versionChanged) {
  console.log("Same version but spec content changed; refreshing spec and regenerating.");
}

// Install the new spec under the versioned filename.
writeFileSync(join(root, expectedFile), remote.text);
if (local.file !== expectedFile) {
  rmSync(join(root, local.file));
  console.log(`Renamed spec file: ${local.file} -> ${expectedFile}`);
}

const renamed = replaceInFiles(local.file, expectedFile, REF_FILES);
console.log(`Updated filename references in ${renamed} place(s).`);

const shortVersion = local.version.split(".").slice(0, 2).join(".");
for (const candidate of [`**${local.version}**`, `**${shortVersion}**`]) {
  const n = replaceInFiles(candidate, `**${remote.version}**`, REF_FILES);
  if (n > 0) console.log(`Updated version label ${candidate} -> **${remote.version}** in ${n} place(s).`);
}

if (versionChanged || contentChanged) {
  // Same pipeline as local regeneration: apply spec patches, then run the
  // pinned openapi-ts toolchain in scripts/openapi-gen.
  console.log("Running codegen: sh gen-openapi.sh");
  execFileSync("sh", [join(root, "gen-openapi.sh")], { cwd: root, stdio: "inherit" });
} else {
  console.log("Version unchanged, codegen skipped.");
}

console.log(`Done. Spec synced to ${remote.version}.`);
