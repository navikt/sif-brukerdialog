# Copilot Instructions

This repository is a pnpm + Turborepo monorepo.

## Repository Structure

- Frontend code is primarily in `apps/**`, `apps-intern/**`, and shared frontend packages in `packages/**`.
    - `packages/core/`: v2 packages (`@sif/*`). Use these in new code.
    - `packages/legacy/`: v1 packages (`@navikt/sif-common-*`). Bug fixes only; `packages/core` must not import from here.
    - `packages/api/`: generated API types/clients (codegen).
    - `packages/tooling/`: shared tsconfig and ESLint config.
- Backend services are in `server/**` and `server-ungdomsytelse-veileder/**`.

## Scope and Ownership

- Prefer changes in one app/package at a time.
- Avoid touching shared packages unless required.

## Validation Strategy

- Run targeted tests/lint/typecheck for changed workspaces first.
- In workspaces, use available scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`, `test`) instead of assuming `lint` exists.
- Use root scripts for broader verification when needed:
    - `pnpm lint`
    - `pnpm test`

## Existing Test Setup

- Vitest is already configured across multiple apps/packages.
- Workspace aggregation is defined in `vitest.workspace.ts`.
- Do not add duplicate root test configs unless explicitly needed.

## Coding Style

- Follow local conventions in each app or package.
- Keep diffs small and avoid unrelated formatting changes.
- For links opened with `target="_blank"`, always set `rel="noopener noreferrer"`.

## Tekster og copy

- Ikke dikte opp eller formuler nye brukertekster, feilmeldinger eller labels på egen hånd.
- Bruk tekster fra eksisterende kildeapp, etablert copy i repoet eller eksplisitt oppgitt ordlyd. Ordlyd utvikleren selv legger inn i PR-diffen regnes som eksplisitt copygrunnlag.
- Ikke krev en separat kilde eller godkjenning for ny tekst i PR-diffen, og ikke kommenter bare fordi teksten ikke finnes i en annen kilde.
- Ved migrering: les kildeappen og kopier tekstene ordrett.
