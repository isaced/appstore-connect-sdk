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
 * @interface ActorAttributes
 */
export interface ActorAttributes {
    /**
     * 
     * @type {string}
     * @memberof ActorAttributes
     */
    actorType?: ActorAttributesActorTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof ActorAttributes
     */
    userFirstName?: string;
    /**
     * 
     * @type {string}
     * @memberof ActorAttributes
     */
    userLastName?: string;
    /**
     * 
     * @type {string}
     * @memberof ActorAttributes
     */
    userEmail?: string;
    /**
     * 
     * @type {string}
     * @memberof ActorAttributes
     */
    apiKeyId?: string;
}


/**
 * @export
 */
export const ActorAttributesActorTypeEnum = {
    User: 'USER',
    ApiKey: 'API_KEY',
    XcodeCloud: 'XCODE_CLOUD',
    Apple: 'APPLE'
} as const;
export type ActorAttributesActorTypeEnum = typeof ActorAttributesActorTypeEnum[keyof typeof ActorAttributesActorTypeEnum];


/**
 * Check if a given object implements the ActorAttributes interface.
 */
export function instanceOfActorAttributes(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ActorAttributesFromJSON(json: any): ActorAttributes {
    return ActorAttributesFromJSONTyped(json, false);
}

export function ActorAttributesFromJSONTyped(json: any, ignoreDiscriminator: boolean): ActorAttributes {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'actorType': !exists(json, 'actorType') ? undefined : json['actorType'],
        'userFirstName': !exists(json, 'userFirstName') ? undefined : json['userFirstName'],
        'userLastName': !exists(json, 'userLastName') ? undefined : json['userLastName'],
        'userEmail': !exists(json, 'userEmail') ? undefined : json['userEmail'],
        'apiKeyId': !exists(json, 'apiKeyId') ? undefined : json['apiKeyId'],
    };
}

export function ActorAttributesToJSON(value?: ActorAttributes | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'actorType': value.actorType,
        'userFirstName': value.userFirstName,
        'userLastName': value.userLastName,
        'userEmail': value.userEmail,
        'apiKeyId': value.apiKeyId,
    };
}

