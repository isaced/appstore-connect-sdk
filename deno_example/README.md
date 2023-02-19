# App Store Connect SDK - Deno Example

This is an example application that demonstrates how to use the `appstore-connect-sdk` module in a [Deno](https://deno.land/) environment.

## Prerequisites

To use this example, you need to have the following:

- A developer account with Apple and access to App Store Connect
- A set of API keys to access App Store Connect API
- Deno installed on your machine

## Getting Started

1. Clone this repository，go to the `deno_example` directory

```bash
git clone https://github.com/yourusername/appstore-connect-sdk.git

cd appstore-connect-sdk/deno_example
```

2. Set your App Store Connect API keys as environment variables. You can either export them in your terminal or create a `.env` file in the project root with the following content:

```
BEARER_TOKEN="xxxxxxx"
```

3. Run the example by executing the following command:

```
deno run --allow-all main.ts
```
