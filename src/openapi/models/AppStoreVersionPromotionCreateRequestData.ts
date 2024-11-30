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
import type { AppStoreVersionPromotionCreateRequestDataRelationships } from './AppStoreVersionPromotionCreateRequestDataRelationships';
import {
    AppStoreVersionPromotionCreateRequestDataRelationshipsFromJSON,
    AppStoreVersionPromotionCreateRequestDataRelationshipsFromJSONTyped,
    AppStoreVersionPromotionCreateRequestDataRelationshipsToJSON,
} from './AppStoreVersionPromotionCreateRequestDataRelationships';

/**
 * 
 * @export
 * @interface AppStoreVersionPromotionCreateRequestData
 */
export interface AppStoreVersionPromotionCreateRequestData {
    /**
     * 
     * @type {string}
     * @memberof AppStoreVersionPromotionCreateRequestData
     */
    type: AppStoreVersionPromotionCreateRequestDataTypeEnum;
    /**
     * 
     * @type {AppStoreVersionPromotionCreateRequestDataRelationships}
     * @memberof AppStoreVersionPromotionCreateRequestData
     */
    relationships: AppStoreVersionPromotionCreateRequestDataRelationships;
}


/**
 * @export
 */
export const AppStoreVersionPromotionCreateRequestDataTypeEnum = {
    AppStoreVersionPromotions: 'appStoreVersionPromotions'
} as const;
export type AppStoreVersionPromotionCreateRequestDataTypeEnum = typeof AppStoreVersionPromotionCreateRequestDataTypeEnum[keyof typeof AppStoreVersionPromotionCreateRequestDataTypeEnum];


/**
 * Check if a given object implements the AppStoreVersionPromotionCreateRequestData interface.
 */
export function instanceOfAppStoreVersionPromotionCreateRequestData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "relationships" in value;

    return isInstance;
}

export function AppStoreVersionPromotionCreateRequestDataFromJSON(json: any): AppStoreVersionPromotionCreateRequestData {
    return AppStoreVersionPromotionCreateRequestDataFromJSONTyped(json, false);
}

export function AppStoreVersionPromotionCreateRequestDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreVersionPromotionCreateRequestData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'relationships': AppStoreVersionPromotionCreateRequestDataRelationshipsFromJSON(json['relationships']),
    };
}

export function AppStoreVersionPromotionCreateRequestDataToJSON(value?: AppStoreVersionPromotionCreateRequestData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'relationships': AppStoreVersionPromotionCreateRequestDataRelationshipsToJSON(value.relationships),
    };
}

