/* tslint:disable */
/* eslint-disable */
// @ts-nocheck
/**
 * App Store Connect API
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.2
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import type { AppClipRelationshipsApp } from './AppClipRelationshipsApp';
import {
    AppClipRelationshipsAppFromJSON,
    AppClipRelationshipsAppFromJSONTyped,
    AppClipRelationshipsAppToJSON,
} from './AppClipRelationshipsApp';
import type { AppEncryptionDeclarationRelationshipsBuilds } from './AppEncryptionDeclarationRelationshipsBuilds';
import {
    AppEncryptionDeclarationRelationshipsBuildsFromJSON,
    AppEncryptionDeclarationRelationshipsBuildsFromJSONTyped,
    AppEncryptionDeclarationRelationshipsBuildsToJSON,
} from './AppEncryptionDeclarationRelationshipsBuilds';

/**
 * 
 * @export
 * @interface PrereleaseVersionRelationships
 */
export interface PrereleaseVersionRelationships {
    /**
     * 
     * @type {AppEncryptionDeclarationRelationshipsBuilds}
     * @memberof PrereleaseVersionRelationships
     */
    builds?: AppEncryptionDeclarationRelationshipsBuilds;
    /**
     * 
     * @type {AppClipRelationshipsApp}
     * @memberof PrereleaseVersionRelationships
     */
    app?: AppClipRelationshipsApp;
}

/**
 * Check if a given object implements the PrereleaseVersionRelationships interface.
 */
export function instanceOfPrereleaseVersionRelationships(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function PrereleaseVersionRelationshipsFromJSON(json: any): PrereleaseVersionRelationships {
    return PrereleaseVersionRelationshipsFromJSONTyped(json, false);
}

export function PrereleaseVersionRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): PrereleaseVersionRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'builds': !exists(json, 'builds') ? undefined : AppEncryptionDeclarationRelationshipsBuildsFromJSON(json['builds']),
        'app': !exists(json, 'app') ? undefined : AppClipRelationshipsAppFromJSON(json['app']),
    };
}

export function PrereleaseVersionRelationshipsToJSON(value?: PrereleaseVersionRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'builds': AppEncryptionDeclarationRelationshipsBuildsToJSON(value.builds),
        'app': AppClipRelationshipsAppToJSON(value.app),
    };
}

