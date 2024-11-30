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
import type { GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInner } from './GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInner';
import {
    GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInnerFromJSON,
    GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInnerFromJSONTyped,
    GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInnerToJSON,
} from './GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInner';
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
 * @interface GameCenterMatchmakingNumberRuleResultsV1MetricResponse
 */
export interface GameCenterMatchmakingNumberRuleResultsV1MetricResponse {
    /**
     * 
     * @type {Array<GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInner>}
     * @memberof GameCenterMatchmakingNumberRuleResultsV1MetricResponse
     */
    data: Array<GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInner>;
    /**
     * 
     * @type {PagedDocumentLinks}
     * @memberof GameCenterMatchmakingNumberRuleResultsV1MetricResponse
     */
    links: PagedDocumentLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof GameCenterMatchmakingNumberRuleResultsV1MetricResponse
     */
    meta?: PagingInformation;
}

/**
 * Check if a given object implements the GameCenterMatchmakingNumberRuleResultsV1MetricResponse interface.
 */
export function instanceOfGameCenterMatchmakingNumberRuleResultsV1MetricResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function GameCenterMatchmakingNumberRuleResultsV1MetricResponseFromJSON(json: any): GameCenterMatchmakingNumberRuleResultsV1MetricResponse {
    return GameCenterMatchmakingNumberRuleResultsV1MetricResponseFromJSONTyped(json, false);
}

export function GameCenterMatchmakingNumberRuleResultsV1MetricResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterMatchmakingNumberRuleResultsV1MetricResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInnerFromJSON)),
        'links': PagedDocumentLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
    };
}

export function GameCenterMatchmakingNumberRuleResultsV1MetricResponseToJSON(value?: GameCenterMatchmakingNumberRuleResultsV1MetricResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(GameCenterMatchmakingNumberRuleResultsV1MetricResponseDataInnerToJSON)),
        'links': PagedDocumentLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
    };
}

