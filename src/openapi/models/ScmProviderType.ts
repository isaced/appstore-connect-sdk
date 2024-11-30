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
 * @interface ScmProviderType
 */
export interface ScmProviderType {
    /**
     * 
     * @type {string}
     * @memberof ScmProviderType
     */
    kind?: ScmProviderTypeKindEnum;
    /**
     * 
     * @type {string}
     * @memberof ScmProviderType
     */
    displayName?: string;
    /**
     * 
     * @type {boolean}
     * @memberof ScmProviderType
     */
    isOnPremise?: boolean;
}


/**
 * @export
 */
export const ScmProviderTypeKindEnum = {
    BitbucketCloud: 'BITBUCKET_CLOUD',
    BitbucketServer: 'BITBUCKET_SERVER',
    GithubCloud: 'GITHUB_CLOUD',
    GithubEnterprise: 'GITHUB_ENTERPRISE',
    GitlabCloud: 'GITLAB_CLOUD',
    GitlabSelfManaged: 'GITLAB_SELF_MANAGED'
} as const;
export type ScmProviderTypeKindEnum = typeof ScmProviderTypeKindEnum[keyof typeof ScmProviderTypeKindEnum];


/**
 * Check if a given object implements the ScmProviderType interface.
 */
export function instanceOfScmProviderType(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ScmProviderTypeFromJSON(json: any): ScmProviderType {
    return ScmProviderTypeFromJSONTyped(json, false);
}

export function ScmProviderTypeFromJSONTyped(json: any, ignoreDiscriminator: boolean): ScmProviderType {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'kind': !exists(json, 'kind') ? undefined : json['kind'],
        'displayName': !exists(json, 'displayName') ? undefined : json['displayName'],
        'isOnPremise': !exists(json, 'isOnPremise') ? undefined : json['isOnPremise'],
    };
}

export function ScmProviderTypeToJSON(value?: ScmProviderType | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'kind': value.kind,
        'displayName': value.displayName,
        'isOnPremise': value.isOnPremise,
    };
}

