#!/usr/bin/env node
// Spec-patch layer between Apple's original OpenAPI spec and codegen.
//
// The committed `app_store_connect_api_<version>_openapi.json` is kept
// byte-identical to Apple's download (provenance + content-drift detection
// in scripts/update-spec.mjs rely on that). Known upstream defects are fixed
// here, as named auditable rules with hit counts, by writing a derived
// `spec.generated.json` that the codegen consumes.
//
// When Apple fixes a defect, its rule reports 0 hits and can be retired.
//
// Usage: node scripts/apply-spec-patches.mjs   (invoked by gen-openapi.sh)

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");

export const RULES = [
  {
    id: "remove-empty-enums",
    description:
      "Drop `enum: []` keys. Apple emits them on some `fields[...]` params; per JSON Schema an empty enum allows no value, so generators type the parameter as never[] and make it unusable.",
    /** Return true to drop this property from its parent object. */
    drop(key, value) {
      return key === "enum" && Array.isArray(value) && value.length === 0;
    },
  },
];

/**
 * Apply all registered rules to a parsed spec (input is not mutated).
 * Returns the patched spec and a per-rule report `{ id, description, hits }`.
 */
export function applySpecPatches(spec) {
  const report = RULES.map((r) => ({ id: r.id, description: r.description, hits: 0 }));

  const walk = (node) => {
    if (Array.isArray(node)) return node.map(walk);
    if (node && typeof node === "object") {
      const out = {};
      for (const [key, value] of Object.entries(node)) {
        const droppedBy = RULES.findIndex((rule) => rule.drop(key, value));
        if (droppedBy >= 0) {
          report[droppedBy].hits += 1;
          continue;
        }
        out[key] = walk(value);
      }
      return out;
    }
    return node;
  };

  return { spec: walk(structuredClone(spec)), report };
}

// ---------------------------------------------------------------------------
// CLI: committed spec → scripts/openapi-gen/spec.generated.json + report
// ---------------------------------------------------------------------------

if (process.argv[1] && process.argv[1].endsWith("apply-spec-patches.mjs")) {
  const specFile = readdirSync(root).find((f) => /^app_store_connect_api_.+_openapi\.json$/.test(f));
  if (!specFile) {
    console.error("No committed spec file found at repo root.");
    process.exit(1);
  }
  const { spec: patched, report } = applySpecPatches(JSON.parse(readFileSync(join(root, specFile), "utf8")));
  writeFileSync(join(root, "scripts", "openapi-gen", "spec.generated.json"), JSON.stringify(patched, null, 2) + "\n");

  console.log(`Spec patches (${specFile} → scripts/openapi-gen/spec.generated.json):`);
  for (const r of report) {
    console.log(`  ${r.id}: ${r.hits} hit(s)${r.hits === 0 ? "  ← upstream may have fixed; consider retiring" : ""}`);
  }
}
