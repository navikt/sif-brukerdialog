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

After bootstrap:

1. Use `sif-soknad-setup` for the app setup layer under `src/app/setup`.
2. Use `sif-initial-data-loader` for `useInitialData.ts` and `InitialDataLoader.tsx`.
3. Use `sif-soknad-pages` for `Soknad.tsx`, `VelkommenPage`, `KvitteringPage` and `steps/index.ts`.
4. Use `sif-soknad-add-step` and `sif-soknad-modify-step` for step work.
5. Do i18n cleanup (nynorsk, nøkkelrydding) **after** all steps are implemented — not before. Reason: step implementation reveals the exact keys needed, avoiding placeholder churn.

> Skill-rekkefølge per mottaksapp: `sif-migration-baseline` → `sif-soknad-setup` → `sif-initial-data-loader` → `sif-soknad-pages` → `sif-soknad-add-step` (x N steg) → `sif-intl`.

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

### Slett domenekode fra kildeappen umiddelbart

Når baseline kopieres fra en eksisterende app (f.eks. `aktivitetspenger-soknad`), følger all domenekode med. Denne skal **slettes umiddelbart** — den er ikke baseline, den er støy.

Slett følgende med én `rm -rf`-kommando:

```bash
rm -rf src/app/steps src/app/types src/app/utils src/app/hooks src/app/pages src/app/Soknad.tsx
```

Behold:
- `src/app/setup/` — rammeverkskode (tilpasses i fase 2)
- `src/app/i18n/` — struktur beholdes, innhold erstattes
- `src/App.tsx`, `src/main.tsx`, `src/InitialDataLoader.tsx`, `src/useInitialData.ts` — rewrites i fase 2/3

Etter sletting vil `check:types` gi feil fra `setup/`-filer som peker på slettede typer. Det er forventet og riktig — disse er arbeidsplanen for fase 2.

### Opprydding av mock etter domenekode-sletting

Når domenekode er slettet, må mock tilpasses parallelt:

| Fil | Hva som er app-spesifikt | Aksjon |
|---|---|---|
| `mock/scenarios/types.ts` | API-import for kildeappens spesifikke data (f.eks. `KontonummerDto` fra ung-api) | Fjern import og felt som ikke finnes i målappen |
| `mock/scenarios/scenarioer.ts` | Scenariodata med app-spesifikke felt | Fjern app-spesifikke felt (f.eks. `kontonummer`) |
| `mock/msw/handlers.ts` | App-spesifikke endepunkter (f.eks. `/deltaker/hent-kontonummer`, `/api/send`) | Erstatt med målappens endepunkter (f.eks. `/omsorgspenger-utvidet-rett/innsending`) |
| `mock/state/localStorageStore.ts` | Storage-nøkler med kildeappens prefiks (f.eks. `AKT_SOKNAD_*`) | Oppdater til målappens prefiks (f.eks. `OMP_SOKNAD_*`) |

### Opprydding av Playwright-tester

Playwright-tester fra kildeappen tester kildeappens steg og skal **ikke** beholdes. Tøm testfilene med en kommentar:

```ts
// Playwright-tester skrives etter at søknaden er ferdig implementert.
```

Testene skrives på nytt etter at alle søknadssteg er implementert.

### Oppdater nais/-konfigurasjon

Nais-filene (`nais/dev-gcp.json`, `nais/prod-gcp.json`) inneholder kildeappens:
- `app`-navn og `ingresses`
- `accessPolicyOutApps` (backend-avhengigheter)
- Alle env-variabler inkl. paths, scopes og URLs

Bruk gammel app i samme repo som referanse for korrekte verdier. Husk at `accessPolicyOutApps` må matche de API-klientene som initialiseres i `initApiClients.ts`.

### Aktivitetspenger-spesifikke referanser som må byttes ut

Når baseline kopieres fra `aktivitetspenger-soknad`, inneholder disse filene app-spesifikke referanser som **alltid** må oppdateres:

| Fil | Hva som er aktivitetspenger-spesifikt | Hva det byttes med |
|---|---|---|
| `env.schema.ts` | `ungDeltakelseOpplyserEnvSchema` | Riktig schema for målappen (f.eks. `k9SakInnsynEnvSchema`) |
| `src/app/setup/env/appEnv.ts` | `getUngDeltakelseOpplyserBrowserEnv()` | Riktig env-helper (f.eks. `getK9SakInnsynEnv()`) |
| `src/app/api/initApiClients.ts` | `initUngDeltakelseOpplyserApiDeltakerClient` | Riktig klient-init for målappen |
| `package.json` | `@navikt/ung-deltakelse-opplyser-api-deltaker` | Riktig API-pakke for målappen |
| `src/App.tsx` | `AktivitetspengerApp` fra `@navikt/sif-app-register` | Riktig app-oppføring |
| `src/App.tsx` | `appEnv.SIF_PUBLIC_USE_FARO` | `SIF_PUBLIC_USE_FARO` finnes ikke i `commonEnvSchema` — sett `isActive={false}` til Faro er konfigurert |
| `playwright/playwrightAppSettings.ts` | Stale env-nøkler som ikke finnes i ny `AppEnv` | Fjern nøkler som ikke er i ny `appEnvSchema` |
| `mock/devAppSettings.ts` | Alle paths og env-verdier fra aktivitetspenger | Oppdater med korrekte paths for målappen |
| `src/app/lenker.ts` | Aktivitetspenger-spesifikke lenker (f.eks. Skatteetaten) | Erstatt med tomme plassholdere; behold default export til eksisterende step-filer kompilerer |

Gjør alle disse endringene i én operasjon med `multi_replace_string_in_file` før første `check:types`.

### Bootstrap pitfalls and guardrails

- After adding a new app workspace, run `yarn install` from monorepo root before running workspace scripts, so Yarn registers the new workspace in project metadata/lockfile.
- Do not run dependency install inside a single app workspace. Use root install only, to avoid local `node_modules` drift and duplicated tool types.
- Keep the placeholder `App` minimal. For UI/layout details, delegate to the dedicated Aksel references below.
- If Vite plugin type errors appear with two different `vite` paths, verify root install is used and `tsconfig.json` keeps the `"vite": ["../../node_modules/vite"]` path mapping.
- For bootstrap validation, do not run `yarn build` at monorepo root. Run build/check scripts only in the target app workspace.
- `AppErrorBoundary` must be inside `FaroProvider` in `App.tsx`, not wrapping `<App />` in `main.tsx`. Otherwise `useFaroInstance()` has no context and error logging to Faro will not work.
- `enableMocking.ts` includes ENV checks — MSW only starts when `ENV === 'development'` and `import.meta.env.MODE === 'msw'`. Do not remove these guards.
- `vite.config.ts` uses a conditional Sentry plugin that only activates when `SENTRY_AUTH_TOKEN` is present. Sentry build warnings are expected locally without the token.
- Data loading is split into `useInitialData.ts` (hook with data logic) and `InitialDataLoader.tsx` (thin component). Keep this separation when adapting, and delegate detailed guidance to `sif-initial-data-loader`.

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
