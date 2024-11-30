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
/**
 * 
 * @export
 * @interface SubscriptionOfferCodeCustomCodeAttributes
 */
export interface SubscriptionOfferCodeCustomCodeAttributes {
    /**
     * 
     * @type {string}
     * @memberof SubscriptionOfferCodeCustomCodeAttributes
     */
    customCode?: string;
    /**
     * 
     * @type {number}
     * @memberof SubscriptionOfferCodeCustomCodeAttributes
     */
    numberOfCodes?: number;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionOfferCodeCustomCodeAttributes
     */
    createdDate?: Date;
    /**
     * 
     * @type {Date}
     * @memberof SubscriptionOfferCodeCustomCodeAttributes
     */
    expirationDate?: Date;
    /**
     * 
     * @type {boolean}
     * @memberof SubscriptionOfferCodeCustomCodeAttributes
     */
    active?: boolean;
}

/**
 * Check if a given object implements the SubscriptionOfferCodeCustomCodeAttributes interface.
 */
export function instanceOfSubscriptionOfferCodeCustomCodeAttributes(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SubscriptionOfferCodeCustomCodeAttributesFromJSON(json: any): SubscriptionOfferCodeCustomCodeAttributes {
    return SubscriptionOfferCodeCustomCodeAttributesFromJSONTyped(json, false);
}

export function SubscriptionOfferCodeCustomCodeAttributesFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionOfferCodeCustomCodeAttributes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'customCode': !exists(json, 'customCode') ? undefined : json['customCode'],
        'numberOfCodes': !exists(json, 'numberOfCodes') ? undefined : json['numberOfCodes'],
        'createdDate': !exists(json, 'createdDate') ? undefined : (new Date(json['createdDate'])),
        'expirationDate': !exists(json, 'expirationDate') ? undefined : (new Date(json['expirationDate'])),
        'active': !exists(json, 'active') ? undefined : json['active'],
    };
}

export function SubscriptionOfferCodeCustomCodeAttributesToJSON(value?: SubscriptionOfferCodeCustomCodeAttributes | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'customCode': value.customCode,
        'numberOfCodes': value.numberOfCodes,
        'createdDate': value.createdDate === undefined ? undefined : (value.createdDate.toISOString()),
        'expirationDate': value.expirationDate === undefined ? undefined : (value.expirationDate.toISOString().substr(0,10)),
        'active': value.active,
    };
}

