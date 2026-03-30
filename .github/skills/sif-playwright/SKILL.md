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
- `playwright/tests/*.spec.ts` med minst to tester
- `playwright/utils/scenario.ts` ved behov
- scripts i `package.json`: `dev:e2e`, `test:e2e`, `test:e2e:headed`

## Standardstruktur

Bruk samme struktur i hver app:

```text
<app>/
  playwright.config.ts
  vite.e2e.config.ts
  playwright/
    tests/
    utils/
      scenario.ts
```

## Standard scripts

Legg til disse script-navnene i appens `package.json`:

- `dev:e2e`
- `test:e2e`
- `test:e2e:headed`

## Standard dependency-sett

- `@playwright/test`

## Standard testmønster

1. Start appen i en e2e-vennlig dev-modus via `dev:e2e`.
2. Bruk appens egne mock/scenario-mekanismer der de finnes.
3. Hold nettverksstubbing i Playwright minimal.
4. Verifiser minst én forsideflyt og én sentral brukerflyt.
5. Bruk stabile selectors (`getByRole`, tydelig navn/label).

## Minimum dekning per app

- Minst én test for hovedside/forside.
- Minst én test for en sentral brukerflyt.

## A11y

For accessibility-sjekker med axe, bruk skillen `sif-playwright-a11y` i tillegg.

## Verifisering

Kjør i app-workspace:

```bash
yarn test:e2e
yarn check:types
```

## Ferdig-kriterier

- `yarn test:e2e` passerer lokalt.
- `yarn check:types` passerer lokalt.
- Testene bruker BrowserRouter-flyt der appen støtter det.

## Arbeidsmodus

- Fase 1: Etabler oppsett (config, scripts, dependencies).
- Fase 2: Legg til første flyttester.
- Fase 3: Verifiser testløp og typecheck.
