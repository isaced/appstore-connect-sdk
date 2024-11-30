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
import type { AppAvailabilityRelationshipsApp } from './AppAvailabilityRelationshipsApp';
import {
    AppAvailabilityRelationshipsAppFromJSON,
    AppAvailabilityRelationshipsAppFromJSONTyped,
    AppAvailabilityRelationshipsAppToJSON,
} from './AppAvailabilityRelationshipsApp';
import type { AppClipRelationshipsAppClipDefaultExperiences } from './AppClipRelationshipsAppClipDefaultExperiences';
import {
    AppClipRelationshipsAppClipDefaultExperiencesFromJSON,
    AppClipRelationshipsAppClipDefaultExperiencesFromJSONTyped,
    AppClipRelationshipsAppClipDefaultExperiencesToJSON,
} from './AppClipRelationshipsAppClipDefaultExperiences';

/**
 * 
 * @export
 * @interface AppClipRelationships
 */
export interface AppClipRelationships {
    /**
     * 
     * @type {AppAvailabilityRelationshipsApp}
     * @memberof AppClipRelationships
     */
    app?: AppAvailabilityRelationshipsApp;
    /**
     * 
     * @type {AppClipRelationshipsAppClipDefaultExperiences}
     * @memberof AppClipRelationships
     */
    appClipDefaultExperiences?: AppClipRelationshipsAppClipDefaultExperiences;
}

/**
 * Check if a given object implements the AppClipRelationships interface.
 */
export function instanceOfAppClipRelationships(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppClipRelationshipsFromJSON(json: any): AppClipRelationships {
    return AppClipRelationshipsFromJSONTyped(json, false);
}

export function AppClipRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppClipRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'app': !exists(json, 'app') ? undefined : AppAvailabilityRelationshipsAppFromJSON(json['app']),
        'appClipDefaultExperiences': !exists(json, 'appClipDefaultExperiences') ? undefined : AppClipRelationshipsAppClipDefaultExperiencesFromJSON(json['appClipDefaultExperiences']),
    };
}

export function AppClipRelationshipsToJSON(value?: AppClipRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'app': AppAvailabilityRelationshipsAppToJSON(value.app),
        'appClipDefaultExperiences': AppClipRelationshipsAppClipDefaultExperiencesToJSON(value.appClipDefaultExperiences),
    };
}

