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
import type { GameCenterAchievementRelationshipsReleasesDataInner } from './GameCenterAchievementRelationshipsReleasesDataInner';
import {
    GameCenterAchievementRelationshipsReleasesDataInnerFromJSON,
    GameCenterAchievementRelationshipsReleasesDataInnerFromJSONTyped,
    GameCenterAchievementRelationshipsReleasesDataInnerToJSON,
} from './GameCenterAchievementRelationshipsReleasesDataInner';
import type { PagingInformation } from './PagingInformation';
import {
    PagingInformationFromJSON,
    PagingInformationFromJSONTyped,
    PagingInformationToJSON,
} from './PagingInformation';

/**
 * 
 * @export
 * @interface GameCenterAchievementRelationshipsReleases
 */
export interface GameCenterAchievementRelationshipsReleases {
    /**
     * 
     * @type {AlternativeDistributionPackageVersionRelationshipsVariantsLinks}
     * @memberof GameCenterAchievementRelationshipsReleases
     */
    links?: AlternativeDistributionPackageVersionRelationshipsVariantsLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof GameCenterAchievementRelationshipsReleases
     */
    meta?: PagingInformation;
    /**
     * 
     * @type {Array<GameCenterAchievementRelationshipsReleasesDataInner>}
     * @memberof GameCenterAchievementRelationshipsReleases
     */
    data?: Array<GameCenterAchievementRelationshipsReleasesDataInner>;
}

/**
 * Check if a given object implements the GameCenterAchievementRelationshipsReleases interface.
 */
export function instanceOfGameCenterAchievementRelationshipsReleases(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GameCenterAchievementRelationshipsReleasesFromJSON(json: any): GameCenterAchievementRelationshipsReleases {
    return GameCenterAchievementRelationshipsReleasesFromJSONTyped(json, false);
}

export function GameCenterAchievementRelationshipsReleasesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterAchievementRelationshipsReleases {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'links': !exists(json, 'links') ? undefined : AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(GameCenterAchievementRelationshipsReleasesDataInnerFromJSON)),
    };
}

export function GameCenterAchievementRelationshipsReleasesToJSON(value?: GameCenterAchievementRelationshipsReleases | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'links': AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(GameCenterAchievementRelationshipsReleasesDataInnerToJSON)),
    };
}

