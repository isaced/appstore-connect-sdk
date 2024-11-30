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
import type { BuildBundleRelationshipsAppClipDomainCacheStatusData } from './BuildBundleRelationshipsAppClipDomainCacheStatusData';
import {
    BuildBundleRelationshipsAppClipDomainCacheStatusDataFromJSON,
    BuildBundleRelationshipsAppClipDomainCacheStatusDataFromJSONTyped,
    BuildBundleRelationshipsAppClipDomainCacheStatusDataToJSON,
} from './BuildBundleRelationshipsAppClipDomainCacheStatusData';

/**
 * 
 * @export
 * @interface BuildBundleRelationshipsAppClipDomainCacheStatus
 */
export interface BuildBundleRelationshipsAppClipDomainCacheStatus {
    /**
     * 
     * @type {AlternativeDistributionPackageVersionRelationshipsVariantsLinks}
     * @memberof BuildBundleRelationshipsAppClipDomainCacheStatus
     */
    links?: AlternativeDistributionPackageVersionRelationshipsVariantsLinks;
    /**
     * 
     * @type {BuildBundleRelationshipsAppClipDomainCacheStatusData}
     * @memberof BuildBundleRelationshipsAppClipDomainCacheStatus
     */
    data?: BuildBundleRelationshipsAppClipDomainCacheStatusData;
}

/**
 * Check if a given object implements the BuildBundleRelationshipsAppClipDomainCacheStatus interface.
 */
export function instanceOfBuildBundleRelationshipsAppClipDomainCacheStatus(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BuildBundleRelationshipsAppClipDomainCacheStatusFromJSON(json: any): BuildBundleRelationshipsAppClipDomainCacheStatus {
    return BuildBundleRelationshipsAppClipDomainCacheStatusFromJSONTyped(json, false);
}

export function BuildBundleRelationshipsAppClipDomainCacheStatusFromJSONTyped(json: any, ignoreDiscriminator: boolean): BuildBundleRelationshipsAppClipDomainCacheStatus {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'links': !exists(json, 'links') ? undefined : AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON(json['links']),
        'data': !exists(json, 'data') ? undefined : BuildBundleRelationshipsAppClipDomainCacheStatusDataFromJSON(json['data']),
    };
}

export function BuildBundleRelationshipsAppClipDomainCacheStatusToJSON(value?: BuildBundleRelationshipsAppClipDomainCacheStatus | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'links': AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON(value.links),
        'data': BuildBundleRelationshipsAppClipDomainCacheStatusDataToJSON(value.data),
    };
}

