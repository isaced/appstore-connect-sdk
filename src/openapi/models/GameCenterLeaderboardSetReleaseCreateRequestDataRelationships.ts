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
import type { GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetail } from './GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetail';
import {
    GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetailFromJSON,
    GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetailFromJSONTyped,
    GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetailToJSON,
} from './GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetail';
import type { GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSet } from './GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSet';
import {
    GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSetFromJSON,
    GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSetFromJSONTyped,
    GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSetToJSON,
} from './GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSet';

/**
 * 
 * @export
 * @interface GameCenterLeaderboardSetReleaseCreateRequestDataRelationships
 */
export interface GameCenterLeaderboardSetReleaseCreateRequestDataRelationships {
    /**
     * 
     * @type {GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetail}
     * @memberof GameCenterLeaderboardSetReleaseCreateRequestDataRelationships
     */
    gameCenterDetail: GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetail;
    /**
     * 
     * @type {GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSet}
     * @memberof GameCenterLeaderboardSetReleaseCreateRequestDataRelationships
     */
    gameCenterLeaderboardSet: GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSet;
}

/**
 * Check if a given object implements the GameCenterLeaderboardSetReleaseCreateRequestDataRelationships interface.
 */
export function instanceOfGameCenterLeaderboardSetReleaseCreateRequestDataRelationships(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "gameCenterDetail" in value;
    isInstance = isInstance && "gameCenterLeaderboardSet" in value;

    return isInstance;
}

export function GameCenterLeaderboardSetReleaseCreateRequestDataRelationshipsFromJSON(json: any): GameCenterLeaderboardSetReleaseCreateRequestDataRelationships {
    return GameCenterLeaderboardSetReleaseCreateRequestDataRelationshipsFromJSONTyped(json, false);
}

export function GameCenterLeaderboardSetReleaseCreateRequestDataRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterLeaderboardSetReleaseCreateRequestDataRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'gameCenterDetail': GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetailFromJSON(json['gameCenterDetail']),
        'gameCenterLeaderboardSet': GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSetFromJSON(json['gameCenterLeaderboardSet']),
    };
}

export function GameCenterLeaderboardSetReleaseCreateRequestDataRelationshipsToJSON(value?: GameCenterLeaderboardSetReleaseCreateRequestDataRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'gameCenterDetail': GameCenterAchievementReleaseCreateRequestDataRelationshipsGameCenterDetailToJSON(value.gameCenterDetail),
        'gameCenterLeaderboardSet': GameCenterLeaderboardSetLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardSetToJSON(value.gameCenterLeaderboardSet),
    };
}

