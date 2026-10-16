# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.2.2](https://github.com/isaced/appstore-connect-sdk/compare/v2.2.1...v2.2.2) (2026-10-16)


### Bug Fixes

* **example:** refresh node_example lockfile to 2.2.1 ([#62](https://github.com/isaced/appstore-connect-sdk/issues/62)) ([2b50943](https://github.com/isaced/appstore-connect-sdk/commit/2b50943686e427c83a7002edbb904d29339fd59a))

### [2.2.1](https://github.com/isaced/appstore-connect-sdk/compare/v2.2.0...v2.2.1) (2026-10-15)

> Note: no feat/fix commits in this range, so the sections below were added manually.

* build: keep `zod` and `jose` external in bundled entrypoints ([#58](https://github.com/isaced/appstore-connect-sdk/issues/58))
* ci: add publish smoke test gating `npm publish` ([#59](https://github.com/isaced/appstore-connect-sdk/issues/59))

## [2.2.0](https://github.com/isaced/appstore-connect-sdk/compare/v2.1.0...v2.2.0) (2026-10-15)


### Features

* update OpenAPI spec to 4.5.1 and regenerate client ([#53](https://github.com/isaced/appstore-connect-sdk/issues/53)) ([172ca39](https://github.com/isaced/appstore-connect-sdk/commit/172ca3968eec2e212267b45a6e287503119e5b27))

---

> The entries below were backfilled manually on 2026-10-16. `CHANGELOG.md` was introduced with the `standard-version` automation in v2.2.0; earlier releases are summarized from git history and tags. Pre-1.0 development tags (0.0.x) are omitted.

## [2.1.0](https://github.com/isaced/appstore-connect-sdk/compare/v2.0.0...v2.1.0) (2026-10-15)


### Features

* lightweight subpath entrypoints (`/sdk`, `/client`, …) to cut import memory footprint ([#47](https://github.com/isaced/appstore-connect-sdk/issues/47)) ([7297050](https://github.com/isaced/appstore-connect-sdk/commit/7297050fef624d21afbd11e2a5e2e9be90268f9a))


### Bug Fixes

* resync lock file for `npm ci` and force patched js-yaml ([#51](https://github.com/isaced/appstore-connect-sdk/issues/51)) ([08ece8f](https://github.com/isaced/appstore-connect-sdk/commit/08ece8f51853cf7eec5dceddc7a6e79ddab00ef0))

## [2.0.0](https://github.com/isaced/appstore-connect-sdk/compare/v1.3.2...v2.0.0) (2026-01-21)


### ⚠ BREAKING CHANGES

* upgrade to the App Store Connect API **v4** specification ([#43](https://github.com/isaced/appstore-connect-sdk/issues/43)) ([a2eb8fa](https://github.com/isaced/appstore-connect-sdk/commit/a2eb8fadfbfac52490b637a0bc0db00e602de1f0))

## [1.3.2](https://github.com/isaced/appstore-connect-sdk/compare/v1.3.1...v1.3.2) (2025-08-07)


### Features

* support Individual API Keys (`issuerId` becomes optional) ([#37](https://github.com/isaced/appstore-connect-sdk/issues/37)) ([273a376](https://github.com/isaced/appstore-connect-sdk/commit/273a3768ce7da15d50615915f3de721c93ecfe07))
* upgrade jose from v4 to v6 ([740a1ca](https://github.com/isaced/appstore-connect-sdk/commit/740a1caf7d833f254618438d02ff79d0abeb06c5))

## [1.3.1](https://github.com/isaced/appstore-connect-sdk/compare/v1.3.0...v1.3.1) (2025-08-05)


### Features

* refresh token 2 minutes before expiration ([#25](https://github.com/isaced/appstore-connect-sdk/issues/25)) ([3f4f2af](https://github.com/isaced/appstore-connect-sdk/commit/3f4f2afd7a4d5fc46a3ba447a52e2c31f833ea2d))

## [1.3.0](https://github.com/isaced/appstore-connect-sdk/compare/v1.2.1...v1.3.0) (2024-11-29)


### Features

* add `request` method for making raw API requests ([#27](https://github.com/isaced/appstore-connect-sdk/issues/27)) ([8aa383e](https://github.com/isaced/appstore-connect-sdk/commit/8aa383eee5ff8011e8ac2158c3778f06104f9b1f))

## [1.2.1](https://github.com/isaced/appstore-connect-sdk/compare/v1.2.0...v1.2.1) (2024-11-28)


### Code Refactoring

* expose `expirationDuration` option to control token refresh ([#21](https://github.com/isaced/appstore-connect-sdk/issues/21)) ([88ec51a](https://github.com/isaced/appstore-connect-sdk/commit/88ec51ac8d2e03aee437bbab79549223618b0c9f))

## [1.2.0](https://github.com/isaced/appstore-connect-sdk/compare/v1.1.0...v1.2.0) (2024-11-27)


### Features

* ESM support ([#30](https://github.com/isaced/appstore-connect-sdk/issues/30)) ([9e0dd8b](https://github.com/isaced/appstore-connect-sdk/commit/9e0dd8bc508965942fd880a4fc3971afc02dfad9))

## [1.1.0](https://github.com/isaced/appstore-connect-sdk/compare/v1.0.0...v1.1.0) (2024-03-13)


### Features

* allow specifying base path ([#18](https://github.com/isaced/appstore-connect-sdk/issues/18)) ([4212a96](https://github.com/isaced/appstore-connect-sdk/commit/4212a96fc1e16fc8dbee5d4c876d71075ecd41a4))

## [1.0.0](https://github.com/isaced/appstore-connect-sdk/compare/v1.0.0-beta.1...v1.0.0) (2023-07-10)

* First stable release: typed client generated from Apple's official App Store Connect OpenAPI specification, with JWT authentication and automatic token management.
