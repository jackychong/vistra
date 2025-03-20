# Vistra Documents Management System

## Tech stacks

- NodeJS
- TypeScript
- React
- pnpm
- MySQL

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
```
