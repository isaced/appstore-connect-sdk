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


import * as runtime from '../runtime';
import type {
  AppInfoLocalizationCreateRequest,
  AppInfoLocalizationResponse,
  AppInfoLocalizationUpdateRequest,
  ErrorResponse,
} from '../models';
import {
    AppInfoLocalizationCreateRequestFromJSON,
    AppInfoLocalizationCreateRequestToJSON,
    AppInfoLocalizationResponseFromJSON,
    AppInfoLocalizationResponseToJSON,
    AppInfoLocalizationUpdateRequestFromJSON,
    AppInfoLocalizationUpdateRequestToJSON,
    ErrorResponseFromJSON,
    ErrorResponseToJSON,
} from '../models';

export interface AppInfoLocalizationsCreateInstanceRequest {
    appInfoLocalizationCreateRequest: AppInfoLocalizationCreateRequest;
}

export interface AppInfoLocalizationsDeleteInstanceRequest {
    id: string;
}

export interface AppInfoLocalizationsGetInstanceRequest {
    id: string;
    fieldsAppInfoLocalizations?: Array<AppInfoLocalizationsGetInstanceFieldsAppInfoLocalizationsEnum>;
    include?: Array<AppInfoLocalizationsGetInstanceIncludeEnum>;
}

export interface AppInfoLocalizationsUpdateInstanceRequest {
    id: string;
    appInfoLocalizationUpdateRequest: AppInfoLocalizationUpdateRequest;
}

/**
 * 
 */
export class AppInfoLocalizationsApi extends runtime.BaseAPI {

    /**
     */
    async appInfoLocalizationsCreateInstanceRaw(requestParameters: AppInfoLocalizationsCreateInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AppInfoLocalizationResponse>> {
        if (requestParameters.appInfoLocalizationCreateRequest === null || requestParameters.appInfoLocalizationCreateRequest === undefined) {
            throw new runtime.RequiredError('appInfoLocalizationCreateRequest','Required parameter requestParameters.appInfoLocalizationCreateRequest was null or undefined when calling appInfoLocalizationsCreateInstance.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("itc-bearer-token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/appInfoLocalizations`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: AppInfoLocalizationCreateRequestToJSON(requestParameters.appInfoLocalizationCreateRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AppInfoLocalizationResponseFromJSON(jsonValue));
    }

    /**
     */
    async appInfoLocalizationsCreateInstance(requestParameters: AppInfoLocalizationsCreateInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AppInfoLocalizationResponse> {
        const response = await this.appInfoLocalizationsCreateInstanceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async appInfoLocalizationsDeleteInstanceRaw(requestParameters: AppInfoLocalizationsDeleteInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling appInfoLocalizationsDeleteInstance.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("itc-bearer-token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/appInfoLocalizations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async appInfoLocalizationsDeleteInstance(requestParameters: AppInfoLocalizationsDeleteInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.appInfoLocalizationsDeleteInstanceRaw(requestParameters, initOverrides);
    }

    /**
     */
    async appInfoLocalizationsGetInstanceRaw(requestParameters: AppInfoLocalizationsGetInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AppInfoLocalizationResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling appInfoLocalizationsGetInstance.');
        }

        const queryParameters: any = {};

        if (requestParameters.fieldsAppInfoLocalizations) {
            queryParameters['fields[appInfoLocalizations]'] = requestParameters.fieldsAppInfoLocalizations.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        if (requestParameters.include) {
            queryParameters['include'] = requestParameters.include.join(runtime.COLLECTION_FORMATS["csv"]);
        }

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("itc-bearer-token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/appInfoLocalizations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AppInfoLocalizationResponseFromJSON(jsonValue));
    }

    /**
     */
    async appInfoLocalizationsGetInstance(requestParameters: AppInfoLocalizationsGetInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AppInfoLocalizationResponse> {
        const response = await this.appInfoLocalizationsGetInstanceRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async appInfoLocalizationsUpdateInstanceRaw(requestParameters: AppInfoLocalizationsUpdateInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<AppInfoLocalizationResponse>> {
        if (requestParameters.id === null || requestParameters.id === undefined) {
            throw new runtime.RequiredError('id','Required parameter requestParameters.id was null or undefined when calling appInfoLocalizationsUpdateInstance.');
        }

        if (requestParameters.appInfoLocalizationUpdateRequest === null || requestParameters.appInfoLocalizationUpdateRequest === undefined) {
            throw new runtime.RequiredError('appInfoLocalizationUpdateRequest','Required parameter requestParameters.appInfoLocalizationUpdateRequest was null or undefined when calling appInfoLocalizationsUpdateInstance.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && this.configuration.accessToken) {
            const token = this.configuration.accessToken;
            const tokenString = await token("itc-bearer-token", []);

            if (tokenString) {
                headerParameters["Authorization"] = `Bearer ${tokenString}`;
            }
        }
        const response = await this.request({
            path: `/v1/appInfoLocalizations/{id}`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters.id))),
            method: 'PATCH',
            headers: headerParameters,
            query: queryParameters,
            body: AppInfoLocalizationUpdateRequestToJSON(requestParameters.appInfoLocalizationUpdateRequest),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => AppInfoLocalizationResponseFromJSON(jsonValue));
    }

    /**
     */
    async appInfoLocalizationsUpdateInstance(requestParameters: AppInfoLocalizationsUpdateInstanceRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<AppInfoLocalizationResponse> {
        const response = await this.appInfoLocalizationsUpdateInstanceRaw(requestParameters, initOverrides);
        return await response.value();
    }

}

/**
 * @export
 */
export const AppInfoLocalizationsGetInstanceFieldsAppInfoLocalizationsEnum = {
    AppInfo: 'appInfo',
    Locale: 'locale',
    Name: 'name',
    PrivacyChoicesUrl: 'privacyChoicesUrl',
    PrivacyPolicyText: 'privacyPolicyText',
    PrivacyPolicyUrl: 'privacyPolicyUrl',
    Subtitle: 'subtitle'
} as const;
export type AppInfoLocalizationsGetInstanceFieldsAppInfoLocalizationsEnum = typeof AppInfoLocalizationsGetInstanceFieldsAppInfoLocalizationsEnum[keyof typeof AppInfoLocalizationsGetInstanceFieldsAppInfoLocalizationsEnum];
/**
 * @export
 */
export const AppInfoLocalizationsGetInstanceIncludeEnum = {
    AppInfo: 'appInfo'
} as const;
export type AppInfoLocalizationsGetInstanceIncludeEnum = typeof AppInfoLocalizationsGetInstanceIncludeEnum[keyof typeof AppInfoLocalizationsGetInstanceIncludeEnum];
