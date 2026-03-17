# Copilot Instructions

This repository is a Yarn 4 + Turborepo monorepo.

## Repository Structure

- Frontend code is primarily in `apps/**`, `apps-intern/**`, and shared frontend packages in `packages/**`.
- Backend services are in `server/**` and `server-ungdomsytelse-veileder/**`.

## Scope and Ownership

- Prefer changes in one app/package at a time.
- Avoid touching shared packages unless required.

## Validation Strategy

- Run targeted tests/lint/typecheck for changed workspaces first.
- In workspaces, use available scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`, `test`) instead of assuming `lint` exists.
- Use root scripts for broader verification when needed:
    - `yarn lint`
    - `yarn test`

## Existing Test Setup

- Vitest is already configured across multiple apps/packages.
- Workspace aggregation is defined in `vitest.workspace.ts`.
- Do not add duplicate root test configs unless explicitly needed.

## Coding Style

- Follow local conventions in each workspace.
- Keep diffs small and avoid unrelated formatting changes.
