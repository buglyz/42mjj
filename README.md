# 42mjj 前端重构

云产品销售门户（VPS / 裸金属 / 住宅 IP / CDN）。LinuxDo 登录 · LDC 预存支付。

## 技术栈

- Next.js 15 (App Router) + React 19 + TypeScript (strict)
- Tailwind CSS v4 + 自定义 Design Tokens
- 双主题（浅/深，`localStorage` 持久化）
- 全量 Mock API，不依赖外部服务器

## 设计系统

- **Surface**：Explore（商店目录）+ Operate（钱包 / 服务）
- **Accent**：电青绿 teal/cyan（避开通用 indigo/violet）
- **Typography**：Geist Sans + Geist Mono，紧字距标题
- **深度**：半透明边框 + 分层阴影，暗色以 luminance 堆叠

## 启动

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 页面

| 路径 | 说明 |
|------|------|
| `/` | 首页 Hero + 精选产品 |
| `/products` | 钱包面板 + 搜索筛选 + 产品网格 |
| `/services` | 已购服务、续费、控制台、接入码 |
| `/success?order_no=` | 支付回执轮询 |

## 结构

```
app/           layout + pages
components/    Header / Footer / ProductCard / WalletPanel / AppShell
lib/           types · mock · api · format · theme
```

## Mock 切换

默认使用 `lib/mock.ts`。若需真实后端：

```bash
NEXT_PUBLIC_USE_REAL_API=1 npm run dev
```

接口约定：`{ code, message, data }`，`credentials: "include"`。

## Cloudflare Pages

- Project: `42mjj` (GitHub `buglyz/42mjj` · branch `main`)
- Build: `npm install && npm run build`
- Output: `out` (`next.config` uses `output: "export"`)
- URLs:
  - https://42mjj.pages.dev
  - https://42mjj.fleey.site
- Push to `main` triggers auto deploy.
