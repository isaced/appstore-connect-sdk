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
import type { GameCenterAchievementRelationshipsGameCenterGroupData } from './GameCenterAchievementRelationshipsGameCenterGroupData';
import {
    GameCenterAchievementRelationshipsGameCenterGroupDataFromJSON,
    GameCenterAchievementRelationshipsGameCenterGroupDataFromJSONTyped,
    GameCenterAchievementRelationshipsGameCenterGroupDataToJSON,
} from './GameCenterAchievementRelationshipsGameCenterGroupData';

/**
 * 
 * @export
 * @interface GameCenterAchievementRelationshipsGameCenterGroup
 */
export interface GameCenterAchievementRelationshipsGameCenterGroup {
    /**
     * 
     * @type {AlternativeDistributionPackageVersionRelationshipsVariantsLinks}
     * @memberof GameCenterAchievementRelationshipsGameCenterGroup
     */
    links?: AlternativeDistributionPackageVersionRelationshipsVariantsLinks;
    /**
     * 
     * @type {GameCenterAchievementRelationshipsGameCenterGroupData}
     * @memberof GameCenterAchievementRelationshipsGameCenterGroup
     */
    data?: GameCenterAchievementRelationshipsGameCenterGroupData;
}

/**
 * Check if a given object implements the GameCenterAchievementRelationshipsGameCenterGroup interface.
 */
export function instanceOfGameCenterAchievementRelationshipsGameCenterGroup(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GameCenterAchievementRelationshipsGameCenterGroupFromJSON(json: any): GameCenterAchievementRelationshipsGameCenterGroup {
    return GameCenterAchievementRelationshipsGameCenterGroupFromJSONTyped(json, false);
}

export function GameCenterAchievementRelationshipsGameCenterGroupFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterAchievementRelationshipsGameCenterGroup {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'links': !exists(json, 'links') ? undefined : AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON(json['links']),
        'data': !exists(json, 'data') ? undefined : GameCenterAchievementRelationshipsGameCenterGroupDataFromJSON(json['data']),
    };
}

export function GameCenterAchievementRelationshipsGameCenterGroupToJSON(value?: GameCenterAchievementRelationshipsGameCenterGroup | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'links': AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON(value.links),
        'data': GameCenterAchievementRelationshipsGameCenterGroupDataToJSON(value.data),
    };
}

