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
import type { GameCenterDetailRelationshipsGameCenterLeaderboardsDataInner } from './GameCenterDetailRelationshipsGameCenterLeaderboardsDataInner';
import {
    GameCenterDetailRelationshipsGameCenterLeaderboardsDataInnerFromJSON,
    GameCenterDetailRelationshipsGameCenterLeaderboardsDataInnerFromJSONTyped,
    GameCenterDetailRelationshipsGameCenterLeaderboardsDataInnerToJSON,
} from './GameCenterDetailRelationshipsGameCenterLeaderboardsDataInner';

/**
 * 
 * @export
 * @interface GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard
 */
export interface GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard {
    /**
     * 
     * @type {GameCenterDetailRelationshipsGameCenterLeaderboardsDataInner}
     * @memberof GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard
     */
    data: GameCenterDetailRelationshipsGameCenterLeaderboardsDataInner;
}

/**
 * Check if a given object implements the GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard interface.
 */
export function instanceOfGameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardFromJSON(json: any): GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard {
    return GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardFromJSONTyped(json, false);
}

export function GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': GameCenterDetailRelationshipsGameCenterLeaderboardsDataInnerFromJSON(json['data']),
    };
}

export function GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboardToJSON(value?: GameCenterLeaderboardLocalizationCreateRequestDataRelationshipsGameCenterLeaderboard | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': GameCenterDetailRelationshipsGameCenterLeaderboardsDataInnerToJSON(value.data),
    };
}

