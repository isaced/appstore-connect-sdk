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
import type { InAppPurchaseAppStoreReviewScreenshotUpdateRequestData } from './InAppPurchaseAppStoreReviewScreenshotUpdateRequestData';
import {
    InAppPurchaseAppStoreReviewScreenshotUpdateRequestDataFromJSON,
    InAppPurchaseAppStoreReviewScreenshotUpdateRequestDataFromJSONTyped,
    InAppPurchaseAppStoreReviewScreenshotUpdateRequestDataToJSON,
} from './InAppPurchaseAppStoreReviewScreenshotUpdateRequestData';

/**
 * 
 * @export
 * @interface InAppPurchaseAppStoreReviewScreenshotUpdateRequest
 */
export interface InAppPurchaseAppStoreReviewScreenshotUpdateRequest {
    /**
     * 
     * @type {InAppPurchaseAppStoreReviewScreenshotUpdateRequestData}
     * @memberof InAppPurchaseAppStoreReviewScreenshotUpdateRequest
     */
    data: InAppPurchaseAppStoreReviewScreenshotUpdateRequestData;
}

/**
 * Check if a given object implements the InAppPurchaseAppStoreReviewScreenshotUpdateRequest interface.
 */
export function instanceOfInAppPurchaseAppStoreReviewScreenshotUpdateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function InAppPurchaseAppStoreReviewScreenshotUpdateRequestFromJSON(json: any): InAppPurchaseAppStoreReviewScreenshotUpdateRequest {
    return InAppPurchaseAppStoreReviewScreenshotUpdateRequestFromJSONTyped(json, false);
}

export function InAppPurchaseAppStoreReviewScreenshotUpdateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): InAppPurchaseAppStoreReviewScreenshotUpdateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': InAppPurchaseAppStoreReviewScreenshotUpdateRequestDataFromJSON(json['data']),
    };
}

export function InAppPurchaseAppStoreReviewScreenshotUpdateRequestToJSON(value?: InAppPurchaseAppStoreReviewScreenshotUpdateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': InAppPurchaseAppStoreReviewScreenshotUpdateRequestDataToJSON(value.data),
    };
}

