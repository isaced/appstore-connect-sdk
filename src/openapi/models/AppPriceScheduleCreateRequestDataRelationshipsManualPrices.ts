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
import type { AppPriceScheduleRelationshipsManualPricesDataInner } from './AppPriceScheduleRelationshipsManualPricesDataInner';
import {
    AppPriceScheduleRelationshipsManualPricesDataInnerFromJSON,
    AppPriceScheduleRelationshipsManualPricesDataInnerFromJSONTyped,
    AppPriceScheduleRelationshipsManualPricesDataInnerToJSON,
} from './AppPriceScheduleRelationshipsManualPricesDataInner';

/**
 * 
 * @export
 * @interface AppPriceScheduleCreateRequestDataRelationshipsManualPrices
 */
export interface AppPriceScheduleCreateRequestDataRelationshipsManualPrices {
    /**
     * 
     * @type {Array<AppPriceScheduleRelationshipsManualPricesDataInner>}
     * @memberof AppPriceScheduleCreateRequestDataRelationshipsManualPrices
     */
    data: Array<AppPriceScheduleRelationshipsManualPricesDataInner>;
}

/**
 * Check if a given object implements the AppPriceScheduleCreateRequestDataRelationshipsManualPrices interface.
 */
export function instanceOfAppPriceScheduleCreateRequestDataRelationshipsManualPrices(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function AppPriceScheduleCreateRequestDataRelationshipsManualPricesFromJSON(json: any): AppPriceScheduleCreateRequestDataRelationshipsManualPrices {
    return AppPriceScheduleCreateRequestDataRelationshipsManualPricesFromJSONTyped(json, false);
}

export function AppPriceScheduleCreateRequestDataRelationshipsManualPricesFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppPriceScheduleCreateRequestDataRelationshipsManualPrices {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(AppPriceScheduleRelationshipsManualPricesDataInnerFromJSON)),
    };
}

export function AppPriceScheduleCreateRequestDataRelationshipsManualPricesToJSON(value?: AppPriceScheduleCreateRequestDataRelationshipsManualPrices | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(AppPriceScheduleRelationshipsManualPricesDataInnerToJSON)),
    };
}

