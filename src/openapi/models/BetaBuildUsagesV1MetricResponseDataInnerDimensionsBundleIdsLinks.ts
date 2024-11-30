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
 * @interface BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks
 */
export interface BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks {
    /**
     * 
     * @type {string}
     * @memberof BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks
     */
    groupBy?: string;
}

/**
 * Check if a given object implements the BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks interface.
 */
export function instanceOfBetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinksFromJSON(json: any): BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks {
    return BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinksFromJSONTyped(json, false);
}

export function BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinksFromJSONTyped(json: any, ignoreDiscriminator: boolean): BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'groupBy': !exists(json, 'groupBy') ? undefined : json['groupBy'],
    };
}

export function BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinksToJSON(value?: BetaBuildUsagesV1MetricResponseDataInnerDimensionsBundleIdsLinks | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'groupBy': value.groupBy,
    };
}

