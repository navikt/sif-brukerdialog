---
name: sif-playwright
description: Standard for Playwright e2e-oppsett i app-workspaces (config, scripts, scenario-flyt, første tester).
---

# sif-playwright Skill

## Formål

Sette opp et minimalt, fungerende Playwright e2e-grunnlag i én app-workspace.

## Når skal skillen brukes

- Du setter opp Playwright i en app som ikke har e2e-oppsett.
- Du etablerer første e2e-flyt i appen.

## Scope

- Én app-workspace per oppgave.
- Oppsett av config, scripts og første tester.
- Scenario-styring for testdata når appen har mock/scenario-støtte.

## Leveranse

- `playwright.config.ts`
- `vite.e2e.config.ts`
- `playwright/playwrightAppSettings.ts`
- `playwright/utils/scenario.ts` ved behov
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
    utils/
      scenario.ts
```

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
                return html.replace(
                    /<link rel="stylesheet" crossorigin/g,
                    '<link rel="stylesheet" type="text/css"',
                );
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
    SIF_PUBLIC_USE_ANALYTICS: 'false',
    SIF_PUBLIC_USE_FARO: 'false',
});
```

### `playwright/utils/scenario.ts`

Setter scenario-key i `localStorage` via `addInitScript` (kjører *før* appen).
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

### Scenario-mekanikk

Flyten er:

1. Playwright kaller `setScenario(page, 'scenarioNavn')` — setter kun scenario-key i `localStorage`.
2. `page.goto('/')` starter appen — MSW aktiveres og `localStorageStore.init()` kjøres.
3. `init()` finner scenario-key, genererer mockdata fra scenario-definisjonen og lagrer til `localStorage`.
4. MSW-handlers leser mockdata fra `localStorage` og returnerer korrekte API-svar.

Viktig: `localStorageStore.init()` må håndtere tilfellet der scenario-key finnes men data mangler (Playwright setter kun key). Sørg for at init-logikken genererer data fra key alene.

## Standard testmønster

1. Start appen via `pw:dev` (Vite dev med MSW og BrowserRouter).
2. Bruk `setScenario()` for å velge testdata *før* `page.goto('/')`.
3. Hold nettverksstubbing i Playwright minimal — MSW håndterer API-mocking.
4. Verifiser minst én forsideflyt og én sentral brukerflyt.
5. Bruk stabile selectors (`getByRole`, `getByLabel`, `getByText` med tydelig tekst).

## Minimum dekning per app

- Minst én test for hovedside/forside.
- Minst én test for en sentral brukerflyt.

## A11y

For accessibility-sjekker med axe, bruk skillen `sif-playwright-a11y` i tillegg.

Etter at grunnoppsettet er ferdig, skal du alltid eksplisitt vurdere om `sif-playwright-a11y` også skal brukes i samme oppgave.

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
- Avklar om a11y-sjekker skal inn nå; hvis ja, bruk `sif-playwright-a11y` før oppgaven avsluttes.

## Arbeidsmodus

- Fase 1: Etabler oppsett (config, scripts, dependencies, tsconfig).
- Fase 2: Legg til første flyttester.
- Fase 3: Verifiser `yarn pw:run` og `yarn check:types`.
- Fase 4: Ta stilling til a11y-utvidelse via `sif-playwright-a11y`.
