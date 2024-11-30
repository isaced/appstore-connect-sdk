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

import { exists, mapValues } from '../runtime';
import type { InAppPurchaseV2RelationshipsPromotedPurchase } from './InAppPurchaseV2RelationshipsPromotedPurchase';
import {
    InAppPurchaseV2RelationshipsPromotedPurchaseFromJSON,
    InAppPurchaseV2RelationshipsPromotedPurchaseFromJSONTyped,
    InAppPurchaseV2RelationshipsPromotedPurchaseToJSON,
} from './InAppPurchaseV2RelationshipsPromotedPurchase';

/**
 * 
 * @export
 * @interface PromotedPurchaseImageRelationships
 */
export interface PromotedPurchaseImageRelationships {
    /**
     * 
     * @type {InAppPurchaseV2RelationshipsPromotedPurchase}
     * @memberof PromotedPurchaseImageRelationships
     */
    promotedPurchase?: InAppPurchaseV2RelationshipsPromotedPurchase;
}

/**
 * Check if a given object implements the PromotedPurchaseImageRelationships interface.
 */
export function instanceOfPromotedPurchaseImageRelationships(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PromotedPurchaseImageRelationshipsFromJSON(json: any): PromotedPurchaseImageRelationships {
    return PromotedPurchaseImageRelationshipsFromJSONTyped(json, false);
}

export function PromotedPurchaseImageRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PromotedPurchaseImageRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'promotedPurchase': !exists(json, 'promotedPurchase') ? undefined : InAppPurchaseV2RelationshipsPromotedPurchaseFromJSON(json['promotedPurchase']),
    };
}

export function PromotedPurchaseImageRelationshipsToJSON(value?: PromotedPurchaseImageRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'promotedPurchase': InAppPurchaseV2RelationshipsPromotedPurchaseToJSON(value.promotedPurchase),
    };
}

