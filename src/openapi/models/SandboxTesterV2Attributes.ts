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
import type { TerritoryCode } from './TerritoryCode';
import {
    TerritoryCodeFromJSON,
    TerritoryCodeFromJSONTyped,
    TerritoryCodeToJSON,
} from './TerritoryCode';

/**
 * 
 * @export
 * @interface SandboxTesterV2Attributes
 */
export interface SandboxTesterV2Attributes {
    /**
     * 
     * @type {string}
     * @memberof SandboxTesterV2Attributes
     */
    firstName?: string;
    /**
     * 
     * @type {string}
     * @memberof SandboxTesterV2Attributes
     */
    lastName?: string;
    /**
     * 
     * @type {string}
     * @memberof SandboxTesterV2Attributes
     */
    acAccountName?: string;
    /**
     * 
     * @type {TerritoryCode}
     * @memberof SandboxTesterV2Attributes
     */
    territory?: TerritoryCode;
    /**
     * 
     * @type {boolean}
     * @memberof SandboxTesterV2Attributes
     */
    applePayCompatible?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof SandboxTesterV2Attributes
     */
    interruptPurchases?: boolean;
    /**
     * 
     * @type {string}
     * @memberof SandboxTesterV2Attributes
     */
    subscriptionRenewalRate?: SandboxTesterV2AttributesSubscriptionRenewalRateEnum;
}


/**
 * @export
 */
export const SandboxTesterV2AttributesSubscriptionRenewalRateEnum = {
    OneHour: 'MONTHLY_RENEWAL_EVERY_ONE_HOUR',
    ThirtyMinutes: 'MONTHLY_RENEWAL_EVERY_THIRTY_MINUTES',
    FifteenMinutes: 'MONTHLY_RENEWAL_EVERY_FIFTEEN_MINUTES',
    FiveMinutes: 'MONTHLY_RENEWAL_EVERY_FIVE_MINUTES',
    ThreeMinutes: 'MONTHLY_RENEWAL_EVERY_THREE_MINUTES'
} as const;
export type SandboxTesterV2AttributesSubscriptionRenewalRateEnum = typeof SandboxTesterV2AttributesSubscriptionRenewalRateEnum[keyof typeof SandboxTesterV2AttributesSubscriptionRenewalRateEnum];


/**
 * Check if a given object implements the SandboxTesterV2Attributes interface.
 */
export function instanceOfSandboxTesterV2Attributes(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function SandboxTesterV2AttributesFromJSON(json: any): SandboxTesterV2Attributes {
    return SandboxTesterV2AttributesFromJSONTyped(json, false);
}

export function SandboxTesterV2AttributesFromJSONTyped(json: any, ignoreDiscriminator: boolean): SandboxTesterV2Attributes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'firstName': !exists(json, 'firstName') ? undefined : json['firstName'],
        'lastName': !exists(json, 'lastName') ? undefined : json['lastName'],
        'acAccountName': !exists(json, 'acAccountName') ? undefined : json['acAccountName'],
        'territory': !exists(json, 'territory') ? undefined : TerritoryCodeFromJSON(json['territory']),
        'applePayCompatible': !exists(json, 'applePayCompatible') ? undefined : json['applePayCompatible'],
        'interruptPurchases': !exists(json, 'interruptPurchases') ? undefined : json['interruptPurchases'],
        'subscriptionRenewalRate': !exists(json, 'subscriptionRenewalRate') ? undefined : json['subscriptionRenewalRate'],
    };
}

export function SandboxTesterV2AttributesToJSON(value?: SandboxTesterV2Attributes | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'firstName': value.firstName,
        'lastName': value.lastName,
        'acAccountName': value.acAccountName,
        'territory': TerritoryCodeToJSON(value.territory),
        'applePayCompatible': value.applePayCompatible,
        'interruptPurchases': value.interruptPurchases,
        'subscriptionRenewalRate': value.subscriptionRenewalRate,
    };
}

