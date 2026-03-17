# AGENTS.md

## Repository Overview

Monorepo for selvbetjeningsdialoger og fellespakker i Sykdom i familien.

## Repository Structure

- Frontend code is in `apps/**`, `apps-intern/**`, and shared packages in `packages/**`.
- Backend services are in `server/**` and `server-ungdomsytelse-veileder/**`.

## Tech Stack

- TypeScript and JavaScript
- React and Next.js apps
- Yarn 4 workspaces
- Turborepo
- Vitest

## Build and Test Commands

```bash
yarn install --immutable
yarn build
yarn lint
yarn test
```

For targeted work, run commands from the affected workspace where possible.

## Working Rules

- Follow existing patterns in each app or package.
- Prefer minimal, focused changes.
- Run relevant workspace tests before broad test runs.
- Reuse existing lint and typecheck scripts.

## Boundaries

### Always

- Keep changes scoped to the requested area.
- Keep configuration consistent with Yarn 4 and Turbo.

### Ask First

- New dependencies
- Cross-workspace refactors
- Changes to deployment workflows

### Never

- Commit secrets
- Disable tests or lint checks to make CI pass
