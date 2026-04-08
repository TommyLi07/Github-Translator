# GitHub Translator

**一站式 GitHub 仓库多语言翻译 SaaS** — 将仓库文档翻译成多种语言，并通过 Pull Request 与 Webhook 驱动增量更新。

English: A full-stack app that translates repository documentation into multiple languages using AI, with GitHub App auth, OpenRouter, and an operator dashboard.

## Features

- **GitHub App + OAuth** — Install the app, selective repo access, secure tokens
- **Repo import & config** — Base/target languages, path include/exclude, model selection
- **AI translation** — OpenRouter-backed Markdown workflow
- **Automation** — Open PRs for translations; optional push webhooks for incremental runs
- **Dashboard** — Tasks, progress, and API key management

## Tech stack

| Layer      | Packages (major versions)                                                          |
| ---------- | ---------------------------------------------------------------------------------- |
| Framework  | **Next.js 16**, **React 19**, TypeScript 5                                         |
| UI         | Tailwind CSS 4, Radix UI, **lucide-react** 1.x                                     |
| Compiler   | **React Compiler** (`babel-plugin-react-compiler`, `reactCompiler` in Next config) |
| Data       | **Prisma ORM 7**, MySQL via **`@prisma/adapter-mariadb`** + `mariadb` driver       |
| Auth       | NextAuth.js 5 (beta), `@auth/prisma-adapter`                                       |
| GitHub     | `octokit`, `@octokit/app`                                                          |
| Validation | **Zod 4**                                                                          |
| Tooling    | ESLint 9, Prettier 3, `pnpm`                                                       |

Prisma 7 uses a root **`prisma.config.ts`** (database URL, migrations path) and generates the client into **`generated/prisma`** (gitignored). The app imports `PrismaClient` from that output and wires the MariaDB adapter in `src/lib/db.ts`.

## Requirements

- **Node.js** ≥ 20 (≥ **20.19** recommended for Prisma 7)
- **pnpm** ≥ 10
- **MySQL** 8.x (or compatible MariaDB)
- A **GitHub App** (credentials + webhook secret as needed)
- An **OpenRouter** API key for platform-managed calls (or user-supplied keys where supported)

## Quick start

### 1. Install

```bash
pnpm install
```

`pnpm run build` runs **`prisma generate`** before `next build`, so the client is created automatically for production builds. For local work you can still run:

```bash
pnpm run db:generate
```

### 2. Environment

```bash
cp .env.example .env
cp .env.example .env.local
```

Edit both files. See **Environment variables** below and inline comments in `.env.example`.

### 3. Database

```bash
pnpm run db:push
# or: pnpm run db:migrate
```

### 4. Dev server

```bash
pnpm run dev
```

App URL: [http://localhost:3123](http://localhost:3123) (see `package.json` scripts).

## Environment variables

Defined in **`.env.example`**. Commonly required:

| Variable                                                  | Purpose                                                    |
| --------------------------------------------------------- | ---------------------------------------------------------- |
| `DATABASE_URL`                                            | MySQL connection string (`mysql://…`)                      |
| `NEXTAUTH_URL`                                            | Public app URL (e.g. `http://localhost:3123`)              |
| `AUTH_SECRET`                                             | NextAuth secret (also `NEXTAUTH_SECRET` supported in code) |
| `GITHUB_APP_ID`                                           | GitHub App ID                                              |
| `GITHUB_APP_CLIENT_ID` / `GITHUB_APP_CLIENT_SECRET`       | OAuth-style app credentials                                |
| `GITHUB_APP_PRIVATE_KEY_PATH` or `GITHUB_APP_PRIVATE_KEY` | PEM for GitHub App JWT                                     |
| `GITHUB_WEBHOOK_SECRET`                                   | Verify incoming webhooks (if used)                         |
| `PLATFORM_OPENROUTER_API_KEY`                             | Server-side OpenRouter key                                 |

The codebase also accepts **`AUTH_GITHUB_ID`** / **`AUTH_GITHUB_SECRET`** as aliases for GitHub OAuth client fields.

Never commit `.env`, `.env.local`, or `private-key.pem`.

## Scripts

| Command                | Description                                                                               |
| ---------------------- | ----------------------------------------------------------------------------------------- |
| `pnpm run dev`         | Next.js dev server (port **3123**)                                                        |
| `pnpm run build`       | `prisma generate` + production build                                                      |
| `pnpm run start`       | Production server                                                                         |
| `pnpm run format`      | Prettier over the repo                                                                    |
| `pnpm run lint`        | ESLint via Next (CLI behavior may differ on Next 16 — prefer `eslint` directly if needed) |
| `pnpm run db:generate` | Generate Prisma Client → `generated/prisma`                                               |
| `pnpm run db:push`     | Push schema to DB                                                                         |
| `pnpm run db:migrate`  | Create/apply migrations                                                                   |
| `pnpm run db:studio`   | Prisma Studio                                                                             |

## Project layout

```text
prisma/              Schema (datasource without URL — URL lives in prisma.config.ts)
prisma.config.ts     Prisma CLI config (migrations, DATABASE_URL)
src/app/             Next.js App Router (pages + API routes)
src/components/      UI and layout
src/lib/             DB, GitHub, OpenRouter, translation engine, etc.
generated/prisma/    Prisma Client output (generated, gitignored)
docs/                Extra Chinese/technical docs
docker/              Docker helpers
```

## Docker

```bash
docker-compose up -d
```

Then apply schema (example):

```bash
docker-compose exec app pnpm run db:push
```

Adjust service names and paths to match your `docker-compose.yml`.

## Troubleshooting

- **Prisma / `DATABASE_URL`** — Ensure `.env` is loaded; `prisma.config.ts` uses `dotenv` for CLI. UTF-8 encoding avoids parse issues.
- **Generated client missing** — Run `pnpm run db:generate` or `pnpm run build`.
- **GitHub `403` on branches or content** — Check GitHub App installation and repository permissions.
- **Webhooks ignored** — Confirm `GITHUB_WEBHOOK_SECRET` and the callback URL registered on the app.
- **pnpm “ignored build scripts” for Prisma** — Run `pnpm approve-builds` and allow `prisma` if installs skip postinstall hooks.

## Security

- Rotate keys if exposed; restrict GitHub App to needed repositories.
- Keep private keys and env files out of git (see `.gitignore`).

## Contributing

1. Branch from `main`
2. Use clear commit messages (e.g. Conventional Commits)
3. Open a PR with a short test plan

## License

Personal learning and development. Add a SPDX license if you publish publicly.
