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
import type { BetaTesterAttributes } from './BetaTesterAttributes';
import {
    BetaTesterAttributesFromJSON,
    BetaTesterAttributesFromJSONTyped,
    BetaTesterAttributesToJSON,
} from './BetaTesterAttributes';
import type { BetaTesterRelationships } from './BetaTesterRelationships';
import {
    BetaTesterRelationshipsFromJSON,
    BetaTesterRelationshipsFromJSONTyped,
    BetaTesterRelationshipsToJSON,
} from './BetaTesterRelationships';
import type { ResourceLinks } from './ResourceLinks';
import {
    ResourceLinksFromJSON,
    ResourceLinksFromJSONTyped,
    ResourceLinksToJSON,
} from './ResourceLinks';

/**
 * 
 * @export
 * @interface BetaTester
 */
export interface BetaTester {
    /**
     * 
     * @type {string}
     * @memberof BetaTester
     */
    type: BetaTesterTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof BetaTester
     */
    id: string;
    /**
     * 
     * @type {BetaTesterAttributes}
     * @memberof BetaTester
     */
    attributes?: BetaTesterAttributes;
    /**
     * 
     * @type {BetaTesterRelationships}
     * @memberof BetaTester
     */
    relationships?: BetaTesterRelationships;
    /**
     * 
     * @type {ResourceLinks}
     * @memberof BetaTester
     */
    links?: ResourceLinks;
}


/**
 * @export
 */
export const BetaTesterTypeEnum = {
    BetaTesters: 'betaTesters'
} as const;
export type BetaTesterTypeEnum = typeof BetaTesterTypeEnum[keyof typeof BetaTesterTypeEnum];


/**
 * Check if a given object implements the BetaTester interface.
 */
export function instanceOfBetaTester(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function BetaTesterFromJSON(json: any): BetaTester {
    return BetaTesterFromJSONTyped(json, false);
}

export function BetaTesterFromJSONTyped(json: any, ignoreDiscriminator: boolean): BetaTester {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : BetaTesterAttributesFromJSON(json['attributes']),
        'relationships': !exists(json, 'relationships') ? undefined : BetaTesterRelationshipsFromJSON(json['relationships']),
        'links': !exists(json, 'links') ? undefined : ResourceLinksFromJSON(json['links']),
    };
}

export function BetaTesterToJSON(value?: BetaTester | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': BetaTesterAttributesToJSON(value.attributes),
        'relationships': BetaTesterRelationshipsToJSON(value.relationships),
        'links': ResourceLinksToJSON(value.links),
    };
}

