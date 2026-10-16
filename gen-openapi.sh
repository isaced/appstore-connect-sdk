#!/bin/sh
# Regenerate src/openapi: apply spec patches (Apple original stays untouched),
# then run openapi-ts against the derived spec.generated.json.
set -e
cd "$(dirname "$0")"
node scripts/apply-spec-patches.mjs
cd scripts/openapi-gen
[ -d node_modules ] || npm install
./node_modules/.bin/openapi-ts
