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
import type { AppAvailabilityV2CreateRequestDataAttributes } from './AppAvailabilityV2CreateRequestDataAttributes';
import {
    AppAvailabilityV2CreateRequestDataAttributesFromJSON,
    AppAvailabilityV2CreateRequestDataAttributesFromJSONTyped,
    AppAvailabilityV2CreateRequestDataAttributesToJSON,
} from './AppAvailabilityV2CreateRequestDataAttributes';
import type { AppAvailabilityV2CreateRequestDataRelationships } from './AppAvailabilityV2CreateRequestDataRelationships';
import {
    AppAvailabilityV2CreateRequestDataRelationshipsFromJSON,
    AppAvailabilityV2CreateRequestDataRelationshipsFromJSONTyped,
    AppAvailabilityV2CreateRequestDataRelationshipsToJSON,
} from './AppAvailabilityV2CreateRequestDataRelationships';

/**
 * 
 * @export
 * @interface AppAvailabilityV2CreateRequestData
 */
export interface AppAvailabilityV2CreateRequestData {
    /**
     * 
     * @type {string}
     * @memberof AppAvailabilityV2CreateRequestData
     */
    type: AppAvailabilityV2CreateRequestDataTypeEnum;
    /**
     * 
     * @type {AppAvailabilityV2CreateRequestDataAttributes}
     * @memberof AppAvailabilityV2CreateRequestData
     */
    attributes: AppAvailabilityV2CreateRequestDataAttributes;
    /**
     * 
     * @type {AppAvailabilityV2CreateRequestDataRelationships}
     * @memberof AppAvailabilityV2CreateRequestData
     */
    relationships: AppAvailabilityV2CreateRequestDataRelationships;
}


/**
 * @export
 */
export const AppAvailabilityV2CreateRequestDataTypeEnum = {
    AppAvailabilities: 'appAvailabilities'
} as const;
export type AppAvailabilityV2CreateRequestDataTypeEnum = typeof AppAvailabilityV2CreateRequestDataTypeEnum[keyof typeof AppAvailabilityV2CreateRequestDataTypeEnum];


/**
 * Check if a given object implements the AppAvailabilityV2CreateRequestData interface.
 */
export function instanceOfAppAvailabilityV2CreateRequestData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "attributes" in value;
    isInstance = isInstance && "relationships" in value;

    return isInstance;
}

export function AppAvailabilityV2CreateRequestDataFromJSON(json: any): AppAvailabilityV2CreateRequestData {
    return AppAvailabilityV2CreateRequestDataFromJSONTyped(json, false);
}

export function AppAvailabilityV2CreateRequestDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppAvailabilityV2CreateRequestData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'attributes': AppAvailabilityV2CreateRequestDataAttributesFromJSON(json['attributes']),
        'relationships': AppAvailabilityV2CreateRequestDataRelationshipsFromJSON(json['relationships']),
    };
}

export function AppAvailabilityV2CreateRequestDataToJSON(value?: AppAvailabilityV2CreateRequestData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'attributes': AppAvailabilityV2CreateRequestDataAttributesToJSON(value.attributes),
        'relationships': AppAvailabilityV2CreateRequestDataRelationshipsToJSON(value.relationships),
    };
}

