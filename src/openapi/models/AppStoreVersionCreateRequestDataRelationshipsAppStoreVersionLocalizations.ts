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
import type { AppPreviewSetRelationshipsAppStoreVersionLocalizationData } from './AppPreviewSetRelationshipsAppStoreVersionLocalizationData';
import {
    AppPreviewSetRelationshipsAppStoreVersionLocalizationDataFromJSON,
    AppPreviewSetRelationshipsAppStoreVersionLocalizationDataFromJSONTyped,
    AppPreviewSetRelationshipsAppStoreVersionLocalizationDataToJSON,
} from './AppPreviewSetRelationshipsAppStoreVersionLocalizationData';

/**
 * 
 * @export
 * @interface AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations
 */
export interface AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations {
    /**
     * 
     * @type {Array<AppPreviewSetRelationshipsAppStoreVersionLocalizationData>}
     * @memberof AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations
     */
    data?: Array<AppPreviewSetRelationshipsAppStoreVersionLocalizationData>;
}

/**
 * Check if a given object implements the AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations interface.
 */
export function instanceOfAppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizationsFromJSON(json: any): AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations {
    return AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizationsFromJSONTyped(json, false);
}

export function AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizationsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(AppPreviewSetRelationshipsAppStoreVersionLocalizationDataFromJSON)),
    };
}

export function AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizationsToJSON(value?: AppStoreVersionCreateRequestDataRelationshipsAppStoreVersionLocalizations | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(AppPreviewSetRelationshipsAppStoreVersionLocalizationDataToJSON)),
    };
}

