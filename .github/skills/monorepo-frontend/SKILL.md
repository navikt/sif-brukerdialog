---
name: monorepo-frontend
description: Repository-spesifikk frontend-veiledning for apps og packages i Yarn 4 + Turborepo monorepoet.
---

# Monorepo Frontend Skill

## Purpose

Provide repository-specific guidance for frontend work across many dialog apps in this Yarn 4 + Turborepo monorepo.

## When to use

- You are changing frontend code in `apps/**`, `apps-intern/**`, or shared frontend packages in `packages/**`.
- You need to choose correct validation commands.
- You need to keep changes workspace-scoped.

## Repository facts

- Two Next.js apps exist in `apps/dine-pleiepenger` and `apps/omsorgsdager-kalkulator`.
- Most other dialog apps are React apps using Vite.
- Shared frontend code also lives in `packages/**`.
- Backend services are in `server/**` and `server-ungdomsytelse-veileder/**` and should only be touched when explicitly requested.
- Aksel is the shared design system across apps.
- Vitest is configured per workspace and aggregated through `vitest.workspace.ts`.
- Lint/test execution is typically workspace-first, root-second.

## Working playbook

1. Identify target workspace and app type.
2. Read nearby code to match local patterns.
3. Make minimal changes in that workspace.
4. Run targeted checks for changed workspace.
5. Run broader root checks only when needed.

## Command guidance

- In the workspace, use available scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`, `test`) instead of assuming `lint` exists.
- Broad checks:
    - `yarn lint`
    - `yarn test`
- Prefer workspace-local scripts when available.

## Guardrails

- Do not centralize all lint/test config into one root config.
- Do not create duplicate root Vitest config.
- Do not introduce alternate UI frameworks when Aksel is already used.
- Use ASCII-only names for files and folders. Do not create new file or directory names containing `æ`, `ø`, or `å`.
