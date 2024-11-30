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
    GameCenterMatchmakingQueue,
    instanceOfGameCenterMatchmakingQueue,
    GameCenterMatchmakingQueueFromJSON,
    GameCenterMatchmakingQueueFromJSONTyped,
    GameCenterMatchmakingQueueToJSON,
} from './GameCenterMatchmakingQueue';
import {
    GameCenterMatchmakingRule,
    instanceOfGameCenterMatchmakingRule,
    GameCenterMatchmakingRuleFromJSON,
    GameCenterMatchmakingRuleFromJSONTyped,
    GameCenterMatchmakingRuleToJSON,
} from './GameCenterMatchmakingRule';
import {
    GameCenterMatchmakingTeam,
    instanceOfGameCenterMatchmakingTeam,
    GameCenterMatchmakingTeamFromJSON,
    GameCenterMatchmakingTeamFromJSONTyped,
    GameCenterMatchmakingTeamToJSON,
} from './GameCenterMatchmakingTeam';

/**
 * @type GameCenterMatchmakingRuleSetsResponseIncludedInner
 * 
 * @export
 */
export type GameCenterMatchmakingRuleSetsResponseIncludedInner = GameCenterMatchmakingQueue | GameCenterMatchmakingRule | GameCenterMatchmakingTeam;

export function GameCenterMatchmakingRuleSetsResponseIncludedInnerFromJSON(json: any): GameCenterMatchmakingRuleSetsResponseIncludedInner {
    return GameCenterMatchmakingRuleSetsResponseIncludedInnerFromJSONTyped(json, false);
}

export function GameCenterMatchmakingRuleSetsResponseIncludedInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterMatchmakingRuleSetsResponseIncludedInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...GameCenterMatchmakingQueueFromJSONTyped(json, true), ...GameCenterMatchmakingRuleFromJSONTyped(json, true), ...GameCenterMatchmakingTeamFromJSONTyped(json, true) };
}

export function GameCenterMatchmakingRuleSetsResponseIncludedInnerToJSON(value?: GameCenterMatchmakingRuleSetsResponseIncludedInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfGameCenterMatchmakingQueue(value)) {
        return GameCenterMatchmakingQueueToJSON(value as GameCenterMatchmakingQueue);
    }
    if (instanceOfGameCenterMatchmakingRule(value)) {
        return GameCenterMatchmakingRuleToJSON(value as GameCenterMatchmakingRule);
    }
    if (instanceOfGameCenterMatchmakingTeam(value)) {
        return GameCenterMatchmakingTeamToJSON(value as GameCenterMatchmakingTeam);
    }

    return {};
}

