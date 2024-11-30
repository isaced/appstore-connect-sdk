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
import type { CustomerReview } from './CustomerReview';
import {
    CustomerReviewFromJSON,
    CustomerReviewFromJSONTyped,
    CustomerReviewToJSON,
} from './CustomerReview';
import type { CustomerReviewResponseV1 } from './CustomerReviewResponseV1';
import {
    CustomerReviewResponseV1FromJSON,
    CustomerReviewResponseV1FromJSONTyped,
    CustomerReviewResponseV1ToJSON,
} from './CustomerReviewResponseV1';
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
 * @interface CustomerReviewsResponse
 */
export interface CustomerReviewsResponse {
    /**
     * 
     * @type {Array<CustomerReview>}
     * @memberof CustomerReviewsResponse
     */
    data: Array<CustomerReview>;
    /**
     * 
     * @type {Array<CustomerReviewResponseV1>}
     * @memberof CustomerReviewsResponse
     */
    included?: Array<CustomerReviewResponseV1>;
    /**
     * 
     * @type {PagedDocumentLinks}
     * @memberof CustomerReviewsResponse
     */
    links: PagedDocumentLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof CustomerReviewsResponse
     */
    meta?: PagingInformation;
}

/**
 * Check if a given object implements the CustomerReviewsResponse interface.
 */
export function instanceOfCustomerReviewsResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function CustomerReviewsResponseFromJSON(json: any): CustomerReviewsResponse {
    return CustomerReviewsResponseFromJSONTyped(json, false);
}

export function CustomerReviewsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CustomerReviewsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(CustomerReviewFromJSON)),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(CustomerReviewResponseV1FromJSON)),
        'links': PagedDocumentLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
    };
}

export function CustomerReviewsResponseToJSON(value?: CustomerReviewsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(CustomerReviewToJSON)),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(CustomerReviewResponseV1ToJSON)),
        'links': PagedDocumentLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
    };
}

