---
name: sif-soknad-setup
description: Veiledning for oppsett av src/app/setup i nye apper som bruker @sif/soknad og @sif/rhf.
---

# sif-soknad-setup Skill

## Purpose

Guide for å sette opp `src/app/setup/`-mappen i en ny app som bruker `@sif/soknad` og `@sif/rhf` rammeverket.

## When to use

- Du oppretter en ny søknadsapp i monorepo-et som skal bruke `@sif/soknad`.
- Du skal koble en eksisterende app til rammeverket og trenger å bygge opp setup-laget.
- Du trenger referanse til mønstrene og tilpasningspunktene for setup-laget.

## Scope

- Fokus: `src/app/setup/` og tilhørende typer og utils i appen.
- Ikke inkludert: selve steginnhold, API-kall, velkomst- og kvitteringssider.
- Kildereferanse: `apps/sif-demo-app/src/app/setup/` og `apps/aktivitetspenger-soknad/src/app/setup/`.

---

## Arkitektur: setup-laget

Setup-mappen er adapterlaget mellom appen og `@sif/soknad`. Flyten er:

```
søknadStepConfig.ts
  → useSøknadStore.ts        (createSøknadStore — state og steg-logikk)
  → søknadContext.ts         (createSøknadContext — kobler store, config og formValuesToSøknadsdata)
  → hooks/                   (app-spesifikke hjelpehooks som bruker context)
  → søknad/                  (UI-komponenter: SøknadStep, AppForm, SøknadFormButtons)
```

Resten av appen importerer normalt fra `@app/setup` i stedet for å kjenne rammeverket direkte.

---

## Mappestruktur

```
src/app/
  setup/
    constants.ts                       # APP_YTELSE og MELLOMLAGRING_VERSJON
    context/
      søknadContext.ts                 # createSøknadContext — SøknadContextProvider + useSøknadFlow
    env/
      appEnv.ts                        # getAppEnv() — leser browser-env
    hooks/
      index.ts                         # re-eksporterer alle hooks + context
      useAvbrytSøknad.ts
      useSøknadMellomlagring.ts
      useSøknadRhfForm.ts
      useSøknadState.ts
      useSøknadStore.ts
      useStepDefaultValues.ts
      useStepSubmit.ts
    config/
      søknadStepConfig.ts              # SøknadStepId, stepConfig, stepOrder, stepTitles
    søknad/
      AppForm.tsx                      # SifForm + FormLayout wrapper
      SøknadFormButtons.tsx            # Navigasjonsknapper koblet til context
      SøknadStep.tsx                   # Side-container med progress, avbryt, consistency
    wrappers/
      AppErrorBoundary.tsx
  i18n/
    index.tsx                          # useAppIntl, AppText, applicationIntlMessages
    nb/
      appMessages.ts
  lenker.ts                            # getLenker() — interne URL-er, IKKE fra sif-common-soknad-ds
  types/
    Mellomlagring.ts                   # SøknadMellomlagring, MellomlagringMetaData
    Søknadsdata.ts                     # Søknadsdata + per-steg typer
  utils/
    formValuesToSøknadsdata.ts         # switch(stepId) → StepSøknadsdata
```

### VIKTIG: sif-common-soknad-ds må IKKE brukes

`sif-common-soknad-ds` er det gamle rammeverket som erstattes. Importer aldri fra det.

- `getLenker()` defineres lokalt i `src/app/lenker.ts` uten avhengighet til `sif-common-soknad-ds`.

---

## Raskeste vei: kopier fra sif-demo-app og modifiser

Dette er den anbefalte fremgangsmåten. Koden i demo-appen er referanseimplementasjonen og er battle-tested. Skriv ikke fra scratch.

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

- **Ikke lag en `lenker.ts`-fil** — bruk inline URL-er direkte i `SøknadStep.tsx` (`window.location.href = 'https://www.nav.no/minside'`). Lenke-abstraksjoner fra `sif-common-soknad-ds` er det gamle rammeverket og må ikke brukes.
- **`APP_YTELSE`** i `constants.ts` — sett til riktig `MellomlagringYtelse`-verdi for appen.
- **`basePath`** i `søknadContext.ts` — sett til appens URL-base (eks. `/aktivitetspenger-soknad`).
- **`søknadStepConfig.ts`** — bytt ut alle steg-IDer, routes, titler og `isCompleted`-sjekker.
- **`Søknadsdata.ts`** — juster per-steg typene til domenefeltene for appen.
- **`formValuesToSøknadsdata.ts`** — oppdater `switch`-casene til å matche de nye `SøknadStepId`-verdiene (start med `return undefined` og fyll ut steg for steg).
- **`appMessages.ts`** — sett `application.title` til riktig ytelsesnavn.
- **Metadata-typing i `useInitialData`** — `useMemo` som lager metadata-objektet for mellomlagring **må** ha eksplisitt type `MellomlagringMetaData | undefined` både som generic-parameter og returtype. Uten dette kan objektet få feil shape (ekstra/manglende felt), og `objectHash` i `useYtelseMellomlagring` vil produsere en annen hash enn den som ble lagret — noe som fører til at mellomlagringen slettes stille ved hver innlasting. Riktig mønster:
    ```ts
    const metadata = useMemo<MellomlagringMetaData | undefined>((): MellomlagringMetaData | undefined => {
        // ... bygg metadata
    }, [deps]);
    ```

---

## Detaljert forklaring: steg-for-steg

Bruk denne delen som referanse når du skal forstå mønsteret eller skrive fra scratch.

### 1. Definer steg-konfigurasjon

Opprett `src/app/setup/config/søknadStepConfig.ts`.

Tilpass per app:

- `SøknadStepId` enum — ett innslag per steg (alltid inkluder `OPPSUMMERING`)
- `SøknadState` interface — `søker: Søker` alltid med; legg til `barn: RegistrertBarn[]` om appen har barn-steg
- `søknadStepConfig` — `route` (URL-slug), `isCompleted` (sjekker om steget har søknadsdata)
- `søknadStepOrder` — rekkefølge på stegene (uten OPPSUMMERING om det alltid er sist og inkludert)
- `stepTitles` — visningstittel for hvert steg

```ts
// Eksempel: config/søknadStepConfig.ts
import { RegistrertBarn, Søker } from '@sif/api';
import { StepConfig } from '@sif/soknad/types';
import { Søknadsdata } from '../../types/Søknadsdata';

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

export const stepTitles: Record<SøknadStepId, string> = {
    [SøknadStepId.MITT_STEG]: 'Mitt steg',
    [SøknadStepId.OPPSUMMERING]: 'Oppsummering',
};
```

### 2. Definer Søknadsdata-typen

Opprett `src/app/types/Søknadsdata.ts`.

- Extend `BaseSøknadsdata` fra `@sif/soknad/types`
- Legg til en optional type per steg, indexert med `SøknadStepId`
- Start med tomme typer (TODO) og fyll ut når steg implementeres

```ts
import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { BaseSøknadsdata } from '@sif/soknad/types';

export type MittStegSøknadsdata = {
    // TODO: legg til felt når steget implementeres
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.MITT_STEG]?: MittStegSøknadsdata;
}
```

### 3. Definer Mellomlagring-typer

Opprett `src/app/types/Mellomlagring.ts` — nær identisk mellom apper, tilpass `MellomlagringMetaData` om appen ikke har barn.

```ts
import { RegistrertBarn, Søker } from '@sif/api';
import { Mellomlagring, SøknadFormValues } from '@sif/soknad/types';
import { Søknadsdata } from './Søknadsdata';

export type SøknadMellomlagring = Mellomlagring<Søknadsdata, SøknadFormValues>;

export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[]; // fjern om appen ikke har barn
}
```

> **VIKTIG:** Når du oppretter metadata-objektet i `InitialDataLoader`, må `useMemo` ha eksplisitt type `MellomlagringMetaData | undefined`. Mellomlagring-hooken bruker `objectHash(metadata)` for å verifisere at lagret data tilhører gjeldende brukerdata. Hvis metadata-objektet har feil shape (f.eks. mangler `barn` eller har ekstra felt), vil hashen ikke matche og mellomlagringen slettes stille. Typingen fanger dette ved kompilering.

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
| `hooks/useSøknadStore.ts`         | Ingenting — generisk via TypeScript        |
| `hooks/useSøknadRhfForm.ts`       | Ingenting                                  |
| `hooks/useSøknadMellomlagring.ts` | Ingenting                                  |
| `hooks/useSøknadState.ts`         | Ingenting                                  |
| `hooks/useStepDefaultValues.ts`   | Ingenting                                  |
| `hooks/useStepSubmit.ts`          | Ingenting                                  |
| `hooks/useAvbrytSøknad.ts`        | `navigate('/')` — destinasjon etter avbryt |
| `hooks/index.ts`                  | Ingenting                                  |
| `søknad/SøknadFormButtons.tsx`    | Ingenting                                  |
| `søknad/AppForm.tsx`              | Ingenting                                  |
| `wrappers/AppErrorBoundary.tsx`   | Ingenting                                  |

### 6. Tilpass søknadContext.ts

Tre punkter å tilpasse:

- `basePath` — URL-prefix for søknadsstegene (typisk `/soknad`)
- `formValuesToSøknadsdata` — pek på appens egen funksjon (se trinn 7)
- `getSøknadsdataForStep` — standard oppslag: `(stepId, søknadsdata) => søknadsdata?.[stepId]`

```ts
export const { SøknadContextProvider, useSøknadFlow } = createSøknadContext<Søknadsdata, SøknadStepId>({
    useStore: useSøknadStore as any,
    stepConfig: søknadStepConfig,
    stepOrder: søknadStepOrder,
    stepTitles: stepTitles,
    formValuesToSøknadsdata,
    getSøknadsdataForStep: (stepId, søknadsdata) => søknadsdata?.[stepId],
    basePath: '/soknad', // ← tilpass
});
```

### 7. Opprett formValuesToSøknadsdata.ts

Placeholder-implementasjon med `// TODO`-kommentarer. Fyll ut hvert steg etter hvert som de implementeres.

```ts
import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
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

### 8. Tilpass SøknadStep.tsx

To punkter å tilpasse:

- `text('application.title')` — krever at i18n er satt opp med denne nøkkelen
- `window.location.href` i `fortsettSenere` — bruk inline URL (`https://www.nav.no/minside`). Ikke lag en `lenker.ts`-abstraksjon.

### 9. Sett opp i18n

Opprett `src/app/i18n/nb/appMessages.ts` og `src/app/i18n/index.tsx`.

Minimum i `appMessages.ts`:

```ts
export const appMessages_nb = {
    'application.title': 'Søknad om [ytelse]',
};
```

`index.tsx` kombinerer `uiMessages.nb`, `rammeverkMessages.nb` og app-spesifikke meldinger og eksporterer `useAppIntl`, `AppText` og `applicationIntlMessages`.

---

## Tilpasningspunkter per app — oppsummering

| Fil                                | Hva som tilpasses                                                           |
| ---------------------------------- | --------------------------------------------------------------------------- |
| `constants.ts`                     | `APP_YTELSE` (riktig `MellomlagringYtelse`), `MELLOMLAGRING_VERSJON`        |
| `søknadStepConfig.ts`              | `SøknadStepId`, `SøknadState`, routes, `isCompleted`, stepOrder, stepTitles |
| `context/søknadContext.ts`         | `basePath`, referanse til `formValuesToSøknadsdata`                         |
| `types/Søknadsdata.ts`             | Per-steg søknadsdata-typer                                                  |
| `types/Mellomlagring.ts`           | `MellomlagringMetaData` (fjern `barn` om ikke relevant)                     |
| `utils/formValuesToSøknadsdata.ts` | Case per steg — fyll ut etter hvert                                         |
| `søknad/SøknadStep.tsx`            | `text('application.title')`, `getLenker().minSide`                          |
| `i18n/nb/appMessages.ts`           | `application.title` og app-spesifikke tekster                               |

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
<SifQueryClientProvider>
    {/* ... */}
</SifQueryClientProvider>
```

**Hva dette gir:**
- Alle `useQuery`-feil logges automatisk til Sentry med `type`, `context`, `message` og `queryKey` som extras.
- 401-feil skippes (forventet ved utløpt sesjon).
- `isApiError` og `isApiAxiosError` er type guards eksportert fra `@sif/api`.
- Logger `originalError` (den faktiske `AxiosError`/`ZodError`) for korrekt stack trace i Sentry.
