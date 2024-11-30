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
import type { AppInfoUpdateRequestData } from './AppInfoUpdateRequestData';
import {
    AppInfoUpdateRequestDataFromJSON,
    AppInfoUpdateRequestDataFromJSONTyped,
    AppInfoUpdateRequestDataToJSON,
} from './AppInfoUpdateRequestData';

/**
 * 
 * @export
 * @interface AppInfoUpdateRequest
 */
export interface AppInfoUpdateRequest {
    /**
     * 
     * @type {AppInfoUpdateRequestData}
     * @memberof AppInfoUpdateRequest
     */
    data: AppInfoUpdateRequestData;
}

/**
 * Check if a given object implements the AppInfoUpdateRequest interface.
 */
export function instanceOfAppInfoUpdateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function AppInfoUpdateRequestFromJSON(json: any): AppInfoUpdateRequest {
    return AppInfoUpdateRequestFromJSONTyped(json, false);
}

export function AppInfoUpdateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppInfoUpdateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': AppInfoUpdateRequestDataFromJSON(json['data']),
    };
}

export function AppInfoUpdateRequestToJSON(value?: AppInfoUpdateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': AppInfoUpdateRequestDataToJSON(value.data),
    };
}

