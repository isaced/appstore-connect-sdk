npx openapi-generator-cli generate \
  -i ./app_store_connect_api_2.2_openapi.json \
  -o src/generated-openapi \
  -g typescript-fetch \
  --additional-properties=supportsES6=true \
  --skip-validate-spec
