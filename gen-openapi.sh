#!/bin/sh
# Regenerate src/openapi from the committed OpenAPI spec file.
set -e
cd "$(dirname "$0")/scripts/openapi-gen"
[ -d node_modules ] || npm install
./node_modules/.bin/openapi-ts
