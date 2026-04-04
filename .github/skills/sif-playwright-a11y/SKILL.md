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
- A11y-scan koblet inn på et stabilt tidspunkt i hver test

## Forutsetning

Appen har et fungerende Playwright-oppsett. For grunnoppsett, bruk `sif-playwright`.

## Standard dependency-sett

- `@axe-core/playwright`

## Standard testmønster

1. Kjør `testAccessibility(page)` etter at siden er ferdig rendret.
2. Kjør `testAccessibility(page)` igjen etter viktig navigasjon i samme test.
3. Hold assertions på faktiske violations (`toEqual([])`) som standard.
4. Kjør scannen etter at headingen eller annen tydelig ankertekst for siden er synlig — aldri rett etter `page.goto()` uten å vente på et element først.
5. I flyttester: kjør scannen på forside/startside og én gang til på en sentral ferdig utfylt side, typisk oppsummering.

**Eksempel — riktig plassering:**

```ts
await page.goto('/');
await page.locator('input[type="checkbox"]').waitFor(); // vent på et synlig element
await testAccessibility(page);
```

**Feil mønster — ikke gjør dette:**

```ts
await page.goto('/');
await testAccessibility(page); // for tidlig — siden kan være tom
```

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

Bruk helperen direkte i eksisterende tester i stedet for å lage egne a11y-spesialtester først. Det gir best signal på de faktiske brukerflytene appen støtter.

## Minimum dekning per app

- A11y-scan i minst én forside/smoke-test.
- A11y-scan i minst én sentral brukerflyt.
- Hvis appen har oppsummeringssteg, foretrekk a11y-scan der fremfor på et tilfeldig mellomsteg.

## Verifisering

Kjør i app-workspace:

```bash
yarn pw:run
```

## Ferdig-kriterier

- `yarn pw:run` passerer lokalt.
- Begge testkategorier (forside + sentral flyt) inkluderer a11y-scan.

## Arbeidsmodus

- Fase 1: Legg til `@axe-core/playwright` og `testAccessibility`-helper.
- Fase 2: Koble helper i eksisterende tester.
- Fase 3: Verifiser `yarn pw:run`.
