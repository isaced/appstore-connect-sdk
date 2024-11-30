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
 * @interface AlternativeDistributionKeyCreateRequestDataRelationshipsAppData
 */
export interface AlternativeDistributionKeyCreateRequestDataRelationshipsAppData {
    /**
     * 
     * @type {string}
     * @memberof AlternativeDistributionKeyCreateRequestDataRelationshipsAppData
     */
    type: AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AlternativeDistributionKeyCreateRequestDataRelationshipsAppData
     */
    id: string;
}


/**
 * @export
 */
export const AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataTypeEnum = {
    Apps: 'apps'
} as const;
export type AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataTypeEnum = typeof AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataTypeEnum[keyof typeof AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataTypeEnum];


/**
 * Check if a given object implements the AlternativeDistributionKeyCreateRequestDataRelationshipsAppData interface.
 */
export function instanceOfAlternativeDistributionKeyCreateRequestDataRelationshipsAppData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataFromJSON(json: any): AlternativeDistributionKeyCreateRequestDataRelationshipsAppData {
    return AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataFromJSONTyped(json, false);
}

export function AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AlternativeDistributionKeyCreateRequestDataRelationshipsAppData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
    };
}

export function AlternativeDistributionKeyCreateRequestDataRelationshipsAppDataToJSON(value?: AlternativeDistributionKeyCreateRequestDataRelationshipsAppData | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
    };
}

