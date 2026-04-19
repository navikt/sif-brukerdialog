---
name: sif-migration-baseline
description: Lettvekts runbook for migrering av en dialog-app til ny v2 setup med sif-soknad og sif-rhf.
---

# sif-migration-baseline

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
  - `getDateRangeValidator` — min, max, toDate, fromDate (resolved verdier)
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

## Migrering av dialoger til `sif-soknad-forms`

Dialoger fra `sif-common-forms-ds/src/forms/` migreres til `sif-soknad-forms/src/dialogs/`. Bruk `sif-formik-to-rhf` (seksjonen «Dialogkomponenter i sif-soknad-forms») for det tekniske mønsteret.

### Sjekkliste per dialog

Sammenlign Formik-originalen i `sif-common-forms-ds` med RHF-varianten i `sif-soknad-forms`:

- [ ] **Tekster**: Alle labels, legends og descriptions matcher originalen ordrett
- [ ] **Validatorparametere**: `required`, `min`, `max`, `minLength`, `maxLength` etc. er identiske
- [ ] **Feilkoder → i18n**: Alle mulige feilkoder fra hver validator har nøkkel i `nb.ts` og `nn.ts`
- [ ] **Interpolasjon**: Feilmeldinger sender samme interpolasjonsverdier som originalen
- [ ] **Sammensatt validering**: Når originalen kombinerer props, feltverdier eller andre avhengigheter, beholdes samme logikk
- [ ] **Locale**: Locale-avhengig presentasjon følger originalen
- [ ] **nn.ts**: Typet med `Record<keyof typeof nb, string>`, ingen spread fra `nb`
- [ ] **Props-paritet**: Props, inkludert hva som er optional og obligatorisk, matcher originalen

## appEnv-singleton

`appEnv.ts` i v2-apper eksporterer typisk bare hjelperfunksjonen `getAppEnv()`, ikke en forhåndskalt singleton. Komponenter som trenger env-verdier direkte (f.eks. en lenke til MinSide) vil derfor feile ved import.

Legg til en singleton-eksport i `src/app/setup/env/appEnv.ts` etter at env-schema er satt opp:

```ts
export const appEnv = getAppEnv();
```

Dette gjøres én gang per app og gir komponentene en stabil, typesikker tilgang til env-variabler uten å kalle `getAppEnv()` hver gang.

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

### Minste nødvendige endringer i målappen etter kopiering

- Oppdater appnavn og scripts i `package.json`.
- Oppdater base path i `vite.config.ts` og `vite.dev.config.ts`.
- Oppdater `<title>` i `index.html`.
- Oppdater `APP` og `SCOPE` i `Dockerfile`.
- Oppdater `BrowserRouter basename` i `App.tsx`.
- Behold lokal/demo-scenariovelger når appen har mockdata og `VELG_SCENARIO`; oppdater bare tittel, scenario-grupper og `PUBLIC_PATH`.
- Hold alle andre endringer minimale til App-fasen starter.
- Sørg for at base path er identisk i alle tre steder: `package.json` (`dev`/`build`), `vite.config.ts` (`base` og mock service worker-rewrite), og `vite.dev.config.ts` (`base` og rewrite).

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

### Legg til nye scenarioer i ScenarioHeader

Når et nytt scenario legges til i `mock/scenarios/types.ts` og `mock/scenarios/scenarioer.ts`, **må** det også registreres i `src/demo/ScenarioHeader.tsx`:

1. Legg til et nytt objekt i riktig gruppe under `scenarioGroups` (eller opprett en ny gruppe om det passer bedre).
2. Bruk `ScenarioType.<nyttScenario>` som `value` og en kort, beskrivende `label`.

```ts
{
    value: ScenarioType.toBarnMedVedtak,
    label: 'To barn — ett med vedtak',
},
```

Scenarioet er ikke tilgjengelig for manuell testing eller Playwright før dette er gjort.

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
| `src/app/lenker.ts`                   | App-lokale eksterne lenker                                | Migrer selve lenkene til `@sif/soknad-ui/lenker`; behold gjerne `src/app/lenker.ts` som en tynn app-adapter for ergonomi (`useLenker`, `getLenke`). Gi nøklene selvforklarende navn som `navMinSide` og `omsorgspengerEttersending` |

Gjør alle disse endringene i én operasjon med `multi_replace_string_in_file` før første `check:types`.

### Fallgruver og føringer i bootstrap-fasen

- Etter at du har lagt til en ny app-workspace, kjør `yarn install` fra monorepo-roten før du kjører workspace-scripts, slik at Yarn registrerer den nye workspacen i prosjektmetadata/lockfile.
- Ikke kjør dependency-install inne i en enkelt app-workspace. Bruk kun install fra rot, for å unngå lokal `node_modules`-drift og dupliserte verktøytyper.
- Hold placeholder-`App` minimal. For UI/layout-detaljer, bruk Aksel-referansene nedenfor.
- Hvis Vite-plugin-typefeil dukker opp med to ulike `vite`-paths, verifiser at root-install er brukt og at `tsconfig.json` beholder path-mappingen `"vite": ["../../node_modules/vite"]`.
- For bootstrap-validering, ikke kjør `yarn build` i monorepo-roten. Kjør build/check-scripts kun i målappens workspace.
- `AppErrorBoundary` må ligge inni `FaroProvider` i `App.tsx`, ikke rundt `<App />` i `main.tsx`. Ellers har `useFaroInstance()` ingen context, og feillogging til Faro vil ikke fungere.
- `AppErrorBoundary` bruker en ren React ErrorBoundary med Faro-logging — ikke `SentryErrorBoundary`. Sentry-feilrapportering dekkes av `reactErrorHandler()` i `main.tsx` (`onUncaughtError`/`onCaughtError`/`onRecoverableError`), slik at feil ikke dobbeltrapporteres.
- `main.tsx` skal være ren: `sentry/instrument` → `reactErrorHandler` → `<App />`. Ingen providers eller error boundaries i `main.tsx`.
- `initApiClients()` skal kalles synkront i `App`-komponenten (etter `getAppEnv()`, før render), ikke i `useEffect`. Queries i `InitialDataLoader` kjører ved første render og trenger konfigurerte klienter.
- Env-feil fra `getAppEnv()` fanges av `reactErrorHandler` (Sentry). Faro er utilgjengelig for env-feil siden `FaroProvider` er inne i `App` — dette er akseptabelt.
- `enableMocking.ts` inneholder ENV-sjekker — MSW starter kun når `ENV === 'development'` og `import.meta.env.MODE === 'msw'`. Ikke fjern disse guardene.
- `vite.config.ts` bruker en betinget Sentry-plugin som kun aktiveres når `SENTRY_AUTH_TOKEN` er satt. Sentry-build-advarsler er forventet lokalt uten token.
- Data loading er delt i `useInitialData.ts` (hook med datalogikk) og `InitialDataLoader.tsx` (tynn komponent). Behold denne separasjonen når du tilpasser, og deleger detaljveiledning til `sif-initial-data-loader`.
- Eksterne brukerlenker skal ikke eies av målappen etter migrering. Flytt dem til den delte lenkekilden i `@sif/soknad-ui/lenker`. Appen kan fortsatt beholde en tynn adapter som skjuler locale/env-oppslag og eksponerer et enklere API som `useLenker()` og `getLenke()`.
- Når du navngir lenkene i den delte lenkefila, foretrekk domenespesifikke og selvforklarende nøkler fremfor korte generiske navn. Eksempler: `navMinSide`, `navSaksbehandlingstider`, `omsorgspengerEttersending`.
- Bruk flat struktur i den delte lenkefila. Ikke innfør grupper som `nav`, `external` eller `ytelse` i konsum-APIet med mindre et reelt navnekollisjonsproblem krever det.
- For generelle lenker: bruk kildeprefix først, som `nav...`, `skatteetaten...`, `lovdata...`, `regjeringen...`.
- For ytelsesspesifikke lenker: bruk ytelsesprefix først, som `omsorgspenger...` eller `pleiepenger...`.
- Bruk konsistente suffikser på tvers av nøkler, for eksempel `Info`, `Soknad`, `Ettersending`, `Brevskjema`, `Innsyn`.

### Referanser for UI og spacing

- Bruk [aksel-spacing](../aksel-spacing/SKILL.md) for spacing-tokens, responsive layout-props og Box/VStack/HStack/HGrid-mønstre.
- Bruk `aksel-agent` for bredere Aksel-designsystemvalg utover bootstrap-omfanget.

### Sjekkliste for validering i bootstrap-fasen

Kjør i målappens workspace:

1. `yarn check:types`
2. `yarn lint:eslint`
3. `yarn build`
4. `yarn dev`
5. `yarn storybook`

Forventet oppførsel tidlig i fasen:

- `yarn test` kan feile med `No test files found` før tester er lagt til.
- Sentry-build-advarsler om manglende auth-token er forventet lokalt hvis det ikke er konfigurert.

## Avhengighetsstrategi

- Foretrekk å bruke eksisterende delte pakker som de er i tidlige steg.
- Foretrekk adaptere i appen fremfor å kopiere delt kode.
- Bytt til `sif-soknad`/`sif-rhf` inkrementelt når veien videre er tydelig.
- Kopier kode kun når eierskap og oppryddingsplan er eksplisitt avklart.

## Validering

- Kjør workspace-lokale scripts først (for eksempel `lint:eslint`, `lint:tsc`, `test`).
- I bootstrap-fasen: hold validering app-lokal og hopp over root-level build/lint/test-kommandoer.
- Kjør bredere root-sjekker kun ved behov utenfor bootstrap-omfanget (`yarn lint`, `yarn test`).

## Ferdigkriterier

- Pilotappen kompilerer og passerer relevante workspace-sjekker.
- Main migration decisions are captured in `docs/migration/decisions.md`.
- Reusable lessons are promoted from app notes to shared docs.