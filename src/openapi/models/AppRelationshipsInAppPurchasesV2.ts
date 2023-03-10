/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * App Store Connect API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AppCategoryRelationshipsSubcategoriesLinks } from './AppCategoryRelationshipsSubcategoriesLinks';
import {
    AppCategoryRelationshipsSubcategoriesLinksFromJSON,
    AppCategoryRelationshipsSubcategoriesLinksFromJSONTyped,
    AppCategoryRelationshipsSubcategoriesLinksToJSON,
} from './AppCategoryRelationshipsSubcategoriesLinks';
import type { AppRelationshipsInAppPurchasesDataInner } from './AppRelationshipsInAppPurchasesDataInner';
import {
    AppRelationshipsInAppPurchasesDataInnerFromJSON,
    AppRelationshipsInAppPurchasesDataInnerFromJSONTyped,
    AppRelationshipsInAppPurchasesDataInnerToJSON,
} from './AppRelationshipsInAppPurchasesDataInner';
import type { PagingInformation } from './PagingInformation';
import {
    PagingInformationFromJSON,
    PagingInformationFromJSONTyped,
    PagingInformationToJSON,
} from './PagingInformation';

/**
 * 
 * @export
 * @interface AppRelationshipsInAppPurchasesV2
 */
export interface AppRelationshipsInAppPurchasesV2 {
    /**
     * 
     * @type {AppCategoryRelationshipsSubcategoriesLinks}
     * @memberof AppRelationshipsInAppPurchasesV2
     */
    links?: AppCategoryRelationshipsSubcategoriesLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof AppRelationshipsInAppPurchasesV2
     */
    meta?: PagingInformation;
    /**
     * 
     * @type {Array<AppRelationshipsInAppPurchasesDataInner>}
     * @memberof AppRelationshipsInAppPurchasesV2
     */
    data?: Array<AppRelationshipsInAppPurchasesDataInner>;
}

/**
 * Check if a given object implements the AppRelationshipsInAppPurchasesV2 interface.
 */
export function instanceOfAppRelationshipsInAppPurchasesV2(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppRelationshipsInAppPurchasesV2FromJSON(json: any): AppRelationshipsInAppPurchasesV2 {
    return AppRelationshipsInAppPurchasesV2FromJSONTyped(json, false);
}

export function AppRelationshipsInAppPurchasesV2FromJSONTyped(json: any, ignoreDiscriminator: boolean): AppRelationshipsInAppPurchasesV2 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'links': !exists(json, 'links') ? undefined : AppCategoryRelationshipsSubcategoriesLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(AppRelationshipsInAppPurchasesDataInnerFromJSON)),
    };
}

export function AppRelationshipsInAppPurchasesV2ToJSON(value?: AppRelationshipsInAppPurchasesV2 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'links': AppCategoryRelationshipsSubcategoriesLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(AppRelationshipsInAppPurchasesDataInnerToJSON)),
    };
}

