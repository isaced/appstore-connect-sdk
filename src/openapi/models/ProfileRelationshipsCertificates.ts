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
import type { AlternativeDistributionPackageVersionRelationshipsVariantsLinks } from './AlternativeDistributionPackageVersionRelationshipsVariantsLinks';
import {
    AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON,
    AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSONTyped,
    AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON,
} from './AlternativeDistributionPackageVersionRelationshipsVariantsLinks';
import type { PagingInformation } from './PagingInformation';
import {
    PagingInformationFromJSON,
    PagingInformationFromJSONTyped,
    PagingInformationToJSON,
} from './PagingInformation';
import type { ProfileRelationshipsCertificatesDataInner } from './ProfileRelationshipsCertificatesDataInner';
import {
    ProfileRelationshipsCertificatesDataInnerFromJSON,
    ProfileRelationshipsCertificatesDataInnerFromJSONTyped,
    ProfileRelationshipsCertificatesDataInnerToJSON,
} from './ProfileRelationshipsCertificatesDataInner';

/**
 * 
 * @export
 * @interface ProfileRelationshipsCertificates
 */
export interface ProfileRelationshipsCertificates {
    /**
     * 
     * @type {AlternativeDistributionPackageVersionRelationshipsVariantsLinks}
     * @memberof ProfileRelationshipsCertificates
     */
    links?: AlternativeDistributionPackageVersionRelationshipsVariantsLinks;
    /**
     * 
     * @type {PagingInformation}
     * @memberof ProfileRelationshipsCertificates
     */
    meta?: PagingInformation;
    /**
     * 
     * @type {Array<ProfileRelationshipsCertificatesDataInner>}
     * @memberof ProfileRelationshipsCertificates
     */
    data?: Array<ProfileRelationshipsCertificatesDataInner>;
}

/**
 * Check if a given object implements the ProfileRelationshipsCertificates interface.
 */
export function instanceOfProfileRelationshipsCertificates(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function ProfileRelationshipsCertificatesFromJSON(json: any): ProfileRelationshipsCertificates {
    return ProfileRelationshipsCertificatesFromJSONTyped(json, false);
}

export function ProfileRelationshipsCertificatesFromJSONTyped(json: any, ignoreDiscriminator: boolean): ProfileRelationshipsCertificates {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'links': !exists(json, 'links') ? undefined : AlternativeDistributionPackageVersionRelationshipsVariantsLinksFromJSON(json['links']),
        'meta': !exists(json, 'meta') ? undefined : PagingInformationFromJSON(json['meta']),
        'data': !exists(json, 'data') ? undefined : ((json['data'] as Array<any>).map(ProfileRelationshipsCertificatesDataInnerFromJSON)),
    };
}

export function ProfileRelationshipsCertificatesToJSON(value?: ProfileRelationshipsCertificates | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'links': AlternativeDistributionPackageVersionRelationshipsVariantsLinksToJSON(value.links),
        'meta': PagingInformationToJSON(value.meta),
        'data': value.data === undefined ? undefined : ((value.data as Array<any>).map(ProfileRelationshipsCertificatesDataInnerToJSON)),
    };
}

