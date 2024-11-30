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
import type { AppClipAdvancedExperienceRelationshipsLocalizationsDataInner } from './AppClipAdvancedExperienceRelationshipsLocalizationsDataInner';
import {
    AppClipAdvancedExperienceRelationshipsLocalizationsDataInnerFromJSON,
    AppClipAdvancedExperienceRelationshipsLocalizationsDataInnerFromJSONTyped,
    AppClipAdvancedExperienceRelationshipsLocalizationsDataInnerToJSON,
} from './AppClipAdvancedExperienceRelationshipsLocalizationsDataInner';

/**
 * 
 * @export
 * @interface AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations
 */
export interface AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations {
    /**
     * 
     * @type {Array<AppClipAdvancedExperienceRelationshipsLocalizationsDataInner>}
     * @memberof AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations
     */
    data: Array<AppClipAdvancedExperienceRelationshipsLocalizationsDataInner>;
}

/**
 * Check if a given object implements the AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations interface.
 */
export function instanceOfAppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "data" in value;

    return isInstance;
}

export function AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizationsFromJSON(json: any): AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations {
    return AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizationsFromJSONTyped(json, false);
}

export function AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizationsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'data': ((json['data'] as Array<any>).map(AppClipAdvancedExperienceRelationshipsLocalizationsDataInnerFromJSON)),
    };
}

export function AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizationsToJSON(value?: AppClipAdvancedExperienceCreateRequestDataRelationshipsLocalizations | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'data': ((value.data as Array<any>).map(AppClipAdvancedExperienceRelationshipsLocalizationsDataInnerToJSON)),
    };
}

