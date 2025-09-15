npx openapi-generator-cli generate \
  -i ./app_store_connect_api_openapi.json \
  -o src/openapi \
  -g typescript-fetch \
  --additional-properties=supportsES6=true \
  --skip-validate-spec
