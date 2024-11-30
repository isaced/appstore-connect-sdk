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
import type { AppStoreVersion } from './AppStoreVersion';
import {
    AppStoreVersionFromJSON,
    AppStoreVersionFromJSONTyped,
    AppStoreVersionToJSON,
} from './AppStoreVersion';
import type { AppStoreVersionSubmission } from './AppStoreVersionSubmission';
import {
    AppStoreVersionSubmissionFromJSON,
    AppStoreVersionSubmissionFromJSONTyped,
    AppStoreVersionSubmissionToJSON,
} from './AppStoreVersionSubmission';
import type { DocumentLinks } from './DocumentLinks';
import {
    DocumentLinksFromJSON,
    DocumentLinksFromJSONTyped,
    DocumentLinksToJSON,
} from './DocumentLinks';

/**
 * 
 * @export
 * @interface AppStoreVersionSubmissionResponse
 */
export interface AppStoreVersionSubmissionResponse {
    /**
     * 
     * @type {AppStoreVersionSubmission}
     * @memberof AppStoreVersionSubmissionResponse
     * @deprecated
     */
    data: AppStoreVersionSubmission;
    /**
     * 
     * @type {Array<AppStoreVersion>}
     * @memberof AppStoreVersionSubmissionResponse
     */
    included?: Array<AppStoreVersion>;
    /**
     * 
     * @type {DocumentLinks}
     * @memberof AppStoreVersionSubmissionResponse
     */
    links: DocumentLinks;
}

/**
 * Check if a given object implements the AppStoreVersionSubmissionResponse interface.
 */
export function instanceOfAppStoreVersionSubmissionResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function AppStoreVersionSubmissionResponseFromJSON(json: any): AppStoreVersionSubmissionResponse {
    return AppStoreVersionSubmissionResponseFromJSONTyped(json, false);
}

export function AppStoreVersionSubmissionResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreVersionSubmissionResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': AppStoreVersionSubmissionFromJSON(json['data']),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(AppStoreVersionFromJSON)),
        'links': DocumentLinksFromJSON(json['links']),
    };
}

export function AppStoreVersionSubmissionResponseToJSON(value?: AppStoreVersionSubmissionResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': AppStoreVersionSubmissionToJSON(value.data),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(AppStoreVersionToJSON)),
        'links': DocumentLinksToJSON(value.links),
    };
}

