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
import type { CiBranchPatterns } from './CiBranchPatterns';
import {
    CiBranchPatternsFromJSON,
    CiBranchPatternsFromJSONTyped,
    CiBranchPatternsToJSON,
} from './CiBranchPatterns';
import type { CiFilesAndFoldersRule } from './CiFilesAndFoldersRule';
import {
    CiFilesAndFoldersRuleFromJSON,
    CiFilesAndFoldersRuleFromJSONTyped,
    CiFilesAndFoldersRuleToJSON,
} from './CiFilesAndFoldersRule';

/**
 * 
 * @export
 * @interface CiPullRequestStartCondition
 */
export interface CiPullRequestStartCondition {
    /**
     * 
     * @type {CiBranchPatterns}
     * @memberof CiPullRequestStartCondition
     */
    source?: CiBranchPatterns;
    /**
     * 
     * @type {CiBranchPatterns}
     * @memberof CiPullRequestStartCondition
     */
    destination?: CiBranchPatterns;
    /**
     * 
     * @type {CiFilesAndFoldersRule}
     * @memberof CiPullRequestStartCondition
     */
    filesAndFoldersRule?: CiFilesAndFoldersRule;
    /**
     * 
     * @type {boolean}
     * @memberof CiPullRequestStartCondition
     */
    autoCancel?: boolean;
}

/**
 * Check if a given object implements the CiPullRequestStartCondition interface.
 */
export function instanceOfCiPullRequestStartCondition(value: object): boolean {
    let isInstance = true;

    return isInstance;
}

export function CiPullRequestStartConditionFromJSON(json: any): CiPullRequestStartCondition {
    return CiPullRequestStartConditionFromJSONTyped(json, false);
}

export function CiPullRequestStartConditionFromJSONTyped(json: any, ignoreDiscriminator: boolean): CiPullRequestStartCondition {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'source': !exists(json, 'source') ? undefined : CiBranchPatternsFromJSON(json['source']),
        'destination': !exists(json, 'destination') ? undefined : CiBranchPatternsFromJSON(json['destination']),
        'filesAndFoldersRule': !exists(json, 'filesAndFoldersRule') ? undefined : CiFilesAndFoldersRuleFromJSON(json['filesAndFoldersRule']),
        'autoCancel': !exists(json, 'autoCancel') ? undefined : json['autoCancel'],
    };
}

export function CiPullRequestStartConditionToJSON(value?: CiPullRequestStartCondition | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'source': CiBranchPatternsToJSON(value.source),
        'destination': CiBranchPatternsToJSON(value.destination),
        'filesAndFoldersRule': CiFilesAndFoldersRuleToJSON(value.filesAndFoldersRule),
        'autoCancel': value.autoCancel,
    };
}

