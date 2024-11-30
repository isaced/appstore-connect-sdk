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

import {
    GameCenterDetail,
    instanceOfGameCenterDetail,
    GameCenterDetailFromJSON,
    GameCenterDetailFromJSONTyped,
    GameCenterDetailToJSON,
} from './GameCenterDetail';
import {
    GameCenterLeaderboardSet,
    instanceOfGameCenterLeaderboardSet,
    GameCenterLeaderboardSetFromJSON,
    GameCenterLeaderboardSetFromJSONTyped,
    GameCenterLeaderboardSetToJSON,
} from './GameCenterLeaderboardSet';

/**
 * @type GameCenterLeaderboardSetReleasesResponseIncludedInner
 * 
 * @export
 */
export type GameCenterLeaderboardSetReleasesResponseIncludedInner = GameCenterDetail | GameCenterLeaderboardSet;

export function GameCenterLeaderboardSetReleasesResponseIncludedInnerFromJSON(json: any): GameCenterLeaderboardSetReleasesResponseIncludedInner {
    return GameCenterLeaderboardSetReleasesResponseIncludedInnerFromJSONTyped(json, false);
}

export function GameCenterLeaderboardSetReleasesResponseIncludedInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterLeaderboardSetReleasesResponseIncludedInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...GameCenterDetailFromJSONTyped(json, true), ...GameCenterLeaderboardSetFromJSONTyped(json, true) };
}

export function GameCenterLeaderboardSetReleasesResponseIncludedInnerToJSON(value?: GameCenterLeaderboardSetReleasesResponseIncludedInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfGameCenterDetail(value)) {
        return GameCenterDetailToJSON(value as GameCenterDetail);
    }
    if (instanceOfGameCenterLeaderboardSet(value)) {
        return GameCenterLeaderboardSetToJSON(value as GameCenterLeaderboardSet);
    }

    return {};
}

