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
 * @interface GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues
 */
export interface GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues {
    /**
     * 
     * @type {number}
     * @memberof GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues
     */
    count?: number;
    /**
     * 
     * @type {number}
     * @memberof GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues
     */
    averageNumberOfRequests?: number;
    /**
     * 
     * @type {number}
     * @memberof GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues
     */
    p50NumberOfRequests?: number;
    /**
     * 
     * @type {number}
     * @memberof GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues
     */
    p95NumberOfRequests?: number;
}

/**
 * Check if a given object implements the GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues interface.
 */
export function instanceOfGameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValuesFromJSON(json: any): GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues {
    return GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValuesFromJSONTyped(json, false);
}

export function GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValuesFromJSONTyped(json: any, ignoreDiscriminator: boolean): GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'count': !exists(json, 'count') ? undefined : json['count'],
        'averageNumberOfRequests': !exists(json, 'averageNumberOfRequests') ? undefined : json['averageNumberOfRequests'],
        'p50NumberOfRequests': !exists(json, 'p50NumberOfRequests') ? undefined : json['p50NumberOfRequests'],
        'p95NumberOfRequests': !exists(json, 'p95NumberOfRequests') ? undefined : json['p95NumberOfRequests'],
    };
}

export function GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValuesToJSON(value?: GameCenterMatchmakingQueueSizesV1MetricResponseDataInnerDataPointsValues | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'count': value.count,
        'averageNumberOfRequests': value.averageNumberOfRequests,
        'p50NumberOfRequests': value.p50NumberOfRequests,
        'p95NumberOfRequests': value.p95NumberOfRequests,
    };
}

