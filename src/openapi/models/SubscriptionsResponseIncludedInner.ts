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

import {
    PromotedPurchase,
    instanceOfPromotedPurchase,
    PromotedPurchaseFromJSON,
    PromotedPurchaseFromJSONTyped,
    PromotedPurchaseToJSON,
} from './PromotedPurchase';
import {
    SubscriptionAppStoreReviewScreenshot,
    instanceOfSubscriptionAppStoreReviewScreenshot,
    SubscriptionAppStoreReviewScreenshotFromJSON,
    SubscriptionAppStoreReviewScreenshotFromJSONTyped,
    SubscriptionAppStoreReviewScreenshotToJSON,
} from './SubscriptionAppStoreReviewScreenshot';
import {
    SubscriptionAvailability,
    instanceOfSubscriptionAvailability,
    SubscriptionAvailabilityFromJSON,
    SubscriptionAvailabilityFromJSONTyped,
    SubscriptionAvailabilityToJSON,
} from './SubscriptionAvailability';
import {
    SubscriptionGroup,
    instanceOfSubscriptionGroup,
    SubscriptionGroupFromJSON,
    SubscriptionGroupFromJSONTyped,
    SubscriptionGroupToJSON,
} from './SubscriptionGroup';
import {
    SubscriptionIntroductoryOffer,
    instanceOfSubscriptionIntroductoryOffer,
    SubscriptionIntroductoryOfferFromJSON,
    SubscriptionIntroductoryOfferFromJSONTyped,
    SubscriptionIntroductoryOfferToJSON,
} from './SubscriptionIntroductoryOffer';
import {
    SubscriptionLocalization,
    instanceOfSubscriptionLocalization,
    SubscriptionLocalizationFromJSON,
    SubscriptionLocalizationFromJSONTyped,
    SubscriptionLocalizationToJSON,
} from './SubscriptionLocalization';
import {
    SubscriptionOfferCode,
    instanceOfSubscriptionOfferCode,
    SubscriptionOfferCodeFromJSON,
    SubscriptionOfferCodeFromJSONTyped,
    SubscriptionOfferCodeToJSON,
} from './SubscriptionOfferCode';
import {
    SubscriptionPrice,
    instanceOfSubscriptionPrice,
    SubscriptionPriceFromJSON,
    SubscriptionPriceFromJSONTyped,
    SubscriptionPriceToJSON,
} from './SubscriptionPrice';
import {
    SubscriptionPromotionalOffer,
    instanceOfSubscriptionPromotionalOffer,
    SubscriptionPromotionalOfferFromJSON,
    SubscriptionPromotionalOfferFromJSONTyped,
    SubscriptionPromotionalOfferToJSON,
} from './SubscriptionPromotionalOffer';

/**
 * @type SubscriptionsResponseIncludedInner
 * 
 * @export
 */
export type SubscriptionsResponseIncludedInner = PromotedPurchase | SubscriptionAppStoreReviewScreenshot | SubscriptionAvailability | SubscriptionGroup | SubscriptionIntroductoryOffer | SubscriptionLocalization | SubscriptionOfferCode | SubscriptionPrice | SubscriptionPromotionalOffer;

export function SubscriptionsResponseIncludedInnerFromJSON(json: any): SubscriptionsResponseIncludedInner {
    return SubscriptionsResponseIncludedInnerFromJSONTyped(json, false);
}

export function SubscriptionsResponseIncludedInnerFromJSONTyped(json: any, ignoreDiscriminator: boolean): SubscriptionsResponseIncludedInner {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return { ...PromotedPurchaseFromJSONTyped(json, true), ...SubscriptionAppStoreReviewScreenshotFromJSONTyped(json, true), ...SubscriptionAvailabilityFromJSONTyped(json, true), ...SubscriptionGroupFromJSONTyped(json, true), ...SubscriptionIntroductoryOfferFromJSONTyped(json, true), ...SubscriptionLocalizationFromJSONTyped(json, true), ...SubscriptionOfferCodeFromJSONTyped(json, true), ...SubscriptionPriceFromJSONTyped(json, true), ...SubscriptionPromotionalOfferFromJSONTyped(json, true) };
}

export function SubscriptionsResponseIncludedInnerToJSON(value?: SubscriptionsResponseIncludedInner | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }

    if (instanceOfPromotedPurchase(value)) {
        return PromotedPurchaseToJSON(value as PromotedPurchase);
    }
    if (instanceOfSubscriptionAppStoreReviewScreenshot(value)) {
        return SubscriptionAppStoreReviewScreenshotToJSON(value as SubscriptionAppStoreReviewScreenshot);
    }
    if (instanceOfSubscriptionAvailability(value)) {
        return SubscriptionAvailabilityToJSON(value as SubscriptionAvailability);
    }
    if (instanceOfSubscriptionGroup(value)) {
        return SubscriptionGroupToJSON(value as SubscriptionGroup);
    }
    if (instanceOfSubscriptionIntroductoryOffer(value)) {
        return SubscriptionIntroductoryOfferToJSON(value as SubscriptionIntroductoryOffer);
    }
    if (instanceOfSubscriptionLocalization(value)) {
        return SubscriptionLocalizationToJSON(value as SubscriptionLocalization);
    }
    if (instanceOfSubscriptionOfferCode(value)) {
        return SubscriptionOfferCodeToJSON(value as SubscriptionOfferCode);
    }
    if (instanceOfSubscriptionPrice(value)) {
        return SubscriptionPriceToJSON(value as SubscriptionPrice);
    }
    if (instanceOfSubscriptionPromotionalOffer(value)) {
        return SubscriptionPromotionalOfferToJSON(value as SubscriptionPromotionalOffer);
    }

    return {};
}

