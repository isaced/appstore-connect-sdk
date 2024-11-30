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
import type { SubscriptionRelationshipsIntroductoryOffersDataInner } from './SubscriptionRelationshipsIntroductoryOffersDataInner';
import {
    SubscriptionRelationshipsIntroductoryOffersDataInnerFromJSON,
    SubscriptionRelationshipsIntroductoryOffersDataInnerFromJSONTyped,
    SubscriptionRelationshipsIntroductoryOffersDataInnerToJSON,
} from './SubscriptionRelationshipsIntroductoryOffersDataInner';

/**
 * 
 * @export
 * @interface SubscriptionIntroductoryOffersLinkagesResponse
 */
export interface SubscriptionIntroductoryOffersLinkagesResponse {
    /**
     * 
     * @type {Array<SubscriptionRelationshipsIntroductoryOffersDataInner>}
     * @memberof SubscriptionIntroductoryOffersLinkagesResponse
     */
    data: Array<SubscriptionRelationshipsIntroductoryOffersDataInner>;
    /**
     * 
     * @type {PagedDocumentLinks}
     * @memberof SubscriptionIntroductoryOffersLinkagesResponse
     */
    links: PagedDocumentLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof SubscriptionIntroductoryOffersLinkagesResponse
     */
    meta?: PagingInformation;
}

/**
 * Check if a given object implements the SubscriptionIntroductoryOffersLinkagesResponse interface.
 */
export function instanceOfSubscriptionIntroductoryOffersLinkagesResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function SubscriptionIntroductoryOffersLinkagesResponseFromJSON(json: any): SubscriptionIntroductoryOffersLinkagesResponse {
    return SubscriptionIntroductoryOffersLinkagesResponseFromJSONTyped(json, false);
}

export function SubscriptionIntroductoryOffersLinkagesResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionIntroductoryOffersLinkagesResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(SubscriptionRelationshipsIntroductoryOffersDataInnerFromJSON)),
        'links': PagedDocumentLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
    };
}

export function SubscriptionIntroductoryOffersLinkagesResponseToJSON(value?: SubscriptionIntroductoryOffersLinkagesResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(SubscriptionRelationshipsIntroductoryOffersDataInnerToJSON)),
        'links': PagedDocumentLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
    };
}

