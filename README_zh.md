# appstore-connect-sdk [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk)

`appstore-connect-sdk` 是一个 Node.js 模块，使用 TypeScript 编写，为开发人员提供了一个方便的与 [App Store Connect API](https://developer.apple.com/app-store-connect/api/) 进行交互。该模块基于 [OpenAPI Generator](https://openapi-generator.tech/) 工具构建，并支持所有基于 OpenAPI 规范的 API。

简体中文 | [English](https://github.com/isaced/appstore-connect-sdk/blob/main/README.md)

## 先了解一下 App Store Connect API

- [Automate your workflow with the App Store Connect API](https://developer.apple.com/app-store-connect/api/)
- [App Store Connect API Official Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
- [WWDC 2018 303 - Automating App Store Connect](https://developer.apple.com/videos/play/wwdc2018/303/) (Video)

## 这个 SDK 包含的功能特性

- [x] API 密钥配置以支持 JWT 签名
- [x] 支持自定义网络库发送请求，如 fetch/node-fetch/axios 等…
- [x] 借助 OpenAPI 的自动化生成能力，支持苹果所有 API
- [x] 支持 Deno 运行时

## 示例

- [Deno 示例](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example)
- [Node 示例](https://github.com/isaced/appstore-connect-sdk/tree/main/node_example)

## 安装

```bash
npm install appstore-connect-sdk
```

## 使用

#### 1. Import `appstore-connect-sdk`

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
```

#### 2. 创建 API 配置

进入 [App Store Connect -> Users and Access -> Keys](https://appstoreconnect.apple.com/access/api) 并创建您自己的密钥，这里也可以找到你的 `private key ID` 和 `issuer ID`.

SDK 支持两种类型的 API 密钥：

- **团队 API 密钥（Team API Keys）**: 团队使用，需要提供 `issuerId`
- **个人 API 密钥（Individual API Keys）**: 个人开发者使用，不需要 `issuerId`

下载私钥后，通过文本编辑器打开包含私钥的 `.p8` 文件，它看起来像这样：

```
-----BEGIN PRIVATE KEY-----
AIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgKEn1VBakCdHIEcdS
aBWr/9laASzaAbF2LP7wTYjHK52gCgYIKoZIzj0DAQehRANCAAQ/jf2sxRvXEhjn
srw8kJcHvO0dQ1KmUlxZvATsFsjJbdQ1yAENAWItUoeTV0rhdajcdOQxKl1OPse0
nNdXXbA4
-----END PRIVATE KEY-----
```

**团队 API 密钥配置：**

```typescript
const client = new AppStoreConnectAPI({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

**个人 API 密钥配置：**

```typescript
const client = new AppStoreConnectAPI({
  // 个人 API 密钥不需要 issuerId
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

有关如何在 App Store Connect API 中通过 JWT 认证的更多信息，请查看 Apple 的身份验证指南:

- [Creating API Keys for App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api)
- [Generating Tokens for API Requests](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests)
- [Revoking API Keys](https://developer.apple.com/documentation/appstoreconnectapi/revoking_api_keys)

#### 3. 创建 API 并发送请求

你可以在 [src/openapi/apis](https://github.com/isaced/appstore-connect-sdk/tree/main/src/openapi/apis) 找到所有 API 实体定义, 这些类通过 [App Store Connect API - OpenAPI specification](https://developer.apple.com/sample-code/app-store-connect/app-store-connect-openapi-specification.zip) 进行自动化生成, 如果你遇到任何问题请提交一个 [issue](https://github.com/isaced/appstore-connect-sdk/issues)。

```typescript
const api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
```

这是完整的示例代码：

**团队 API 密钥示例：**

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
import {
  AppsApi,
  AppEventLocalizationsApi,
} from "appstore-connect-sdk/openapi";

const client = new AppStoreConnectAPI({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
```

**个人 API 密钥示例：**

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
import {
  AppsApi,
  AppEventLocalizationsApi,
} from "appstore-connect-sdk/openapi";

const client = new AppStoreConnectAPI({
  // 个人 API 密钥不需要 issuerId
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const api = await client.create(AppsApi);
const res = await api.appsGetCollection();
console.log(res);
```

### 自定义网络库

默认情况下使用内置的 `fetch` 函数进行 HTTP 请求，但请注意此函数需要 Node.js 版本 v18.0.0 或更高版本。

或者，你也可以通过在 AppStoreConnectAPI 构造函数中设置 `fetchApi` 选项来配置符合 [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/fetch) 标准规范的任何网络库，将其他网络库桥接过来。

```typescript
import { AppStoreConnectAPI } from "appstore-connect-sdk";
import fetch from "node-fetch";

new AppStoreConnectAPI({
  // ...
  fetchApi: fetch as unknown as FetchAPI, // 这样所有网络请求都通过 node-fetch 接管
});
```

## 更新 OpenAPI 生成的代码

要更新 OpenAPI 生成的代码，请运行以下命令：

```bash
$ sh gen-openapi.sh
```

这将基于由 Apple 官方发布的 [OpenAPI specification](https://github.com/isaced/appstore-connect-sdk/blob/fdabb5bb414e9e3c02341ac1fa3238a5bfa15c30/app_store_connect_api_2.2_openapi.json) 规范文件，通过 [OpenAPI Generator](https://openapi-generator.tech/) 生成 Typescript 代码。

## Deno 兼容性

`appstore-connect-sdk` 目前已经支持 Deno 环境，您可以在 [deno_example](https://github.com/isaced/appstore-connect-sdk/tree/deno_example) 中查看在 Deno 环境中使用 `appstore-connect-sdk` 模块的示例。

我们致力于确保 `appstore-connect-sdk` 模块能够完全兼容 Node.js 和 Deno，我们将继续努力提高其与 Deno 的兼容性，随着 Deno 运行时的发展而不断改进。

## 许可证

**appstore-connect-sdk** 可在 MIT 许可下使用开源项目的源代码，有关更多信息请参见 [LICENSE](https://github.com/isaced/appstore-connect-sdk/blob/main/LICENSE) 文件。

## 作者

该项目最初由 [isaced](https://github.com/isaced) 创建，但有许多伟大的[贡献者](https://github.com/isaced/appstore-connect-sdk/graphs/contributors)。我们欢迎任何形式的贡献，以使该项目变得更好。
