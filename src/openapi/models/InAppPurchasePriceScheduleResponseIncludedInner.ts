/* tslint:disable */
/* eslint-disable */
/**
 * App Store Connect API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 3.5
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import {
    InAppPurchasePrice,
    instanceOfInAppPurchasePrice,
    InAppPurchasePriceFromJSON,
    InAppPurchasePriceFromJSONTyped,
    InAppPurchasePriceToJSON,
} from './InAppPurchasePrice';
import {
    InAppPurchaseV2,
    instanceOfInAppPurchaseV2,
    InAppPurchaseV2FromJSON,
    InAppPurchaseV2FromJSONTyped,
    InAppPurchaseV2ToJSON,
} from './InAppPurchaseV2';
import {
    Territory,
    instanceOfTerritory,
    TerritoryFromJSON,
    TerritoryFromJSONTyped,
    TerritoryToJSON,
} from './Territory';

/**
 * @type InAppPurchasePriceScheduleResponseIncludedInner
 * 
 * @export
 */
export type InAppPurchasePriceScheduleResponseIncludedInner = InAppPurchasePrice | InAppPurchaseV2 | Territory;

export function InAppPurchasePriceScheduleResponseIncludedInnerFromJSON(json: any): InAppPurchasePriceScheduleResponseIncludedInner {
    return InAppPurchasePriceScheduleResponseIncludedInnerFromJSONTyped(json, false);
}

export function InAppPurchasePriceScheduleResponseIncludedInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): InAppPurchasePriceScheduleResponseIncludedInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...InAppPurchasePriceFromJSONTyped(json, true), ...InAppPurchaseV2FromJSONTyped(json, true), ...TerritoryFromJSONTyped(json, true) };
}

export function InAppPurchasePriceScheduleResponseIncludedInnerToJSON(value?: InAppPurchasePriceScheduleResponseIncludedInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfInAppPurchasePrice(value)) {
        return InAppPurchasePriceToJSON(value as InAppPurchasePrice);
    }
    if (instanceOfInAppPurchaseV2(value)) {
        return InAppPurchaseV2ToJSON(value as InAppPurchaseV2);
    }
    if (instanceOfTerritory(value)) {
        return TerritoryToJSON(value as Territory);
    }

    return {};
}

