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
import type { AnalyticsReportRequestCreateRequestDataRelationshipsApp } from './AnalyticsReportRequestCreateRequestDataRelationshipsApp';
import {
    AnalyticsReportRequestCreateRequestDataRelationshipsAppFromJSON,
    AnalyticsReportRequestCreateRequestDataRelationshipsAppFromJSONTyped,
    AnalyticsReportRequestCreateRequestDataRelationshipsAppToJSON,
} from './AnalyticsReportRequestCreateRequestDataRelationshipsApp';
import type { AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersion } from './AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersion';
import {
    AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersionFromJSON,
    AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersionFromJSONTyped,
    AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersionToJSON,
} from './AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersion';
import type { AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersions } from './AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersions';
import {
    AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersionsFromJSON,
    AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersionsFromJSONTyped,
    AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersionsToJSON,
} from './AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersions';
import type { AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPage } from './AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPage';
import {
    AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPageFromJSON,
    AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPageFromJSONTyped,
    AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPageToJSON,
} from './AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPage';

/**
 * 
 * @export
 * @interface AppCustomProductPageCreateRequestDataRelationships
 */
export interface AppCustomProductPageCreateRequestDataRelationships {
    /**
     * 
     * @type {AnalyticsReportRequestCreateRequestDataRelationshipsApp}
     * @memberof AppCustomProductPageCreateRequestDataRelationships
     */
    app: AnalyticsReportRequestCreateRequestDataRelationshipsApp;
    /**
     * 
     * @type {AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersions}
     * @memberof AppCustomProductPageCreateRequestDataRelationships
     */
    appCustomProductPageVersions?: AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersions;
    /**
     * 
     * @type {AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersion}
     * @memberof AppCustomProductPageCreateRequestDataRelationships
     */
    appStoreVersionTemplate?: AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersion;
    /**
     * 
     * @type {AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPage}
     * @memberof AppCustomProductPageCreateRequestDataRelationships
     */
    customProductPageTemplate?: AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPage;
}

/**
 * Check if a given object implements the AppCustomProductPageCreateRequestDataRelationships interface.
 */
export function instanceOfAppCustomProductPageCreateRequestDataRelationships(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "app" in value;

    return isInstance;
}

export function AppCustomProductPageCreateRequestDataRelationshipsFromJSON(json: any): AppCustomProductPageCreateRequestDataRelationships {
    return AppCustomProductPageCreateRequestDataRelationshipsFromJSONTyped(json, false);
}

export function AppCustomProductPageCreateRequestDataRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppCustomProductPageCreateRequestDataRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'app': AnalyticsReportRequestCreateRequestDataRelationshipsAppFromJSON(json['app']),
        'appCustomProductPageVersions': !exists(json, 'appCustomProductPageVersions') ? undefined : AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersionsFromJSON(json['appCustomProductPageVersions']),
        'appStoreVersionTemplate': !exists(json, 'appStoreVersionTemplate') ? undefined : AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersionFromJSON(json['appStoreVersionTemplate']),
        'customProductPageTemplate': !exists(json, 'customProductPageTemplate') ? undefined : AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPageFromJSON(json['customProductPageTemplate']),
    };
}

export function AppCustomProductPageCreateRequestDataRelationshipsToJSON(value?: AppCustomProductPageCreateRequestDataRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'app': AnalyticsReportRequestCreateRequestDataRelationshipsAppToJSON(value.app),
        'appCustomProductPageVersions': AppCustomProductPageCreateRequestDataRelationshipsAppCustomProductPageVersionsToJSON(value.appCustomProductPageVersions),
        'appStoreVersionTemplate': AppClipDefaultExperienceCreateRequestDataRelationshipsReleaseWithAppStoreVersionToJSON(value.appStoreVersionTemplate),
        'customProductPageTemplate': AppCustomProductPageVersionInlineCreateRelationshipsAppCustomProductPageToJSON(value.customProductPageTemplate),
    };
}

