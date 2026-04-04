---
name: sif-soknad-setup
description: Veiledning for oppsett av src/app/setup og routing shell (Soknad.tsx, VelkommenPage, KvitteringPage) i nye apper som bruker @sif/soknad og @sif/rhf.
---

# sif-soknad-setup Skill

## Formål

Guide for å sette opp `src/app/setup/`-mappen i en ny app som bruker `@sif/soknad` og `@sif/rhf` rammeverket.

## Når skal skillen brukes

- Du oppretter en ny søknadsapp i monorepo-et som skal bruke `@sif/soknad`.
- Du skal koble en eksisterende app til rammeverket og trenger å bygge opp setup-laget.
- Du trenger referanse til mønstrene og tilpasningspunktene for setup-laget.
- Du skal opprette routing-skallet (`Soknad.tsx`, `VelkommenPage`, `KvitteringPage`, barrel-filer).

## Scope

- Fokus: `src/app/setup/` og tilhørende typer og utils i appen, pluss routing shell og sider.
- Omfatter setup-laget og `Soknad.tsx`, `VelkommenPage`, `KvitteringPage`, barrel-filer — ikke steginnhold eller API-kall.
- Kildereferanse: `apps/sif-demo-app/src/app/setup/` og `apps/aktivitetspenger-soknad/src/app/setup/`.
- For initial data-flyt (`useInitialData`, `InitialDataLoader`) → bruk `sif-initial-data-loader`.
- For å legge til steg i routingen → bruk [sif-soknad-add-step](../sif-soknad-add-step/SKILL.md).

## Avgrensning mot initial data

`src/app/setup/` er kun for teknisk oppsett og rammeverksnære adaptere.

- Providers, query client, error boundaries, context wiring og tilsvarende hører hjemme her.
- Bootstrap av domenedata før appen rendres legges i `src/app/initial-data/`.
- `useInitialData.ts` og `InitialDataLoader.tsx` samlokaliseres der.

---

## Arkitektur: setup-laget

Setup-mappen er adapterlaget mellom appen og `@sif/soknad`. Flyten er:

```
soknadStepConfig.ts
    → useSoknadStore.ts        (createSøknadStore — state og steg-logikk)
    → soknadContext.ts         (createSøknadContext — kobler store, config og formValuesToSøknadsdata)
    → hooks/                   (app-spesifikke hjelpehooks som bruker context)
    → soknad/                  (UI-komponenter: SoknadStep, AppForm, SoknadFormButtons)
```

Resten av appen importerer normalt fra `@app/setup` i stedet for å kjenne rammeverket direkte.

---

## Mappestruktur

```
src/app/
  setup/
    constants.ts                       # APP_YTELSE og MELLOMLAGRING_VERSJON
    context/
    soknadContext.ts                 # createSøknadContext — SøknadContextProvider + useSøknadsflyt
    env/
      appEnv.ts                        # getAppEnv() — leser browser-env
    hooks/
      index.ts                         # re-eksporterer alle hooks + context
    useAvbrytSoknad.ts
    useSoknadMellomlagring.ts
    useSoknadRhfForm.ts
    useSoknadState.ts
    useSoknadStore.ts
      useStepDefaultValues.ts
      useStepSubmit.ts
    config/
            soknadStepConfig.ts              # SøknadStepId, stepConfig, stepOrder
        soknad/
      AppForm.tsx                      # SifForm + FormLayout wrapper
            SoknadFormButtons.tsx            # Navigasjonsknapper koblet til context
            SoknadStep.tsx                   # Side-container med progress, avbryt, consistency
    wrappers/
      AppErrorBoundary.tsx
  i18n/
    index.tsx                          # useAppIntl, AppText, applicationIntlMessages
    nb/
      appMessages.ts
    lenker.ts                            # valgfri lokal helper for interne URL-er, aldri fra sif-common-soknad-ds
  types/
    Mellomlagring.ts                   # SøknadMellomlagring, MellomlagringMetaData
        Soknadsdata.ts                     # Søknadsdata + per-steg typer
  utils/
        formValuesToSoknadsdata.ts         # switch(stepId) → StepSøknadsdata
```

### Lenkeabstraksjoner

Bruk en lokal `src/app/lenker.ts`-helper ved behov, eller inline URL-er direkte i komponentene.

- Hvis appen trenger en lenkehelper, definer `src/app/lenker.ts` lokalt.
- Hvis appen ikke trenger en helper, bruk inline URL-er direkte i komponentene.

---

## Raskeste vei: kopier fra sif-demo-app og modifiser

Dette er den anbefalte fremgangsmåten. Koden i demo-appen er referanseimplementasjonen og er battle-tested. Start fra denne og tilpass målrettet.

```bash
# Kjør fra monorepo-rot
SRC=apps/sif-demo-app/src/app
DST=apps/<ny-app>/src/app

cp -r $SRC/setup $DST/setup
cp -r $SRC/types $DST/types
cp -r $SRC/utils $DST/utils
cp -r $SRC/i18n  $DST/i18n
```

Deretter gjør du målrettede endringer på de tilpasningspunktene som er listet i tabellen nedenfor. Kjør `check:types` etter at du er ferdig — typefeilen vil peke nøyaktig på det som gjenstår.

### Gotchas å sjekke umiddelbart etter kopiering

- **Lenker** — bruk enten en lokal `lenker.ts`-helper eller inline URL-er direkte i komponentene.
- **`APP_YTELSE`** i `constants.ts` — sett til riktig `MellomlagringYtelse`-verdi for appen.
- **`basePath`** i `soknadContext.ts` — sett til appens URL-base (eks. `/aktivitetspenger-soknad`).
- **`soknadStepConfig.ts`** — bytt ut alle steg-IDer, routes, titler og `isCompleted`-sjekker.
- **`Soknadsdata.ts`** — juster per-steg typene til domenefeltene for appen.
- **`formValuesToSoknadsdata.ts`** — oppdater `switch`-casene til å matche de nye `SøknadStepId`-verdiene (start med `return undefined` og fyll ut steg for steg).
- **`appMessages.ts`** — sett `application.title` til riktig ytelsesnavn.
- **Initial data-flyt** — hold `useInitialData.ts` og `InitialDataLoader.tsx` adskilt. Detaljer for metadata-typing og mellomlagring ligger i `sif-initial-data-loader`.

---

## Detaljert forklaring: steg-for-steg

Bruk denne delen som referanse når du skal forstå mønsteret eller skrive fra scratch.

### 1. Definer steg-konfigurasjon

Opprett `src/app/setup/config/soknadStepConfig.ts`.

Tilpass per app:

- `SøknadStepId` enum — ett innslag per steg (alltid inkluder `OPPSUMMERING`)
- `SøknadState` interface — `søker: Søker` alltid med; legg til `barn: RegistrertBarn[]` om appen har barn-steg
- `søknadStepConfig` — `route` (URL-slug), `isCompleted` (sjekker om steget har søknadsdata)
- `søknadStepOrder` — rekkefølge på stegene (uten OPPSUMMERING om det alltid er sist og inkludert)
- `stepTitles` — visningstittel for hvert steg

```ts
// Eksempel: config/soknadStepConfig.ts
import { RegistrertBarn, Søker } from '@sif/api';
import { StepConfig } from '@sif/soknad/types';
import { Søknadsdata } from '../../types/Soknadsdata';

export enum SøknadStepId {
    MITT_STEG = 'mitt-steg',
    OPPSUMMERING = 'oppsummering',
}

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[]; // inkluder om appen har barn-steg
    søknadsdata: Søknadsdata;
}

export const søknadStepConfig: StepConfig<SøknadStepId, Søknadsdata> = {
    [SøknadStepId.MITT_STEG]: {
        route: 'mitt-steg',
        isCompleted: (s) => s.mittSteg !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [SøknadStepId.MITT_STEG, SøknadStepId.OPPSUMMERING];
```

`stepTitles` hardkodes ikke lenger her — stegtitler hentes fra i18n og sendes som prop til `<SøknadContextProvider>` (se trinn 6 og 9).

### 2. Definer Søknadsdata-typen

Opprett `src/app/types/Soknadsdata.ts`.

- Extend `BaseSøknadsdata` fra `@sif/soknad/types`
- Legg til en optional type per steg, indexert med `SøknadStepId`
- Start med tomme typer (TODO) og fyll ut når steg implementeres

```ts
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { BaseSøknadsdata } from '@sif/soknad/types';

export type MittStegSøknadsdata = {
    // TODO: legg til felt når steget implementeres
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.MITT_STEG]?: MittStegSøknadsdata;
}
```

#### Domenetype-strategi: lokale typer vs. genererte API-typer

Når en søknad trenger domenespesifikke typer (f.eks. `BarnSammeAdresse`, `SøkersRelasjonTilBarnet`), er det tre alternativer:

**A) Utled fra generert API-type** — anbefalt når typen finnes som felt i en generert type:

```ts
import { OmsorgspengerKroniskSyktBarnSøknad } from '@navikt/k9-brukerdialog-prosessering-api';

export type BarnSammeAdresse = OmsorgspengerKroniskSyktBarnSøknad['sammeAdresse'];
// Resultat: 'JA' | 'JA_DELT_BOSTED' | 'NEI'

export type SøkersRelasjonTilBarnet = NonNullable<OmsorgspengerKroniskSyktBarnSøknad['relasjonTilBarnet']>;
// Resultat: 'MOR' | 'FAR' | 'FOSTERFORELDER' | 'ADOPTIVFORELDER'
```

Legg til et `const`-objekt for enum-lignende DX (autocomplete, refaktorering):

```ts
export const BarnSammeAdresse = {
    JA: 'JA' as BarnSammeAdresse,
    JA_DELT_BOSTED: 'JA_DELT_BOSTED' as BarnSammeAdresse,
    NEI: 'NEI' as BarnSammeAdresse,
} as const;
```

**B) Lokal `enum`** — akseptabelt for typer som ikke finnes i generert kode, eller når appen trenger andre verdier enn API-et.

**C) Inline union type** — bruk direkte i interface/type i stedet for å lage en separat fil, om typen bare brukes ett sted.

**Arkitektur — tre separate datalag:**

```
SøknadFormValues   →  toSøknadsdata()  →  Søknadsdata  →  toApiData()  →  SøknadApiData
(fri form-struktur)    (normalisering)     (domene-      (oppsummering)   (API-kontrakt)
                                            modell)
```

- **`SøknadFormValues`** — fullstendig fri struktur optimalisert for skjema-UI. Kan inneholde strenger der domenemodellen bruker `Date`, `YesOrNo` der domenemodellen bruker `boolean`, osv.
- **`toSøknadsdata()`** — normaliserer form-verdier til domeneobjekter. Her konverteres f.eks. dato-strenger til `Date`-objekter og `YesOrNo` til `boolean`.
- **`Søknadsdata`** — normalisert domenemodell. Optimalisert for appens interne logikk, ikke for API-kontrakten.
- **`toApiData()`** — kjøres i oppsummeringssteget og konverterer `Søknadsdata` til API-formatet. Her kan f.eks. `Date` konverteres tilbake til ISO-streng og interne enum-verdier mappes til API-verdier.

Det betyr at interne typer (enums, verdier, struktur) kan avvike fra API-kontrakten — det er tilsiktet og ønskelig.

**Når alternativ A er nyttig:** Primært for typer som sendes _direkte_ til API-et uten konvertering, eller der du ønsker at interne typer skal samsvare eksakt med API-kontrakten for å unngå mappingkode. Sjekk `types.gen.ts` i `k9-brukerdialog-prosessering-api` under `src/generated/<ytelse>/` for tilgjengelige typer.

**Zod-skjemaer:** De genererte `zod.gen.ts`-filene inneholder per nå inline `z.enum()`-definisjoner uten separate eksporter. Utled typer fra TypeScript-typen (`types.gen.ts`), ikke fra Zod.

### 3. Definer Mellomlagring-typer

Opprett `src/app/types/Mellomlagring.ts` — nær identisk mellom apper, tilpass `MellomlagringMetaData` om appen ikke har barn.

```ts
import { RegistrertBarn, Søker } from '@sif/api';
import { Mellomlagring, SøknadFormValues } from '@sif/soknad/types';
import { Søknadsdata } from './Soknadsdata';

export type SøknadMellomlagring = Mellomlagring<Søknadsdata, SøknadFormValues>;

export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[]; // fjern om appen ikke har barn
}
```

> Initial data og metadata-validering hører til i `sif-initial-data-loader`. Hold denne skillen fokusert på setup-laget.

### 4. Opprett constants.ts

Tilpass `APP_YTELSE` til riktig `MellomlagringYtelse`-verdi fra `@sif/api`.

```ts
import { MellomlagringYtelse } from '@sif/api';

export const APP_YTELSE = MellomlagringYtelse.AKTIVITETSPENGER; // ← tilpass
export const MELLOMLAGRING_VERSJON = '0.0.1';
```

### 5. Boilerplate-filer (kopier direkte fra templates/)

Disse filene er like på tvers av apper og trenger minimal eller ingen tilpasning:

| Fil                               | Hva som evt. tilpasses                     |
| --------------------------------- | ------------------------------------------ |
| `hooks/useSoknadStore.ts`         | Ingenting — generisk via TypeScript        |
| `hooks/useSoknadRhfForm.ts`       | Ingenting                                  |
| `hooks/useSoknadMellomlagring.ts` | Ingenting                                  |
| `hooks/useSoknadState.ts`         | Ingenting                                  |
| `hooks/useStepDefaultValues.ts`   | Ingenting                                  |
| `hooks/useStepSubmit.ts`          | Ingenting                                  |
| `hooks/useAvbrytSoknad.ts`        | `navigate('/')` — destinasjon etter avbryt |
| `hooks/index.ts`                  | Ingenting                                  |
| `soknad/SoknadFormButtons.tsx`    | Ingenting                                  |
| `soknad/AppForm.tsx`              | Ingenting                                  |
| `wrappers/AppErrorBoundary.tsx`   | Ingenting                                  |

### 6. Tilpass soknadContext.ts

Tre punkter å tilpasse:

- `basePath` — URL-prefix for søknadsstegene (typisk `/soknad`)
- `formValuesToSøknadsdata` — pek på appens egen funksjon i `formValuesToSoknadsdata.ts` (se trinn 7)
- `getSøknadsdataForStep` — standard oppslag: `(stepId, søknadsdata) => søknadsdata?.[stepId]`

```ts
export const { SøknadContextProvider, useSøknadsflyt } = createSøknadContext<Søknadsdata, SøknadStepId>({
    useStore: useSøknadStore as any,
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    formValuesToSøknadsdata,
    getSøknadsdataForStep: (stepId, søknadsdata) => søknadsdata?.[stepId],
    basePath: '/soknad', // ← tilpass
});
```

`stepTitles` er **ikke** lenger del av config. Det sendes i stedet som et påkrevd prop direkte på `<SøknadContextProvider>` — se trinn 9.

### 7. Opprett formValuesToSoknadsdata.ts

Placeholder-implementasjon med `// TODO`-kommentarer. Fyll ut hvert steg etter hvert som de implementeres.

```ts
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { StepFormValues, StepSøknadsdata } from '@sif/soknad/types';

export const formValuesToSøknadsdata = (stepId: string, formValues: StepFormValues): StepSøknadsdata | undefined => {
    switch (stepId) {
        case SøknadStepId.MITT_STEG:
            // TODO: implementer når steget er klart
            return undefined;
        default:
            return undefined;
    }
};
```

#### VIKTIG: Unngå sirkulær avhengighet via FormValues-typer

`formValuesToSøknadsdata` importerer `*FormValues`-typer og `*Søknadsdata`-konvertere fra hvert steg. Hvis disse typene er definert direkte i `*Form.tsx`-komponentfilene oppstår en sirkulær avhengighet:

```
soknadContext → formValuesToSøknadsdata → BarnForm.tsx → AppForm → soknadContext
```

**Løsning:** Definer alltid `*FormFields` (enum) og `*FormValues` (interface) i en egen `types.ts` per steg-mappe — ikke i selve komponentfilen.

```
steps/
  barn/
    types.ts          ← FormFields + FormValues her
    BarnForm.tsx      ← importerer fra ./types
    barnStegUtils.ts  ← importerer fra ./types
```

`formValuesToSøknadsdata` importerer da fra `steps/barn/types` (ren TS-fil uten React), og syklusen oppstår ikke. Det samme gjelder `*StegUtils.ts`-filene.

### 8. Tilpass SoknadStep.tsx

To punkter å tilpasse:

- `text('application.title')` — krever at i18n er satt opp med denne nøkkelen
- `window.location.href` i `fortsettSenere` — bruk inline URL (`https://www.nav.no/minside`). Ikke lag en `lenker.ts`-abstraksjon.

### 9. Sett opp i18n og stegtitler

Opprett `src/app/i18n/nb/appMessages.ts` og `src/app/i18n/index.tsx`.

Minimum i `appMessages.ts` (inkluder én nøkkel per steg):

```ts
export const appMessages_nb = {
    'application.title': 'Søknad om [ytelse]',
    'step.mittSteg.title': 'Mitt steg',
    'step.oppsummering.title': 'Oppsummering',
};
```

`index.tsx` kombinerer `uiMessages.nb`, `rammeverkMessages.nb` og app-spesifikke meldinger og eksporterer `useAppIntl`, `AppText` og `applicationIntlMessages`.

#### Stegtitler via hook

Opprett `src/app/setup/hooks/useStepTitles.ts` og legg til i `hooks/index.ts`:

```ts
import { useAppIntl } from '../../i18n';
import { SøknadStepId } from '../config/SøknadStepId';

export const useStepTitles = (): Record<SøknadStepId, string> => {
    const { text } = useAppIntl();
    return {
        [SøknadStepId.MITT_STEG]: text('step.mittSteg.title'),
        [SøknadStepId.OPPSUMMERING]: text('step.oppsummering.title'),
    };
};
```

Bruk hooken der `<SøknadContextProvider>` brukes (typisk i `Soknad.tsx`):

```tsx
const stepTitles = useStepTitles();

<SøknadContextProvider stepTitles={stepTitles}>...</SøknadContextProvider>;
```

---

## Tilpasningspunkter per app — oppsummering

| Fil                                | Hva som tilpasses                                                          |
| ---------------------------------- | -------------------------------------------------------------------------- |
| `constants.ts`                     | `APP_YTELSE` (riktig `MellomlagringYtelse`), `MELLOMLAGRING_VERSJON`       |
| `soknadStepConfig.ts`              | `SøknadStepId`, `SøknadState`, routes, `isCompleted`, stepOrder            |
| `context/soknadContext.ts`         | `basePath`, referanse til `formValuesToSøknadsdata`                        |
| `types/Soknadsdata.ts`             | Per-steg søknadsdata-typer                                                 |
| `types/Mellomlagring.ts`           | `MellomlagringMetaData` (fjern `barn` om ikke relevant)                    |
| `utils/formValuesToSoknadsdata.ts` | Case per steg — fyll ut etter hvert                                        |
| `soknad/SoknadStep.tsx`            | `text('application.title')`, `window.location.href`                        |
| `i18n/nb/appMessages.ts`           | `application.title`, `step.<id>.title` per steg, og app-spesifikke tekster |
| `hooks/useStepTitles.ts`           | Ny hook — bygg `Record<SøknadStepId, string>` via `useAppIntl()`           |

---

## Sentry-oppsett

Nye apper skal ha Sentry-logging for API-feil. Følg dette mønsteret (referanse: `apps/aktivitetspenger-soknad`).

### 1. Initialiser Sentry i `src/sentry/instrument.ts`

Filen importeres som første linje i `main.tsx` for å sikre at Sentry er klar før alt annet.

```ts
import * as Sentry from '@sentry/react';
import React from 'react';
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from 'react-router-dom';

Sentry.init({
    dsn: 'https://20da9cbb958c4f5695d79c260eac6728@sentry.gc.nav.no/30',
    environment: import.meta.env.MODE,
    initialScope: {
        tags: { application: '<app-navn>' }, // ← tilpass, f.eks. 'aktivitetspenger-soknad'
    },
    integrations: [
        Sentry.reactRouterV7BrowserTracingIntegration({
            useEffect: React.useEffect,
            useLocation,
            useNavigationType,
            matchRoutes,
            createRoutesFromChildren,
        }),
        Sentry.replayIntegration({
            maskAllText: true,
            blockAllMedia: true,
        }),
    ],
    tracesSampleRate: 0.2,
    tracePropagationTargets: ['localhost', /^https:\/\/.*\.nav\.no/],
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
});
```

Importer i `main.tsx` som første linje:

```ts
import './sentry/instrument';
```

**Viktig:**

- DSN hardkodes — det er ikke en hemmelighet og er likt for alle SIF-apper.
- `sendDefaultPii` skal **ikke** settes til `true` — NAV behandler sensitiv personinformasjon.
- `tracesSampleRate` settes til `0.2` (ikke `1.0`) for å unngå støy og kostnader i prod.

### 2. Legg til `SifQueryClientProvider` i `wrappers/`

Opprett `src/app/setup/wrappers/SifQueryClientProvider.tsx`. Denne wrapperen setter opp `QueryClient` med automatisk Sentry-logging for alle API-feil.

```tsx
import * as Sentry from '@sentry/react';
import { isApiAxiosError, isApiError } from '@sif/api';
import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const queryClient = new QueryClient({
    queryCache: new QueryCache({
        onError: (error, query) => {
            if (isApiAxiosError(error) && error.originalError.response?.status === 401) {
                return;
            }
            const extras = isApiError(error)
                ? { type: error.type, context: error.context, message: error.message, queryKey: query.queryKey }
                : { message: error.message, queryKey: query.queryKey };

            Sentry.withScope((scope) => {
                scope.setExtras(extras);
                Sentry.captureException(isApiError(error) ? error.originalError : error);
            });
        },
    }),
});

export const SifQueryClientProvider = ({ children }: PropsWithChildren) => {
    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
```

Bruk den i stedet for `QueryClientProvider` i `App.tsx`:

```tsx
<SifQueryClientProvider>{/* ... */}</SifQueryClientProvider>
```

**Hva dette gir:**

- Alle `useQuery`-feil logges automatisk til Sentry med `type`, `context`, `message` og `queryKey` som extras.
- 401-feil skippes (forventet ved utløpt sesjon).
- `isApiError` og `isApiAxiosError` er type guards eksportert fra `@sif/api`.
- Logger `originalError` (den faktiske `AxiosError`/`ZodError`) for korrekt stack trace i Sentry.

---

## Routing shell og pages

Denne seksjonen dekker filene som må eksistere før første steg kan rendres:

- `src/app/Soknad.tsx` — routing-skall, store-init, kvittering-redirect
- `src/app/pages/velkommen/VelkommenPage.tsx` — startside med bekreftelse
- `src/app/pages/kvittering/KvitteringPage.tsx` — kvitteringsside etter innsending
- `src/app/pages/index.ts` — barrel-eksport
- `src/app/steps/index.ts` — barrel-eksport for steg (opprettes tom, fylles etter hvert)

**Forutsetning:** setup-laget over er fullført — `useSøknadStore`, `useStepTitles`, `søknadStepConfig`, `SøknadContextProvider` og `SøknadStep` finnes.

### Mappestruktur

```
src/app/
    Soknad.tsx
    pages/
        index.ts
        kvittering/
            KvitteringPage.tsx
        velkommen/
            VelkommenPage.tsx
    steps/
        index.ts          ← tom ved oppstart, fyll etter hvert som steg legges til
```

### `src/app/Soknad.tsx`

Routing-skallet. Tilpasningspunkter:

| Linje                       | Tilpass til                                                            |
| --------------------------- | ---------------------------------------------------------------------- |
| `Props`-interface           | Feltene fra `InitialData` i `useInitialData.ts`                        |
| `init({ søker, barn })`     | Match feltene i `SøknadState` (f.eks. fjern `barn` hvis ikke relevant) |
| `mellomlagring?.skjemadata` | Bytt til `mellomlagring?.søknadsdata` om appen bruker det feltet       |
| Route-elementer             | Legg til én `<Route>` per `SøknadStepId` etter hvert                   |

```tsx
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { StepRouteGuard } from '@sif/soknad/navigation';

import { søknadStepConfig } from '@app/setup/config/soknadStepConfig';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadContextProvider } from '@app/setup/context/soknadContext';
import { useSøknadStore, useStepTitles } from '@app/setup/hooks';

import { KvitteringPage, VelkommenPage } from './pages';
import { SøknadMellomlagring } from './types/Mellomlagring';
// import steg her etter hvert: import { MittSteg } from './steps';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[]; // fjern om appen ikke har barn
    mellomlagring?: SøknadMellomlagring;
}

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const stepTitles = useStepTitles();
    const init = useSøknadStore((s) => s.init);
    const søknadSendt = useSøknadStore((s) => s.søknadSendt);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStepId = useSøknadStore((s) => s.currentStepId);
    const includedSteps = useSøknadStore((s) => s.includedSteps);

    const location = useLocation();
    const navigate = useNavigate();

    useEffectOnce(() => {
        init({ søker, barn }, mellomlagring?.søknadsdata, mellomlagring?.currentStepId);
    });

    useEffect(() => {
        if (søknadSendt && location.pathname !== '/kvittering') {
            navigate('/kvittering', { replace: true });
        } else if (!søknadSendt && location.pathname === '/kvittering') {
            navigate('/', { replace: true });
        }
    }, [søknadSendt, location.pathname, navigate]);

    const currentStepRoute = currentStepId ? søknadStepConfig[currentStepId]?.route : undefined;
    useEffect(() => {
        if (currentStepRoute && location.pathname === '/') {
            navigate(`/soknad/${currentStepRoute}`, { replace: true });
        }
    }, [currentStepRoute, location.pathname, navigate]);

    if (søknadSendt && location.pathname !== '/kvittering') {
        return <KvitteringPage />;
    }

    if (!søknadSendt && location.pathname === '/kvittering') {
        return (
            <SøknadContextProvider stepTitles={stepTitles}>
                <VelkommenPage />
            </SøknadContextProvider>
        );
    }

    return (
        <SøknadContextProvider initialFormValues={mellomlagring?.skjemadata} stepTitles={stepTitles}>
            <Routes>
                <Route path="/" element={<VelkommenPage />} />
                <Route path="/kvittering" element={<KvitteringPage />} />
                <Route
                    path="/soknad"
                    element={
                        <StepRouteGuard
                            steps={includedSteps}
                            currentStepId={currentStepId}
                            isInitialized={!!søknadState}
                        />
                    }>
                    {/* Legg til én Route per steg her */}
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<div />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadContextProvider>
    );
};
```

**Viktig: `mellomlagring?.skjemadata` vs. `mellomlagring?.søknadsdata`**

`SøknadContextProvider` tar `initialFormValues` — dette er RHF-skjemadata (`skjemadata`). Ikke forveksle med `mellomlagring?.søknadsdata` som brukes i `init`.

### `src/app/pages/velkommen/VelkommenPage.tsx`

`guide.content` er app-spesifikt. Strukturen (hooks, `handleStart`, `StartPage`) er lik på tvers av apper.

**Krav til `StartPage`:** Komponenten krever `children` (påkrevd prop). Send `<span />` som plassholder om ingenting annet passer.

```tsx
import { useAppIntl } from '@app/i18n';
import { søknadStepConfig, søknadStepOrder } from '@app/setup/config/soknadStepConfig';
import { useSøknadMellomlagring, useSøknadsflyt, useSøknadStore } from '@app/setup/hooks';
import { BodyLong, VStack } from '@navikt/ds-react';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { StartPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { startSøknad } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { opprettMellomlagring, isPending } = useSøknadMellomlagring();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        const førsteStegId = søknadStepOrder[0];
        const førsteSteg = søknadStepConfig[førsteStegId];
        clearSøknadFormValues();
        startSøknad(førsteStegId, harForståttRettigheterOgPlikter);
        await opprettMellomlagring();
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <StartPage
            onStart={handleStart}
            isPending={isPending}
            guide={{
                navn: søknadState?.søker.fornavn || '',
                content: (
                    <VStack gap="space-8">
                        <BodyLong>{/* App-spesifikt innhold her */}</BodyLong>
                    </VStack>
                ),
            }}
            title={text('application.title')}>
            <span />
        </StartPage>
    );
};
```

### `src/app/pages/kvittering/KvitteringPage.tsx`

`documentTitle` og `tittel` er app-spesifikke.

```tsx
import { useAppIntl } from '@app/i18n';
import { Button } from '@navikt/ds-react';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { Kvittering } from '@sif/soknad-ui/components';
import { ApplicationPage } from '@sif/soknad-ui/pages';

export const KvitteringPage = () => {
    const { text } = useAppIntl();
    const path = getRequiredEnv(EnvKey.PUBLIC_PATH);

    const onRestart = () => {
        window.location.replace(path);
    };

    return (
        <ApplicationPage documentTitle="[Søknadsnavn] mottatt" applicationTitle={text('application.title')}>
            <Kvittering tittel="Vi har mottatt søknaden din om [ytelse]">
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </Kvittering>
        </ApplicationPage>
    );
};
```

### Barrel-filer

**`src/app/pages/index.ts`**

```ts
export { KvitteringPage } from './kvittering/KvitteringPage';
export { VelkommenPage } from './velkommen/VelkommenPage';
```

**`src/app/steps/index.ts`** — opprett tom, legg til én eksport per steg etter hvert:

```ts
// Fyll etter hvert som steg implementeres:
// export { MittStegSteg } from './mitt-steg/MittStegSteg';
```

> Når du legger til et steg: 1) Legg til eksport her, 2) Importer i `Soknad.tsx`, 3) Legg til `<Route>` i `/soknad`-gruppen. Se → [sif-soknad-add-step](../sif-soknad-add-step/SKILL.md).

### Sjekkliste — pages

- [ ] `src/app/Soknad.tsx` opprettet med riktig `Props` og `init`-kalling
- [ ] `src/app/pages/velkommen/VelkommenPage.tsx` opprettet
- [ ] `src/app/pages/kvittering/KvitteringPage.tsx` opprettet
- [ ] `src/app/pages/index.ts` opprettet
- [ ] `src/app/steps/index.ts` opprettet (tom eller med første steg)
- [ ] `src/demo/ScenarioHeader.tsx` opprettet og montert i `App.tsx`
- [ ] `yarn check:types` passerer

---

## Scenariovelger (dev-only)

Alle søknadsapper skal ha en scenariovelger som kun vises lokalt og i dev/demo-bygg. Den monteres direkte i `App.tsx`, og vises automatisk bare når `import.meta.env.PROD` er `false`.

### Oppsett

**1. Opprett `src/demo/ScenarioHeader.tsx`**

```tsx
import { getRequiredEnv } from '@navikt/sif-common-env';
import { ScenarioSelectorHeader, type ScenarioSelectorHeaderGroup } from '@sif/soknad-ui';

import { ScenarioType } from '../../mock/scenarios/types';
import { store } from '../../mock/state/store';

const scenarioGroups: Array<ScenarioSelectorHeaderGroup<ScenarioType>> = [
    {
        label: 'Gruppe (valgfritt)',
        options: [
            { value: ScenarioType.default, label: 'Standard' },
            // legg til øvrige scenarioer her
        ],
    },
];

export const ScenarioHeader = () => {
    if (import.meta.env.PROD) {
        return null;
    }

    const setScenario = (scenario: ScenarioType) => {
        store.setScenario(scenario);
        globalThis.location.assign(getRequiredEnv('PUBLIC_PATH'));
        globalThis.location.reload();
    };

    return <ScenarioSelectorHeader title="Demo av <appnavn>" groups={scenarioGroups} onSelectScenario={setScenario} />;
};
```

**2. Mont `<ScenarioHeader />` i `App.tsx` inne i `<BrowserRouter>`**

```tsx
import { ScenarioHeader } from './demo/ScenarioHeader';

// ...
<BrowserRouter basename={basePath}>
    <ScenarioHeader />
    <InitialDataLoader />
</BrowserRouter>;
```

`ScenarioSelectorHeader` returnerer `null` i produksjonsbygg via `import.meta.env.PROD`-sjekken i `ScenarioHeader`-wrapperen i appen, så ingen ekstra guard trengs andre steder.

### `ScenarioSelectorHeader` API

| Prop               | Type                                           | Beskrivelse                                           |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------- |
| `title`            | `string`                                       | Tittelen som vises i headeren                         |
| `buttonLabel`      | `string` (valgfritt, default: "Velg scenario") | Tekst på knappen                                      |
| `groups`           | `Array<ScenarioSelectorHeaderGroup<T>>`        | Grupper med scenarioer. `label` er valgfritt          |
| `onSelectScenario` | `(value: T) => void`                           | Kalles med scenariotype når bruker velger et scenario |

Eksportert fra `@sif/soknad-ui` (package allerede avhengighet i v2-apper).
