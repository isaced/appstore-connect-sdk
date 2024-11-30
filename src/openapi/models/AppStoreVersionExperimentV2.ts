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
import type { AppStoreVersionExperimentV2Attributes } from './AppStoreVersionExperimentV2Attributes';
import {
    AppStoreVersionExperimentV2AttributesFromJSON,
    AppStoreVersionExperimentV2AttributesFromJSONTyped,
    AppStoreVersionExperimentV2AttributesToJSON,
} from './AppStoreVersionExperimentV2Attributes';
import type { AppStoreVersionExperimentV2Relationships } from './AppStoreVersionExperimentV2Relationships';
import {
    AppStoreVersionExperimentV2RelationshipsFromJSON,
    AppStoreVersionExperimentV2RelationshipsFromJSONTyped,
    AppStoreVersionExperimentV2RelationshipsToJSON,
} from './AppStoreVersionExperimentV2Relationships';
import type { ResourceLinks } from './ResourceLinks';
import {
    ResourceLinksFromJSON,
    ResourceLinksFromJSONTyped,
    ResourceLinksToJSON,
} from './ResourceLinks';

/**
 * 
 * @export
 * @interface AppStoreVersionExperimentV2
 */
export interface AppStoreVersionExperimentV2 {
    /**
     * 
     * @type {string}
     * @memberof AppStoreVersionExperimentV2
     */
    type: AppStoreVersionExperimentV2TypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AppStoreVersionExperimentV2
     */
    id: string;
    /**
     * 
     * @type {AppStoreVersionExperimentV2Attributes}
     * @memberof AppStoreVersionExperimentV2
     */
    attributes?: AppStoreVersionExperimentV2Attributes;
    /**
     * 
     * @type {AppStoreVersionExperimentV2Relationships}
     * @memberof AppStoreVersionExperimentV2
     */
    relationships?: AppStoreVersionExperimentV2Relationships;
    /**
     * 
     * @type {ResourceLinks}
     * @memberof AppStoreVersionExperimentV2
     */
    links?: ResourceLinks;
}


/**
 * @export
 */
export const AppStoreVersionExperimentV2TypeEnum = {
    AppStoreVersionExperiments: 'appStoreVersionExperiments'
} as const;
export type AppStoreVersionExperimentV2TypeEnum = typeof AppStoreVersionExperimentV2TypeEnum[keyof typeof AppStoreVersionExperimentV2TypeEnum];


/**
 * Check if a given object implements the AppStoreVersionExperimentV2 interface.
 */
export function instanceOfAppStoreVersionExperimentV2(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AppStoreVersionExperimentV2FromJSON(json: any): AppStoreVersionExperimentV2 {
    return AppStoreVersionExperimentV2FromJSONTyped(json, false);
}

export function AppStoreVersionExperimentV2FromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreVersionExperimentV2 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : AppStoreVersionExperimentV2AttributesFromJSON(json['attributes']),
        'relationships': !exists(json, 'relationships') ? undefined : AppStoreVersionExperimentV2RelationshipsFromJSON(json['relationships']),
        'links': !exists(json, 'links') ? undefined : ResourceLinksFromJSON(json['links']),
    };
}

export function AppStoreVersionExperimentV2ToJSON(value?: AppStoreVersionExperimentV2 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': AppStoreVersionExperimentV2AttributesToJSON(value.attributes),
        'relationships': AppStoreVersionExperimentV2RelationshipsToJSON(value.relationships),
        'links': ResourceLinksToJSON(value.links),
    };
}

