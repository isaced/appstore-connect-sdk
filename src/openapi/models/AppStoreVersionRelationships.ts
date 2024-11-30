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
import type { AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackage } from './AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackage';
import {
    AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackageFromJSON,
    AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackageFromJSONTyped,
    AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackageToJSON,
} from './AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackage';
import type { AppAvailabilityRelationshipsApp } from './AppAvailabilityRelationshipsApp';
import {
    AppAvailabilityRelationshipsAppFromJSON,
    AppAvailabilityRelationshipsAppFromJSONTyped,
    AppAvailabilityRelationshipsAppToJSON,
} from './AppAvailabilityRelationshipsApp';
import type { AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperience } from './AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperience';
import {
    AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperienceFromJSON,
    AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperienceFromJSONTyped,
    AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperienceToJSON,
} from './AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperience';
import type { AppStoreReviewAttachmentRelationshipsAppStoreReviewDetail } from './AppStoreReviewAttachmentRelationshipsAppStoreReviewDetail';
import {
    AppStoreReviewAttachmentRelationshipsAppStoreReviewDetailFromJSON,
    AppStoreReviewAttachmentRelationshipsAppStoreReviewDetailFromJSONTyped,
    AppStoreReviewAttachmentRelationshipsAppStoreReviewDetailToJSON,
} from './AppStoreReviewAttachmentRelationshipsAppStoreReviewDetail';
import type { AppStoreVersionRelationshipsAgeRatingDeclaration } from './AppStoreVersionRelationshipsAgeRatingDeclaration';
import {
    AppStoreVersionRelationshipsAgeRatingDeclarationFromJSON,
    AppStoreVersionRelationshipsAgeRatingDeclarationFromJSONTyped,
    AppStoreVersionRelationshipsAgeRatingDeclarationToJSON,
} from './AppStoreVersionRelationshipsAgeRatingDeclaration';
import type { AppStoreVersionRelationshipsAppStoreVersionExperiments } from './AppStoreVersionRelationshipsAppStoreVersionExperiments';
import {
    AppStoreVersionRelationshipsAppStoreVersionExperimentsFromJSON,
    AppStoreVersionRelationshipsAppStoreVersionExperimentsFromJSONTyped,
    AppStoreVersionRelationshipsAppStoreVersionExperimentsToJSON,
} from './AppStoreVersionRelationshipsAppStoreVersionExperiments';
import type { AppStoreVersionRelationshipsAppStoreVersionLocalizations } from './AppStoreVersionRelationshipsAppStoreVersionLocalizations';
import {
    AppStoreVersionRelationshipsAppStoreVersionLocalizationsFromJSON,
    AppStoreVersionRelationshipsAppStoreVersionLocalizationsFromJSONTyped,
    AppStoreVersionRelationshipsAppStoreVersionLocalizationsToJSON,
} from './AppStoreVersionRelationshipsAppStoreVersionLocalizations';
import type { AppStoreVersionRelationshipsAppStoreVersionPhasedRelease } from './AppStoreVersionRelationshipsAppStoreVersionPhasedRelease';
import {
    AppStoreVersionRelationshipsAppStoreVersionPhasedReleaseFromJSON,
    AppStoreVersionRelationshipsAppStoreVersionPhasedReleaseFromJSONTyped,
    AppStoreVersionRelationshipsAppStoreVersionPhasedReleaseToJSON,
} from './AppStoreVersionRelationshipsAppStoreVersionPhasedRelease';
import type { AppStoreVersionRelationshipsAppStoreVersionSubmission } from './AppStoreVersionRelationshipsAppStoreVersionSubmission';
import {
    AppStoreVersionRelationshipsAppStoreVersionSubmissionFromJSON,
    AppStoreVersionRelationshipsAppStoreVersionSubmissionFromJSONTyped,
    AppStoreVersionRelationshipsAppStoreVersionSubmissionToJSON,
} from './AppStoreVersionRelationshipsAppStoreVersionSubmission';
import type { AppStoreVersionRelationshipsBuild } from './AppStoreVersionRelationshipsBuild';
import {
    AppStoreVersionRelationshipsBuildFromJSON,
    AppStoreVersionRelationshipsBuildFromJSONTyped,
    AppStoreVersionRelationshipsBuildToJSON,
} from './AppStoreVersionRelationshipsBuild';
import type { AppStoreVersionRelationshipsRoutingAppCoverage } from './AppStoreVersionRelationshipsRoutingAppCoverage';
import {
    AppStoreVersionRelationshipsRoutingAppCoverageFromJSON,
    AppStoreVersionRelationshipsRoutingAppCoverageFromJSONTyped,
    AppStoreVersionRelationshipsRoutingAppCoverageToJSON,
} from './AppStoreVersionRelationshipsRoutingAppCoverage';

/**
 * 
 * @export
 * @interface AppStoreVersionRelationships
 */
export interface AppStoreVersionRelationships {
    /**
     * 
     * @type {AppAvailabilityRelationshipsApp}
     * @memberof AppStoreVersionRelationships
     */
    app?: AppAvailabilityRelationshipsApp;
    /**
     * 
     * @type {AppStoreVersionRelationshipsAgeRatingDeclaration}
     * @memberof AppStoreVersionRelationships
     * @deprecated
     */
    ageRatingDeclaration?: AppStoreVersionRelationshipsAgeRatingDeclaration;
    /**
     * 
     * @type {AppStoreVersionRelationshipsAppStoreVersionLocalizations}
     * @memberof AppStoreVersionRelationships
     */
    appStoreVersionLocalizations?: AppStoreVersionRelationshipsAppStoreVersionLocalizations;
    /**
     * 
     * @type {AppStoreVersionRelationshipsBuild}
     * @memberof AppStoreVersionRelationships
     */
    build?: AppStoreVersionRelationshipsBuild;
    /**
     * 
     * @type {AppStoreVersionRelationshipsAppStoreVersionPhasedRelease}
     * @memberof AppStoreVersionRelationships
     */
    appStoreVersionPhasedRelease?: AppStoreVersionRelationshipsAppStoreVersionPhasedRelease;
    /**
     * 
     * @type {AppStoreVersionRelationshipsRoutingAppCoverage}
     * @memberof AppStoreVersionRelationships
     */
    routingAppCoverage?: AppStoreVersionRelationshipsRoutingAppCoverage;
    /**
     * 
     * @type {AppStoreReviewAttachmentRelationshipsAppStoreReviewDetail}
     * @memberof AppStoreVersionRelationships
     */
    appStoreReviewDetail?: AppStoreReviewAttachmentRelationshipsAppStoreReviewDetail;
    /**
     * 
     * @type {AppStoreVersionRelationshipsAppStoreVersionSubmission}
     * @memberof AppStoreVersionRelationships
     */
    appStoreVersionSubmission?: AppStoreVersionRelationshipsAppStoreVersionSubmission;
    /**
     * 
     * @type {AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperience}
     * @memberof AppStoreVersionRelationships
     */
    appClipDefaultExperience?: AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperience;
    /**
     * 
     * @type {AppStoreVersionRelationshipsAppStoreVersionExperiments}
     * @memberof AppStoreVersionRelationships
     */
    appStoreVersionExperiments?: AppStoreVersionRelationshipsAppStoreVersionExperiments;
    /**
     * 
     * @type {AppStoreVersionRelationshipsAppStoreVersionExperiments}
     * @memberof AppStoreVersionRelationships
     */
    appStoreVersionExperimentsV2?: AppStoreVersionRelationshipsAppStoreVersionExperiments;
    /**
     * 
     * @type {AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackage}
     * @memberof AppStoreVersionRelationships
     */
    alternativeDistributionPackage?: AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackage;
}

/**
 * Check if a given object implements the AppStoreVersionRelationships interface.
 */
export function instanceOfAppStoreVersionRelationships(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppStoreVersionRelationshipsFromJSON(json: any): AppStoreVersionRelationships {
    return AppStoreVersionRelationshipsFromJSONTyped(json, false);
}

export function AppStoreVersionRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppStoreVersionRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'app': !exists(json, 'app') ? undefined : AppAvailabilityRelationshipsAppFromJSON(json['app']),
        'ageRatingDeclaration': !exists(json, 'ageRatingDeclaration') ? undefined : AppStoreVersionRelationshipsAgeRatingDeclarationFromJSON(json['ageRatingDeclaration']),
        'appStoreVersionLocalizations': !exists(json, 'appStoreVersionLocalizations') ? undefined : AppStoreVersionRelationshipsAppStoreVersionLocalizationsFromJSON(json['appStoreVersionLocalizations']),
        'build': !exists(json, 'build') ? undefined : AppStoreVersionRelationshipsBuildFromJSON(json['build']),
        'appStoreVersionPhasedRelease': !exists(json, 'appStoreVersionPhasedRelease') ? undefined : AppStoreVersionRelationshipsAppStoreVersionPhasedReleaseFromJSON(json['appStoreVersionPhasedRelease']),
        'routingAppCoverage': !exists(json, 'routingAppCoverage') ? undefined : AppStoreVersionRelationshipsRoutingAppCoverageFromJSON(json['routingAppCoverage']),
        'appStoreReviewDetail': !exists(json, 'appStoreReviewDetail') ? undefined : AppStoreReviewAttachmentRelationshipsAppStoreReviewDetailFromJSON(json['appStoreReviewDetail']),
        'appStoreVersionSubmission': !exists(json, 'appStoreVersionSubmission') ? undefined : AppStoreVersionRelationshipsAppStoreVersionSubmissionFromJSON(json['appStoreVersionSubmission']),
        'appClipDefaultExperience': !exists(json, 'appClipDefaultExperience') ? undefined : AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperienceFromJSON(json['appClipDefaultExperience']),
        'appStoreVersionExperiments': !exists(json, 'appStoreVersionExperiments') ? undefined : AppStoreVersionRelationshipsAppStoreVersionExperimentsFromJSON(json['appStoreVersionExperiments']),
        'appStoreVersionExperimentsV2': !exists(json, 'appStoreVersionExperimentsV2') ? undefined : AppStoreVersionRelationshipsAppStoreVersionExperimentsFromJSON(json['appStoreVersionExperimentsV2']),
        'alternativeDistributionPackage': !exists(json, 'alternativeDistributionPackage') ? undefined : AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackageFromJSON(json['alternativeDistributionPackage']),
    };
}

export function AppStoreVersionRelationshipsToJSON(value?: AppStoreVersionRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'app': AppAvailabilityRelationshipsAppToJSON(value.app),
        'ageRatingDeclaration': AppStoreVersionRelationshipsAgeRatingDeclarationToJSON(value.ageRatingDeclaration),
        'appStoreVersionLocalizations': AppStoreVersionRelationshipsAppStoreVersionLocalizationsToJSON(value.appStoreVersionLocalizations),
        'build': AppStoreVersionRelationshipsBuildToJSON(value.build),
        'appStoreVersionPhasedRelease': AppStoreVersionRelationshipsAppStoreVersionPhasedReleaseToJSON(value.appStoreVersionPhasedRelease),
        'routingAppCoverage': AppStoreVersionRelationshipsRoutingAppCoverageToJSON(value.routingAppCoverage),
        'appStoreReviewDetail': AppStoreReviewAttachmentRelationshipsAppStoreReviewDetailToJSON(value.appStoreReviewDetail),
        'appStoreVersionSubmission': AppStoreVersionRelationshipsAppStoreVersionSubmissionToJSON(value.appStoreVersionSubmission),
        'appClipDefaultExperience': AppClipAppStoreReviewDetailRelationshipsAppClipDefaultExperienceToJSON(value.appClipDefaultExperience),
        'appStoreVersionExperiments': AppStoreVersionRelationshipsAppStoreVersionExperimentsToJSON(value.appStoreVersionExperiments),
        'appStoreVersionExperimentsV2': AppStoreVersionRelationshipsAppStoreVersionExperimentsToJSON(value.appStoreVersionExperimentsV2),
        'alternativeDistributionPackage': AlternativeDistributionPackageVersionRelationshipsAlternativeDistributionPackageToJSON(value.alternativeDistributionPackage),
    };
}

