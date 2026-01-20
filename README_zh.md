# appstore-connect-sdk [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk)

`appstore-connect-sdk` 是一个 Node.js 模块，使用 TypeScript 编写，为开发人员提供了一个方便的与 [App Store Connect API](https://developer.apple.com/app-store-connect/api/) 进行交互。该模块基于 [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) 工具构建，并支持所有基于 OpenAPI 规范的 API。

简体中文 | [English](https://github.com/isaced/appstore-connect-sdk/blob/main/README.md)

## 先了解一下 App Store Connect API

- [Automate your workflow with the App Store Connect API](https://developer.apple.com/app-store-connect/api/)
- [App Store Connect API Official Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
- [WWDC 2018 303 - Automating App Store Connect](https://developer.apple.com/videos/play/wwdc2018/303/) (Video)

## 这个 SDK 包含的功能特性

- [x] API 密钥配置以支持 JWT 签名
- [x] 每次请求自动生成令牌
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

#### 1. 导入 `appstore-connect-sdk`

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk";
```

#### 2. 创建客户端

进入 [App Store Connect -> Users and Access -> Keys](https://appstoreconnect.apple.com/access/api) 并创建您自己的密钥，这里也可以找到你的 `private key ID` 和 `issuer ID`。

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
const client = createClient({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

**个人 API 密钥配置：**

```typescript
const client = createClient({
  // 个人 API 密钥不需要 issuerId
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});
```

有关如何在 App Store Connect API 中通过 JWT 认证的更多信息，请查看 Apple 的身份验证指南:

- [Creating API Keys for App Store Connect API](https://developer.apple.com/documentation/appstoreconnectapi/creating_api_keys_for_app_store_connect_api)
- [Generating Tokens for API Requests](https://developer.apple.com/documentation/appstoreconnectapi/generating_tokens_for_api_requests)
- [Revoking API Keys](https://developer.apple.com/documentation/appstoreconnectapi/revoking_api_keys)

#### 3. 调用 API

所有 API 函数都从 SDK 导出。将客户端传递给每个 API 调用。

```typescript
const res = await appsGetCollection({ client });
console.log(res.data);
```

这是完整的示例代码：

**团队 API 密钥示例：**

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk";

const client = createClient({
  issuerId: "<YOUR ISSUER ID>",
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const res = await appsGetCollection({ client });
console.log(res.data);
```

**个人 API 密钥示例：**

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk";

const client = createClient({
  // 个人 API 密钥不需要 issuerId
  privateKeyId: "<YOUR PRIVATE KEY ID>",
  privateKey: "<YOUR PRIVATE KEY>",
});

const res = await appsGetCollection({ client });
console.log(res.data);
```

### 可用的 API 函数

所有 API 函数遵循 OpenAPI 规范的命名约定。一些常见的示例：

```typescript
import {
  createClient,
  appsGetCollection,
  appsGetInstance,
  buildsGetCollection,
  betaTestersGetCollection,
} from "appstore-connect-sdk";

const client = createClient({ /* 你的配置 */ });

// 获取所有应用
const apps = await appsGetCollection({ client });

// 获取特定应用
const app = await appsGetInstance({ client, path: { id: "app-id" } });

// 获取应用的构建
const builds = await buildsGetCollection({ client, query: { "filter[app]": "app-id" } });
```

### 高级用法

对于高级用例，您可以直接使用客户端进行自定义请求：

```typescript
import { createClient } from "appstore-connect-sdk";

const client = createClient({ /* 你的配置 */ });

// 直接使用客户端进行自定义请求
const response = await client.get({ url: "/v1/apps" });
```

### 覆盖基础 URL

为了集成测试目的，您可以通过设置 `baseUrl` 选项来覆盖 App Store Connect API 的基础路径。例如，您可以使用此选项指向本地模拟服务器。

```typescript
import { createClient } from "appstore-connect-sdk";

const client = createClient({
  // ...
  baseUrl: "http://localhost:3000", // 所有网络请求都发送到 http://localhost:3000
});
```

## 更新 OpenAPI 生成的代码

要更新 OpenAPI 生成的代码，请运行以下命令：

```bash
$ sh gen-openapi.sh
```

这将基于由 Apple 官方发布的 OpenAPI 规范文件 (`app_store_connect_api_4.2_openapi.json`)，通过 [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) 生成 TypeScript 代码。

## Deno 兼容性

`appstore-connect-sdk` 目前已经支持 Deno 环境，您可以在 [deno_example](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example) 中查看在 Deno 环境中使用 `appstore-connect-sdk` 模块的示例。

我们致力于确保 `appstore-connect-sdk` 模块能够完全兼容 Node.js 和 Deno，我们将继续努力提高其与 Deno 的兼容性，随着 Deno 运行时的发展而不断改进。

## 许可证

**appstore-connect-sdk** 可在 MIT 许可下使用开源项目的源代码，有关更多信息请参见 [LICENSE](https://github.com/isaced/appstore-connect-sdk/blob/main/LICENSE) 文件。

## 作者

该项目最初由 [isaced](https://github.com/isaced) 创建，但有许多伟大的[贡献者](https://github.com/isaced/appstore-connect-sdk/graphs/contributors)。我们欢迎任何形式的贡献，以使该项目变得更好。
