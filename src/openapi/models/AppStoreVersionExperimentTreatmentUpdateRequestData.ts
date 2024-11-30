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
import type { AppStoreVersionExperimentTreatmentUpdateRequestDataAttributes } from './AppStoreVersionExperimentTreatmentUpdateRequestDataAttributes';
import {
    AppStoreVersionExperimentTreatmentUpdateRequestDataAttributesFromJSON,
    AppStoreVersionExperimentTreatmentUpdateRequestDataAttributesFromJSONTyped,
    AppStoreVersionExperimentTreatmentUpdateRequestDataAttributesToJSON,
} from './AppStoreVersionExperimentTreatmentUpdateRequestDataAttributes';

/**
 * 
 * @export
 * @interface AppStoreVersionExperimentTreatmentUpdateRequestData
 */
export interface AppStoreVersionExperimentTreatmentUpdateRequestData {
    /**
     * 
     * @type {string}
     * @memberof AppStoreVersionExperimentTreatmentUpdateRequestData
     */
    type: AppStoreVersionExperimentTreatmentUpdateRequestDataTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AppStoreVersionExperimentTreatmentUpdateRequestData
     */
    id: string;
    /**
     * 
     * @type {AppStoreVersionExperimentTreatmentUpdateRequestDataAttributes}
     * @memberof AppStoreVersionExperimentTreatmentUpdateRequestData
     */
    attributes?: AppStoreVersionExperimentTreatmentUpdateRequestDataAttributes;
}


/**
 * @export
 */
export const AppStoreVersionExperimentTreatmentUpdateRequestDataTypeEnum = {
    AppStoreVersionExperimentTreatments: 'appStoreVersionExperimentTreatments'
} as const;
export type AppStoreVersionExperimentTreatmentUpdateRequestDataTypeEnum = typeof AppStoreVersionExperimentTreatmentUpdateRequestDataTypeEnum[keyof typeof AppStoreVersionExperimentTreatmentUpdateRequestDataTypeEnum];


/**
 * Check if a given object implements the AppStoreVersionExperimentTreatmentUpdateRequestData interface.
 */
export function instanceOfAppStoreVersionExperimentTreatmentUpdateRequestData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AppStoreVersionExperimentTreatmentUpdateRequestDataFromJSON(json: any): AppStoreVersionExperimentTreatmentUpdateRequestData {
    return AppStoreVersionExperimentTreatmentUpdateRequestDataFromJSONTyped(json, false);
}

export function AppStoreVersionExperimentTreatmentUpdateRequestDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreVersionExperimentTreatmentUpdateRequestData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : AppStoreVersionExperimentTreatmentUpdateRequestDataAttributesFromJSON(json['attributes']),
    };
}

export function AppStoreVersionExperimentTreatmentUpdateRequestDataToJSON(value?: AppStoreVersionExperimentTreatmentUpdateRequestData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': AppStoreVersionExperimentTreatmentUpdateRequestDataAttributesToJSON(value.attributes),
    };
}

