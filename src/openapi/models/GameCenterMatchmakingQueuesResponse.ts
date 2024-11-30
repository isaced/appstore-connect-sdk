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
import type { GameCenterMatchmakingQueue } from './GameCenterMatchmakingQueue';
import {
    GameCenterMatchmakingQueueFromJSON,
    GameCenterMatchmakingQueueFromJSONTyped,
    GameCenterMatchmakingQueueToJSON,
} from './GameCenterMatchmakingQueue';
import type { GameCenterMatchmakingRuleSet } from './GameCenterMatchmakingRuleSet';
import {
    GameCenterMatchmakingRuleSetFromJSON,
    GameCenterMatchmakingRuleSetFromJSONTyped,
    GameCenterMatchmakingRuleSetToJSON,
} from './GameCenterMatchmakingRuleSet';
import type { PagedDocumentLinks } from './PagedDocumentLinks';
import {
    PagedDocumentLinksFromJSON,
    PagedDocumentLinksFromJSONTyped,
    PagedDocumentLinksToJSON,
} from './PagedDocumentLinks';
import type { PagingInformation } from './PagingInformation';
import {
    PagingInformationFromJSON,
    PagingInformationFromJSONTyped,
    PagingInformationToJSON,
} from './PagingInformation';

/**
 * 
 * @export
 * @interface GameCenterMatchmakingQueuesResponse
 */
export interface GameCenterMatchmakingQueuesResponse {
    /**
     * 
     * @type {Array<GameCenterMatchmakingQueue>}
     * @memberof GameCenterMatchmakingQueuesResponse
     */
    data: Array<GameCenterMatchmakingQueue>;
    /**
     * 
     * @type {Array<GameCenterMatchmakingRuleSet>}
     * @memberof GameCenterMatchmakingQueuesResponse
     */
    included?: Array<GameCenterMatchmakingRuleSet>;
    /**
     * 
     * @type {PagedDocumentLinks}
     * @memberof GameCenterMatchmakingQueuesResponse
     */
    links: PagedDocumentLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof GameCenterMatchmakingQueuesResponse
     */
    meta?: PagingInformation;
}

/**
 * Check if a given object implements the GameCenterMatchmakingQueuesResponse interface.
 */
export function instanceOfGameCenterMatchmakingQueuesResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function GameCenterMatchmakingQueuesResponseFromJSON(json: any): GameCenterMatchmakingQueuesResponse {
    return GameCenterMatchmakingQueuesResponseFromJSONTyped(json, false);
}

export function GameCenterMatchmakingQueuesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterMatchmakingQueuesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(GameCenterMatchmakingQueueFromJSON)),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(GameCenterMatchmakingRuleSetFromJSON)),
        'links': PagedDocumentLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
    };
}

export function GameCenterMatchmakingQueuesResponseToJSON(value?: GameCenterMatchmakingQueuesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(GameCenterMatchmakingQueueToJSON)),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(GameCenterMatchmakingRuleSetToJSON)),
        'links': PagedDocumentLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
    };
}

