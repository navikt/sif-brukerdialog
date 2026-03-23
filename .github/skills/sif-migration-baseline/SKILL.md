---
name: sif-migration-baseline
description: Lettvekts runbook for migrering av en dialog-app til ny v2 setup med sif-soknad og sif-rhf.
---

# SIF Migration Baseline Skill

## Purpose

Provide a lightweight runbook for migrating a dialog app to the new setup using `sif-soknad` and `sif-rhf`.

## When to use

- You are migrating one app to a new v2 setup.
- You need focused execution without broad monorepo refactors.
- You need to capture reusable migration knowledge while implementing.

## Scope

- Primary target: current pilot app and directly related packages.
- Use a focused workspace view, but stay in the same monorepo checkout.
- Do not refactor unrelated apps unless explicitly requested.

## Working method

1. Keep implementation changes in the pilot app first.
2. Record app-specific findings in the app migration notes.
3. Promote confirmed patterns to `docs/migration`.
4. Update this skill only with stable, reusable guidance.

## Bootstrap for new app

Use this as the default start for a new migration app before feature work.

1. Copy baseline setup from `apps/sif-demo-app` into the target app.
2. Stop the first phase at `src/main.tsx` rendering `<App />`.
3. Do not pull code from the legacy app in this phase unless explicitly requested.

### Baseline files to include

- Tooling/config: `package.json`, `vite.config.ts`, `vite.dev.config.ts`, `tsconfig.json`, `eslint.config.js`, `tailwind.config.ts`, `env.schema.ts`, `vite-env.d.ts`, `vitest.shims.d.ts`, `index.html`, `Dockerfile`.
- Storybook: `.storybook/main.ts`, `.storybook/preview.ts`, `.storybook/vitest.setup.ts`.
- Bootstrap source: `src/main.tsx`, `src/App.tsx`, `src/InitialDataLoader.tsx`, `src/useInitialData.ts`, `src/app.css`, `src/sentry/instrument.ts`, and required setup wrappers/env helpers.
- Mocking baseline: `mock/enableMocking.ts`, `mock/devAppSettings.ts`, `mock/msw/**`, and `public/mockServiceWorker.js`.

### Minimal target-app edits after copy

- Update app name and scripts in `package.json`.
- Update base path in `vite.config.ts` and `vite.dev.config.ts`.
- Update `<title>` in `index.html`.
- Update `APP` and `SCOPE` in `Dockerfile`.
- Update `BrowserRouter basename` in `App.tsx`.
- Keep all other changes minimal until App phase starts.
- Ensure base path is identical across all three places: `package.json` (`dev`/`build`), `vite.config.ts` (`base` and mock service worker rewrite), and `vite.dev.config.ts` (`base` and rewrite).

### Bootstrap pitfalls and guardrails

- After adding a new app workspace, run `yarn install` from monorepo root before running workspace scripts, so Yarn registers the new workspace in project metadata/lockfile.
- Do not run dependency install inside a single app workspace. Use root install only, to avoid local `node_modules` drift and duplicated tool types.
- Keep the placeholder `App` minimal. For UI/layout details, delegate to the dedicated Aksel references below.
- If Vite plugin type errors appear with two different `vite` paths, verify root install is used and `tsconfig.json` keeps the `"vite": ["../../node_modules/vite"]` path mapping.
- For bootstrap validation, do not run `yarn build` at monorepo root. Run build/check scripts only in the target app workspace.
- `AppErrorBoundary` must be inside `FaroProvider` in `App.tsx`, not wrapping `<App />` in `main.tsx`. Otherwise `useFaroInstance()` has no context and error logging to Faro will not work.
- `enableMocking.ts` includes ENV checks — MSW only starts when `ENV === 'development'` and `import.meta.env.MODE === 'msw'`. Do not remove these guards.
- `vite.config.ts` uses a conditional Sentry plugin that only activates when `SENTRY_AUTH_TOKEN` is present. Sentry build warnings are expected locally without the token.
- Data loading is split into `useInitialData.ts` (hook with data logic) and `InitialDataLoader.tsx` (thin component). Keep this separation when adapting.

### UI and spacing references

- Use [Aksel spacing skill](../aksel-spacing/SKILL.md) for spacing tokens, responsive layout props, and Box/VStack/HStack/HGrid patterns.
- Use `aksel-agent` for broader Aksel design-system choices beyond migration bootstrap scope.

### Bootstrap validation checklist

Run in target app workspace:

1. `yarn check:types`
2. `yarn lint:eslint`
3. `yarn build`
4. `yarn dev`
5. `yarn storybook`

Expected early-phase behavior:

- `yarn test` may fail with `No test files found` before tests are added.
- Sentry build warnings about missing auth token are expected locally unless configured.

## Dependency strategy

- Prefer using existing shared packages as-is in early steps.
- Prefer adapters in the app over copying shared code.
- Replace with `sif-soknad`/`sif-rhf` incrementally when the path is clear.
- Copy code only when there is explicit ownership and a cleanup plan.

## Validation

- Run workspace-local scripts first (for example `lint:eslint`, `lint:tsc`, `test`).
- During bootstrap phase, keep validation app-local and skip root-level build/lint/test commands.
- Run broader root checks only when needed outside bootstrap scope (`yarn lint`, `yarn test`).

## Done criteria

- Pilot app compiles and passes relevant workspace checks.
- Main migration decisions are captured in `docs/migration/decisions.md`.
- Reusable lessons are promoted from app notes to shared docs.
