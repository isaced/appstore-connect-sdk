# appstore-connect-sdk [![@latest](https://img.shields.io/npm/v/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk) [![downloads](https://img.shields.io/npm/dm/appstore-connect-sdk.svg)](https://www.npmjs.com/package/appstore-connect-sdk) [![Test](https://github.com/isaced/appstore-connect-sdk/actions/workflows/test.yml/badge.svg?branch=main)](https://github.com/isaced/appstore-connect-sdk/actions/workflows/test.yml) [![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE)

`appstore-connect-sdk` 是一个 Node.js 模块，使用 TypeScript 编写，为开发人员提供了一个方便的与 [App Store Connect API](https://developer.apple.com/app-store-connect/api/) 进行交互。该模块基于 [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) 工具构建，并支持所有基于 OpenAPI 规范的 API。

简体中文 | [English](https://github.com/isaced/appstore-connect-sdk/blob/main/README.md)

## 这个 SDK 包含的功能特性

- **JWT 身份验证** - 配置您的 API 密钥，SDK 将自动处理 JWT 令牌签名
- **智能令牌管理** - 令牌自动生成、缓存，并在过期前（2 分钟内）自动刷新；并发请求命中同一过期时刻时共享单次令牌生成（single-flight）
- **完整 API 覆盖** - 基于 Apple 官方 OpenAPI 描述生成的约 1,000 个 **4.5.1** 版 App Store Connect API 端点
- **跨平台支持** - 兼容 Node.js 和 **Deno** 环境

## 安装

```bash
npm install appstore-connect-sdk
```

需要 Node.js **20+**。

也可以直接从 git 安装未发布的改动（SDK 通过 `prepare` 脚本在安装时自动构建）：

```bash
npm install isaced/appstore-connect-sdk#main
```

## 使用

#### 1. 导入 `appstore-connect-sdk`

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";
```

`sdk` 入口能覆盖绝大多数使用场景，且内存占用远低于根入口（见[导入入口与内存占用](#导入入口与内存占用)）。只有当你需要从根导出面使用生成的 JSON/Zod schema 时，才使用 `import ... from "appstore-connect-sdk"`。

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

**配置选项：**

| 选项 | 类型 | 必需 | 描述 |
|------|------|------|------|
| `issuerId` | `string` | 团队密钥必需 | 来自 App Store Connect 的 issuer ID |
| `privateKeyId` | `string` | 是* | 您的私钥 ID |
| `privateKey` | `string` | 是* | PEM 格式的私钥内容 |
| `bearerToken` | `string` | 否 | 直接提供您自己的 JWT 令牌，无需 SDK 生成 |
| `expirationDuration` | `number` | 否 | 令牌过期时间（秒），默认：1200 = 20 分钟，最大：20 分钟 |
| `baseUrl` | `string` | 否 | 覆盖 API 基础 URL（默认：`https://api.appstoreconnect.apple.com`） |

*除非提供了 `bearerToken`，否则必需。

#### 3. 调用 API

所有 API 函数都从 SDK 导出。将客户端传递给每个 API 调用。

```typescript
const res = await appsGetCollection({ client });
console.log(res.data);
```

这是完整的示例代码：

**团队 API 密钥示例：**

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";

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
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";

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
} from "appstore-connect-sdk/sdk";

const client = createClient({ /* 你的配置 */ });

// 获取所有应用
const apps = await appsGetCollection({ client });

// 获取特定应用
const app = await appsGetInstance({ client, path: { id: "app-id" } });

// 获取应用的构建
const builds = await buildsGetCollection({ client, query: { "filter[app]": "app-id" } });
```

### 错误处理

默认情况下，API 函数在非 2xx 响应时**不会抛出异常**，而是返回 `{ data, error, response }`，其中 `error` 携带 Apple 的 JSON:API 错误体：

```typescript
const { data, error, response } = await appsGetCollection({ client });

if (error) {
  // 例如 { errors: [{ status: "401", code: "NOT_AUTHORIZED", title: "Unauthorized" }] }
  console.error(error.errors);
} else {
  console.log(data!.data);
}
```

更习惯异常写法？传入 `throwOnError: true` 让调用直接抛出：

```typescript
const res = await appsGetCollection({ client, throwOnError: true }); // 非 2xx 时抛出
```

### 分页

App Store Connect 采用游标分页。通过 `limit` 指定页大小，然后跟随 `links.next`：

```typescript
import type { AppsResponse } from "appstore-connect-sdk/sdk";

const first = await appsGetCollection({ client, query: { limit: 200 } });
const apps = [...first.data?.data ?? []];
let nextUrl = first.data?.links?.next;

while (nextUrl) {
  // `links.next` 是绝对 URL；转换回客户端可识别的路径
  const next = new URL(nextUrl);
  const res = await client.get({ url: next.pathname + next.search });
  const page = res.data as AppsResponse;
  apps.push(...page.data);
  nextUrl = page.links?.next;
}
```

> 注意：不要把绝对 URL `links.next` 直接作为 `url` 传入——它会相对于客户端的 `baseUrl` 拼接，产生非法请求。

### Zod 运行时校验

`/zod` 入口提供与生成 API 类型一致的 Zod schema，按需引入：

```typescript
import { zAppsResponse } from "appstore-connect-sdk/zod";

const res = await appsGetCollection({ client });
if (res.data) {
  const apps = zAppsResponse.parse(res.data); // payload 不符合规范时抛出 ZodError
}
```

> 警告：导入 `/zod` 会初始化全部约 3,700 个生成 schema（约 300 MiB 堆内存）。只在真正需要校验的地方导入。

### 高级用法

对于高级用例，您可以直接使用客户端进行自定义请求：

```typescript
import { createClient } from "appstore-connect-sdk/sdk";

const client = createClient({ /* 你的配置 */ });

// 直接使用客户端进行自定义请求
const response = await client.get({ url: "/v1/apps" });
```

### 覆盖基础 URL

为了集成测试目的，您可以通过设置 `baseUrl` 选项来覆盖 App Store Connect API 的基础路径。例如，您可以使用此选项指向本地模拟服务器。

```typescript
import { createClient } from "appstore-connect-sdk/sdk";

const client = createClient({
  // ...
  baseUrl: "http://localhost:3000", // 所有网络请求都发送到 http://localhost:3000
});
```

### 导入入口与内存占用

默认的根入口会一次性初始化完整的生成代码（约 5,000 个 Zod/JSON schema），会让全新的 Node.js 进程 RSS 增加约 **450 MiB**（[#47](https://github.com/isaced/appstore-connect-sdk/issues/47)）。如果不需要运行时 schema 校验，请从更轻量的子路径入口导入（v2.2.1 实测）：

| 入口 | 内容 | 约 RSS |
|---|---|---|
| `appstore-connect-sdk` | 全部导出（向后兼容） | ~457 MiB |
| `appstore-connect-sdk/sdk` | 请求函数、TS 类型、`createClient` | ~36 MiB |
| `appstore-connect-sdk/client` | 仅 `createClient` 与客户端类型 | ~20 MiB |
| `appstore-connect-sdk/schemas` | JSON schema（按需） | — |
| `appstore-connect-sdk/zod` | Zod schema，用于运行时校验（按需） | — |

```typescript
import { createClient, appsGetCollection } from "appstore-connect-sdk/sdk";
```

如果你使用的是命名空间导入，只需改一行即可完成切换（`sdk` 入口同样提供 `createClient`）：

```diff
- import * as asc from "appstore-connect-sdk";
+ import * as asc from "appstore-connect-sdk/sdk";
```

## 更新 OpenAPI 生成的代码

要从 Apple 拉取最新的 OpenAPI 规范并重新生成 SDK 代码，运行：

```bash
$ npm run update:spec
```

它会下载 Apple 官方发布的规范 zip，替换仓库内的 `app_store_connect_api_<version>_openapi.json` 并同步更新相关引用；当规范版本变化时，自动重新运行 [@hey-api/openapi-ts](https://github.com/hey-api/openapi-ts) 生成代码（codegen 使用 `scripts/openapi-gen` 中独立锁定的工具链，与仓库自身的 TypeScript 隔离）。如果你直接修改了已提交的规范文件，可用 `sh gen-openapi.sh` 在不下载的情况下重新生成。

此外，定时的 GitHub Action（Spec Update）每小时检查一次 Apple 是否发布了新规范，如有更新会自动提交 Pull Request，包含同步后的规范和重新生成的代码。

## Deno 兼容性

`appstore-connect-sdk` 已经可以通过 `npm:` 说明符在 Deno 中使用，示例见 [deno_example](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example)。

> 注意：JSR（`jsr:@isaced/appstore-connect-sdk`）发布尚未接通，子路径入口（`/sdk`、`/client` 等）目前仅 npm 可用；Deno 用户暂时请导入根入口。

我们致力于确保 `appstore-connect-sdk` 模块能够完全兼容 Node.js 和 Deno，我们将继续努力提高其与 Deno 的兼容性，随着 Deno 运行时的发展而不断改进。

## 示例

仓库内提供可直接运行的示例：

- [Node 示例](https://github.com/isaced/appstore-connect-sdk/tree/main/node_example)
- [Deno 示例](https://github.com/isaced/appstore-connect-sdk/tree/main/deno_example)

## 先了解一下 App Store Connect API

- [Automate your workflow with the App Store Connect API](https://developer.apple.com/app-store-connect/api/)
- [App Store Connect API Official Documentation](https://developer.apple.com/documentation/appstoreconnectapi)
- [WWDC 2018 303 - Automating App Store Connect](https://developer.apple.com/videos/play/wwdc2018/303/) (Video)

## 贡献

欢迎任何形式的贡献！开发环境搭建、测试与发布流程见 [CONTRIBUTING.md](https://github.com/isaced/appstore-connect-sdk/blob/main/CONTRIBUTING.md)。

## 许可证

**appstore-connect-sdk** 可在 MIT 许可下使用开源项目的源代码，有关更多信息请参见 [LICENSE](https://github.com/isaced/appstore-connect-sdk/blob/main/LICENSE) 文件。

## 作者

该项目最初由 [isaced](https://github.com/isaced) 创建，但有许多伟大的[贡献者](https://github.com/isaced/appstore-connect-sdk/graphs/contributors)。我们欢迎任何形式的贡献，以使该项目变得更好。
