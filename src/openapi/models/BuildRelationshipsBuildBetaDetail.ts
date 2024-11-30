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
import type { BuildRelationshipsBuildBetaDetailData } from './BuildRelationshipsBuildBetaDetailData';
import {
    BuildRelationshipsBuildBetaDetailDataFromJSON,
    BuildRelationshipsBuildBetaDetailDataFromJSONTyped,
    BuildRelationshipsBuildBetaDetailDataToJSON,
} from './BuildRelationshipsBuildBetaDetailData';

/**
 * 
 * @export
 * @interface BuildRelationshipsBuildBetaDetail
 */
export interface BuildRelationshipsBuildBetaDetail {
    /**
     * 
     * @type {AlternativeDistributionPackageVersionRelationshipsVariantsLinks}
     * @memberof BuildRelationshipsBuildBetaDetail
     */
    links?: AlternativeDistributionPackageVersionRelationshipsVariantsLinks;
    /**
     * 
     * @type {BuildRelationshipsBuildBetaDetailData}
     * @memberof BuildRelationshipsBuildBetaDetail
     */
    data?: BuildRelationshipsBuildBetaDetailData;
}

/**
 * Check if a given object implements the BuildRelationshipsBuildBetaDetail interface.
 */
export function instanceOfBuildRelationshipsBuildBetaDetail(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BuildRelationshipsBuildBetaDetailFromJSON(json: any): BuildRelationshipsBuildBetaDetail {
    return BuildRelationshipsBuildBetaDetailFromJSONTyped(json, false);
}

export function BuildRelationshipsBuildBetaDetailFromJSONTyped(json: any, ignoreDiscriminator: boolean): BuildRelationshipsBuildBetaDetail {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'links': !exists(json, 'links') ? undefined : AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON(json['links']),
        'data': !exists(json, 'data') ? undefined : BuildRelationshipsBuildBetaDetailDataFromJSON(json['data']),
    };
}

export function BuildRelationshipsBuildBetaDetailToJSON(value?: BuildRelationshipsBuildBetaDetail | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'links': AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON(value.links),
        'data': BuildRelationshipsBuildBetaDetailDataToJSON(value.data),
    };
}

