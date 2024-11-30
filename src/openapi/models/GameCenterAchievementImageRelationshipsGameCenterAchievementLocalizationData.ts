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
/**
 * 
 * @export
 * @interface GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData
 */
export interface GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData {
    /**
     * 
     * @type {string}
     * @memberof GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData
     */
    type: GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData
     */
    id: string;
}


/**
 * @export
 */
export const GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataTypeEnum = {
    GameCenterAchievementLocalizations: 'gameCenterAchievementLocalizations'
} as const;
export type GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataTypeEnum = typeof GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataTypeEnum[keyof typeof GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataTypeEnum];


/**
 * Check if a given object implements the GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData interface.
 */
export function instanceOfGameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataFromJSON(json: any): GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData {
    return GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataFromJSONTyped(json, false);
}

export function GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
    };
}

export function GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationDataToJSON(value?: GameCenterAchievementImageRelationshipsGameCenterAchievementLocalizationData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
    };
}

