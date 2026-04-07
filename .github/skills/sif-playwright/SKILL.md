---
name: sif-playwright
description: Standard for Playwright e2e-oppsett i app-workspaces (config, scripts, scenario-flyt, første tester, a11y med axe).
---

# sif-playwright Skill

## Formål

Sette opp et minimalt, fungerende Playwright e2e-grunnlag i én app-workspace.

## Når skal skillen brukes

- Du setter opp Playwright i en app som ikke har e2e-oppsett.
- Du etablerer første e2e-flyt i appen.
- Du vil legge til accessibility-sjekker med axe i e2e-testene.

## Scope

- Én app-workspace per oppgave.
- Oppsett av config, scripts og første tester.
- Scenario-styring for testdata når appen har mock/scenario-støtte.

## Leveranse

- `playwright.config.ts`
- `vite.e2e.config.ts`
- `playwright/playwrightAppSettings.ts`
- `playwright/utils/scenario.ts` ved behov
- `playwright/utils/testAccessibility.ts`
- `playwright/files/*` ved behov for opplastingstester
- `playwright/tests/*.spec.ts` med minst to tester
- Scripts i `package.json`: `pw:dev`, `pw:run`, `pw:run:headed`
- `tsconfig.json` oppdatert med Playwright-filer i `include`

## Standardstruktur

```text
<app>/
  playwright.config.ts
  vite.e2e.config.ts
  playwright/
    playwrightAppSettings.ts
    tests/
        files/
    utils/
      scenario.ts
```

## Hold disse pathene identiske

For BrowserRouter-apper må base path være samme verdi i alle relevante steder. Dette er et av de viktigste ferdigkriteriene for et stabilt e2e-oppsett.

- `src/App.tsx` eller tilsvarende: `BrowserRouter basename`
- `vite.dev.config.ts`: `base`
- `vite.e2e.config.ts`: `base`
- `vite.e2e.config.ts`: proxy-rewrite for `mockServiceWorker.js`
- `playwright.config.ts`: `use.baseURL`
- `playwright.config.ts`: `webServer.url`
- `playwright/playwrightAppSettings.ts`: `PUBLIC_PATH` når appen leser path fra app settings

Hvis én av disse peker til en annen path, blir navigasjon, kvittering og MSW-ressurser ustabile i Playwright.

## tsconfig-krav

Playwright-filer dekkes ikke av den eksisterende `include`-listen i appens `tsconfig.json`. Legg til:

```json
"include": [
    "./playwright/**/*",
    "./playwright.config.ts",
    "./vite.e2e.config.ts",
    // ... eksisterende entries
]
```

Sjekk også at `lib` i tsconfig-kjeden inkluderer minst `ES2020`. Hvis delt config har en eldre `lib` (f.eks. `es2017`), overstyr lokalt:

```json
"compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"]
}
```

## Standard dependency-sett

- `@playwright/test`
- `@axe-core/playwright`

## Standard scripts

```json
{
    "pw:dev": "vite --config vite.e2e.config.ts",
    "pw:run": "playwright test",
    "pw:run:headed": "playwright test --headed"
}
```

## Kodemaler

### `playwright.config.ts`

Tilpass `testDir`, `baseURL` og `webServer.url` til appens base-path.

```ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
    testDir: './playwright/tests',
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    reporter: process.env.CI ? 'github' : 'list',
    use: {
        baseURL: 'http://127.0.0.1:4173/<app-base-path>/',
        trace: 'on-first-retry',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    webServer: {
        command: 'yarn pw:dev',
        url: 'http://127.0.0.1:4173/<app-base-path>/',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
```

### `vite.e2e.config.ts`

Bruk `mode: 'msw'` for å aktivere MSW-mocking. Viktige punkter:

- Sett `__IS_DEMO__: false` for å bruke BrowserRouter (ikke HashRouter/demo-modus).
- Sett `__USE_FIXED_MOCKED_DATE__: true` for deterministisk datodata.
- Inkluder proxy for `mockServiceWorker.js` som rewrites til base-path.
- Injiser appSettings via `html-transform`-plugin som erstatter `{{{APP_SETTINGS}}}`.

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';

import { getPlaywrightAppSettings } from './playwright/playwrightAppSettings';

export default defineConfig({
    mode: 'msw',
    plugins: [
        tailwindcss(),
        react({ include: '**/*.{tsx}' }),
        checker({ typescript: true }),
        {
            name: 'crossorigin',
            transformIndexHtml(html) {
                return html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet" type="text/css"');
            },
        },
        {
            name: 'html-transform',
            transformIndexHtml: (html) => {
                return html.replace('{{{APP_SETTINGS}}}', JSON.stringify(getPlaywrightAppSettings()));
            },
        },
    ],
    resolve: {
        alias: {
            '@app': resolve(__dirname, './src/app'),
        },
    },
    base: '/<app-base-path>/',
    define: {
        __IS_DEMO__: false,
        __INJECT_DECORATOR_CLIENT_SIDE__: false,
        __USE_FIXED_MOCKED_DATE__: true,
        __IS_GITHUB_PAGES__: false,
    },
    server: {
        host: '127.0.0.1',
        port: 4173,
        proxy: {
            '/mockServiceWorker.js': {
                target: 'http://127.0.0.1:4173',
                rewrite: () => '/<app-base-path>/mockServiceWorker.js',
            },
        },
    },
    build: {
        sourcemap: true,
    },
});
```

### `playwright/playwrightAppSettings.ts`

Bygger videre på appens `getDevAppSettings()` og skrur av analytics/faro:

```ts
import { AppEnv } from '../env.schema';
import { getDevAppSettings } from '../mock/devAppSettings';

export const getPlaywrightAppSettings = (): AppEnv => ({
    ...getDevAppSettings(),
    PUBLIC_PATH: '/<app-base-path>',
    SIF_PUBLIC_USE_ANALYTICS: 'false',
    SIF_PUBLIC_USE_FARO: 'false',
});
```

Hvis appen bruker `PUBLIC_PATH` i routing, dekorator eller lenkebygging, skal Playwright-varianten alltid sette denne eksplisitt til samme base path som resten av e2e-oppsettet.

### `playwright/utils/scenario.ts`

Setter scenario-key i `localStorage` via `addInitScript` (kjører _før_ appen).
Appen bruker `localStorageStore.init()` som leser denne keyen og genererer mockdata.
Gjenbruk alltid `ScenarioType` fra `mock/scenarios/types` i stedet for `string` for å sikre at testene kun kan bruke gyldige scenarioer.

```ts
import { Page } from '@playwright/test';
import { ScenarioType } from '../../mock/scenarios/types';

const SCENARIO_KEY = '<APP>_MOCK_SCENARIO';

export const setScenario = async (page: Page, scenario: ScenarioType) => {
    await page.addInitScript(
        ({ scenarioKey, selectedScenario }) => {
            window.localStorage.setItem(scenarioKey, selectedScenario);
        },
        { scenarioKey: SCENARIO_KEY, selectedScenario: scenario },
    );
};
```

`SCENARIO_KEY` må matche keyen appen bruker i sin `localStorageStore`.

> ⚠️ **`localStorageStore.init` must not overwrite Playwright-set scenario**
> Playwright setter kun scenario-key via `addInitScript` — ikke mockdata. `init()` kjøres etterpå i appen.
> Sørg for at `init()` kun skriver data hvis data mangler — aldri hvis scenario-key allerede er satt:
>
> ```ts
> init: (defaultScenario) => {
>     const current = localStorage.getItem(SCENARIO_KEY);
>     const hasData = localStorage.getItem(STORAGE_KEY) !== null;
>     if (!current) {
>         setScenario(defaultScenario); // ingen key satt — bruk default
>         return;
>     }
>     if (!hasData) {
>         setScenario(current); // key finnes (satt av Playwright), men data mangler
>     }
>     // key og data finnes — ikke gjør noe
> };
> ```
>
> Feilen `if (current !== defaultScenario) { setScenario(defaultScenario); }` overskriver Playwright-scenario med default.

### Scenario-mekanikk

Flyten er:

1. Playwright kaller `setScenario(page, 'scenarioNavn')` — setter kun scenario-key i `localStorage`.
2. `page.goto('/')` starter appen — MSW aktiveres og `localStorageStore.init()` kjøres.
3. `init()` finner scenario-key, genererer mockdata fra scenario-definisjonen og lagrer til `localStorage`.
4. MSW-handlers leser mockdata fra `localStorage` og returnerer korrekte API-svar.

Viktig: `localStorageStore.init()` må håndtere tilfellet der scenario-key finnes men data mangler (Playwright setter kun key). Sørg for at init-logikken genererer data fra key alene.

## Lokal/demo scenariovelger

For apper med mock/scenario-oppsett skal lokal/demo-kjøring ha en synlig scenariovelger, typisk `src/demo/ScenarioHeader.tsx`.

Hold denne delen kort og kontraktsstyrt:

- bruk samme `ScenarioType` som Playwright-testene
- skriv til samme store/localStorage-nøkkel som `setScenario(page, ...)`
- reload på samme `PUBLIC_PATH` som resten av appen

Detaljer for implementasjon og montering av `ScenarioHeader` hører hjemme i `sif-soknad-setup` eller appens eksisterende demo-oppsett, ikke i denne skillen.

## Mellomlagring og gjenopptak

Når appen bruker mellomlagring, bør første Playwright-runde inkludere én test som verifiserer gjenopptak.

Anbefalt mønster:

1. Start søknaden og fyll ut minst første steg.
2. Naviger videre slik at `currentStepId` og `søknadsdata` lagres.
3. Gå til `/` på nytt eller reload siden.
4. Verifiser at appen sender brukeren tilbake til riktig steg og at tidligere valg fortsatt er synlige.

Dette er særlig nyttig i referanseapper, fordi det bekrefter at `useInitialData`, mellomlagring og routing spiller sammen.

## Vedlegg i e2e

Når appen har vedleggssteg:

- legg testfilene under `playwright/files/`
- bruk små, deterministiske filer med stabile filnavn
- verifiser både at filen vises i steglisten og at den vises igjen i oppsummeringen

Målet er å teste hele UI-flyten for opplasting, ikke filinnholdet.

## Innsending i referanse- og demo-apper

Når appen er en referanseapp eller demo-app med forenklet lokal DTO, fungerer det best å holde innsendingen enkel og mockbar i e2e.

Anbefalt mønster:

- la appen sende til en eksplisitt frontend-path via `fetch`
- dekk samme path i MSW-handlers
- bruk dette når målet er å verifisere søknadsflyt, routing og oppsummering, ikke backend-kontrakten

Dette gjør Playwright-flyten stabil uten å binde referanseappen til runtime-validering i genererte API-klienter.

## Standard testmønster

1. Start appen via `pw:dev` (Vite dev med MSW og BrowserRouter).
2. Bruk `setScenario()` for å velge testdata _før_ `page.goto('/')`.
3. Hold nettverksstubbing i Playwright minimal — MSW håndterer API-mocking.
4. Verifiser minst én forsideflyt og én sentral brukerflyt.
5. Bruk stabile selectors (`getByRole`, `getByLabel`, `getByText` med tydelig tekst).
6. For mellomlagringsapper: legg til én gjenopptakstest etter reload eller ny `goto('/')`.
7. For vedleggsapper: verifiser opplasting både i steg og i oppsummering.

## Minimum dekning per app

- Minst én test for hovedside/forside.
- Minst én test for en sentral brukerflyt.
- Minst én gjenopptakstest når appen bruker mellomlagring.
- Minst én opplastingstest når appen har vedlegg.

For apper med mock/scenario-støtte forventes en synlig scenariovelger i lokal/demo, men Playwright-skillen trenger bare å sikre at den følger samme scenario-kontrakt som testene.

## A11y med axe

Accessibility-sjekker er en del av standard Playwright-oppsettet.

### `testAccessibility` helper

Opprett `playwright/utils/testAccessibility.ts`:

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, Page } from '@playwright/test';

export const testAccessibility = async (page: Page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await expect(accessibilityScanResults.violations).toEqual([]);
};
```

### Bruksmønster

1. Kjør `testAccessibility(page)` etter at siden er ferdig rendret.
2. Kjør igjen etter viktig navigasjon i samme test.
3. Kjør scannen etter at heading eller annen ankertekst er synlig — aldri rett etter `page.goto()` uten å vente på et element først.

**Riktig:**

```ts
await page.goto('/');
await page.locator('input[type="checkbox"]').waitFor();
await testAccessibility(page);
```

**Feil:**

```ts
await page.goto('/');
await testAccessibility(page); // for tidlig — siden kan være tom
```

### Minimum a11y-dekning per app

- A11y-scan i minst én forside/smoke-test.
- A11y-scan i minst én sentral brukerflyt.
- Alle steg skal ha a11y-scan etter at siden er ferdig rendret.

## Verifisering

Kjør i app-workspace:

```bash
yarn pw:run
yarn check:types
```

## Ferdig-kriterier

- `yarn pw:run` passerer lokalt.
- `yarn check:types` passerer lokalt.
- Testene bruker BrowserRouter-flyt (ikke demo/HashRouter).
- A11y-scan er inkludert i minst forside- og sentral flyttest.

## Arbeidsmodus

- Fase 1: Etabler oppsett (config, scripts, dependencies, tsconfig).
- Fase 2: Legg til første flyttester med a11y-scan.
- Fase 3: Verifiser `yarn pw:run` og `yarn check:types`.
