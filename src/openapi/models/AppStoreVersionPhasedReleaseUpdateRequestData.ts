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
import type { AppStoreVersionPhasedReleaseCreateRequestDataAttributes } from './AppStoreVersionPhasedReleaseCreateRequestDataAttributes';
import {
    AppStoreVersionPhasedReleaseCreateRequestDataAttributesFromJSON,
    AppStoreVersionPhasedReleaseCreateRequestDataAttributesFromJSONTyped,
    AppStoreVersionPhasedReleaseCreateRequestDataAttributesToJSON,
} from './AppStoreVersionPhasedReleaseCreateRequestDataAttributes';

/**
 * 
 * @export
 * @interface AppStoreVersionPhasedReleaseUpdateRequestData
 */
export interface AppStoreVersionPhasedReleaseUpdateRequestData {
    /**
     * 
     * @type {string}
     * @memberof AppStoreVersionPhasedReleaseUpdateRequestData
     */
    type: AppStoreVersionPhasedReleaseUpdateRequestDataTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AppStoreVersionPhasedReleaseUpdateRequestData
     */
    id: string;
    /**
     * 
     * @type {AppStoreVersionPhasedReleaseCreateRequestDataAttributes}
     * @memberof AppStoreVersionPhasedReleaseUpdateRequestData
     */
    attributes?: AppStoreVersionPhasedReleaseCreateRequestDataAttributes;
}


/**
 * @export
 */
export const AppStoreVersionPhasedReleaseUpdateRequestDataTypeEnum = {
    AppStoreVersionPhasedReleases: 'appStoreVersionPhasedReleases'
} as const;
export type AppStoreVersionPhasedReleaseUpdateRequestDataTypeEnum = typeof AppStoreVersionPhasedReleaseUpdateRequestDataTypeEnum[keyof typeof AppStoreVersionPhasedReleaseUpdateRequestDataTypeEnum];


/**
 * Check if a given object implements the AppStoreVersionPhasedReleaseUpdateRequestData interface.
 */
export function instanceOfAppStoreVersionPhasedReleaseUpdateRequestData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AppStoreVersionPhasedReleaseUpdateRequestDataFromJSON(json: any): AppStoreVersionPhasedReleaseUpdateRequestData {
    return AppStoreVersionPhasedReleaseUpdateRequestDataFromJSONTyped(json, false);
}

export function AppStoreVersionPhasedReleaseUpdateRequestDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreVersionPhasedReleaseUpdateRequestData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : AppStoreVersionPhasedReleaseCreateRequestDataAttributesFromJSON(json['attributes']),
    };
}

export function AppStoreVersionPhasedReleaseUpdateRequestDataToJSON(value?: AppStoreVersionPhasedReleaseUpdateRequestData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': AppStoreVersionPhasedReleaseCreateRequestDataAttributesToJSON(value.attributes),
    };
}

