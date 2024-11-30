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
import type { AppCustomProductPageLocalizationUpdateRequestData } from './AppCustomProductPageLocalizationUpdateRequestData';
import {
    AppCustomProductPageLocalizationUpdateRequestDataFromJSON,
    AppCustomProductPageLocalizationUpdateRequestDataFromJSONTyped,
    AppCustomProductPageLocalizationUpdateRequestDataToJSON,
} from './AppCustomProductPageLocalizationUpdateRequestData';

/**
 * 
 * @export
 * @interface AppCustomProductPageLocalizationUpdateRequest
 */
export interface AppCustomProductPageLocalizationUpdateRequest {
    /**
     * 
     * @type {AppCustomProductPageLocalizationUpdateRequestData}
     * @memberof AppCustomProductPageLocalizationUpdateRequest
     */
    data: AppCustomProductPageLocalizationUpdateRequestData;
}

/**
 * Check if a given object implements the AppCustomProductPageLocalizationUpdateRequest interface.
 */
export function instanceOfAppCustomProductPageLocalizationUpdateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function AppCustomProductPageLocalizationUpdateRequestFromJSON(json: any): AppCustomProductPageLocalizationUpdateRequest {
    return AppCustomProductPageLocalizationUpdateRequestFromJSONTyped(json, false);
}

export function AppCustomProductPageLocalizationUpdateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppCustomProductPageLocalizationUpdateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': AppCustomProductPageLocalizationUpdateRequestDataFromJSON(json['data']),
    };
}

export function AppCustomProductPageLocalizationUpdateRequestToJSON(value?: AppCustomProductPageLocalizationUpdateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': AppCustomProductPageLocalizationUpdateRequestDataToJSON(value.data),
    };
}

