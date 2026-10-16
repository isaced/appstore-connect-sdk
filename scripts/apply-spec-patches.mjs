#!/usr/bin/env node
// Spec-patch layer between Apple's original OpenAPI spec and codegen.
//
// The committed `app_store_connect_api_<version>_openapi.json` is kept
// byte-identical to Apple's download (provenance + content-drift detection
// in scripts/update-spec.mjs rely on that). Known upstream defects are fixed
// here, as named auditable rules with hit counts, by writing a derived
// `spec.generated.json` that the codegen consumes.
//
// Rule contract: `apply(spec) => { spec, hits, changed }` on a document that
// the engine has already deep-cloned. The report distinguishes:
//   hits > 0, changed   → patched this run
//   hits > 0, !changed  → already satisfied upstream; consider retiring the rule
//   hits === 0          → target not found; verify whether the schema moved
//
// Usage: node scripts/apply-spec-patches.mjs   (invoked by gen-openapi.sh)

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");

const WINBACK_RELATIONSHIPS = {
  type: "object",
  required: ["territory"],
  properties: {
    territory: {
      type: "object",
      required: ["data"],
      properties: {
        data: {
          type: "object",
          required: ["type", "id"],
          properties: {
            type: { type: "string", enum: ["territories"] },
            id: { type: "string" },
          },
        },
      },
    },
    subscriptionPricePoint: {
      type: "object",
      required: ["data"],
      properties: {
        data: {
          type: "object",
          required: ["type", "id"],
          properties: {
            type: { type: "string", enum: ["subscriptionPricePoints"] },
            id: { type: "string" },
          },
        },
      },
    },
  },
};

export const RULES = [
  {
    id: "remove-empty-enums",
    description:
      "Drop `enum: []` keys. Apple emits them on some `fields[...]` params; per JSON Schema an empty enum allows no value, so generators type the parameter as never[] and make it unusable.",
    apply(spec) {
      let hits = 0;
      const walk = (node) => {
        if (Array.isArray(node)) return node.map(walk);
        if (node && typeof node === "object") {
          const out = {};
          for (const [key, value] of Object.entries(node)) {
            if (key === "enum" && Array.isArray(value) && value.length === 0) {
              hits += 1;
              continue;
            }
            out[key] = walk(value);
          }
          return out;
        }
        return node;
      };
      const patched = walk(spec);
      return { spec: patched, hits, changed: hits > 0 };
    },
  },
  {
    id: "bundleidplatform-services",
    description:
      "Add the SERVICES value to the BundleIdPlatform enum. Apple's spec omits it although the API returns it for service-type apps, so the generated union can't represent those bundles.",
    apply(spec) {
      const enumArr = spec.components?.schemas?.BundleIdPlatform?.enum;
      if (!Array.isArray(enumArr)) return { spec, hits: 0, changed: false };
      if (enumArr.includes("SERVICES")) return { spec, hits: 1, changed: false };
      enumArr.push("SERVICES");
      return { spec, hits: 1, changed: true };
    },
  },
  {
    id: "winbackofferprice-relationships",
    description:
      "Inject the `relationships` object (territory required, subscriptionPricePoint optional linkage data) into WinBackOfferPriceInlineCreate. The API accepts it, the spec doesn't declare it, so the create payload was untunable.",
    apply(spec) {
      const schema = spec.components?.schemas?.WinBackOfferPriceInlineCreate;
      if (!schema?.properties) return { spec, hits: 0, changed: false };
      if (schema.properties.relationships) return { spec, hits: 1, changed: false };
      schema.properties = { ...schema.properties, relationships: structuredClone(WINBACK_RELATIONSHIPS) };
      return { spec, hits: 1, changed: true };
    },
  },
];

/**
 * Apply all registered rules in order (input is not mutated).
 * Returns the patched spec and a per-rule report `{ id, description, hits, changed }`.
 *
 * Order semantics: rules observe earlier rules' output. `remove-empty-enums`
 * running first means a defect that *becomes* invisible to a later ensure-rule
 * (e.g. BundleIdPlatform declared with an empty enum) reports `no match` rather
 * than `already satisfied` — accepted deliberately: synthesizing an enum the
 * spec never listed would be inventing upstream data, not patching it.
 * New rules must be order-safe against this or pin it with a test.
 */
export function applySpecPatches(spec) {
  const report = [];
  let doc = structuredClone(spec);
  for (const rule of RULES) {
    const result = rule.apply(doc);
    doc = result.spec;
    report.push({ id: rule.id, description: rule.description, hits: result.hits, changed: result.changed });
  }
  return { spec: doc, report };
}

// ---------------------------------------------------------------------------
// CLI: committed spec → scripts/openapi-gen/spec.generated.json + report
// ---------------------------------------------------------------------------

if (process.argv[1] && process.argv[1].endsWith("apply-spec-patches.mjs")) {
  const specFiles = readdirSync(root).filter((f) => /^app_store_connect_api_.+_openapi\.json$/.test(f));
  if (specFiles.length !== 1) {
    console.error(`Expected exactly one committed spec file, found: ${specFiles.join(", ") || "none"}`);
    process.exit(1);
  }
  const specFile = specFiles[0];
  const { spec: patched, report } = applySpecPatches(JSON.parse(readFileSync(join(root, specFile), "utf8")));
  writeFileSync(join(root, "scripts", "openapi-gen", "spec.generated.json"), JSON.stringify(patched, null, 2) + "\n");

  console.log(`Spec patches (${specFile} → scripts/openapi-gen/spec.generated.json):`);
  for (const r of report) {
    const verdict =
      r.hits === 0
        ? "no match — target may have moved; verify"
        : r.changed
          ? `${r.hits} hit(s), patched`
          : `${r.hits} hit(s), already satisfied — consider retiring`;
    console.log(`  ${r.id}: ${verdict}`);
  }
}
