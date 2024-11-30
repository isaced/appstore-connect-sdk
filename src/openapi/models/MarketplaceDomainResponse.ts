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
import type { DocumentLinks } from './DocumentLinks';
import {
    DocumentLinksFromJSON,
    DocumentLinksFromJSONTyped,
    DocumentLinksToJSON,
} from './DocumentLinks';
import type { MarketplaceDomain } from './MarketplaceDomain';
import {
    MarketplaceDomainFromJSON,
    MarketplaceDomainFromJSONTyped,
    MarketplaceDomainToJSON,
} from './MarketplaceDomain';

/**
 * 
 * @export
 * @interface MarketplaceDomainResponse
 */
export interface MarketplaceDomainResponse {
    /**
     * 
     * @type {MarketplaceDomain}
     * @memberof MarketplaceDomainResponse
     * @deprecated
     */
    data: MarketplaceDomain;
    /**
     * 
     * @type {DocumentLinks}
     * @memberof MarketplaceDomainResponse
     */
    links: DocumentLinks;
}

/**
 * Check if a given object implements the MarketplaceDomainResponse interface.
 */
export function instanceOfMarketplaceDomainResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function MarketplaceDomainResponseFromJSON(json: any): MarketplaceDomainResponse {
    return MarketplaceDomainResponseFromJSONTyped(json, false);
}

export function MarketplaceDomainResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): MarketplaceDomainResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': MarketplaceDomainFromJSON(json['data']),
        'links': DocumentLinksFromJSON(json['links']),
    };
}

export function MarketplaceDomainResponseToJSON(value?: MarketplaceDomainResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': MarketplaceDomainToJSON(value.data),
        'links': DocumentLinksToJSON(value.links),
    };
}

