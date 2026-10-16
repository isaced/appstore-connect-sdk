import { describe, test, expect } from "bun:test";
import { applySpecPatches, RULES } from "../scripts/apply-spec-patches.mjs";

function fixtureSpec() {
  return {
    openapi: "3.0.1",
    info: { title: "x", version: "9.9.9" },
    paths: {
      "/v1/apps/{id}/searchKeywords": {
        get: {
          parameters: [
            { name: "limit", schema: { type: "integer" } },
            // the real-world defect: array items with an empty enum
            { name: "fields[appKeywords]", schema: { type: "array", items: { type: "string", enum: [] } } },
            // a populated enum must be left untouched
            { name: "filter[state]", schema: { type: "string", enum: ["ACTIVE", "READY"] } },
          ],
        },
      },
    },
    components: {
      schemas: {
        Widget: {
          properties: {
            nested: { schema: { type: "string", enum: [] } },
            keep: { enum: ["one"] },
            nonArrayEnum: { type: "string", enum: "oops" },
          },
        },
      },
    },
  };
}

describe("applySpecPatches", () => {
  test("remove-empty-enums strips enum:[] keys and counts each hit", () => {
    const { spec, report } = applySpecPatches(fixtureSpec());
    const hit = report.find((r) => r.id === "remove-empty-enums");
    expect(hit?.hits).toBe(2); // parameter items + nested property

    const params = spec.paths["/v1/apps/{id}/searchKeywords"].get.parameters;
    expect(params[1].schema.items).toEqual({ type: "string" });
    expect("enum" in params[1].schema.items).toBe(false);
  });

  test("leaves populated enums and non-array enum values untouched", () => {
    const { spec } = applySpecPatches(fixtureSpec());
    const params = spec.paths["/v1/apps/{id}/searchKeywords"].get.parameters;
    expect(params[2].schema.enum).toEqual(["ACTIVE", "READY"]);
    expect(spec.components.schemas.Widget.properties.keep.enum).toEqual(["one"]);
    expect(spec.components.schemas.Widget.properties.nonArrayEnum.enum).toBe("oops");
  });

  test("does not mutate the input object", () => {
    const input = fixtureSpec();
    const snapshot = JSON.stringify(input);
    applySpecPatches(input);
    expect(JSON.stringify(input)).toBe(snapshot);
  });

  test("report includes every registered rule even at zero hits", () => {
    const { report } = applySpecPatches({ paths: {} });
    expect(report.map((r) => r.id).sort()).toEqual(RULES.map((r) => r.id).sort());
    expect(report.every((r) => r.hits === 0)).toBe(true);
  });

  test("rule registry exposes id, description and drop predicate (audit surface)", () => {
    for (const rule of RULES) {
      expect(typeof rule.id).toBe("string");
      expect(typeof rule.description).toBe("string");
      expect(typeof rule.drop).toBe("function");
    }
  });
});
