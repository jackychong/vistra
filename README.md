# Vistra Documents Management System

## Tech stacks

- NodeJS
- TypeScript
- React
- pnpm
- MySQL
- NextJS
- Material UI
- express.js

## Setup

This is a monorepo, consists of backend and frontend packages.

## Local Development

Use `Docker` and `docker-compose.yml` for local development

### Setup

1. Make sure that you have `Docker` installed
2. Run `docker compose up -d`
3. Install dependencies

```
docker compose exec root pnpm install
```

### How to use

```
# Linting
docker compose exec root pnpm lint

# Format with prettier
docker compose exec root pnpm format

# Run any command in frontend container
docker compose exec frontend pnpm frontend <command>

# Run any command in backend container
docker compose exec backend pnpm backend <command>
```

## Database

Make sure you have MySQL 8 installed and running on your machine.

```
# Migration
docker compose exec backend pnpm backend migrate
docker compose exec backend pnpm backend migrate:down
docker compose exec backend pnpm backend migrate:down-all

# Seeding
docker compose exec backend pnpm backend seed
docker compose exec backend pnpm backend seed:down
docker compose exec backend pnpm backend seed:down-all

```
