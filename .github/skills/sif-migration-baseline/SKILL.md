---
name: sif-migration-baseline
description: Lettvekts runbook for migrering av en dialog-app til ny v2 setup med sif-soknad og sif-rhf.
---

# sif-migration-baseline Skill

## Formål

Lettvekts runbook for inkrementell migrering av en dialog-app til nytt v2-oppsett med `sif-soknad` og `sif-rhf`.

## Når skal skillen brukes

- Du starter migrering av én app til v2-oppsett.
- Du trenger fokusert gjennomføring uten brede monorepo-refaktoreringer.
- Du vil fange opp gjenbrukbare mønstre underveis.

## Avgrensning

- Primærmål: én app av gangen og direkte relaterte pakker.
- Hold deg i samme monorepo-checkout, men arbeid i én workspace om gangen.
- Refaktorer ikke urelaterte apper med mindre det er eksplisitt bedt om.

## Arbeidsmodus

1. Hold implementasjonsendringer i pilotappen først.
2. Noter appspesifikke funn i migreringsnotater for appen.
3. Løft bekreftede mønstre videre til `docs/migration`.
4. Oppdater denne skillen bare med stabil, gjenbrukbar veiledning.

## Regler for tekster i migrering

- Behold eksisterende brukertekster uendret gjennom migreringen.
- Ikke omskriv, forbedre, forkorte eller moderniser tekster som del av migreringsarbeidet.
- Verifiser eksplisitt at tekster i målappen samsvarer med kildeappen etter migrering av sider og steg.
- Endre tekster bare når ny komponentstruktur eller nytt funksjonelt innhold gjør det nødvendig.
- Hvis nye tekster er strengt nødvendige, skal de hentes fra eksisterende kildeapp, etablert copy eller eksplisitt brukerbestilling.
- AI skal ikke finne på eller forfatte nye tekster på egen hånd i migreringsoppgaver.

## Regler for validering i migrering

- Alle valideringsparametere fra kildeappen (minLength, maxLength, disallowedValues, disallowInvalidBackendCharacters, etc.) **må** overføres identisk til målappen.
- Sammenlign validator-kall felt for felt mellom kilde og mål. Sjekk spesielt:
  - `getStringValidator` — minLength, maxLength, disallowInvalidBackendCharacters
  - `getFødselsnummerValidator` — disallowedValues (f.eks. søkers eget fnr), allowHnr
  - `getDateValidator` — min, max
- For hvert felt: alle mulige error-koder fra validatoren **må** ha tilhørende i18n-nøkkel i `nb.ts` og `nn.ts`. Sjekk feilkode-enumen i `packages/sif-validation/src/get*Validator.ts` mot nøklene i kildeappen.
- Ikke fjern validering under migrering. Strengere validering kan bare legges til med eksplisitt bestilling.

## Regler for tester i migrering

- Når kildeappen har tester for utility-funksjoner som overføres til målappen, **må** testene også overføres.
- Tilpass import-stier og vitest-importmønster til målappens oppsett (f.eks. eksplisitt `import { describe, expect, it, vi } from 'vitest'` hvis appen ikke bruker globals).
- Dropp tester kun når funksjonen de tester er fjernet eller erstattet med en annen mekanisme.
- Sjekk `__tests__/`-mapper og `.test.ts`-filer i kildeappens steg-mapper som del av steg-migrering.

## Regler for komponentvalg i migrering

- Ikke importer fra gamle pakker (`@navikt/sif-common-core-ds`, `@navikt/sif-common-formik-ds`, `@navikt/sif-common-ui`). Bruk Aksel-komponenter (`@navikt/ds-react`) eller pakker fra `@sif/*` i stedet.
- Vanlige erstatninger: `ExpandableInfo` → `ReadMore` fra `@navikt/ds-react`.

## Bootstrap for new app

Bruk dette som standard startpunkt for en ny migreringsapp før funksjonelt arbeid.

1. Kopier baseline-oppsett fra `apps/sif-demo-app` inn i målappen.
2. Stopp første fase ved `src/main.tsx` som renderer `<App />`.
3. Ikke trekk inn kode fra legacy-appen i denne fasen uten eksplisitt bestilling.

Etter bootstrap:

1. Bruk `sif-soknad-setup` for appens setup-lag under `src/app/setup`.
2. Bruk `sif-initial-data-loader` for `useInitialData.ts` og `InitialDataLoader.tsx`.
3. Bruk `sif-soknad-setup` (seksjonen "Routing shell og pages") for `Soknad.tsx`, `VelkommenPage`, `KvitteringPage` og `steps/index.ts`.
4. Bruk `sif-soknad-add-step` og `sif-soknad-modify-step` for steg-arbeid.
5. Ta i18n-opprydding (nynorsk, nøkkelrydding) **etter** at alle steg er implementert, ikke før. Begrunnelse: stegarbeidet avdekker hvilke nøkler som faktisk trengs og reduserer placeholder-støy.
6. Når steg eller sider flyttes til nytt oppsett, sammenlign tekstinnholdet mot kildeappen og korriger avvik før oppgaven regnes som ferdig.

> Skill-rekkefølge per mottaksapp: `sif-migration-baseline` → `sif-soknad-setup` → `sif-initial-data-loader` → `sif-soknad-setup` (routing shell) → `sif-soknad-add-step` (x N steg) → `sif-intl`.

### Baseline files to include

- Tooling/config: `package.json`, `vite.config.ts`, `vite.dev.config.ts`, `tsconfig.json`, `eslint.config.js`, `tailwind.config.ts`, `env.schema.ts`, `vite-env.d.ts`, `vitest.shims.d.ts`, `index.html`, `Dockerfile`.
- Storybook: `.storybook/main.ts`, `.storybook/preview.ts`, `.storybook/vitest.setup.ts`.
- Bootstrap source: `src/main.tsx`, `src/App.tsx`, `src/InitialDataLoader.tsx`, `src/useInitialData.ts`, `src/app.css`, `src/sentry/instrument.ts`, and required setup wrappers/env helpers.
- Demo/local source: `src/demo/ScenarioHeader.tsx` når appen har mock/scenario-støtte og `VELG_SCENARIO` brukes lokalt.
- Mocking baseline: `mock/enableMocking.ts`, `mock/devAppSettings.ts`, `mock/msw/**`, and `public/mockServiceWorker.js`.

### Minimal target-app edits after copy

- Update app name and scripts in `package.json`.
- Update base path in `vite.config.ts` and `vite.dev.config.ts`.
- Update `<title>` in `index.html`.
- Update `APP` and `SCOPE` in `Dockerfile`.
- Update `BrowserRouter basename` in `App.tsx`.
- Behold lokal/demo-scenariovelger når appen har mockdata og `VELG_SCENARIO`; oppdater bare tittel, scenario-grupper og `PUBLIC_PATH`.
- Keep all other changes minimal until App phase starts.
- Ensure base path is identical across all three places: `package.json` (`dev`/`build`), `vite.config.ts` (`base` and mock service worker rewrite), and `vite.dev.config.ts` (`base` and rewrite).

### Lokal/demo-scenariovelger er del av baseline

For søknadsapper med mock/scenario-oppsett skal en synlig scenariovelger være del av lokal/demo-opplevelsen.

Dette gir tre gevinster:

- utviklere kan bytte mocktilstand uten å redigere kode eller localStorage manuelt
- referanseapper viser hele scenario-mønsteret, ikke bare dataformatene
- Playwright og manuell verifisering bruker samme scenarioinfrastruktur

Bruk mønsteret fra `src/demo/ScenarioHeader.tsx`:

- bygg UI med `ScenarioSelectorHeader` fra `@sif/soknad-ui`
- les scenario-typer fra `mock/scenarios/types.ts`
- oppdater scenario via `store.setScenario(...)`
- naviger til `PUBLIC_PATH` og reload appen etter scenario-bytte
- la komponenten returnere `null` i prod

Når appen bruker `BrowserRouter`, plasser scenariovelgeren i `App.tsx` inne i routeren og over `InitialDataLoader` eller tilsvarende app-shell.

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

| Fil                               | Hva som er app-spesifikt                                                         | Aksjon                                                                              |
| --------------------------------- | -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `mock/scenarios/types.ts`         | API-import for kildeappens spesifikke data (f.eks. `KontonummerDto` fra ung-api) | Fjern import og felt som ikke finnes i målappen                                     |
| `mock/scenarios/scenarioer.ts`    | Scenariodata med app-spesifikke felt                                             | Fjern app-spesifikke felt (f.eks. `kontonummer`)                                    |
| `mock/msw/handlers.ts`            | App-spesifikke endepunkter (f.eks. `/deltaker/hent-kontonummer`, `/api/send`)    | Erstatt med målappens endepunkter (f.eks. `/omsorgspenger-utvidet-rett/innsending`) |
| `mock/state/localStorageStore.ts` | Storage-nøkler med kildeappens prefiks (f.eks. `AKT_SOKNAD_*`)                   | Oppdater til målappens prefiks (f.eks. `OMP_SOKNAD_*`)                              |

### Opprydding av Playwright-tester

Playwright-tester fra kildeappen tester kildeappens steg og skal **ikke** beholdes. Tøm testfilene med en kommentar:

```ts
// Playwright-tester skrives etter at søknaden er ferdig implementert.
```

Testene skrives på nytt etter at alle søknadssteg er implementert.

Ved baseline-kopi må også Playwright-oppsettet vaskes for kildeapp-spesifikke paths og nøkler:

- `playwright.config.ts`: oppdater `use.baseURL` og `webServer.url` til målappens `PUBLIC_PATH`.
- `vite.e2e.config.ts`: oppdater `base` og `server.proxy['/mockServiceWorker.js'].rewrite` til målappens path.
- `playwright/utils/scenario.ts`: sørg for at `SCENARIO_KEY` matcher nøkkelen i `mock/state/localStorageStore.ts`.

### Oppdater nais/-konfigurasjon

Nais-filene (`nais/dev-gcp.json`, `nais/prod-gcp.json`) inneholder kildeappens:

- `app`-navn og `ingresses`
- `accessPolicyOutApps` (backend-avhengigheter)
- Alle env-variabler inkl. paths, scopes og URLs

Bruk gammel app i samme repo som referanse for korrekte verdier. Husk at `accessPolicyOutApps` må matche de API-klientene som initialiseres i `initApiClients.ts`.

### Aktivitetspenger-spesifikke referanser som må byttes ut

Når baseline kopieres fra `aktivitetspenger-soknad`, inneholder disse filene app-spesifikke referanser som **alltid** må oppdateres:

| Fil                                   | Hva som er aktivitetspenger-spesifikt                    | Hva det byttes med                                                                                      |
| ------------------------------------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `src/sentry/instrument.ts`            | `tags: { application: 'aktivitetspenger-soknad' }`       | Bytt til appnavnet for målappen (f.eks. `omsorgspengesoknad-v2`)                                        |
| `nais/dev-gcp.json`                   | `ingresses` og `SIF_PUBLIC_LOGIN_URL` med `aktivitetspenger-soknad`-hostname | Bytt til målappens hostname (f.eks. `omsorgspengesoknad.intern.dev.nav.no`) |
| `nais/prod-gcp.json`                  | `ingresses` og `SIF_PUBLIC_LOGIN_URL` med `aktivitetspenger-soknad`-hostname | Bytt til målappens prod-hostname                                            |
| `env.schema.ts`                       | `ungDeltakelseOpplyserEnvSchema`                         | Riktig schema for målappen (f.eks. `k9SakInnsynEnvSchema`)                                              |
| `src/app/setup/env/appEnv.ts`         | `getUngDeltakelseOpplyserBrowserEnv()`                   | Riktig env-helper (f.eks. `getK9SakInnsynEnv()`)                                                        |
| `src/app/api/initApiClients.ts`       | `initUngDeltakelseOpplyserApiDeltakerClient`             | Riktig klient-init for målappen                                                                         |
| `package.json`                        | `@navikt/ung-deltakelse-opplyser-api-deltaker`           | Riktig API-pakke for målappen                                                                           |
| `src/App.tsx`                         | `AktivitetspengerApp` fra `@navikt/sif-app-register`     | Riktig app-oppføring                                                                                    |
| `src/App.tsx`                         | `appEnv.SIF_PUBLIC_USE_FARO`                             | `SIF_PUBLIC_USE_FARO` finnes ikke i `commonEnvSchema` — sett `isActive={false}` til Faro er konfigurert |
| `playwright.config.ts`                | `baseURL` og `webServer.url` for aktivitetspenger        | Bytt til målappens `PUBLIC_PATH`                                                                        |
| `vite.e2e.config.ts`                  | `base` og MSW-rewrite for aktivitetspenger               | Bytt til målappens path og `mockServiceWorker.js`-rewrite                                               |
| `playwright/playwrightAppSettings.ts` | Stale env-nøkler som ikke finnes i ny `AppEnv`           | Fjern nøkler som ikke er i ny `appEnvSchema`                                                            |
| `playwright/utils/scenario.ts`        | Feil `SCENARIO_KEY` fra kildeappen                       | Må matche `mock/state/localStorageStore.ts` i målappen                                                  |
| `mock/devAppSettings.ts`              | Alle paths og env-verdier fra aktivitetspenger           | Oppdater med korrekte paths for målappen                                                                |
| `src/app/lenker.ts`                   | Aktivitetspenger-spesifikke lenker (f.eks. Skatteetaten) | Erstatt med tomme plassholdere; behold default export til eksisterende step-filer kompilerer            |

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

## Avhengighetsstrategi

- Prefer using existing shared packages as-is in early steps.
- Prefer adapters in the app over copying shared code.
- Replace with `sif-soknad`/`sif-rhf` incrementally when the path is clear.
- Copy code only when there is explicit ownership and a cleanup plan.

## Validering

- Run workspace-local scripts first (for example `lint:eslint`, `lint:tsc`, `test`).
- During bootstrap phase, keep validation app-local and skip root-level build/lint/test commands.
- Run broader root checks only when needed outside bootstrap scope (`yarn lint`, `yarn test`).

## Ferdigkriterier

- Pilot app compiles and passes relevant workspace checks.
- Main migration decisions are captured in `docs/migration/decisions.md`.
- Reusable lessons are promoted from app notes to shared docs.
