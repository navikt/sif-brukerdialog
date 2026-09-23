---
name: sif-gh-pages
type: action
description: Legg til en app i gh-pages demo-deploy — vite.demo.config.ts, HashRouter, MSW-oppsett, scripts og workflow-steg.
---

# sif-gh-pages

## Bruk når

- En app skal legges til i gh-pages-deployet (demo med MSW).
- Demo-buildet mangler eller er ikke koblet til workflow.

## Referanseimplementasjoner

| App                                       | Type              | Merk                                                                                     |
| ----------------------------------------- | ----------------- | ---------------------------------------------------------------------------------------- |
| `apps/endringsmelding-pleiepenger`        | v1 (Formik)       | Gjenbruker `index.html` + `html-transform` — anbefalt mønster                            |
| `apps/opplaringspenger-soknad`            | v1 (Formik)       | Egen `demo/index.html` med hardkodede appSettings + `demo:copy-app-files` — eldre mønster |
| `apps/ungdomsytelse-deltaker`             | v2                | HashRouter via `navigate()` ved scenariobytte                                              |

Les diffen i endringsmelding-pleiepenger først — den er den minste komplette.

## Prosess

### 1. Kartlegg appen

Sjekk før du begynner:

- Hvilken router brukes? (`SoknadApplication` med `useHashRouter`, eller egen `BrowserRouter`)
- Hvor ligger `mockServiceWorker.js`? (approt eller `public/`)
- Har appen `mock/devAppSettings.ts` og `{{{APP_SETTINGS}}}` i `index.html`?
- Finnes en scenariovelger, og hvordan navigerer den etter bytte?

### 2. `mock/demoAppSettings.ts`

Arv fra appens egen `getDevAppSettings()` og overstyr kun:

- `PUBLIC_PATH` → `/sif-brukerdialog/<app-navn>`
- eksterne URL-er (`SIF_PUBLIC_LOGIN_URL`, `SIF_PUBLIC_DEKORATOR_URL`, `SIF_PUBLIC_MINSIDE_URL` …) → `#`
- `SIF_PUBLIC_USE_ANALYTICS` → `'false'`
- `*_FRONTEND_PATH` → under ny `PUBLIC_PATH`

**Ikke** kopier appSettings fra en annen app — nøkler og env-schema varierer per app.

**Verifiser at hver overstyrte nøkkel faktisk leses.** At en verdi finnes i env-schemaet betyr ikke
at appen bruker den, og en ubrukt nøkkel gir ingen kompileringsfeil. Grep etter nøkkelen i `src/`
og følg den fram til bruksstedet.

Kjent tilfelle: `SIF_PUBLIC_USE_ANALYTICS` ble satt i appSettings, men `SoknadApplication` fikk
`useAnalytics={!isE2E}` — demoen sendte analytics likevel. Riktig uttrykk (se
`apps/endringsmelding-pleiepenger/src/app/App.tsx` og `apps/opplaringspenger-soknad/src/app/App.tsx`):

```ts
const useAnalytics = !isE2E && (SIF_PUBLIC_USE_ANALYTICS ? SIF_PUBLIC_USE_ANALYTICS === 'true' : isProd());
```

Sjekk `nais/dev-gcp.json` og `nais/prod-gcp.json` før du endrer et slikt uttrykk — hvis flagget er
satt der, er endringen oppførselsbevarende i drift.

### 3. `vite.demo.config.ts`

Kopier appens egen `vite.dev.config.ts` (ikke en annen apps demo-config) og endre:

- `base: '/sif-brukerdialog/<app-navn>/'`
- `define`: `__IS_GITHUB_PAGES__: true` og skru av dekoratør-injeksjon
- `html-transform` bruker `getDemoAppSettings()`
- `build.outDir: './dist-demo'`, `emptyOutDir: true`, `sourcemap: true`
- `copy-msw`-plugin i `writeBundle` hvis `mockServiceWorker.js` ligger i approt (ikke nødvendig fra `public/`)

Behold alle `resolve.alias` fra dev-configen — demo-buildet bruker samme kildekode.

**`define`-nøkkelen må matche uttrykket koden leser, tegn for tegn.** Vite gjør tekstlig erstatning:
`INJECT_DECORATOR: false` treffer ikke `import.meta.env.INJECT_DECORATOR` — da blir define-et dødt,
uttrykket `undefined`, og kallet blir stående i bundlet i stedet for å elimineres. Grep etter
flagget i `src/` og kopier uttrykket derfra. Merk at appens `vite.dev.config.ts` kan ha samme feil —
ikke arv den ukritisk.

### 4. `vite-env.d.ts`

`declare const __IS_GITHUB_PAGES__: boolean;`

Flagget defineres kun i demo-configen. Les det derfor alltid gjennom en guard:

```ts
export const isGitHubPages = (): boolean => typeof __IS_GITHUB_PAGES__ !== 'undefined' && __IS_GITHUB_PAGES__;
```

Uten `typeof`-guarden krasjer øvrige builds på `ReferenceError`. Alternativet — å definere `false` i alle andre vite-/vitest-/storybook-configer — er mer å vedlikeholde.

### 5. MSW

Service worker registreres på origin-roten som standard. Sett URL eksplisitt når `__IS_GITHUB_PAGES__`:
`serviceWorker.url = import.meta.env.BASE_URL + 'mockServiceWorker.js'`.

Ikke bruk `enableMockingBase` fra `@sif/api/mock-utils` — den krever `ENV === 'development'`.

### 6. Routing

gh-pages har ingen server som kan rute på path → **HashRouter kreves**.

- `SoknadApplication`: sett `useHashRouter={erGitHubPages}`
- Hopp over `ensureBaseNameForReactRouter(PUBLIC_PATH)` når hash-router er aktiv
- Gå gjennom **all** hard navigasjon (`window.location.assign`, `relocateToWelcomePage`, scenariobytte, reset): disse ignorerer routeren og må gi hash-URL på gh-pages, f.eks. `${import.meta.env.BASE_URL}#${route}`. Dette er den vanligste glippen.

### 7. Demo-markering (valgfritt, men anbefalt)

`DemoInfo`-banner + `.demoMode`-vannmerke, begge bak `erGitHubPages`. Kopier fra
`apps/endringsmelding-pleiepenger/src/app/components/demo/`. Hent tittelen fra
`@navikt/sif-app-register` — ikke dikt opp ny tekst.

### 8. `package.json` — scripts

```json
"demo:build": "vite build --config vite.demo.config.ts",
"demo:start": "vite preview --base /sif-brukerdialog/<app-navn>/ --config vite.demo.config.ts",
"gh-pages:clean": "rm -rf ../../docs/<app-navn>",
"gh-pages:copy": "cp -r ./dist-demo ../../docs/<app-navn>",
"gh-pages:rebuild": "pnpm demo:build && pnpm gh-pages:clean && pnpm gh-pages:copy"
```

Legg `dist-demo` til i `clean`-scriptet og i `.gitignore`.

### 9. `.github/workflows/build-gh-pages.yml`

To steg før stegene som bygger forsiden (`Build gh-pages-forside`):

```yaml
- name: Build <app-navn>
  run: pnpm gh-pages:rebuild
  working-directory: apps/<app-navn>

- name: Kopier <app-navn> til gh-pages
  run: |
      mkdir -p deployment/<app-navn>
      mv apps/<app-navn>/dist-demo/* deployment/<app-navn>/
```

### 10. `gh-pages/src/sider.ts` — forsiden

Forsiden på roten av GitHub Pages ligger i workspacet `gh-pages/` og har sin egen liste over
publiserte sider. **Den avledes ikke fra workflowen** — legg derfor inn en ny oppføring der også:

```ts
{
    path: '<app-navn>',          // må matche mappenavnet i deployment/
    type: 'demo',                // eller 'storybook'
    tittel: '…',
    beskrivelse: '…',
    workspace: 'apps/<app-navn>',
}
```

## Verifisering

1. `pnpm demo:build` — grønn
2. `pnpm build` og `pnpm lint:tsc` — bekrefter at `__IS_GITHUB_PAGES__`-guarden ikke brøt ordinært build
3. Sjekk `dist-demo/index.html`: `PUBLIC_PATH` og `src="/sif-brukerdialog/<app-navn>/assets/…"` er riktige, og `mockServiceWorker.js` ligger i `dist-demo/`
4. Grep i `src/` etter hver nøkkel du overstyret i `demoAppSettings` — bekreft at den faktisk leses
5. Deploy trigges av `workflow_dispatch` eller commit-melding som inneholder `[gh-pages]`

## Vanlige feil

| Problem                                             | Årsak                                                       | Fix                                                             |
| --------------------------------------------------- | ----------------------------------------------------------- | --------------------------------------------------------------- |
| `ReferenceError: __IS_GITHUB_PAGES__ is not defined` | Flagget defineres kun i demo-configen                       | Bruk `typeof`-guard (punkt 4)                                   |
| MSW-feil / service worker ikke funnet               | Registrert på origin-roten                                  | Sett `serviceWorker.url` (punkt 5)                              |
| Analytics sendes fra den offentlige demoen           | `useAnalytics` ignorerer `SIF_PUBLIC_USE_ANALYTICS`         | Les flagget i uttrykket (punkt 2)                               |
| Blank side eller 404                                 | `base` matcher ikke URL                                     | `base` = `/sif-brukerdialog/<app-navn>/`                        |
| 404 ved scenariobytte, reset eller «tilbake»         | Hard navigasjon bygger path-URL og omgår HashRouter         | Hash-URL på gh-pages (punkt 6)                                  |
| `mockServiceWorker.js` mangler i `dist-demo`         | Filen ligger i approt, ikke i `public/`                     | `copy-msw`-plugin i `writeBundle`                               |
| Scenariovelger vises ikke                            | Guard bruker `import.meta.env.PROD`, som er `true` i builds | Guard på `__IS_GITHUB_PAGES__` / `VELG_SCENARIO` i stedet       |
| `define` har ingen effekt                            | Nøkkelen matcher ikke uttrykket i koden                     | Bruk nøyaktig uttrykk, f.eks. `'import.meta.env.X'` (punkt 3)   |
