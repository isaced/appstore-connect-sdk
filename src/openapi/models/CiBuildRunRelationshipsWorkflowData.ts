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
 * @interface CiBuildRunRelationshipsWorkflowData
 */
export interface CiBuildRunRelationshipsWorkflowData {
    /**
     * 
     * @type {string}
     * @memberof CiBuildRunRelationshipsWorkflowData
     */
    type: CiBuildRunRelationshipsWorkflowDataTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof CiBuildRunRelationshipsWorkflowData
     */
    id: string;
}


/**
 * @export
 */
export const CiBuildRunRelationshipsWorkflowDataTypeEnum = {
    CiWorkflows: 'ciWorkflows'
} as const;
export type CiBuildRunRelationshipsWorkflowDataTypeEnum = typeof CiBuildRunRelationshipsWorkflowDataTypeEnum[keyof typeof CiBuildRunRelationshipsWorkflowDataTypeEnum];


/**
 * Check if a given object implements the CiBuildRunRelationshipsWorkflowData interface.
 */
export function instanceOfCiBuildRunRelationshipsWorkflowData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function CiBuildRunRelationshipsWorkflowDataFromJSON(json: any): CiBuildRunRelationshipsWorkflowData {
    return CiBuildRunRelationshipsWorkflowDataFromJSONTyped(json, false);
}

export function CiBuildRunRelationshipsWorkflowDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): CiBuildRunRelationshipsWorkflowData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
    };
}

export function CiBuildRunRelationshipsWorkflowDataToJSON(value?: CiBuildRunRelationshipsWorkflowData | null): any {
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

