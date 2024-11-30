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
import type { AppRelationshipsAppClips } from './AppRelationshipsAppClips';
import {
    AppRelationshipsAppClipsFromJSON,
    AppRelationshipsAppClipsFromJSONTyped,
    AppRelationshipsAppClipsToJSON,
} from './AppRelationshipsAppClips';
import type { AppRelationshipsAppCustomProductPages } from './AppRelationshipsAppCustomProductPages';
import {
    AppRelationshipsAppCustomProductPagesFromJSON,
    AppRelationshipsAppCustomProductPagesFromJSONTyped,
    AppRelationshipsAppCustomProductPagesToJSON,
} from './AppRelationshipsAppCustomProductPages';
import type { AppRelationshipsAppEncryptionDeclarations } from './AppRelationshipsAppEncryptionDeclarations';
import {
    AppRelationshipsAppEncryptionDeclarationsFromJSON,
    AppRelationshipsAppEncryptionDeclarationsFromJSONTyped,
    AppRelationshipsAppEncryptionDeclarationsToJSON,
} from './AppRelationshipsAppEncryptionDeclarations';
import type { AppRelationshipsAppEvents } from './AppRelationshipsAppEvents';
import {
    AppRelationshipsAppEventsFromJSON,
    AppRelationshipsAppEventsFromJSONTyped,
    AppRelationshipsAppEventsToJSON,
} from './AppRelationshipsAppEvents';
import type { AppRelationshipsAppInfos } from './AppRelationshipsAppInfos';
import {
    AppRelationshipsAppInfosFromJSON,
    AppRelationshipsAppInfosFromJSONTyped,
    AppRelationshipsAppInfosToJSON,
} from './AppRelationshipsAppInfos';
import type { AppRelationshipsBetaAppLocalizations } from './AppRelationshipsBetaAppLocalizations';
import {
    AppRelationshipsBetaAppLocalizationsFromJSON,
    AppRelationshipsBetaAppLocalizationsFromJSONTyped,
    AppRelationshipsBetaAppLocalizationsToJSON,
} from './AppRelationshipsBetaAppLocalizations';
import type { AppRelationshipsBetaAppReviewDetail } from './AppRelationshipsBetaAppReviewDetail';
import {
    AppRelationshipsBetaAppReviewDetailFromJSON,
    AppRelationshipsBetaAppReviewDetailFromJSONTyped,
    AppRelationshipsBetaAppReviewDetailToJSON,
} from './AppRelationshipsBetaAppReviewDetail';
import type { AppRelationshipsBetaGroups } from './AppRelationshipsBetaGroups';
import {
    AppRelationshipsBetaGroupsFromJSON,
    AppRelationshipsBetaGroupsFromJSONTyped,
    AppRelationshipsBetaGroupsToJSON,
} from './AppRelationshipsBetaGroups';
import type { AppRelationshipsBetaLicenseAgreement } from './AppRelationshipsBetaLicenseAgreement';
import {
    AppRelationshipsBetaLicenseAgreementFromJSON,
    AppRelationshipsBetaLicenseAgreementFromJSONTyped,
    AppRelationshipsBetaLicenseAgreementToJSON,
} from './AppRelationshipsBetaLicenseAgreement';
import type { AppRelationshipsBuilds } from './AppRelationshipsBuilds';
import {
    AppRelationshipsBuildsFromJSON,
    AppRelationshipsBuildsFromJSONTyped,
    AppRelationshipsBuildsToJSON,
} from './AppRelationshipsBuilds';
import type { AppRelationshipsCiProduct } from './AppRelationshipsCiProduct';
import {
    AppRelationshipsCiProductFromJSON,
    AppRelationshipsCiProductFromJSONTyped,
    AppRelationshipsCiProductToJSON,
} from './AppRelationshipsCiProduct';
import type { AppRelationshipsEndUserLicenseAgreement } from './AppRelationshipsEndUserLicenseAgreement';
import {
    AppRelationshipsEndUserLicenseAgreementFromJSON,
    AppRelationshipsEndUserLicenseAgreementFromJSONTyped,
    AppRelationshipsEndUserLicenseAgreementToJSON,
} from './AppRelationshipsEndUserLicenseAgreement';
import type { AppRelationshipsGameCenterDetail } from './AppRelationshipsGameCenterDetail';
import {
    AppRelationshipsGameCenterDetailFromJSON,
    AppRelationshipsGameCenterDetailFromJSONTyped,
    AppRelationshipsGameCenterDetailToJSON,
} from './AppRelationshipsGameCenterDetail';
import type { AppRelationshipsGameCenterEnabledVersions } from './AppRelationshipsGameCenterEnabledVersions';
import {
    AppRelationshipsGameCenterEnabledVersionsFromJSON,
    AppRelationshipsGameCenterEnabledVersionsFromJSONTyped,
    AppRelationshipsGameCenterEnabledVersionsToJSON,
} from './AppRelationshipsGameCenterEnabledVersions';
import type { AppRelationshipsInAppPurchases } from './AppRelationshipsInAppPurchases';
import {
    AppRelationshipsInAppPurchasesFromJSON,
    AppRelationshipsInAppPurchasesFromJSONTyped,
    AppRelationshipsInAppPurchasesToJSON,
} from './AppRelationshipsInAppPurchases';
import type { AppRelationshipsInAppPurchasesV2 } from './AppRelationshipsInAppPurchasesV2';
import {
    AppRelationshipsInAppPurchasesV2FromJSON,
    AppRelationshipsInAppPurchasesV2FromJSONTyped,
    AppRelationshipsInAppPurchasesV2ToJSON,
} from './AppRelationshipsInAppPurchasesV2';
import type { AppRelationshipsPreOrder } from './AppRelationshipsPreOrder';
import {
    AppRelationshipsPreOrderFromJSON,
    AppRelationshipsPreOrderFromJSONTyped,
    AppRelationshipsPreOrderToJSON,
} from './AppRelationshipsPreOrder';
import type { AppRelationshipsPreReleaseVersions } from './AppRelationshipsPreReleaseVersions';
import {
    AppRelationshipsPreReleaseVersionsFromJSON,
    AppRelationshipsPreReleaseVersionsFromJSONTyped,
    AppRelationshipsPreReleaseVersionsToJSON,
} from './AppRelationshipsPreReleaseVersions';
import type { AppRelationshipsPromotedPurchases } from './AppRelationshipsPromotedPurchases';
import {
    AppRelationshipsPromotedPurchasesFromJSON,
    AppRelationshipsPromotedPurchasesFromJSONTyped,
    AppRelationshipsPromotedPurchasesToJSON,
} from './AppRelationshipsPromotedPurchases';
import type { AppRelationshipsReviewSubmissions } from './AppRelationshipsReviewSubmissions';
import {
    AppRelationshipsReviewSubmissionsFromJSON,
    AppRelationshipsReviewSubmissionsFromJSONTyped,
    AppRelationshipsReviewSubmissionsToJSON,
} from './AppRelationshipsReviewSubmissions';
import type { AppRelationshipsSubscriptionGracePeriod } from './AppRelationshipsSubscriptionGracePeriod';
import {
    AppRelationshipsSubscriptionGracePeriodFromJSON,
    AppRelationshipsSubscriptionGracePeriodFromJSONTyped,
    AppRelationshipsSubscriptionGracePeriodToJSON,
} from './AppRelationshipsSubscriptionGracePeriod';
import type { AppRelationshipsSubscriptionGroups } from './AppRelationshipsSubscriptionGroups';
import {
    AppRelationshipsSubscriptionGroupsFromJSON,
    AppRelationshipsSubscriptionGroupsFromJSONTyped,
    AppRelationshipsSubscriptionGroupsToJSON,
} from './AppRelationshipsSubscriptionGroups';
import type { AppStoreVersionExperimentV2RelationshipsControlVersions } from './AppStoreVersionExperimentV2RelationshipsControlVersions';
import {
    AppStoreVersionExperimentV2RelationshipsControlVersionsFromJSON,
    AppStoreVersionExperimentV2RelationshipsControlVersionsFromJSONTyped,
    AppStoreVersionExperimentV2RelationshipsControlVersionsToJSON,
} from './AppStoreVersionExperimentV2RelationshipsControlVersions';
import type { AppStoreVersionRelationshipsAppStoreVersionExperiments } from './AppStoreVersionRelationshipsAppStoreVersionExperiments';
import {
    AppStoreVersionRelationshipsAppStoreVersionExperimentsFromJSON,
    AppStoreVersionRelationshipsAppStoreVersionExperimentsFromJSONTyped,
    AppStoreVersionRelationshipsAppStoreVersionExperimentsToJSON,
} from './AppStoreVersionRelationshipsAppStoreVersionExperiments';

/**
 * 
 * @export
 * @interface AppRelationships
 */
export interface AppRelationships {
    /**
     * 
     * @type {AppRelationshipsAppEncryptionDeclarations}
     * @memberof AppRelationships
     */
    appEncryptionDeclarations?: AppRelationshipsAppEncryptionDeclarations;
    /**
     * 
     * @type {AppRelationshipsCiProduct}
     * @memberof AppRelationships
     */
    ciProduct?: AppRelationshipsCiProduct;
    /**
     * 
     * @type {AppRelationshipsBetaGroups}
     * @memberof AppRelationships
     */
    betaGroups?: AppRelationshipsBetaGroups;
    /**
     * 
     * @type {AppStoreVersionExperimentV2RelationshipsControlVersions}
     * @memberof AppRelationships
     */
    appStoreVersions?: AppStoreVersionExperimentV2RelationshipsControlVersions;
    /**
     * 
     * @type {AppRelationshipsPreReleaseVersions}
     * @memberof AppRelationships
     */
    preReleaseVersions?: AppRelationshipsPreReleaseVersions;
    /**
     * 
     * @type {AppRelationshipsBetaAppLocalizations}
     * @memberof AppRelationships
     */
    betaAppLocalizations?: AppRelationshipsBetaAppLocalizations;
    /**
     * 
     * @type {AppRelationshipsBuilds}
     * @memberof AppRelationships
     */
    builds?: AppRelationshipsBuilds;
    /**
     * 
     * @type {AppRelationshipsBetaLicenseAgreement}
     * @memberof AppRelationships
     */
    betaLicenseAgreement?: AppRelationshipsBetaLicenseAgreement;
    /**
     * 
     * @type {AppRelationshipsBetaAppReviewDetail}
     * @memberof AppRelationships
     */
    betaAppReviewDetail?: AppRelationshipsBetaAppReviewDetail;
    /**
     * 
     * @type {AppRelationshipsAppInfos}
     * @memberof AppRelationships
     */
    appInfos?: AppRelationshipsAppInfos;
    /**
     * 
     * @type {AppRelationshipsAppClips}
     * @memberof AppRelationships
     */
    appClips?: AppRelationshipsAppClips;
    /**
     * 
     * @type {AppRelationshipsEndUserLicenseAgreement}
     * @memberof AppRelationships
     */
    endUserLicenseAgreement?: AppRelationshipsEndUserLicenseAgreement;
    /**
     * 
     * @type {AppRelationshipsPreOrder}
     * @memberof AppRelationships
     */
    preOrder?: AppRelationshipsPreOrder;
    /**
     * 
     * @type {AppRelationshipsInAppPurchases}
     * @memberof AppRelationships
     * @deprecated
     */
    inAppPurchases?: AppRelationshipsInAppPurchases;
    /**
     * 
     * @type {AppRelationshipsSubscriptionGroups}
     * @memberof AppRelationships
     */
    subscriptionGroups?: AppRelationshipsSubscriptionGroups;
    /**
     * 
     * @type {AppRelationshipsGameCenterEnabledVersions}
     * @memberof AppRelationships
     */
    gameCenterEnabledVersions?: AppRelationshipsGameCenterEnabledVersions;
    /**
     * 
     * @type {AppRelationshipsAppCustomProductPages}
     * @memberof AppRelationships
     */
    appCustomProductPages?: AppRelationshipsAppCustomProductPages;
    /**
     * 
     * @type {AppRelationshipsInAppPurchasesV2}
     * @memberof AppRelationships
     */
    inAppPurchasesV2?: AppRelationshipsInAppPurchasesV2;
    /**
     * 
     * @type {AppRelationshipsPromotedPurchases}
     * @memberof AppRelationships
     */
    promotedPurchases?: AppRelationshipsPromotedPurchases;
    /**
     * 
     * @type {AppRelationshipsAppEvents}
     * @memberof AppRelationships
     */
    appEvents?: AppRelationshipsAppEvents;
    /**
     * 
     * @type {AppRelationshipsReviewSubmissions}
     * @memberof AppRelationships
     */
    reviewSubmissions?: AppRelationshipsReviewSubmissions;
    /**
     * 
     * @type {AppRelationshipsSubscriptionGracePeriod}
     * @memberof AppRelationships
     */
    subscriptionGracePeriod?: AppRelationshipsSubscriptionGracePeriod;
    /**
     * 
     * @type {AppRelationshipsGameCenterDetail}
     * @memberof AppRelationships
     */
    gameCenterDetail?: AppRelationshipsGameCenterDetail;
    /**
     * 
     * @type {AppStoreVersionRelationshipsAppStoreVersionExperiments}
     * @memberof AppRelationships
     */
    appStoreVersionExperimentsV2?: AppStoreVersionRelationshipsAppStoreVersionExperiments;
}

/**
 * Check if a given object implements the AppRelationships interface.
 */
export function instanceOfAppRelationships(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function AppRelationshipsFromJSON(json: any): AppRelationships {
    return AppRelationshipsFromJSONTyped(json, false);
}

export function AppRelationshipsFromJSONTyped(json: any, ignoreDiscriminator: boolean): AppRelationships {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'appEncryptionDeclarations': !exists(json, 'appEncryptionDeclarations') ? undefined : AppRelationshipsAppEncryptionDeclarationsFromJSON(json['appEncryptionDeclarations']),
        'ciProduct': !exists(json, 'ciProduct') ? undefined : AppRelationshipsCiProductFromJSON(json['ciProduct']),
        'betaGroups': !exists(json, 'betaGroups') ? undefined : AppRelationshipsBetaGroupsFromJSON(json['betaGroups']),
        'appStoreVersions': !exists(json, 'appStoreVersions') ? undefined : AppStoreVersionExperimentV2RelationshipsControlVersionsFromJSON(json['appStoreVersions']),
        'preReleaseVersions': !exists(json, 'preReleaseVersions') ? undefined : AppRelationshipsPreReleaseVersionsFromJSON(json['preReleaseVersions']),
        'betaAppLocalizations': !exists(json, 'betaAppLocalizations') ? undefined : AppRelationshipsBetaAppLocalizationsFromJSON(json['betaAppLocalizations']),
        'builds': !exists(json, 'builds') ? undefined : AppRelationshipsBuildsFromJSON(json['builds']),
        'betaLicenseAgreement': !exists(json, 'betaLicenseAgreement') ? undefined : AppRelationshipsBetaLicenseAgreementFromJSON(json['betaLicenseAgreement']),
        'betaAppReviewDetail': !exists(json, 'betaAppReviewDetail') ? undefined : AppRelationshipsBetaAppReviewDetailFromJSON(json['betaAppReviewDetail']),
        'appInfos': !exists(json, 'appInfos') ? undefined : AppRelationshipsAppInfosFromJSON(json['appInfos']),
        'appClips': !exists(json, 'appClips') ? undefined : AppRelationshipsAppClipsFromJSON(json['appClips']),
        'endUserLicenseAgreement': !exists(json, 'endUserLicenseAgreement') ? undefined : AppRelationshipsEndUserLicenseAgreementFromJSON(json['endUserLicenseAgreement']),
        'preOrder': !exists(json, 'preOrder') ? undefined : AppRelationshipsPreOrderFromJSON(json['preOrder']),
        'inAppPurchases': !exists(json, 'inAppPurchases') ? undefined : AppRelationshipsInAppPurchasesFromJSON(json['inAppPurchases']),
        'subscriptionGroups': !exists(json, 'subscriptionGroups') ? undefined : AppRelationshipsSubscriptionGroupsFromJSON(json['subscriptionGroups']),
        'gameCenterEnabledVersions': !exists(json, 'gameCenterEnabledVersions') ? undefined : AppRelationshipsGameCenterEnabledVersionsFromJSON(json['gameCenterEnabledVersions']),
        'appCustomProductPages': !exists(json, 'appCustomProductPages') ? undefined : AppRelationshipsAppCustomProductPagesFromJSON(json['appCustomProductPages']),
        'inAppPurchasesV2': !exists(json, 'inAppPurchasesV2') ? undefined : AppRelationshipsInAppPurchasesV2FromJSON(json['inAppPurchasesV2']),
        'promotedPurchases': !exists(json, 'promotedPurchases') ? undefined : AppRelationshipsPromotedPurchasesFromJSON(json['promotedPurchases']),
        'appEvents': !exists(json, 'appEvents') ? undefined : AppRelationshipsAppEventsFromJSON(json['appEvents']),
        'reviewSubmissions': !exists(json, 'reviewSubmissions') ? undefined : AppRelationshipsReviewSubmissionsFromJSON(json['reviewSubmissions']),
        'subscriptionGracePeriod': !exists(json, 'subscriptionGracePeriod') ? undefined : AppRelationshipsSubscriptionGracePeriodFromJSON(json['subscriptionGracePeriod']),
        'gameCenterDetail': !exists(json, 'gameCenterDetail') ? undefined : AppRelationshipsGameCenterDetailFromJSON(json['gameCenterDetail']),
        'appStoreVersionExperimentsV2': !exists(json, 'appStoreVersionExperimentsV2') ? undefined : AppStoreVersionRelationshipsAppStoreVersionExperimentsFromJSON(json['appStoreVersionExperimentsV2']),
    };
}

export function AppRelationshipsToJSON(value?: AppRelationships | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'appEncryptionDeclarations': AppRelationshipsAppEncryptionDeclarationsToJSON(value.appEncryptionDeclarations),
        'ciProduct': AppRelationshipsCiProductToJSON(value.ciProduct),
        'betaGroups': AppRelationshipsBetaGroupsToJSON(value.betaGroups),
        'appStoreVersions': AppStoreVersionExperimentV2RelationshipsControlVersionsToJSON(value.appStoreVersions),
        'preReleaseVersions': AppRelationshipsPreReleaseVersionsToJSON(value.preReleaseVersions),
        'betaAppLocalizations': AppRelationshipsBetaAppLocalizationsToJSON(value.betaAppLocalizations),
        'builds': AppRelationshipsBuildsToJSON(value.builds),
        'betaLicenseAgreement': AppRelationshipsBetaLicenseAgreementToJSON(value.betaLicenseAgreement),
        'betaAppReviewDetail': AppRelationshipsBetaAppReviewDetailToJSON(value.betaAppReviewDetail),
        'appInfos': AppRelationshipsAppInfosToJSON(value.appInfos),
        'appClips': AppRelationshipsAppClipsToJSON(value.appClips),
        'endUserLicenseAgreement': AppRelationshipsEndUserLicenseAgreementToJSON(value.endUserLicenseAgreement),
        'preOrder': AppRelationshipsPreOrderToJSON(value.preOrder),
        'inAppPurchases': AppRelationshipsInAppPurchasesToJSON(value.inAppPurchases),
        'subscriptionGroups': AppRelationshipsSubscriptionGroupsToJSON(value.subscriptionGroups),
        'gameCenterEnabledVersions': AppRelationshipsGameCenterEnabledVersionsToJSON(value.gameCenterEnabledVersions),
        'appCustomProductPages': AppRelationshipsAppCustomProductPagesToJSON(value.appCustomProductPages),
        'inAppPurchasesV2': AppRelationshipsInAppPurchasesV2ToJSON(value.inAppPurchasesV2),
        'promotedPurchases': AppRelationshipsPromotedPurchasesToJSON(value.promotedPurchases),
        'appEvents': AppRelationshipsAppEventsToJSON(value.appEvents),
        'reviewSubmissions': AppRelationshipsReviewSubmissionsToJSON(value.reviewSubmissions),
        'subscriptionGracePeriod': AppRelationshipsSubscriptionGracePeriodToJSON(value.subscriptionGracePeriod),
        'gameCenterDetail': AppRelationshipsGameCenterDetailToJSON(value.gameCenterDetail),
        'appStoreVersionExperimentsV2': AppStoreVersionRelationshipsAppStoreVersionExperimentsToJSON(value.appStoreVersionExperimentsV2),
    };
}

