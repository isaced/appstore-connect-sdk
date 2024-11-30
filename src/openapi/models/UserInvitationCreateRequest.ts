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
import type { UserInvitationCreateRequestData } from './UserInvitationCreateRequestData';
import {
    UserInvitationCreateRequestDataFromJSON,
    UserInvitationCreateRequestDataFromJSONTyped,
    UserInvitationCreateRequestDataToJSON,
} from './UserInvitationCreateRequestData';

/**
 * 
 * @export
 * @interface UserInvitationCreateRequest
 */
export interface UserInvitationCreateRequest {
    /**
     * 
     * @type {UserInvitationCreateRequestData}
     * @memberof UserInvitationCreateRequest
     */
    data: UserInvitationCreateRequestData;
}

/**
 * Check if a given object implements the UserInvitationCreateRequest interface.
 */
export function instanceOfUserInvitationCreateRequest(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function UserInvitationCreateRequestFromJSON(json: any): UserInvitationCreateRequest {
    return UserInvitationCreateRequestFromJSONTyped(json, false);
}

export function UserInvitationCreateRequestFromJSONTyped(json: any, ignoreDiscriminator: boolean): UserInvitationCreateRequest {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': UserInvitationCreateRequestDataFromJSON(json['data']),
    };
}

export function UserInvitationCreateRequestToJSON(value?: UserInvitationCreateRequest | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': UserInvitationCreateRequestDataToJSON(value.data),
    };
}

