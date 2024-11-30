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
import type { AppScreenshotSetCreateRequestData } from './AppScreenshotSetCreateRequestData';
import {
    AppScreenshotSetCreateRequestDataFromJSON,
    AppScreenshotSetCreateRequestDataFromJSONTyped,
    AppScreenshotSetCreateRequestDataToJSON,
} from './AppScreenshotSetCreateRequestData';

/**
 * 
 * @export
 * @interface AppScreenshotSetCreateRequest
 */
export interface AppScreenshotSetCreateRequest {
    /**
     * 
     * @type {AppScreenshotSetCreateRequestData}
     * @memberof AppScreenshotSetCreateRequest
     */
    data: AppScreenshotSetCreateRequestData;
}

/**
 * Check if a given object implements the AppScreenshotSetCreateRequest interface.
 */
export function instanceOfAppScreenshotSetCreateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function AppScreenshotSetCreateRequestFromJSON(json: any): AppScreenshotSetCreateRequest {
    return AppScreenshotSetCreateRequestFromJSONTyped(json, false);
}

export function AppScreenshotSetCreateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppScreenshotSetCreateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': AppScreenshotSetCreateRequestDataFromJSON(json['data']),
    };
}

export function AppScreenshotSetCreateRequestToJSON(value?: AppScreenshotSetCreateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': AppScreenshotSetCreateRequestDataToJSON(value.data),
    };
}

