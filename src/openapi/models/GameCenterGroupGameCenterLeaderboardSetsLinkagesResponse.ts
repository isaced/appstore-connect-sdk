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
import type { GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInner } from './GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInner';
import {
    GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInnerFromJSON,
    GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInnerFromJSONTyped,
    GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInnerToJSON,
} from './GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInner';
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
 * @interface GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse
 */
export interface GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse {
    /**
     * 
     * @type {Array<GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInner>}
     * @memberof GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse
     */
    data: Array<GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInner>;
    /**
     * 
     * @type {PagedDocumentLinks}
     * @memberof GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse
     */
    links: PagedDocumentLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse
     */
    meta?: PagingInformation;
}

/**
 * Check if a given object implements the GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse interface.
 */
export function instanceOfGameCenterGroupGameCenterLeaderboardSetsLinkagesResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function GameCenterGroupGameCenterLeaderboardSetsLinkagesResponseFromJSON(json: any): GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse {
    return GameCenterGroupGameCenterLeaderboardSetsLinkagesResponseFromJSONTyped(json, false);
}

export function GameCenterGroupGameCenterLeaderboardSetsLinkagesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInnerFromJSON)),
        'links': PagedDocumentLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
    };
}

export function GameCenterGroupGameCenterLeaderboardSetsLinkagesResponseToJSON(value?: GameCenterGroupGameCenterLeaderboardSetsLinkagesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(GameCenterDetailRelationshipsGameCenterLeaderboardSetsDataInnerToJSON)),
        'links': PagedDocumentLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
    };
}

