---
name: sif-playwright-a11y
description: Standard for accessibility-testing i Playwright med axe i app-workspaces i monorepoet.
---

# sif-playwright-a11y Skill

## Formål

Legge til accessibility-sjekker med axe i eksisterende Playwright-tester.

## Når skal skillen brukes

- Du vil legge til accessibility-sjekker i eksisterende e2e-tester.
- Du vil gjøre a11y til fast del av smoke- og flyttester.

## Scope

- Én app-workspace per oppgave.
- Kun a11y-utvidelse av eksisterende Playwright-oppsett.

## Leveranse

- `@axe-core/playwright` i appens `devDependencies`
- `playwright/utils/testAccessibility.ts`
- A11y-scan koblet inn i minst to eksisterende tester

## Forutsetning

Appen har et fungerende Playwright-oppsett. For grunnoppsett, bruk `sif-playwright`.

## Standard dependency-sett

- `@axe-core/playwright`

## Standard testmønster

1. Kjør `testAccessibility(page)` etter at siden er ferdig rendret.
2. Kjør `testAccessibility(page)` igjen etter viktig navigasjon i samme test.
3. Hold assertions på faktiske violations (`toEqual([])`) som standard.

## `testAccessibility` helper

Opprett `playwright/utils/testAccessibility.ts` med følgende mønster:

```ts
import AxeBuilder from '@axe-core/playwright';
import { expect, Page } from '@playwright/test';

export const testAccessibility = async (page: Page) => {
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    await expect(accessibilityScanResults.violations).toEqual([]);
};
```

## Minimum dekning per app

- A11y-scan i minst én forside/smoke-test.
- A11y-scan i minst én sentral brukerflyt.

## Verifisering

Kjør i app-workspace:

```bash
yarn test:e2e
```

## Ferdig-kriterier

- `yarn test:e2e` passerer lokalt.
- Begge testkategorier (forside + sentral flyt) inkluderer a11y-scan.

## Arbeidsmodus

- Fase 1: Legg til `@axe-core/playwright` og `testAccessibility`-helper.
- Fase 2: Koble helper i eksisterende tester.
- Fase 3: Verifiser `yarn test:e2e`.
