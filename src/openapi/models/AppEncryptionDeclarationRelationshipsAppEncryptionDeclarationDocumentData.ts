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
 * @interface AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData
 */
export interface AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData {
    /**
     * 
     * @type {string}
     * @memberof AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData
     */
    type: AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData
     */
    id: string;
}


/**
 * @export
 */
export const AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataTypeEnum = {
    AppEncryptionDeclarationDocuments: 'appEncryptionDeclarationDocuments'
} as const;
export type AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataTypeEnum = typeof AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataTypeEnum[keyof typeof AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataTypeEnum];


/**
 * Check if a given object implements the AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData interface.
 */
export function instanceOfAppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataFromJSON(json: any): AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData {
    return AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataFromJSONTyped(json, false);
}

export function AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
    };
}

export function AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentDataToJSON(value?: AppEncryptionDeclarationRelationshipsAppEncryptionDeclarationDocumentData | null): any {
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

