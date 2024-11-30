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
    GameCenterGroup,
    instanceOfGameCenterGroup,
    GameCenterGroupFromJSON,
    GameCenterGroupFromJSONTyped,
    GameCenterGroupToJSON,
} from './GameCenterGroup';
import {
    GameCenterLeaderboard,
    instanceOfGameCenterLeaderboard,
    GameCenterLeaderboardFromJSON,
    GameCenterLeaderboardFromJSONTyped,
    GameCenterLeaderboardToJSON,
} from './GameCenterLeaderboard';
import {
    GameCenterLeaderboardLocalization,
    instanceOfGameCenterLeaderboardLocalization,
    GameCenterLeaderboardLocalizationFromJSON,
    GameCenterLeaderboardLocalizationFromJSONTyped,
    GameCenterLeaderboardLocalizationToJSON,
} from './GameCenterLeaderboardLocalization';
import {
    GameCenterLeaderboardRelease,
    instanceOfGameCenterLeaderboardRelease,
    GameCenterLeaderboardReleaseFromJSON,
    GameCenterLeaderboardReleaseFromJSONTyped,
    GameCenterLeaderboardReleaseToJSON,
} from './GameCenterLeaderboardRelease';
import {
    GameCenterLeaderboardSet,
    instanceOfGameCenterLeaderboardSet,
    GameCenterLeaderboardSetFromJSON,
    GameCenterLeaderboardSetFromJSONTyped,
    GameCenterLeaderboardSetToJSON,
} from './GameCenterLeaderboardSet';

/**
 * @type GameCenterLeaderboardsResponseIncludedInner
 * 
 * @export
 */
export type GameCenterLeaderboardsResponseIncludedInner = GameCenterDetail | GameCenterGroup | GameCenterLeaderboard | GameCenterLeaderboardLocalization | GameCenterLeaderboardRelease | GameCenterLeaderboardSet;

export function GameCenterLeaderboardsResponseIncludedInnerFromJSON(json: any): GameCenterLeaderboardsResponseIncludedInner {
    return GameCenterLeaderboardsResponseIncludedInnerFromJSONTyped(json, false);
}

export function GameCenterLeaderboardsResponseIncludedInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterLeaderboardsResponseIncludedInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...GameCenterDetailFromJSONTyped(json, true), ...GameCenterGroupFromJSONTyped(json, true), ...GameCenterLeaderboardFromJSONTyped(json, true), ...GameCenterLeaderboardLocalizationFromJSONTyped(json, true), ...GameCenterLeaderboardReleaseFromJSONTyped(json, true), ...GameCenterLeaderboardSetFromJSONTyped(json, true) };
}

export function GameCenterLeaderboardsResponseIncludedInnerToJSON(value?: GameCenterLeaderboardsResponseIncludedInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfGameCenterDetail(value)) {
        return GameCenterDetailToJSON(value as GameCenterDetail);
    }
    if (instanceOfGameCenterGroup(value)) {
        return GameCenterGroupToJSON(value as GameCenterGroup);
    }
    if (instanceOfGameCenterLeaderboard(value)) {
        return GameCenterLeaderboardToJSON(value as GameCenterLeaderboard);
    }
    if (instanceOfGameCenterLeaderboardLocalization(value)) {
        return GameCenterLeaderboardLocalizationToJSON(value as GameCenterLeaderboardLocalization);
    }
    if (instanceOfGameCenterLeaderboardRelease(value)) {
        return GameCenterLeaderboardReleaseToJSON(value as GameCenterLeaderboardRelease);
    }
    if (instanceOfGameCenterLeaderboardSet(value)) {
        return GameCenterLeaderboardSetToJSON(value as GameCenterLeaderboardSet);
    }

    return {};
}

