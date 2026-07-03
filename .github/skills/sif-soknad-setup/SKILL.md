---
name: sif-soknad-setup
type: action
description: Veiledning for oppsett av en ny søknadsapp med @sif/soknad-app — SøknadRouter, SøknadAppProvider, AppContext og routing shell.
---

# sif-soknad-setup

## Bruk når

- Du oppretter en ny søknadsapp som skal bruke `@sif/soknad-app`.
- Du kobler en eksisterende app til rammeverket og trenger setup-laget.
- Du skal opprette routing-skallet (`Soknad.tsx`, `Velkommen`, `Kvittering`).

## Referanseapp

`apps/aktivitetspenger-soknad` er den eneste fullstendig migrerte referanseappen. Les den alltid som fasit — den vinner over denne skillen ved motstrid.

## Leveranse

- `src/App.tsx` — `SøknadAppProvider` + `useInitialData` + `AppContextProvider`
- `src/useInitialData.ts` — bootstrap-queries
- `src/app/Soknad.tsx` — `SøknadRouter` + `SøknadStepGuard` + `Routes`
- `src/app/context/AppContext.tsx` — app-spesifikk datakontekst
- `src/app/setup/soknadStepConfig.ts` — `StepDefinition`-konfig + steg-rekkefølge
- `src/app/setup/constants.ts` — `APP_YTELSE`, `MELLOMLAGRING_VERSJON`
- `src/app/setup/appEnv.ts` — env-henting
- `src/app/types/SoknadStepId.ts` — steg-enum
- `src/app/types/Soknadsdata.ts` — per-steg domentyper
- `src/app/hooks/useFormValuesToSøknadsdata.ts` — hook som returnerer konverteringsfunksjonen
- `src/app/i18n/index.tsx` + `src/app/i18n/nb.ts` — i18n-aggregering
- `src/app/content/velkommen/Velkommen.tsx` — `SøknadVelkommenPage`
- `src/app/content/kvittering/Kvittering.tsx` — `SøknadKvitteringPage`
- `src/app/steps/index.ts` — barrel-eksport

## Omfang

- **Innenfor:** alt ovenfor
- **Utenfor:** steginnhold → `sif-soknad-add-step`, API-henting → `sif-api`, initial data-logikk → `sif-initial-data-loader`

## Mappestruktur

```
src/
  App.tsx
  main.tsx
  useInitialData.ts
  env.schema.ts
  demo/ScenarioHeader.tsx
  app/
    Soknad.tsx
    api/
      initApiClients.ts
      sendSoknad.ts
    context/AppContext.tsx
    hooks/useSendSoknad.ts
    i18n/
      index.tsx
      nb.ts
    lenker.ts
    setup/
      appEnv.ts
      constants.ts
      soknadStepConfig.ts
    types/
      SoknadApiData.ts
      SoknadStepId.ts
      Soknadsdata.ts
    utils/
      formValuesToSøknadsdata.ts
      soknadsdataToSoknadDTO.ts
    content/
      velkommen/
        Velkommen.tsx
        i18n/nb.ts, nn.ts
      kvittering/Kvittering.tsx
    steps/
      index.ts
      <steg>/
        <Prefix>Form.tsx
        <prefix>StegUtils.ts
        types.ts
        i18n/nb.ts, nn.ts
```

## Arbeidsrekkefølge

### 1. `src/app/types/SoknadStepId.ts`

```ts
export enum SøknadStepId {
    MITT_STEG = 'mitt-steg',
    OPPSUMMERING = 'oppsummering',
}
```

### 2. `src/app/setup/soknadStepConfig.ts`

```ts
import { StepDefinition } from '@sif/soknad-app';
import { SøknadStepId } from '@app/types/SoknadStepId';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.MITT_STEG]: {
        route: 'mitt-steg',
        isCompleted: (s) => s[SøknadStepId.MITT_STEG] !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [SøknadStepId.MITT_STEG, SøknadStepId.OPPSUMMERING];
```

Legg merke til: stegtitler settes **ikke** her. De hentes automatisk fra i18n via `step.<stepId>.title`.

### 3. `src/app/setup/constants.ts`

```ts
import { MellomlagringYtelse } from '@sif/api/k9-prosessering';

export const APP_YTELSE = MellomlagringYtelse.AKTIVITETSPENGER; // ← tilpass
export const MELLOMLAGRING_VERSJON = 1;
```

### 4. `src/app/types/Soknadsdata.ts`

```ts
import { SøknadStepId } from './SoknadStepId';

export type MittStegSøknadsdata = {
    // per-steg felter
};

export type Søknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    [SøknadStepId.MITT_STEG]?: MittStegSøknadsdata;
    [SøknadStepId.OPPSUMMERING]?: never;
};
```

Ingen `BaseSøknadsdata`-extend — det er en interim-v2-type.

### 5. `src/app/hooks/useFormValuesToSøknadsdata.ts`

Hook som returnerer `formValuesToSøknadsdata`-funksjonen. Bruk hook fremfor statisk utility fordi konverteringen ofte trenger app-kontekst (f.eks. `barn`, `søker`) for å rekonstruere søknadsdata korrekt.

```ts
import { useCallback } from 'react';
import { useAppContext } from '../context/AppContext';
import { SøknadStepId } from '../types/SoknadStepId';
import { toMittStegSøknadsdata } from '../steps/mitt-steg/mittStegUtils';
import { MittStegFormValues } from '../steps/mitt-steg/types';

export const useFormValuesToSøknadsdata = () => {
    const { barn } = useAppContext(); // hent det du trenger fra kontekst

    return useCallback(
        (stepId: string, formValues: Record<string, unknown>): Record<string, unknown> | undefined => {
            switch (stepId) {
                case SøknadStepId.MITT_STEG:
                    return toMittStegSøknadsdata(
                        formValues as unknown as MittStegFormValues,
                        barn, // kontekst-data i closure
                    ) as Record<string, unknown> | undefined;
                default:
                    return undefined;
            }
        },
        [barn],
    );
};
```

**Viktig:** `undefined` fra `default`-casen betyr "kan ikke konverteres for dette steget — hopp over konsistenssjekk". Bruk det kun som bevisst escape hatch, ikke som placeholder. Alle steg som kan konverteres uten ekstern data bør implementeres.

**Steg som trenger dynamisk lastet data** (f.eks. arbeidsgivere hentet basert på brukerens valg i et tidligere steg): commit den hentede dataen som del av søknadsdata i det aktuelle steget. Da er dataen tilgjengelig i `formValues` ved konvertering, uten behov for ekstra API-kall.

### 6. `src/app/context/AppContext.tsx`

```tsx
import { createContext, useContext } from 'react';
import { Søker } from '@sif/api/k9-prosessering';

export interface AppContextData {
    søker: Søker;
    // legg til ytelse-spesifikke felt her
}

const AppContext = createContext<AppContextData | null>(null);
export const AppContextProvider = AppContext.Provider;

export const useAppContext = (): AppContextData => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext brukt utenfor AppContextProvider');
    return ctx;
};
```

### 7. `src/app/i18n/nb.ts`

```ts
import { oppsummeringStegMessages_nb } from '../steps/oppsummering/i18n/nb';
// importer fra alle steg

export const appMessages_nb = {
    ...oppsummeringStegMessages_nb,
    'application.title': 'Søknad om [ytelse]',
    'kvittering.documentTitle': 'Søknad mottatt',
    'kvittering.title': 'Vi har mottatt søknaden din',
    'step.mitt-steg.title': 'Mitt steg',
    'step.oppsummering.title': 'Oppsummering',
};
```

Stegtitler registreres som `step.<stepId>.title` og hentes automatisk av `SøknadStep` fra i18n. Ingen separat `useStepTitles`-hook.

### 8. `src/app/i18n/index.tsx`

```tsx
import { typedIntlHelper } from '@sif/utils';
import { sifSoknadFormsMessages } from '@sif/soknad-forms';
import { sifSoknadUiMessages } from '@sif/soknad-ui/i18n';
import { FormattedMessage, useIntl } from 'react-intl';
import { IntlMessageObjectFormat } from '@sif/soknad-app';
import { appMessages_nb } from './nb';

const libMessages = {
    nb: { ...sifSoknadUiMessages.nb, ...sifSoknadFormsMessages.nb },
};

const nb = { ...libMessages.nb, ...appMessages_nb };
export type AppMessageKeys = keyof typeof nb;
const nn: Record<AppMessageKeys, string> = { ...nb };

export const useAppIntl = () => typedIntlHelper<AppMessageKeys>(useIntl());
export type AppIntlShape = ReturnType<typeof useAppIntl>;

interface AppTextProps {
    id: AppMessageKeys;
    values?: any;
}
export const AppText = (props: AppTextProps) => <FormattedMessage {...props} />;

export const applicationIntlMessages: IntlMessageObjectFormat = { nb, nn };
```

### 9. `src/app/Soknad.tsx`

```tsx
import { søknadStepConfig, søknadStepOrder } from '@app/setup/soknadStepConfig';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { APP_YTELSE, MELLOMLAGRING_VERSJON } from '@app/setup/constants';
import { useFormValuesToSøknadsdata } from '@app/hooks/useFormValuesToSøknadsdata';
import { SøknadRouter, SøknadStepGuard } from '@sif/soknad-app';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppIntl } from './i18n';
import { Kvittering } from './content/kvittering/Kvittering';
import { Velkommen } from './content/velkommen/Velkommen';
import { OppsummeringSteg } from './steps';

export const Søknad = () => {
    const { text } = useAppIntl();
    const formValuesToSøknadsdata = useFormValuesToSøknadsdata();

    return (
        <SøknadRouter
            config={søknadStepConfig}
            stepOrder={søknadStepOrder}
            ytelse={APP_YTELSE}
            versjon={MELLOMLAGRING_VERSJON}
            applicationTitle={text('application.title')}
            formValuesToSøknadsdata={formValuesToSøknadsdata}
            kvitteringElement={<Kvittering />}>
            <Routes>
                <Route path="/" element={<Velkommen />} />
                <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadRouter>
    );
};
```

### 10. `src/app/content/velkommen/Velkommen.tsx`

```tsx
import { useAppContext } from '@app/context/AppContext';
import { useAppIntl } from '@app/i18n';
import { SøknadVelkommenPage } from '@sif/soknad-app';

export const Velkommen = () => {
    const { text } = useAppIntl();
    const { søker } = useAppContext();

    return (
        <SøknadVelkommenPage
            title={text('application.title')}
            guide={{ navn: søker.fornavn || '', content: <p>...</p> }}>
            {/* valgfritt ekstra innhold */}
        </SøknadVelkommenPage>
    );
};
```

`SøknadVelkommenPage` håndterer `startSøknad` internt via `useStartSøknad`. Ingen manuell `handleStart`.

### 11. `src/app/content/kvittering/Kvittering.tsx`

```tsx
import { useAppIntl } from '@app/i18n';
import { SøknadKvitteringPage } from '@sif/soknad-ui';

export const Kvittering = () => {
    const { text } = useAppIntl();
    return (
        <SøknadKvitteringPage
            documentTitle={text('kvittering.documentTitle')}
            applicationTitle={text('application.title')}
            tittel={text('kvittering.title')}
            appRootUrl={import.meta.env.BASE_URL}
        />
    );
};
```

### 12. `src/App.tsx`

```tsx
import '@navikt/ds-css';
import { SomAppKey } from '@navikt/sif-app-register';
import { SøknadAppProvider } from '@sif/soknad-app';
import { ErrorPage, LoadingPage } from '@sif/soknad-ui';
import { BrowserRouter } from 'react-router-dom';

import { initApiClients } from './app/api/initApiClients';
import { AppContextProvider } from './app/context/AppContext';
import { applicationIntlMessages, useAppIntl } from './app/i18n';
import { getAppEnv } from './app/setup/appEnv';
import { Søknad } from './app/Soknad';
import { ScenarioHeader } from './demo/ScenarioHeader';
import { useInitialData } from './useInitialData';

const SøknadDataWrapper = () => {
    const result = useInitialData();
    const { text } = useAppIntl();
    switch (result.status) {
        case 'loading':
            return <LoadingPage applicationTitle={text('application.title')} />;
        case 'error':
            return <ErrorPage applicationTitle={text('application.title')} />;
        case 'success':
            return (
                <AppContextProvider value={{ søker: result.data.søker }}>
                    <Søknad />
                </AppContextProvider>
            );
    }
};

const env = getAppEnv();
initApiClients(env);

export const App = () => {
    if (globalThis.location.pathname === '/') {
        globalThis.location.pathname = env.PUBLIC_PATH;
        return null;
    }

    return (
        <SøknadAppProvider
            applicationKey={SomAppKey.key}
            appVersion={env.APP_VERSION}
            faroConfig={{
                isActive: env.SIF_PUBLIC_USE_FARO === 'true',
                telemetryCollectorURL: env.SIF_PUBLIC_NAIS_FRONTEND_TELEMETRY_COLLECTOR_URL,
            }}
            analyticsConfig={{ isActive: env.SIF_PUBLIC_USE_ANALYTICS === 'true' }}
            sentryConfig={{ dsn: '...', application: 'min-app' }}
            intlConfig={{ intlMessages: applicationIntlMessages, useLanguageSelector: true }}>
            <BrowserRouter basename={env.PUBLIC_PATH}>
                {__SCENARIO_HEADER__ ? <ScenarioHeader /> : null}
                <SøknadDataWrapper />
            </BrowserRouter>
        </SøknadAppProvider>
    );
};
```

### 13. `src/useInitialData.ts`

Se `sif-initial-data-loader` for fullt mønster. Mellomlagring håndteres av `SøknadRouter` — ikke i `useInitialData`.

## Tilpasningspunkter per app

| Fil                                   | Hva som tilpasses                                                         |
| ------------------------------------- | ------------------------------------------------------------------------- |
| `types/SoknadStepId.ts`               | Enum-verdier og steg-IDer                                                 |
| `setup/soknadStepConfig.ts`           | routes, isCompleted, stepOrder                                            |
| `setup/constants.ts`                  | `APP_YTELSE`, `MELLOMLAGRING_VERSJON`                                     |
| `setup/appEnv.ts`                     | Ytelse-spesifikke env-variabler                                           |
| `types/Soknadsdata.ts`                | Per-steg søknadsdatatyper                                                 |
| `context/AppContext.tsx`              | App-spesifikke dataprop (søker, barn, kontonummer osv.)                   |
| `hooks/useFormValuesToSøknadsdata.ts` | Hook med switch per steg, kontekst i closure                              |
| `i18n/nb.ts`                          | Aggreger steg-meldinger + `application.title`, `step.<id>.title` per steg |
| `content/velkommen/Velkommen.tsx`     | `guide.content` — app-spesifikt innhold                                   |
| `App.tsx`                             | `applicationKey`, `sentryConfig.dsn`, `AppContextProvider` props          |

## Viktige regler

### Stegtitler kommer fra i18n

`SøknadStep` henter stegtittel via `step.${stepId}.title` fra IntlProvider. Ingen `useStepTitles`-hook — legg bare til `'step.<id>.title': 'Min tittel'` i `nb.ts`.

### Ingen boilerplate-hooks i app

`useSoknadStore`, `useSoknadRhfForm`, `useStepSubmit`, `useStepDefaultValues`, `AppForm`, `SoknadStep` (app-lokal) — alt dette tilhørte interim v2 og skal ikke opprettes i nye apper. Bruk `useStepData`, `useSaveSøknadFormValues`, `SøknadStepForm`, `SøknadStep` fra `@sif/soknad-app` direkte.

### `FormValues` i `types.ts`

Definer alltid `FormFields` og `FormValues` i `steps/<steg>/types.ts`, ikke i komponentfilen. Unngår sirkulær avhengighet via `formValuesToSøknadsdata`.

### `AppContext` vs `SøknadRouter`

- Data som hentes ved oppstart (søker, barn, kontonummer): legges i `AppContext`
- Mellomlagring og søknadsdata: håndteres av `SøknadRouter` / Zustand-store

### Mellomlagring

`SøknadRouter` henter og håndterer mellomlagring automatisk. Ingen `Mellomlagring.ts`-type trengs i appen.

### `SøknadVelkommenPage`

Kaller `useStartSøknad` internt. Ingen manuell navigering eller `lagreSøknad()` i appen.

## Sjekkliste

- [ ] `types/SoknadStepId.ts` med steg-enum
- [ ] `setup/soknadStepConfig.ts` med routes og isCompleted
- [ ] `setup/constants.ts` med riktig `APP_YTELSE`
- [ ] `types/Soknadsdata.ts` med per-steg typer (ikke BaseSøknadsdata)
- [ ] `hooks/useFormValuesToSøknadsdata.ts` med switch per steg
- [ ] `context/AppContext.tsx` med app-spesifikke felt
- [ ] `i18n/nb.ts` med `application.title` og `step.<id>.title` per steg
- [ ] `i18n/index.tsx` med `applicationIntlMessages`
- [ ] `content/velkommen/Velkommen.tsx` med `SøknadVelkommenPage`
- [ ] `content/kvittering/Kvittering.tsx` med `SøknadKvitteringPage`
- [ ] `app/Soknad.tsx` med `SøknadRouter` og `SøknadStepGuard`
- [ ] `App.tsx` med `SøknadAppProvider` og `SøknadDataWrapper`
- [ ] `pnpm check:types` passerer
