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
import type { AppStoreReviewAttachment } from './AppStoreReviewAttachment';
import {
    AppStoreReviewAttachmentFromJSON,
    AppStoreReviewAttachmentFromJSONTyped,
    AppStoreReviewAttachmentToJSON,
} from './AppStoreReviewAttachment';
import type { AppStoreReviewDetail } from './AppStoreReviewDetail';
import {
    AppStoreReviewDetailFromJSON,
    AppStoreReviewDetailFromJSONTyped,
    AppStoreReviewDetailToJSON,
} from './AppStoreReviewDetail';
import type { DocumentLinks } from './DocumentLinks';
import {
    DocumentLinksFromJSON,
    DocumentLinksFromJSONTyped,
    DocumentLinksToJSON,
} from './DocumentLinks';

/**
 * 
 * @export
 * @interface AppStoreReviewAttachmentResponse
 */
export interface AppStoreReviewAttachmentResponse {
    /**
     * 
     * @type {AppStoreReviewAttachment}
     * @memberof AppStoreReviewAttachmentResponse
     */
    data: AppStoreReviewAttachment;
    /**
     * 
     * @type {Array<AppStoreReviewDetail>}
     * @memberof AppStoreReviewAttachmentResponse
     */
    included?: Array<AppStoreReviewDetail>;
    /**
     * 
     * @type {DocumentLinks}
     * @memberof AppStoreReviewAttachmentResponse
     */
    links: DocumentLinks;
}

/**
 * Check if a given object implements the AppStoreReviewAttachmentResponse interface.
 */
export function instanceOfAppStoreReviewAttachmentResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function AppStoreReviewAttachmentResponseFromJSON(json: any): AppStoreReviewAttachmentResponse {
    return AppStoreReviewAttachmentResponseFromJSONTyped(json, false);
}

export function AppStoreReviewAttachmentResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreReviewAttachmentResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': AppStoreReviewAttachmentFromJSON(json['data']),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(AppStoreReviewDetailFromJSON)),
        'links': DocumentLinksFromJSON(json['links']),
    };
}

export function AppStoreReviewAttachmentResponseToJSON(value?: AppStoreReviewAttachmentResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': AppStoreReviewAttachmentToJSON(value.data),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(AppStoreReviewDetailToJSON)),
        'links': DocumentLinksToJSON(value.links),
    };
}

