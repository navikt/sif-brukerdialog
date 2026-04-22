---
name: sif-soknad-setup
type: action
description: Veiledning for oppsett av src/app/setup og routing shell (Soknad.tsx, VelkommenPage, KvitteringPage) i nye apper som bruker @sif/soknad og @sif/rhf.
---

# sif-soknad-setup

## Bruk når

- Du oppretter en ny søknadsapp som skal bruke `@sif/soknad`.
- Du kobler en eksisterende app til rammeverket og trenger setup-laget.
- Du skal opprette routing-skallet (`Soknad.tsx`, `VelkommenPage`, `KvitteringPage`).

## Leveranse

- `src/app/setup/` — providers, context, config, hooks
- `src/app/Soknad.tsx` — routing shell med steg-navigering
- `src/app/pages/` — `VelkommenPage`, `KvitteringPage`
- `src/app/steps/index.ts` — steg-registrering
- `src/app/types/` og `src/app/utils/` — datalag
- `src/app/i18n/` — i18n-oppsett

## Omfang

- **Innenfor:** `src/app/setup/`, `src/app/types/`, `src/app/utils/formValuesToSoknadsdata.ts`, `src/app/i18n/`, `src/app/Soknad.tsx`, `src/app/pages/`, `src/app/steps/index.ts`, `src/demo/ScenarioHeader.tsx`, Sentry.
- **Utenfor:** steginnhold → `sif-soknad-add-step`, API-kall → `sif-api`, initial data → `sif-initial-data-loader`.
- **Referanseapper:** `apps/sif-demo-app` og `apps/aktivitetspenger-soknad`.

## Raskeste vei

Kopier fra referanseappen og tilpass:

```bash
SRC=apps/sif-demo-app/src/app
DST=apps/<ny-app>/src/app
cp -r $SRC/setup $DST/setup
cp -r $SRC/types $DST/types
cp -r $SRC/utils $DST/utils
cp -r $SRC/i18n  $DST/i18n
cp -r $SRC/../demo $DST/../demo 2>/dev/null || true
```

Kjør `check:types` etter kopiering — typefeilene peker til det som gjenstår.

## Mappestruktur

```
src/app/
  demo/ScenarioHeader.tsx
  setup/
    constants.ts
    context/soknadContext.ts
    env/appEnv.ts
    hooks/ (index.ts, useAvbrytSoknad, useSoknadMellomlagring, useSoknadRhfForm,
            useSoknadState, useSoknadStore, useStepDefaultValues, useStepSubmit, useStepTitles)
    config/soknadStepConfig.ts
    soknad/ (AppForm.tsx, SoknadFormButtons.tsx, SoknadStep.tsx)
    wrappers/ (AppErrorBoundary.tsx, SifQueryClientProvider.tsx)
  i18n/ (index.tsx, nb/appMessages.ts)
  types/ (Mellomlagring.ts, Soknadsdata.ts)
  utils/formValuesToSoknadsdata.ts
  Soknad.tsx
  pages/ (index.ts, velkommen/VelkommenPage.tsx, kvittering/KvitteringPage.tsx)
  steps/index.ts
  sentry/instrument.ts
```

## Arbeidsrekkefølge

1. **Steg-konfigurasjon** — `soknadStepConfig.ts`: definer `SøknadStepId`, `SøknadState`, routes, `isCompleted`, stepOrder. → [mal](templates/soknadStepConfig.ts.template)
2. **Søknadsdata-type** — `Soknadsdata.ts`: extend `BaseSøknadsdata`, legg til optional type per steg. → [mal](templates/Soknadsdata.ts.template)
3. **Mellomlagring-type** — `Mellomlagring.ts`. → [mal](templates/Mellomlagring.ts.template)
4. **Constants** — `constants.ts`: sett `APP_YTELSE` og `MELLOMLAGRING_VERSJON`. → [mal](templates/constants.ts.template)
5. **Boilerplate-hooks** — kopier direkte fra referanseappen (se tabell under).
6. **SoknadContext** — `soknadContext.ts`: tilpass `basePath` og `formValuesToSøknadsdata`-referanse. → [mal](templates/soknadContext.ts.template)
7. **formValuesToSoknadsdata** — placeholder med `return undefined` per steg. → [mal](templates/formValuesToSoknadsdata.ts.template)
8. **SoknadStep** — tilpass `text('application.title')` og `fortsettSenere`-URL via delt lenkekilde.
9. **i18n og stegtitler** — `appMessages.ts` med `application.title` + `step.<id>.title`. Opprett `useStepTitles`. → [mal](templates/useStepTitles.ts.template)
10. **Soknad.tsx** — routing-skall med init, kvittering-redirect og StepRouteGuard. → [mal](templates/Soknad.tsx.template)
11. **VelkommenPage** — startside med `handleStart`. → [mal](templates/VelkommenPage.tsx.template)
12. **KvitteringPage** — kvitteringsside. → [mal](templates/KvitteringPage.tsx.template)
13. **Barrel-filer** — `pages/index.ts`, `steps/index.ts`.
14. **ScenarioHeader** — scenariovelger for lokal/demo. → [mal](templates/ScenarioHeader.tsx.template)
15. **Sentry** — `instrument.ts` + `SifQueryClientProvider`. → [mal](templates/SentryInstrument.ts.template), [mal](templates/SifQueryClientProvider.tsx.template)

## Tilpasningspunkter per app

| Fil                                | Hva som tilpasses                                               |
| ---------------------------------- | --------------------------------------------------------------- |
| `constants.ts`                     | `APP_YTELSE`, `MELLOMLAGRING_VERSJON`                           |
| `soknadStepConfig.ts`              | `SøknadStepId`, `SøknadState`, routes, `isCompleted`, stepOrder |
| `context/soknadContext.ts`         | `basePath`, referanse til `formValuesToSøknadsdata`             |
| `types/Soknadsdata.ts`             | Per-steg søknadsdata-typer                                      |
| `types/Mellomlagring.ts`           | `MellomlagringMetaData` (fjern `barn` om ikke relevant)         |
| `utils/formValuesToSoknadsdata.ts` | Case per steg — fyll ut etter hvert                             |
| `soknad/SoknadStep.tsx`            | `text('application.title')`, `window.location.href` via delt lenkekilde |
| `i18n/nb/appMessages.ts`           | `application.title`, `step.<id>.title` per steg                 |
| `hooks/useStepTitles.ts`           | `Record<SøknadStepId, string>` via `useAppIntl()`               |
| `Soknad.tsx`                       | `Props`, `init()`-argumenter, Route-elementer                   |
| `sentry/instrument.ts`             | `application`-tag                                               |

## Boilerplate-filer (kopier uendret)

| Fil                               | Evt. tilpasning                            |
| --------------------------------- | ------------------------------------------ |
| `hooks/useSoknadStore.ts`         | Ingen                                      |
| `hooks/useSoknadRhfForm.ts`       | Ingen                                      |
| `hooks/useSoknadMellomlagring.ts` | Ingen                                      |
| `hooks/useSoknadState.ts`         | Ingen                                      |
| `hooks/useStepDefaultValues.ts`   | Ingen                                      |
| `hooks/useStepSubmit.ts`          | Ingen                                      |
| `hooks/useAvbrytSoknad.ts`        | `navigate('/')` — destinasjon etter avbryt |
| `hooks/index.ts`                  | Ingen                                      |
| `soknad/SoknadFormButtons.tsx`    | Ingen                                      |
| `soknad/AppForm.tsx`              | Ingen                                      |
| `wrappers/AppErrorBoundary.tsx`   | Ingen — bruker FaroErrorBoundary, ikke SentryErrorBoundary. Sentry dekkes av `reactErrorHandler` i `main.tsx`. |

## Viktige regler og fallgruver

### Sirkulær avhengighet via FormValues

`formValuesToSøknadsdata` importerer `*FormValues`-typer fra steg. Definer alltid `FormFields` og `FormValues` i `steps/<steg>/types.ts` — aldri i komponentfilen.

```
steps/barn/types.ts       ← FormFields + FormValues
steps/barn/BarnForm.tsx   ← importerer fra ./types
```

Ellers: `soknadContext → formValuesToSøknadsdata → BarnForm.tsx → AppForm → soknadContext`.

### mellomlagring?.skjemadata vs. mellomlagring?.søknadsdata

- `SøknadContextProvider` tar `initialFormValues` = `mellomlagring?.skjemadata` (RHF-data)
- `init()` tar `mellomlagring?.søknadsdata` (domeneobjekter)

Ikke forveksle disse.

### stepTitles

Sendes som prop til `<SøknadContextProvider>`, ikke som del av config. Bruk `useStepTitles()`-hook.

### Mellomlagring-hooks

- `lagreSøknad()` — hele state allerede oppdatert (f.eks. «fortsett senere»)
- `lagreSøknadSteg(stepId, values)` — ferske RHF-verdier før submit (f.eks. vedlegg)

### Domenetype-strategi

Tre datalag: `FormValues → toSøknadsdata() → Søknadsdata → toApiData() → ApiData`. Interne typer kan avvike fra API-kontrakten — det er tilsiktet.

For domenespesifikke typer:

- **Utled fra API-type** når typen finnes i `k9-brukerdialog-prosessering-api` → `types.gen.ts`
- **Lokal enum** når typen ikke finnes i generert kode
- **Inline union** for typer som bare brukes ett sted

### Lenker

Eksterne lenker skal i utgangspunktet ligge i én delt lenkekilde for hele monorepoet.

Navngivingsprinsipp for delte lenker:

- Bruk flat struktur ut mot appene. Unngå grupper som `lenker.nav.*` eller `lenker.external.*`.
- Start nøkkelen med domene/kilde når lenken er generell, for eksempel `navMinSide`, `navPersonvernerklaering`, `skatteetatenSkattekort`.
- Start nøkkelen med ytelse/fagdomene når lenken hører til en konkret ytelse, for eksempel `omsorgspengerEttersending`, `pleiepengerInnsyn`.
- Bruk samme suffikser for samme type mål på tvers av domener, for eksempel `Info`, `Soknad`, `Ettersending`, `Brevskjema`, `Innsyn`.
- Velg navn som beskriver brukerens mål, ikke teknisk plassering eller historikk.
- Unngå forkortelser og tvetydige navn når et mer eksplisitt navn er praktisk mulig.

- La `@sif/soknad-ui/lenker` eie selve lenkene.
- Appen kan ha en tynn lokal adapter, f.eks. `src/app/lenker.ts`, som eksponerer `useLenker()`, `getLenke()` og eventuelt `getLenker()`.
- Bruk normalt `useLenker()` i React-komponenter og `getLenke()` i ren kode uten hooks.
- Hvis en ekstern lenke mangler, legg den til i den delte lenkefila i stedet for å hardkode den i appen.
- Bruk selvforklarende nøkkelnavn i den delte lenkefila, typisk med domene/prefix som `navMinSide`, `navPersonvernerklaering` eller `omsorgspengerEttersending`.
- Bare interne app-ruter og intern navigasjon skal ligge i appen.
- Ikke bruk inline URL-er for eksterne brukerlenker.
- Ikke importere lenkeabstraksjoner fra `sif-common-soknad-ds`.

### Sentry

- DSN hardkodes (ikke hemmelighet, likt for alle SIF-apper)
- `sendDefaultPii: true` skal **aldri** brukes
- `tracesSampleRate: 0.2` (ikke `1.0`)

### ScenarioHeader

- Bruk `ScenarioSelectorHeader` fra `@sif/soknad-ui`
- Returner `null` i prod via `import.meta.env.PROD`
- Bruk samme `ScenarioType` som Playwright-tester
- Definer `scenarioGroups` på modul-nivå, ikke inne i komponenten
- Mont i `App.tsx` inne i `BrowserRouter` bak build-time define `__SCENARIO_HEADER__`:
  ```tsx
  {__SCENARIO_HEADER__ ? <ScenarioHeader /> : null}
  ```
- Deklarer typen i `vite-env.d.ts`: `declare const __SCENARIO_HEADER__: boolean;`
- Sett `__SCENARIO_HEADER__: false` i `vite.config.ts` og `__SCENARIO_HEADER__: true` i `vite.dev.config.ts`

### StartPage children

`StartPage` krever `children` (påkrevd prop). Send `<span />` om ingenting annet passer.

## Sjekkliste

- [ ] `soknadStepConfig.ts` med riktige steg-IDer, routes og isCompleted
- [ ] `Soknadsdata.ts` med per-steg typer
- [ ] `Mellomlagring.ts` med riktig metadata
- [ ] `constants.ts` med riktig `APP_YTELSE`
- [ ] `soknadContext.ts` med riktig `basePath`
- [ ] `formValuesToSoknadsdata.ts` med placeholder-cases
- [ ] `SoknadStep.tsx` med riktig tittel og URL fra delt lenkekilde
- [ ] `appMessages.ts` med `application.title` og steg-titler
- [ ] `useStepTitles.ts` opprettet og eksportert i `hooks/index.ts`
- [ ] `Soknad.tsx` med riktig Props og routes
- [ ] `VelkommenPage.tsx` og `KvitteringPage.tsx` opprettet
- [ ] `pages/index.ts` og `steps/index.ts` opprettet
- [ ] `ScenarioHeader.tsx` opprettet og montert i `App.tsx`
- [ ] `sentry/instrument.ts` og `SifQueryClientProvider.tsx` opprettet
- [ ] `yarn check:types` passerer