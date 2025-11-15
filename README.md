# my-next-learning

基于 Next.js 14 的个人学习项目，演练 **静态导出**、**动态路由**、**Tailwind + shadcn/ui 风格组件**、**Zustand 客户端状态** 以及自动化发布/部署的完整工作流。

## 技术栈与主要功能

- **框架**：Next.js 14（App Router + `generateStaticParams`）
- **语言**：TypeScript / React 18
- **样式**：Tailwind CSS + shadcn/ui 风格组件（button、卡片等）
- **状态管理**：Zustand（首页交互式特性卡片）
- **打包与工具链**：pnpm、ESLint、Prettier、Stylelint、Husky + lint-staged
- **自动化**：
  - GitHub Actions `release.yml` 使用 `semantic-release` 自动生成版本及 `CHANGELOG.md`
  - GitHub Actions `deploy.yml` 将静态导出结果发布到 `gh-pages`（GitHub Pages）
- **动态路由示例**：`/guide/dynamic/[topic]` 通过 `generateStaticParams()` 预生成 `params/revalidate/metadata` 三个主题，展示如何在构建阶段为动态段生成静态 HTML

## 环境准备

- Node.js `22.14.0`（`.nvmrc` 已指定此版本，可执行 `nvm use`）
- pnpm `>=8`（项目命令全部基于 pnpm）
- 若需本地预览静态文件，请安装 `nginx`（macOS 可通过 Homebrew 安装）

首次拉取仓库后执行：

```bash
pnpm install --frozen-lockfile
```

## 常用脚本

| 命令                  | 说明                                               |
| --------------------- | -------------------------------------------------- |
| `pnpm dev`            | 启动开发服务器 (`http://localhost:3000`)           |
| `pnpm build`          | 生成静态导出产物到 `out/`                          |
| `pnpm lint`           | 运行 ESLint（Next 官方规则 + TypeScript 推荐规则） |
| `pnpm lint:style`     | 运行 Stylelint（支持 Tailwind 特有 at-rule）       |
| `pnpm format`         | 使用 Prettier 自动格式化                           |
| `pnpm preview`        | 启动项目内的 nginx 用于静态预览 `out/`             |
| `pnpm preview:stop`   | 停止项目内 nginx                                   |
| `pnpm preview:verify` | 快速检查静态资源可访问性                           |

## 代码规范

- **ESLint**：基于 `next/core-web-vitals` 和 `@typescript-eslint/recommended`
- **Stylelint**：`stylelint-config-standard(-scss)` + `stylelint-config-css-modules`
- **Prettier**：格式化 JS/TS/JSON/Markdown/YAML
- **Lint-staged**：提交前自动运行格式化与 Lint（通过 Husky `prepare` 钩子安装）

在提交代码前请至少执行：

```bash
pnpm lint
pnpm lint:style
pnpm format:check
```

## 提交规范（Commit）

- 使用 **Conventional Commits** 规范，Commitlint 通过 `@commitlint/config-conventional` 校验
- 常用类型：`feat`、`fix`、`docs`、`chore`、`build`、`ci` 等
- `semantic-release` 会根据 commit 类型自动决定版本号和 changelog 内容，非规范化提交将不会触发发布

示例：

```bash
git commit -m "feat: support dynamic artist list"
```

## 版本发布流程

GitHub Actions 中的 `release.yml` 在推送到 `main` 分支时运行：

1. 安装 pnpm 依赖
2. 执行 `npx semantic-release`
3. 根据规范化提交生成版本号、更新 `CHANGELOG.md` 与 `package.json`
4. 创建带有发布内容的 GitHub Release

本地验证可使用：

```bash
export GITHUB_TOKEN=<personal-access-token>
nvm exec 22.14.0 npx semantic-release --dry-run
```

> `--dry-run` 仅模拟流程，不会真正推送 tag；正式发布去掉该参数。

## 构建与部署

- 项目启用了 `next.config.mjs` 中的静态导出（`output: "export"`）
- 默认开发模式 **不启用** `basePath`，发布到 GitHub Pages 时自动使用 `/my-next-learning`
- 如需在本地模拟相同路径，可设置环境变量：

  ```bash
  NEXT_PUBLIC_ENABLE_BASEPATH=1 pnpm dev
  ```

- GitHub Actions `deploy.yml` 会在 `main` 分支构建后，把 `out/` 发布到 `gh-pages`

## 静态预览与 Nginx 工具

项目提供了一套“项目级” nginx 启停脚本，不会修改系统全局配置：

```bash
pnpm preview      # 启动，访问 http://localhost:8081/my-next-learning/
pnpm preview:stop # 停止
```

- 配置文件位于 `tools/nginx-local-project.conf`，通过 `-p tools/nginx-root` 运行，所有 pid/log 均写在仓库内
- `tools/preview-verify.sh` 会抓取首页、罗列静态资源并检查返回码，便于快速排查静态导出是否完整
- 修改页面静态资源或 Next 配置后，先运行 `pnpm build` 再执行 `pnpm preview`，确保预览使用最新导出物

## 目录速览

```
├── src
│   ├── app
│   │   ├── page.tsx                  # 首页：Tailwind/shadcn + Zustand 特性展示
│   │   └── guide/dynamic/[topic]/    # 动态路由示例（generateStaticParams）
│   ├── components
│   │   ├── feature-showcase.tsx      # Zustand store 的客户端组件
│   │   └── ui/button.tsx             # shadcn/ui 风格按钮
│   ├── lib/utils.ts                  # `cn()` 帮助函数
│   └── stores/use-feature-store.ts   # Zustand store
├── tools/                            # 项目级 nginx 配置与脚本
├── .github/workflows/                # release（semantic-release）与 deploy（gh-pages）
├── .releaserc.json                   # semantic-release 配置
└── commitlint.config.js              # 提交规范配置
```

## 开发注意事项

- 始终使用 `.nvmrc` 指定的 Node 版本运行命令，避免与 CI 环境不一致
- 所有依赖必须通过 `pnpm` 安装，勿混用 npm/yarn
- `src/app/guide/dynamic/[topic]/page.tsx` 的静态路由通过 `supportedTopics` 控制，新增主题时别忘了同步 `generateStaticParams`
- 对于新增的 API/脚本，注意不要泄露敏感凭证；GitHub Actions 仅使用内置 `GITHUB_TOKEN`
- 发布前确保 commit 记录清晰且遵循规范，避免阻断自动化流程

如有疑问，可查看各配置文件或在 Issues 中讨论。欢迎继续完善与探索！\*\*\* End Patch
