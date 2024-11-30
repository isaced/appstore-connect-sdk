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
import type { InAppPurchaseAttributes } from './InAppPurchaseAttributes';
import {
    InAppPurchaseAttributesFromJSON,
    InAppPurchaseAttributesFromJSONTyped,
    InAppPurchaseAttributesToJSON,
} from './InAppPurchaseAttributes';
import type { InAppPurchaseRelationships } from './InAppPurchaseRelationships';
import {
    InAppPurchaseRelationshipsFromJSON,
    InAppPurchaseRelationshipsFromJSONTyped,
    InAppPurchaseRelationshipsToJSON,
} from './InAppPurchaseRelationships';
import type { ResourceLinks } from './ResourceLinks';
import {
    ResourceLinksFromJSON,
    ResourceLinksFromJSONTyped,
    ResourceLinksToJSON,
} from './ResourceLinks';

/**
 * 
 * @export
 * @interface InAppPurchase
 */
export interface InAppPurchase {
    /**
     * 
     * @type {string}
     * @memberof InAppPurchase
     */
    type: InAppPurchaseTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof InAppPurchase
     */
    id: string;
    /**
     * 
     * @type {InAppPurchaseAttributes}
     * @memberof InAppPurchase
     */
    attributes?: InAppPurchaseAttributes;
    /**
     * 
     * @type {InAppPurchaseRelationships}
     * @memberof InAppPurchase
     */
    relationships?: InAppPurchaseRelationships;
    /**
     * 
     * @type {ResourceLinks}
     * @memberof InAppPurchase
     */
    links?: ResourceLinks;
}


/**
 * @export
 */
export const InAppPurchaseTypeEnum = {
    InAppPurchases: 'inAppPurchases'
} as const;
export type InAppPurchaseTypeEnum = typeof InAppPurchaseTypeEnum[keyof typeof InAppPurchaseTypeEnum];


/**
 * Check if a given object implements the InAppPurchase interface.
 */
export function instanceOfInAppPurchase(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function InAppPurchaseFromJSON(json: any): InAppPurchase {
    return InAppPurchaseFromJSONTyped(json, false);
}

export function InAppPurchaseFromJSONTyped(json: any, ignoreDiscriminator: boolean): InAppPurchase {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : InAppPurchaseAttributesFromJSON(json['attributes']),
        'relationships': !exists(json, 'relationships') ? undefined : InAppPurchaseRelationshipsFromJSON(json['relationships']),
        'links': !exists(json, 'links') ? undefined : ResourceLinksFromJSON(json['links']),
    };
}

export function InAppPurchaseToJSON(value?: InAppPurchase | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': InAppPurchaseAttributesToJSON(value.attributes),
        'relationships': InAppPurchaseRelationshipsToJSON(value.relationships),
        'links': ResourceLinksToJSON(value.links),
    };
}

