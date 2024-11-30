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
import type { AlternativeDistributionKeyAttributes } from './AlternativeDistributionKeyAttributes';
import {
    AlternativeDistributionKeyAttributesFromJSON,
    AlternativeDistributionKeyAttributesFromJSONTyped,
    AlternativeDistributionKeyAttributesToJSON,
} from './AlternativeDistributionKeyAttributes';
import type { ResourceLinks } from './ResourceLinks';
import {
    ResourceLinksFromJSON,
    ResourceLinksFromJSONTyped,
    ResourceLinksToJSON,
} from './ResourceLinks';

/**
 * 
 * @export
 * @interface AlternativeDistributionKey
 */
export interface AlternativeDistributionKey {
    /**
     * 
     * @type {string}
     * @memberof AlternativeDistributionKey
     */
    type: AlternativeDistributionKeyTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AlternativeDistributionKey
     */
    id: string;
    /**
     * 
     * @type {AlternativeDistributionKeyAttributes}
     * @memberof AlternativeDistributionKey
     */
    attributes?: AlternativeDistributionKeyAttributes;
    /**
     * 
     * @type {ResourceLinks}
     * @memberof AlternativeDistributionKey
     */
    links?: ResourceLinks;
}


/**
 * @export
 */
export const AlternativeDistributionKeyTypeEnum = {
    AlternativeDistributionKeys: 'alternativeDistributionKeys'
} as const;
export type AlternativeDistributionKeyTypeEnum = typeof AlternativeDistributionKeyTypeEnum[keyof typeof AlternativeDistributionKeyTypeEnum];


/**
 * Check if a given object implements the AlternativeDistributionKey interface.
 */
export function instanceOfAlternativeDistributionKey(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AlternativeDistributionKeyFromJSON(json: any): AlternativeDistributionKey {
    return AlternativeDistributionKeyFromJSONTyped(json, false);
}

export function AlternativeDistributionKeyFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlternativeDistributionKey {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : AlternativeDistributionKeyAttributesFromJSON(json['attributes']),
        'links': !exists(json, 'links') ? undefined : ResourceLinksFromJSON(json['links']),
    };
}

export function AlternativeDistributionKeyToJSON(value?: AlternativeDistributionKey | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': AlternativeDistributionKeyAttributesToJSON(value.attributes),
        'links': ResourceLinksToJSON(value.links),
    };
}

