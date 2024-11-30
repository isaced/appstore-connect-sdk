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
import type { AlternativeDistributionPackageVersionRelationshipsVariantsLinks } from './AlternativeDistributionPackageVersionRelationshipsVariantsLinks';
import {
    AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON,
    AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSONTyped,
    AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON,
} from './AlternativeDistributionPackageVersionRelationshipsVariantsLinks';
import type { AppClipAdvancedExperienceRelationshipsAppClipData } from './AppClipAdvancedExperienceRelationshipsAppClipData';
import {
    AppClipAdvancedExperienceRelationshipsAppClipDataFromJSON,
    AppClipAdvancedExperienceRelationshipsAppClipDataFromJSONTyped,
    AppClipAdvancedExperienceRelationshipsAppClipDataToJSON,
} from './AppClipAdvancedExperienceRelationshipsAppClipData';

/**
 * 
 * @export
 * @interface AppClipAdvancedExperienceRelationshipsAppClip
 */
export interface AppClipAdvancedExperienceRelationshipsAppClip {
    /**
     * 
     * @type {AlternativeDistributionPackageVersionRelationshipsVariantsLinks}
     * @memberof AppClipAdvancedExperienceRelationshipsAppClip
     */
    links?: AlternativeDistributionPackageVersionRelationshipsVariantsLinks;
    /**
     * 
     * @type {AppClipAdvancedExperienceRelationshipsAppClipData}
     * @memberof AppClipAdvancedExperienceRelationshipsAppClip
     */
    data?: AppClipAdvancedExperienceRelationshipsAppClipData;
}

/**
 * Check if a given object implements the AppClipAdvancedExperienceRelationshipsAppClip interface.
 */
export function instanceOfAppClipAdvancedExperienceRelationshipsAppClip(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppClipAdvancedExperienceRelationshipsAppClipFromJSON(json: any): AppClipAdvancedExperienceRelationshipsAppClip {
    return AppClipAdvancedExperienceRelationshipsAppClipFromJSONTyped(json, false);
}

export function AppClipAdvancedExperienceRelationshipsAppClipFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppClipAdvancedExperienceRelationshipsAppClip {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'links': !exists(json, 'links') ? undefined : AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON(json['links']),
        'data': !exists(json, 'data') ? undefined : AppClipAdvancedExperienceRelationshipsAppClipDataFromJSON(json['data']),
    };
}

export function AppClipAdvancedExperienceRelationshipsAppClipToJSON(value?: AppClipAdvancedExperienceRelationshipsAppClip | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'links': AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON(value.links),
        'data': AppClipAdvancedExperienceRelationshipsAppClipDataToJSON(value.data),
    };
}

