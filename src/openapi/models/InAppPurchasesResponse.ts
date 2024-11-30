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
import type { App } from './App';
import {
    AppFromJSON,
    AppFromJSONTyped,
    AppToJSON,
} from './App';
import type { InAppPurchase } from './InAppPurchase';
import {
    InAppPurchaseFromJSON,
    InAppPurchaseFromJSONTyped,
    InAppPurchaseToJSON,
} from './InAppPurchase';
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
 * @interface InAppPurchasesResponse
 */
export interface InAppPurchasesResponse {
    /**
     * 
     * @type {Array<InAppPurchase>}
     * @memberof InAppPurchasesResponse
     */
    data: Array<InAppPurchase>;
    /**
     * 
     * @type {Array<App>}
     * @memberof InAppPurchasesResponse
     */
    included?: Array<App>;
    /**
     * 
     * @type {PagedDocumentLinks}
     * @memberof InAppPurchasesResponse
     */
    links: PagedDocumentLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof InAppPurchasesResponse
     */
    meta?: PagingInformation;
}

/**
 * Check if a given object implements the InAppPurchasesResponse interface.
 */
export function instanceOfInAppPurchasesResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function InAppPurchasesResponseFromJSON(json: any): InAppPurchasesResponse {
    return InAppPurchasesResponseFromJSONTyped(json, false);
}

export function InAppPurchasesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): InAppPurchasesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(InAppPurchaseFromJSON)),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(AppFromJSON)),
        'links': PagedDocumentLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
    };
}

export function InAppPurchasesResponseToJSON(value?: InAppPurchasesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(InAppPurchaseToJSON)),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(AppToJSON)),
        'links': PagedDocumentLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
    };
}

