# Node.js Example

This example demonstrates how to use the App Store Connect SDK in a Node.js project.

## Installation

```bash
npm install
```

## Configuration

Copy `.env.example` to `.env` and fill in your App Store Connect credentials:

```bash
ISSUER_ID=your_issuer_id
PRIVATE_KEY_ID=your_private_key_id
PRIVATE_KEY=your_private_key
```

Or skip the multi-line PEM entirely with a key file path (`privateKeyId` is inferred from the `AuthKey_<KEYID>.p8` filename):

```bash
ISSUER_ID=your_issuer_id
PRIVATE_KEY_PATH=./private/AuthKey_XXXXXXXXXX.p8
```

## Usage

```bash
node apps.js
```
