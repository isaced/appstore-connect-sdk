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
import type { BetaAppReviewDetailUpdateRequestData } from './BetaAppReviewDetailUpdateRequestData';
import {
    BetaAppReviewDetailUpdateRequestDataFromJSON,
    BetaAppReviewDetailUpdateRequestDataFromJSONTyped,
    BetaAppReviewDetailUpdateRequestDataToJSON,
} from './BetaAppReviewDetailUpdateRequestData';

/**
 * 
 * @export
 * @interface BetaAppReviewDetailUpdateRequest
 */
export interface BetaAppReviewDetailUpdateRequest {
    /**
     * 
     * @type {BetaAppReviewDetailUpdateRequestData}
     * @memberof BetaAppReviewDetailUpdateRequest
     */
    data: BetaAppReviewDetailUpdateRequestData;
}

/**
 * Check if a given object implements the BetaAppReviewDetailUpdateRequest interface.
 */
export function instanceOfBetaAppReviewDetailUpdateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function BetaAppReviewDetailUpdateRequestFromJSON(json: any): BetaAppReviewDetailUpdateRequest {
    return BetaAppReviewDetailUpdateRequestFromJSONTyped(json, false);
}

export function BetaAppReviewDetailUpdateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): BetaAppReviewDetailUpdateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': BetaAppReviewDetailUpdateRequestDataFromJSON(json['data']),
    };
}

export function BetaAppReviewDetailUpdateRequestToJSON(value?: BetaAppReviewDetailUpdateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': BetaAppReviewDetailUpdateRequestDataToJSON(value.data),
    };
}

