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
import type { SubscriptionLocalizationUpdateRequestData } from './SubscriptionLocalizationUpdateRequestData';
import {
    SubscriptionLocalizationUpdateRequestDataFromJSON,
    SubscriptionLocalizationUpdateRequestDataFromJSONTyped,
    SubscriptionLocalizationUpdateRequestDataToJSON,
} from './SubscriptionLocalizationUpdateRequestData';

/**
 * 
 * @export
 * @interface SubscriptionLocalizationUpdateRequest
 */
export interface SubscriptionLocalizationUpdateRequest {
    /**
     * 
     * @type {SubscriptionLocalizationUpdateRequestData}
     * @memberof SubscriptionLocalizationUpdateRequest
     */
    data: SubscriptionLocalizationUpdateRequestData;
}

/**
 * Check if a given object implements the SubscriptionLocalizationUpdateRequest interface.
 */
export function instanceOfSubscriptionLocalizationUpdateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function SubscriptionLocalizationUpdateRequestFromJSON(json: any): SubscriptionLocalizationUpdateRequest {
    return SubscriptionLocalizationUpdateRequestFromJSONTyped(json, false);
}

export function SubscriptionLocalizationUpdateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionLocalizationUpdateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': SubscriptionLocalizationUpdateRequestDataFromJSON(json['data']),
    };
}

export function SubscriptionLocalizationUpdateRequestToJSON(value?: SubscriptionLocalizationUpdateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': SubscriptionLocalizationUpdateRequestDataToJSON(value.data),
    };
}

