# App Store Connect SDK - Deno Example

This is an example application that demonstrates how to use the `appstore-connect-sdk` module in a [Deno](https://deno.land/) environment.

## Prerequisites

To use this example, you need to have the following:

- A developer account with Apple and access to App Store Connect
- A set of API keys to access App Store Connect API
- Deno installed on your machine

## Getting Started

1. Clone this repository, go to the `deno_example` directory

```bash
git clone https://github.com/isaced/appstore-connect-sdk.git

cd appstore-connect-sdk/deno_example
```

2. Set your App Store Connect API keys as environment variables. You can either export them in your terminal or create a `.env` file in the project root with the following content:

```
ISSUER_ID="your-issuer-id"
PRIVATE_KEY_ID="your-private-key-id"
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
...your key content...
-----END PRIVATE KEY-----"
```

Note: For Individual API Keys, you can omit `ISSUER_ID`.

3. Run the example by executing the following command:

```bash
deno run --allow-all main.ts
```
