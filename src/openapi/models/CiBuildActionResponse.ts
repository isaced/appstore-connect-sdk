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
import type { CiBuildAction } from './CiBuildAction';
import {
    CiBuildActionFromJSON,
    CiBuildActionFromJSONTyped,
    CiBuildActionToJSON,
} from './CiBuildAction';
import type { CiBuildRun } from './CiBuildRun';
import {
    CiBuildRunFromJSON,
    CiBuildRunFromJSONTyped,
    CiBuildRunToJSON,
} from './CiBuildRun';
import type { DocumentLinks } from './DocumentLinks';
import {
    DocumentLinksFromJSON,
    DocumentLinksFromJSONTyped,
    DocumentLinksToJSON,
} from './DocumentLinks';

/**
 * 
 * @export
 * @interface CiBuildActionResponse
 */
export interface CiBuildActionResponse {
    /**
     * 
     * @type {CiBuildAction}
     * @memberof CiBuildActionResponse
     */
    data: CiBuildAction;
    /**
     * 
     * @type {Array<CiBuildRun>}
     * @memberof CiBuildActionResponse
     */
    included?: Array<CiBuildRun>;
    /**
     * 
     * @type {DocumentLinks}
     * @memberof CiBuildActionResponse
     */
    links: DocumentLinks;
}

/**
 * Check if a given object implements the CiBuildActionResponse interface.
 */
export function instanceOfCiBuildActionResponse(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;
    isInstance = isInstance && "links" in value;

    return isInstance;
}

export function CiBuildActionResponseFromJSON(json: any): CiBuildActionResponse {
    return CiBuildActionResponseFromJSONTyped(json, false);
}

export function CiBuildActionResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): CiBuildActionResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': CiBuildActionFromJSON(json['data']),
        'included': !exists(json, 'included') ? undefined : ((json['included'] as Array<any>).map(CiBuildRunFromJSON)),
        'links': DocumentLinksFromJSON(json['links']),
    };
}

export function CiBuildActionResponseToJSON(value?: CiBuildActionResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': CiBuildActionToJSON(value.data),
        'included': value.included === undefined ? undefined : ((value.included as Array<any>).map(CiBuildRunToJSON)),
        'links': DocumentLinksToJSON(value.links),
    };
}

