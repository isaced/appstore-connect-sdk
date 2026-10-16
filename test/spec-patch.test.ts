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
            { name: "fields[appKeywords]", schema: { type: "array", items: { type: "string", enum: [] } } },
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
        BundleIdPlatform: { type: "string", enum: ["IOS", "MAC_OS", "UNIVERSAL"] },
        WinBackOfferPriceInlineCreate: {
          type: "object",
          properties: {
            type: { type: "string", enum: ["winBackOfferPrices"] },
            id: { type: "string" },
          },
          required: ["type"],
        },
      },
    },
  };
}

describe("applySpecPatches engine", () => {
  test("remove-empty-enums strips enum:[] keys and counts each hit", () => {
    const { spec, report } = applySpecPatches(fixtureSpec());
    const hit = report.find((r) => r.id === "remove-empty-enums");
    expect(hit?.hits).toBe(2);
    const params = spec.paths["/v1/apps/{id}/searchKeywords"].get.parameters;
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

  test("report covers every rule; second run patches nothing", () => {
    const first = applySpecPatches(fixtureSpec());
    expect(first.report.map((r) => r.id)).toEqual(RULES.map((r) => r.id));
    expect(first.report.every((r) => r.changed === true)).toBe(true);

    // idempotence: re-applying changes nothing. Remove-style rules report 0
    // hits once defects are gone; ensure-style rules report satisfied matches.
    const second = applySpecPatches(first.spec);
    expect(second.report.every((r) => r.changed === false)).toBe(true);
    expect(second.report.find((r) => r.id === "remove-empty-enums").hits).toBe(0);
    expect(second.report.find((r) => r.id === "bundleidplatform-services")).toMatchObject({ hits: 1, changed: false });
  });

  test("missing targets report zero hits, not failure", () => {
    const { report } = applySpecPatches({ paths: {} });
    expect(report.every((r) => r.hits === 0 && r.changed === false)).toBe(true);
  });

  test("rule registry exposes id, description and apply (audit surface)", () => {
    for (const rule of RULES) {
      expect(typeof rule.id).toBe("string");
      expect(typeof rule.description).toBe("string");
      expect(typeof rule.apply).toBe("function");
    }
  });
});

describe("bundleidplatform-services", () => {
  test("appends SERVICES to the BundleIdPlatform enum", () => {
    const { spec, report } = applySpecPatches(fixtureSpec());
    expect(spec.components.schemas.BundleIdPlatform.enum).toEqual(["IOS", "MAC_OS", "UNIVERSAL", "SERVICES"]);
    expect(report.find((r) => r.id === "bundleidplatform-services")).toMatchObject({ hits: 1, changed: true });
  });

  test("already-satisfied enum is matched but not rewritten", () => {
    const spec = fixtureSpec();
    spec.components.schemas.BundleIdPlatform.enum.push("SERVICES");
    const { report } = applySpecPatches(spec);
    expect(report.find((r) => r.id === "bundleidplatform-services")).toMatchObject({ hits: 1, changed: false });
  });

  test("absent schema reports zero hits", () => {
    const spec = fixtureSpec();
    delete spec.components.schemas.BundleIdPlatform;
    const { report } = applySpecPatches(spec);
    expect(report.find((r) => r.id === "bundleidplatform-services")).toMatchObject({ hits: 0, changed: false });
  });
});

describe("winbackofferprice-relationships", () => {
  test("injects the territory/subscriptionPricePoint relationships the API accepts", () => {
    const { spec, report } = applySpecPatches(fixtureSpec());
    const rel = spec.components.schemas.WinBackOfferPriceInlineCreate.properties.relationships;
    expect(report.find((r) => r.id === "winbackofferprice-relationships")).toMatchObject({ hits: 1, changed: true });
    expect(rel.required).toEqual(["territory"]);
    expect(rel.properties.territory.properties.data.required).toEqual(["type", "id"]);
    expect(rel.properties.territory.properties.data.properties.type.enum).toEqual(["territories"]);
    expect(rel.properties.subscriptionPricePoint.properties.data.properties.type.enum).toEqual([
      "subscriptionPricePoints",
    ]);
    // existing properties survive untouched
    expect(spec.components.schemas.WinBackOfferPriceInlineCreate.properties.type).toBeDefined();
    expect(spec.components.schemas.WinBackOfferPriceInlineCreate.required).toEqual(["type"]);
  });

  test("already-present relationships is matched but not rewritten", () => {
    const spec = fixtureSpec();
    spec.components.schemas.WinBackOfferPriceInlineCreate.properties.relationships = { type: "object" };
    const { report } = applySpecPatches(spec);
    expect(report.find((r) => r.id === "winbackofferprice-relationships")).toMatchObject({ hits: 1, changed: false });
    expect(report.find((r) => r.id === "winbackofferprice-relationships").changed).toBe(false);
  });

  test("absent schema reports zero hits", () => {
    const spec = fixtureSpec();
    delete spec.components.schemas.WinBackOfferPriceInlineCreate;
    const { report } = applySpecPatches(spec);
    expect(report.find((r) => r.id === "winbackofferprice-relationships")).toMatchObject({ hits: 0, changed: false });
  });
});
