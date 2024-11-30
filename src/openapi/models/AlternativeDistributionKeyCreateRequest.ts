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
import type { AlternativeDistributionKeyCreateRequestData } from './AlternativeDistributionKeyCreateRequestData';
import {
    AlternativeDistributionKeyCreateRequestDataFromJSON,
    AlternativeDistributionKeyCreateRequestDataFromJSONTyped,
    AlternativeDistributionKeyCreateRequestDataToJSON,
} from './AlternativeDistributionKeyCreateRequestData';

/**
 * 
 * @export
 * @interface AlternativeDistributionKeyCreateRequest
 */
export interface AlternativeDistributionKeyCreateRequest {
    /**
     * 
     * @type {AlternativeDistributionKeyCreateRequestData}
     * @memberof AlternativeDistributionKeyCreateRequest
     */
    data: AlternativeDistributionKeyCreateRequestData;
}

/**
 * Check if a given object implements the AlternativeDistributionKeyCreateRequest interface.
 */
export function instanceOfAlternativeDistributionKeyCreateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function AlternativeDistributionKeyCreateRequestFromJSON(json: any): AlternativeDistributionKeyCreateRequest {
    return AlternativeDistributionKeyCreateRequestFromJSONTyped(json, false);
}

export function AlternativeDistributionKeyCreateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlternativeDistributionKeyCreateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': AlternativeDistributionKeyCreateRequestDataFromJSON(json['data']),
    };
}

export function AlternativeDistributionKeyCreateRequestToJSON(value?: AlternativeDistributionKeyCreateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': AlternativeDistributionKeyCreateRequestDataToJSON(value.data),
    };
}

