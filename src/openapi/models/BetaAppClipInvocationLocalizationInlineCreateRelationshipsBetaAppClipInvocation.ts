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
import type { BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationData } from './BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationData';
import {
    BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationDataFromJSON,
    BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationDataFromJSONTyped,
    BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationDataToJSON,
} from './BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationData';

/**
 * 
 * @export
 * @interface BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation
 */
export interface BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation {
    /**
     * 
     * @type {BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationData}
     * @memberof BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation
     */
    data?: BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationData;
}

/**
 * Check if a given object implements the BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation interface.
 */
export function instanceOfBetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationFromJSON(json: any): BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation {
    return BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationFromJSONTyped(json, false);
}

export function BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationFromJSONTyped(json: any, ignoreDiscriminator: boolean): BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': !exists(json, 'data') ? undefined : BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationDataFromJSON(json['data']),
    };
}

export function BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationToJSON(value?: BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocation | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': BetaAppClipInvocationLocalizationInlineCreateRelationshipsBetaAppClipInvocationDataToJSON(value.data),
    };
}

