# Contributing Guidelines

Thank you for considering contributing to appstore-connect-sdk! We appreciate your time and effort in helping to make our project better.

## Issues

If you encounter any issues while using appstore-connect-sdk, please check the existing issues first to see if your problem has already been reported. If it hasn't, please open a new issue with as much detail as possible, including any relevant code snippets, error messages, and steps to reproduce the issue.

## Pull Requests

We welcome contributions from the community, including bug fixes, new features, and improvements to documentation. To submit a pull request:

1. Fork the appstore-connect-sdk repository.
2. Create a new branch with a descriptive name for your changes.
3. Make your changes and ensure that all tests pass.
4. Add documentation for any new features or changes.
5. Submit a pull request to the main branch of the appstore-connect-sdk repository.
6. We will review your pull request as soon as possible and provide feedback if necessary. Please be patient and responsive during the review process.

## Development

To develop appstore-connect-sdk locally:

1. Clone the repository.
2. Install the necessary dependencies using `npm install`.
3. Run the tests using `npm test`. Live suites (`events`, `reviews`, `schemas`) require App Store Connect credentials in a root `.env` (`PRIVATE_KEY`, `PRIVATE_KEY_ID`, `ISSUER_ID`) — **without them those tests skip automatically**, so a plain clone still gets a green run.
4. Make your changes and run the tests again to ensure that everything still works.
5. Submit a pull request following the process outlined above.

## Releasing a new version (maintainers)

Releases are driven by two commands. Version decisions happen locally; the actual `npm publish` runs in CI with OIDC provenance (no local npm token needed).

1. Make sure `main` is green and checked out, then create the release commit + tag:

   ```bash
   npm run release -- --release-as 2.2.0   # or omit --release-as to derive from commits (feat → minor, fix → patch)
   ```

   This bumps `package.json`, `package-lock.json` and `jsr.json` together, updates `CHANGELOG.md`, commits `chore(release): 2.2.0` and tags `v2.2.0`. Nothing is pushed yet — inspect/revert locally if needed (`git reset --hard HEAD~1 && git tag -d v2.2.0`).

2. Push the branch and tag — **this triggers publication**:

   ```bash
   git push --follow-tags origin main
   ```

   The `Publish` workflow (`.github/workflows/npm-publish.yml`) runs on `v*` tags: `npm ci` → `npm run build` → `npm publish`.

3. Verify: `npm view appstore-connect-sdk version` (may lag a few minutes while npm's post-publish scan runs; the version shows as "Validating" in your npm account meanwhile). Then create/refresh the GitHub Release for the tag (`gh release create v2.2.0 --generate-notes`, or edit its body from the matching `CHANGELOG.md` section).

Troubleshooting:

- If the tag-triggered Publish run fails, fix forward, delete the failed tag (`git push origin :refs/tags/vX.Y.Z && git tag -d vX.Y.Z`) and re-tag; npm does not allow republishing a version number.
- `npm publish` from a previously published version number is rejected — bump or unpublish first.
- Emergency republish of the current commit without a new version: run the `Publish` workflow manually from the Actions tab (`workflow_dispatch`).

## Licensing

By contributing to appstore-connect-sdk, you agree to license your contributions under the MIT License.
