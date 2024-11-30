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
import type { AppEncryptionDeclarationDocumentAttributes } from './AppEncryptionDeclarationDocumentAttributes';
import {
    AppEncryptionDeclarationDocumentAttributesFromJSON,
    AppEncryptionDeclarationDocumentAttributesFromJSONTyped,
    AppEncryptionDeclarationDocumentAttributesToJSON,
} from './AppEncryptionDeclarationDocumentAttributes';
import type { ResourceLinks } from './ResourceLinks';
import {
    ResourceLinksFromJSON,
    ResourceLinksFromJSONTyped,
    ResourceLinksToJSON,
} from './ResourceLinks';

/**
 * 
 * @export
 * @interface AppEncryptionDeclarationDocument
 */
export interface AppEncryptionDeclarationDocument {
    /**
     * 
     * @type {string}
     * @memberof AppEncryptionDeclarationDocument
     */
    type: AppEncryptionDeclarationDocumentTypeEnum;
    /**
     * 
     * @type {string}
     * @memberof AppEncryptionDeclarationDocument
     */
    id: string;
    /**
     * 
     * @type {AppEncryptionDeclarationDocumentAttributes}
     * @memberof AppEncryptionDeclarationDocument
     */
    attributes?: AppEncryptionDeclarationDocumentAttributes;
    /**
     * 
     * @type {ResourceLinks}
     * @memberof AppEncryptionDeclarationDocument
     */
    links?: ResourceLinks;
}


/**
 * @export
 */
export const AppEncryptionDeclarationDocumentTypeEnum = {
    AppEncryptionDeclarationDocuments: 'appEncryptionDeclarationDocuments'
} as const;
export type AppEncryptionDeclarationDocumentTypeEnum = typeof AppEncryptionDeclarationDocumentTypeEnum[keyof typeof AppEncryptionDeclarationDocumentTypeEnum];


/**
 * Check if a given object implements the AppEncryptionDeclarationDocument interface.
 */
export function instanceOfAppEncryptionDeclarationDocument(value: object): boolean {
    let isInstance = true;
    isInstance = isInstance && "type" in value;
    isInstance = isInstance && "id" in value;

    return isInstance;
}

export function AppEncryptionDeclarationDocumentFromJSON(json: any): AppEncryptionDeclarationDocument {
    return AppEncryptionDeclarationDocumentFromJSONTyped(json, false);
}

export function AppEncryptionDeclarationDocumentFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppEncryptionDeclarationDocument {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'type': json['type'],
        'id': json['id'],
        'attributes': !exists(json, 'attributes') ? undefined : AppEncryptionDeclarationDocumentAttributesFromJSON(json['attributes']),
        'links': !exists(json, 'links') ? undefined : ResourceLinksFromJSON(json['links']),
    };
}

export function AppEncryptionDeclarationDocumentToJSON(value?: AppEncryptionDeclarationDocument | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'type': value.type,
        'id': value.id,
        'attributes': AppEncryptionDeclarationDocumentAttributesToJSON(value.attributes),
        'links': ResourceLinksToJSON(value.links),
    };
}

