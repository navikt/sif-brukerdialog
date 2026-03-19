---
applyTo: 'apps/**,apps-intern/**,packages/**,server/**,server-ungdomsytelse-veileder/**'
---

# Monorepo testing and linting

This repository uses a workspace-specific setup for linting and testing.

## Workspace map

- Frontend workspaces are `apps/**`, `apps-intern/**`, and shared frontend packages in `packages/**`.
- Backend workspaces are `server/**` and `server-ungdomsytelse-veileder/**`.

## Important

- Do not yet propose one shared root ESLint config for all workspaces.
- Do not add duplicate root Vitest config files.
- Keep existing app/package-specific config ownership.

## Linting

- ESLint config is provided through internal workspace packages and local workspace scripts.
- Prefer running lint in the affected workspace first.
- In the workspace, use available scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`) instead of assuming `lint` exists.
- Use root scripts only when broader verification is needed:
    - `yarn lint`
    - `yarn lint:eslint`
    - `yarn lint:tsc`
    - `yarn lint:fix`

## Testing

- Vitest is already configured across multiple apps/packages.
- `vitest.workspace.ts` is an aggregator, not a replacement for local test config.
- Prefer running tests in changed workspaces first, then `yarn test` for broad checks.

## Change policy

- Keep changes scoped to the touched workspace unless a cross-workspace change is explicitly requested.
- Avoid introducing global config changes to solve local workspace issues.
