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
import type { DocumentLinks } from './DocumentLinks';
import {
    DocumentLinksFromJSON,
    DocumentLinksFromJSONTyped,
    DocumentLinksToJSON,
} from './DocumentLinks';
import type { GameCenterAchievementImage } from './GameCenterAchievementImage';
import {
    GameCenterAchievementImageFromJSON,
    GameCenterAchievementImageFromJSONTyped,
    GameCenterAchievementImageToJSON,
} from './GameCenterAchievementImage';
import type { GameCenterAchievementLocalization } from './GameCenterAchievementLocalization';
import {
    GameCenterAchievementLocalizationFromJSON,
    GameCenterAchievementLocalizationFromJSONTyped,
    GameCenterAchievementLocalizationToJSON,
} from './GameCenterAchievementLocalization';

/**
 * 
 * @export
 * @interface GameCenterAchievementImageResponse
 */
export interface GameCenterAchievementImageResponse {
    /**
     * 
     * @type {GameCenterAchievementImage}
     * @memberof GameCenterAchievementImageResponse
     */
    data: GameCenterAchievementImage;
    /**
     * 
     * @type {Array<GameCenterAchievementLocalization>}
     * @memberof GameCenterAchievementImageResponse
     */
    included?: Array<GameCenterAchievementLocalization>;
    /**
     * 
     * @type {DocumentLinks}
     * @memberof GameCenterAchievementImageResponse
     */
    links: DocumentLinks;
}

/**
 * Check if a given object implements the GameCenterAchievementImageResponse interface.
 */
export function instanceOfGameCenterAchievementImageResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function GameCenterAchievementImageResponseFromJSON(json: any): GameCenterAchievementImageResponse {
    return GameCenterAchievementImageResponseFromJSONTyped(json, false);
}

export function GameCenterAchievementImageResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterAchievementImageResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': GameCenterAchievementImageFromJSON(json['data']),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(GameCenterAchievementLocalizationFromJSON)),
        'links': DocumentLinksFromJSON(json['links']),
    };
}

export function GameCenterAchievementImageResponseToJSON(value?: GameCenterAchievementImageResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': GameCenterAchievementImageToJSON(value.data),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(GameCenterAchievementLocalizationToJSON)),
        'links': DocumentLinksToJSON(value.links),
    };
}

