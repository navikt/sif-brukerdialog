# @sif/soknad

Et internt React-rammeverk for stegbaserte søknader.

## Scope

- Dette rammeverket er laget for React-baserte søknadsdialoger i monorepoet.
- Det er ikke ment brukt i Next.js-appene.
- Mål: redusere oppstartskostnad for nye søknader og sikre konsistent oppbygging av felles flyt.

Rammeverket tar ansvar for flyt, navigasjon, state, route-guarding og konsistens mellom draft-skjemadata og lagrede søknadsdata. Applikasjonen eier domenemodell, validering, mellomlagring/API og stegspesifikk mapping.

## Pakke og imports

Pakken brukes vanligvis i monorepo via subpath-imports:

```ts
import { createSøknadStore } from '@sif/soknad/store';
import { createSøknadContext } from '@sif/soknad/context';
import { createSøknadReactHookForm } from '@sif/soknad/hooks';
import { StepRouteGuard } from '@sif/soknad/navigation';
```

Root-exporten finnes også:

```ts
import { store, context, hooks, navigation } from '@sif/soknad';
```

Anbefalt praksis er å bruke subpath-imports når du vet hvilken del av rammeverket du trenger.

## Ansvarsdeling

### Rammeverket eier

- beregning av inkluderte steg
- neste/forrige steg
- Zustand-store for flytstate
- current step
- route guard for steg-ruter
- draft-skjemadata mellom steg
- consistency-sjekk mellom draft og lagrede data

### Applikasjonen eier

- domenetyper for søknaden
- steg-ID-er og stegtekster
- validering
- mapping fra form values til søknadsdata
- uthenting av stegspesifikke søknadsdata
- mellomlagring / lagring / innsending
- sider og ruter i appen

## Kjernebegreper

### `StepId`

Union-type for steg i søknaden.

```ts
type StepId = 'barn' | 'arbeid' | 'oppsummering';
```

### `StepConfig`

Definerer alle steg i flyten.

```ts
import type { StepConfig } from '@sif/soknad/types';

type Søknadsdata = {
    harBarn?: boolean;
};

const stepConfig: StepConfig<StepId, Søknadsdata> = {
    barn: {
        route: 'barn',
        isIncluded: (data) => data.harBarn === true,
    },
    arbeid: {
        route: 'arbeid',
    },
    oppsummering: {
        route: 'oppsummering',
        isCompleted: (data) => data.harBarn !== undefined,
    },
};
```

Felter per steg:

- `route`: URL-segment. Anbefalt format er uten ledende eller trailing slash, for eksempel `barn`
- `isIncluded`: om steget er med i flyten
- `isCompleted`: om steget er ferdig

`route` normaliseres internt, så både `barn` og `/barn` fungerer, men bruk segment uten slash som standard.

### `stepOrder`

Den lineære rekkefølgen i søknaden.

```ts
const stepOrder: StepId[] = ['barn', 'arbeid', 'oppsummering'];
```

## Store

`createSøknadStore` oppretter en Zustand-store for flytstate.

```ts
import { createSøknadStore } from '@sif/soknad/store';

type Søknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    barn: {
        harBarn?: boolean;
    };
    arbeid: {
        harArbeid?: boolean;
    };
};

type AppState = {
    søknadsdata: Søknadsdata;
    locale: 'nb';
};

export const useSøknadStore = createSøknadStore<AppState, Søknadsdata, StepId>({
    stepOrder,
    stepConfig,
});
```

Store håndterer blant annet:

- `søknadState`
- `currentStepId`
- `includedSteps`
- `init(...)`
- `setSøknadsdata(...)`
- `setCurrentStep(...)`
- `resetSøknad()`
- `startSøknad(...)`
- `setSøknadSendt()`

## Context

`createSøknadContext` binder sammen store, navigasjon, consistency og draft-skjemadata.

```ts
import { createSøknadContext } from '@sif/soknad/context';

const { SøknadContextProvider, useSøknadFlow } = createSøknadContext<Søknadsdata, StepId>({
    useStore: useSøknadStore,
    stepConfig,
    stepOrder,
    stepTitles: {
        barn: 'Barn',
        arbeid: 'Arbeid',
        oppsummering: 'Oppsummering',
    },
    basePath: '/soknad',
    formValuesToSøknadsdata: (stepId, formValues) => {
        switch (stepId) {
            case 'barn':
                return { harBarn: Boolean(formValues.harBarn) };
            default:
                return undefined;
        }
    },
    getSøknadsdataForStep: (stepId, søknadsdata) => {
        switch (stepId) {
            case 'barn':
                return { harBarn: søknadsdata?.barn?.harBarn };
            default:
                return undefined;
        }
    },
});
```

### Hva `useSøknadFlow()` gir deg

- config: `stepConfig`, `stepOrder`, `stepTitles`, `basePath`
- state: `søknadsdata`, `currentStepId`, `includedSteps`
- actions: `setSøknadsdata`, `resetSøknad`, `startSøknad`, `setSøknadSendt`
- navigasjon: `navigateToStep`, `navigateToNextStep`, `navigateToPreviousStep`, `canGoNext`, `canGoPrevious`
- consistency: `checkConsistency`
- submit-helper: `commitStep`

## Skjema per steg

`createSøknadReactHookForm` lager en hook rundt `react-hook-form` og lagrer draft-formvalues ved unmount.

```ts
import { createSøknadReactHookForm } from '@sif/soknad/hooks';

const useSøknadForm = createSøknadReactHookForm<StepId>();

type BarnFormValues = {
    harBarn: boolean;
};

export const BarnStep = () => {
    const form = useSøknadForm<BarnFormValues>('barn', { harBarn: false });
    return null;
};
```

## Draft-formvalues og livssyklus

Rammeverket holder på usubmitttede skjemadata i `SøknadFormValuesContext`.

Typisk livssyklus:

1. bruker fyller ut et steg
2. komponenten unmountes uten submit
3. draft-formvalues lagres
4. ved submit committes data til søknadsdata
5. draft for steget ryddes, og unmount-save for samme steg hoppes over én gang

`commitStep(stepId, data)` i `useSøknadFlow()` gjør dette:

- lagrer data i store
- rydder draft-formvalues for steget

Applikasjonen er fortsatt ansvarlig for lagring/mellomlagring og navigasjon rundt submit.

Eksempel:

```ts
const flow = useSøknadFlow();

const onSubmit = async (data: BarnFormValues) => {
    flow.commitStep('barn', { harBarn: data.harBarn });
    await lagreSøknad();
    flow.navigateToNextStep('barn');
};
```

Ved avbryt/reset bør appen også rydde draft-formvalues:

```ts
const { resetSøknad } = useSøknadFlow();
const { clearSøknadFormValues } = useSøknadFormValues();

const avbryt = () => {
    resetSøknad();
    clearSøknadFormValues();
};
```

## Navigasjon

`useStepNavigation` brukes internt av contexten, men kan også brukes direkte ved behov.

Route-guarding gjøres med `StepRouteGuard`.

```tsx
import { Outlet } from 'react-router-dom';
import { StepRouteGuard } from '@sif/soknad/navigation';

<StepRouteGuard
    steps={flow.includedSteps}
    currentStepId={flow.currentStepId}
    basePath={flow.basePath}
    initialPath="/"
/>;
```

`StepRouteGuard`:

- venter på init hvis `isInitialized` er `false`
- sender bruker til `initialPath` hvis det ikke finnes current step
- sender bruker til route for `currentStepId` hvis URL peker på et steg som ikke er inkludert
- hvis `currentStepId` ikke er gyldig blant inkluderte steg, brukes første gyldige steg
- hvis ingen steg er tilgjengelige, brukes `initialPath`
- sender bruker til første forutgående steg med `completed: false` hvis URL peker direkte på et steg der et tidligere steg ikke er fullført

## Consistency

Consistency-sjekken brukes for å oppdage at tidligere steg er endret i draft, uten at endringen er commitet til store.

Det er nyttig når:

- bruker går tilbake og endrer et tidligere steg
- senere steg dermed kan være ugyldige

Rammeverket sammenligner:

- draft-formvalues per steg
- stegspesifikke søknadsdata via `getSøknadsdataForStep`
- mapping via `formValuesToSøknadsdata`

Kjernen ligger i:

- `checkConsistencyForSteps`
- `useCheckSøknadStepData`
- `useSøknadFlow().checkConsistency(...)`

## Viktige eksporter

### `@sif/soknad/types`

Sentrale typer som:

- `StepConfig`
- `StepDefinition`
- `IncludedStep`
- `SøknadFormValues`
- `StepFormValues`
- `StepSøknadsdata`
- `Mellomlagring`

### `@sif/soknad/store`

- `createSøknadStore`

### `@sif/soknad/context`

- `createSøknadContext`
- `SøknadContextConfig`
- `SøknadFlowContextValue`

### `@sif/soknad/hooks`

- `createSøknadReactHookForm`

### `@sif/soknad/navigation`

- `StepRouteGuard`
- `useStepNavigation`

### `@sif/soknad/consistency`

- `checkConsistencyForSteps`
- `useCheckSøknadStepData`
- `SøknadFormValuesProvider`
- `useSøknadFormValues`
- `useSøknadFormDraft`
- `InconsistentFormValuesMessage`

### `@sif/soknad-ui/pages`

- `ApplicationPage`
- `StartPage`
- `StepPage`
- `StepFooter`

### `@sif/soknad/components`

- `AppHeader`
- `ApplicationPictogram`
- `ErrorBoundary`
- `AppErrorFallback`
- `SanityAppStatus`

### `@sif/soknad/i18n`

- `useRammeverkIntl`
- `RammeverkText`
- `rammeverkMessages`

## Anbefalt app-flyt

1. definer `StepId`, `stepOrder`, `stepConfig`
2. opprett store med `createSøknadStore`
3. opprett context med `createSøknadContext`
4. wrap søknadsflyten i `SøknadContextProvider`
5. bruk `createSøknadReactHookForm` i hvert steg
6. bruk `commitStep(...)` ved submit
7. naviger med `useSøknadFlow()`
8. bruk `StepRouteGuard` rundt steg-rutene

## Testing

Følgende deler er gode kandidater for enhetstester:

- `getIncludedSteps`
- `getPreviousNextStep`
- `checkConsistencyForSteps`
- `routeUtils`
- `createSøknadStore`
- `StepRouteGuard`

## Begrensninger / kontrakter det er viktig å kjenne til

- `stepOrder` og `stepConfig` må beskrive samme stegsett
- `stepTitles` må dekke alle steg i `stepOrder`
- `formValuesToSøknadsdata` og `getSøknadsdataForStep` må være konsistente med hverandre
- appen må selv håndtere mellomlagring og innsending
- appen bør rydde hele draft-state ved avbryt og tilsvarende reset-scenarier

## Mappestruktur

```text
src/
  components/
  consistency/
  context/
  hooks/
  i18n/
  navigation/
  pages/
  store/
  types/
  utils/
```

## Status

Pakken er laget for intern bruk og videreutvikles løpende.
