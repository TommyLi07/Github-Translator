# GitHub Translator

GitHub Translator is a full-stack SaaS app that translates GitHub repository documentation into multiple languages and creates pull requests automatically.

## Features

- GitHub OAuth login and repository authorization
- Import repositories and configure translation rules
- Translate Markdown/MDX docs with AI models via OpenRouter
- Create translation pull requests automatically
- Trigger incremental translation from GitHub Webhooks
- Track translation tasks and progress in the dashboard

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Prisma + MySQL
- NextAuth
- Octokit / GitHub App API
- Tailwind CSS + Radix UI

## Project Structure

```text
src/                 Application source code
prisma/              Prisma schema and DB setup
scripts/             Local utility scripts
docs/                Additional setup and usage docs
docker/              Docker-related files
```

## Requirements

- Node.js >= 20
- pnpm (recommended)
- MySQL 8.0+
- A GitHub App
- An OpenRouter API key

## Quick Start

### 1) Install dependencies

```bash
pnpm install
```

### 2) Configure environment

```bash
cp .env.example .env
cp .env.example .env.local
```

Edit `.env` and `.env.local` with your own values.

### 3) Prepare database

```bash
pnpm run db:generate
pnpm run db:push
```

### 4) Run development server

```bash
pnpm run dev
```

Open [http://localhost:3123](http://localhost:3123).

## Environment Variables

Example variables are defined in `.env.example`.

Required:

- `DATABASE_URL`
- `NEXTAUTH_URL`
- `AUTH_SECRET`
- `GITHUB_APP_ID`
- `GITHUB_APP_CLIENT_ID`
- `GITHUB_APP_CLIENT_SECRET`
- `GITHUB_APP_PRIVATE_KEY_PATH` (or `GITHUB_APP_PRIVATE_KEY`)
- `PLATFORM_OPENROUTER_API_KEY`

## Docker

Start services:

```bash
docker-compose up -d
```

Initialize database schema:

```bash
docker-compose exec app pnpm run db:push
```

## Useful Scripts

- `pnpm run dev` - start development server
- `pnpm run build` - build production assets
- `pnpm run start` - run production server
- `pnpm run lint` - run lint checks
- `pnpm run db:generate` - generate Prisma client
- `pnpm run db:push` - sync schema to database
- `pnpm run db:migrate` - run Prisma migrations
- `pnpm run db:studio` - open Prisma Studio

## Troubleshooting

- If Prisma cannot read `DATABASE_URL`, ensure `.env` is UTF-8 encoded.
- If branch creation fails with GitHub `403`, check GitHub App installation scope and repository permissions.
- If webhook events are not processed, verify `GITHUB_WEBHOOK_SECRET` and callback URL.

## Security Notes

- Never commit `.env` or private key files.
- Rotate API keys immediately if they are exposed.

## Contributing

1. Create a feature branch from `main`
2. Commit changes with conventional commit messages
3. Open a pull request with a clear test plan

## License

For personal learning and development use. Add your preferred license if you plan to open source publicly.
