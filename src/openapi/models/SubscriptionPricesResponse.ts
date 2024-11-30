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
import type { SubscriptionOfferCodePricesResponseIncludedInner } from './SubscriptionOfferCodePricesResponseIncludedInner';
import {
    SubscriptionOfferCodePricesResponseIncludedInnerFromJSON,
    SubscriptionOfferCodePricesResponseIncludedInnerFromJSONTyped,
    SubscriptionOfferCodePricesResponseIncludedInnerToJSON,
} from './SubscriptionOfferCodePricesResponseIncludedInner';
import type { SubscriptionPrice } from './SubscriptionPrice';
import {
    SubscriptionPriceFromJSON,
    SubscriptionPriceFromJSONTyped,
    SubscriptionPriceToJSON,
} from './SubscriptionPrice';

/**
 * 
 * @export
 * @interface SubscriptionPricesResponse
 */
export interface SubscriptionPricesResponse {
    /**
     * 
     * @type {Array<SubscriptionPrice>}
     * @memberof SubscriptionPricesResponse
     */
    data: Array<SubscriptionPrice>;
    /**
     * 
     * @type {Array<SubscriptionOfferCodePricesResponseIncludedInner>}
     * @memberof SubscriptionPricesResponse
     */
    included?: Array<SubscriptionOfferCodePricesResponseIncludedInner>;
    /**
     * 
     * @type {PagedDocumentLinks}
     * @memberof SubscriptionPricesResponse
     */
    links: PagedDocumentLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof SubscriptionPricesResponse
     */
    meta?: PagingInformation;
}

/**
 * Check if a given object implements the SubscriptionPricesResponse interface.
 */
export function instanceOfSubscriptionPricesResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function SubscriptionPricesResponseFromJSON(json: any): SubscriptionPricesResponse {
    return SubscriptionPricesResponseFromJSONTyped(json, false);
}

export function SubscriptionPricesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionPricesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(SubscriptionPriceFromJSON)),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(SubscriptionOfferCodePricesResponseIncludedInnerFromJSON)),
        'links': PagedDocumentLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
    };
}

export function SubscriptionPricesResponseToJSON(value?: SubscriptionPricesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(SubscriptionPriceToJSON)),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(SubscriptionOfferCodePricesResponseIncludedInnerToJSON)),
        'links': PagedDocumentLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
    };
}

