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
import type { SubscriptionGroupLocalizationUpdateRequestDataAttributes } from './SubscriptionGroupLocalizationUpdateRequestDataAttributes';
import {
    SubscriptionGroupLocalizationUpdateRequestDataAttributesFromJSON,
    SubscriptionGroupLocalizationUpdateRequestDataAttributesFromJSONTyped,
    SubscriptionGroupLocalizationUpdateRequestDataAttributesToJSON,
} from './SubscriptionGroupLocalizationUpdateRequestDataAttributes';

/**
 * 
 * @export
 * @interface SubscriptionGroupLocalizationUpdateRequestData
 */
export interface SubscriptionGroupLocalizationUpdateRequestData {
    /**
     * 
     * @type {string}
     * @memberof SubscriptionGroupLocalizationUpdateRequestData
     */
    type: SubscriptionGroupLocalizationUpdateRequestDataTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof SubscriptionGroupLocalizationUpdateRequestData
     */
    id: string;
    /**
     * 
     * @type {SubscriptionGroupLocalizationUpdateRequestDataAttributes}
     * @memberof SubscriptionGroupLocalizationUpdateRequestData
     */
    attributes?: SubscriptionGroupLocalizationUpdateRequestDataAttributes;
}


/**
 * @export
 */
export const SubscriptionGroupLocalizationUpdateRequestDataTypeEnum = {
    SubscriptionGroupLocalizations: 'subscriptionGroupLocalizations'
} as const;
export type SubscriptionGroupLocalizationUpdateRequestDataTypeEnum = typeof SubscriptionGroupLocalizationUpdateRequestDataTypeEnum[keyof typeof SubscriptionGroupLocalizationUpdateRequestDataTypeEnum];


/**
 * Check if a given object implements the SubscriptionGroupLocalizationUpdateRequestData interface.
 */
export function instanceOfSubscriptionGroupLocalizationUpdateRequestData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function SubscriptionGroupLocalizationUpdateRequestDataFromJSON(json: any): SubscriptionGroupLocalizationUpdateRequestData {
    return SubscriptionGroupLocalizationUpdateRequestDataFromJSONTyped(json, false);
}

export function SubscriptionGroupLocalizationUpdateRequestDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionGroupLocalizationUpdateRequestData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : SubscriptionGroupLocalizationUpdateRequestDataAttributesFromJSON(json['attributes']),
    };
}

export function SubscriptionGroupLocalizationUpdateRequestDataToJSON(value?: SubscriptionGroupLocalizationUpdateRequestData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': SubscriptionGroupLocalizationUpdateRequestDataAttributesToJSON(value.attributes),
    };
}

