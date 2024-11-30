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
import type { AppCustomProductPageAttributes } from './AppCustomProductPageAttributes';
import {
    AppCustomProductPageAttributesFromJSON,
    AppCustomProductPageAttributesFromJSONTyped,
    AppCustomProductPageAttributesToJSON,
} from './AppCustomProductPageAttributes';
import type { AppCustomProductPageRelationships } from './AppCustomProductPageRelationships';
import {
    AppCustomProductPageRelationshipsFromJSON,
    AppCustomProductPageRelationshipsFromJSONTyped,
    AppCustomProductPageRelationshipsToJSON,
} from './AppCustomProductPageRelationships';
import type { ResourceLinks } from './ResourceLinks';
import {
    ResourceLinksFromJSON,
    ResourceLinksFromJSONTyped,
    ResourceLinksToJSON,
} from './ResourceLinks';

/**
 * 
 * @export
 * @interface AppCustomProductPage
 */
export interface AppCustomProductPage {
    /**
     * 
     * @type {string}
     * @memberof AppCustomProductPage
     */
    type: AppCustomProductPageTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AppCustomProductPage
     */
    id: string;
    /**
     * 
     * @type {AppCustomProductPageAttributes}
     * @memberof AppCustomProductPage
     */
    attributes?: AppCustomProductPageAttributes;
    /**
     * 
     * @type {AppCustomProductPageRelationships}
     * @memberof AppCustomProductPage
     */
    relationships?: AppCustomProductPageRelationships;
    /**
     * 
     * @type {ResourceLinks}
     * @memberof AppCustomProductPage
     */
    links?: ResourceLinks;
}


/**
 * @export
 */
export const AppCustomProductPageTypeEnum = {
    AppCustomProductPages: 'appCustomProductPages'
} as const;
export type AppCustomProductPageTypeEnum = typeof AppCustomProductPageTypeEnum[keyof typeof AppCustomProductPageTypeEnum];


/**
 * Check if a given object implements the AppCustomProductPage interface.
 */
export function instanceOfAppCustomProductPage(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AppCustomProductPageFromJSON(json: any): AppCustomProductPage {
    return AppCustomProductPageFromJSONTyped(json, false);
}

export function AppCustomProductPageFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppCustomProductPage {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : AppCustomProductPageAttributesFromJSON(json['attributes']),
        'relationships': !exists(json, 'relationships') ? undefined : AppCustomProductPageRelationshipsFromJSON(json['relationships']),
        'links': !exists(json, 'links') ? undefined : ResourceLinksFromJSON(json['links']),
    };
}

export function AppCustomProductPageToJSON(value?: AppCustomProductPage | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': AppCustomProductPageAttributesToJSON(value.attributes),
        'relationships': AppCustomProductPageRelationshipsToJSON(value.relationships),
        'links': ResourceLinksToJSON(value.links),
    };
}

