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
import type { AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetail } from './AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetail';
import {
    AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetailFromJSON,
    AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetailFromJSONTyped,
    AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetailToJSON,
} from './AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetail';

/**
 * 
 * @export
 * @interface AppStoreReviewAttachmentCreateRequestDataRelationships
 */
export interface AppStoreReviewAttachmentCreateRequestDataRelationships {
    /**
     * 
     * @type {AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetail}
     * @memberof AppStoreReviewAttachmentCreateRequestDataRelationships
     */
    appStoreReviewDetail: AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetail;
}

/**
 * Check if a given object implements the AppStoreReviewAttachmentCreateRequestDataRelationships interface.
 */
export function instanceOfAppStoreReviewAttachmentCreateRequestDataRelationships(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "appStoreReviewDetail" in value;

    return isInstance;
}

export function AppStoreReviewAttachmentCreateRequestDataRelationshipsFromJSON(json: any): AppStoreReviewAttachmentCreateRequestDataRelationships {
    return AppStoreReviewAttachmentCreateRequestDataRelationshipsFromJSONTyped(json, false);
}

export function AppStoreReviewAttachmentCreateRequestDataRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreReviewAttachmentCreateRequestDataRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appStoreReviewDetail': AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetailFromJSON(json['appStoreReviewDetail']),
    };
}

export function AppStoreReviewAttachmentCreateRequestDataRelationshipsToJSON(value?: AppStoreReviewAttachmentCreateRequestDataRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'appStoreReviewDetail': AppStoreReviewAttachmentCreateRequestDataRelationshipsAppStoreReviewDetailToJSON(value.appStoreReviewDetail),
    };
}

