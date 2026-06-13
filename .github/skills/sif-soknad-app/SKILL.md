---
name: sif-soknad-app
type: reference
description: Arkitekturreferanse og beslutningslogg for @sif/soknad-app — rammeverket for søknadsapper i sif-brukerdialog.
---

# sif-soknad-app

## Bruk når

- Du skal utvide eller endre **selve rammeverk-pakken** `packages/sif-soknad-app`.
- Du feilsøker oppførsel i `SøknadRouter`, `SøknadStep`, `SøknadStepGuard`, `useStepData`, `useMellomlagring` e.l.
- Du trenger å forstå arkitekturvalg og nøkkelbegreper i rammeverket.

## Avgrensning — dette er IKKE

- **`sif-soknad-setup`** — som setter opp en ny *app* som bruker rammeverket.
- **`sif-soknad-add-step`** — som legger til steg i en *app*.
- **`sif-migration-baseline`** — som migrerer en *app* fra v1 til v2.

Disse skillene handler om å *bruke* rammeverket fra en app. Denne skillen handler om rammeverket *i seg selv*.

---

## Pakke og plassering

```
packages/sif-soknad-app/src/
  components/       SøknadRouter, SøknadStep, SøknadStepForm, SøknadStepGuard, StepRouteGuard
  consistency/      SøknadFormValuesContext, checkConsistencyForSteps, InconsistentFormValuesMessage
  context/          SøknadAppContext
  hooks/            useStepData, useMellomlagring, useSaveSøknadFormValues,
                    useCheckConsistency, useStartSøknad, useSøknadSendt,
                    useAvbryt, useStepNavigation
  store/            createSøknadAppStore (Zustand)
  types.ts          MellomlagringBlob, SøknadRouterProps, StepDefinition, ...
  utils/            stepUtils, routeUtils
```

Referanseimplementasjon: `apps/aktivitetspenger-soknad`

---

## Arkitektur

```
<SøknadRouter>                   ← context-provider, ingen <Routes>
  <SøknadFormValuesProvider>     ← draft-verdier for konsistenssjekk og live getters
    <SøknadAppContext.Provider>  ← store + config eksponert til alle hooks
      {children}                 ← appen sine <Routes> bor her
```

- `SøknadRouter` er ren provider — ingen routing-logikk
- `SøknadRouter` holder `children` tilbake til mellomlagring er hentet (`isInitialized`). Dersom gyldig mellomlagring finnes, navigeres bruker automatisk til `resumeStepId` uten at velkommensiden vises.
- `SøknadStepGuard` styrer redirect basert på `resumeStepId` fra Zustand-storen
- `SøknadStep` er wrapper for ett steg — henter tittel via `step.${stepId}.title`, bygger progress-stepper, kjører konsistenssjekk

---

## Nøkkelbegreper og navnekonvensjoner

### `resumeStepId` (ikke `currentStepId`)

`resumeStepId` i Zustand-storen er **gjenopptakingspunktet** — steget brukeren skal landes på ved reload. Det er IKKE nødvendigvis steget brukeren ser på nå.

- Settes til `stepOrder[0]` ved `startSøknad()`
- Avanseres til neste steg etter hver `commitState()`
- Er `undefined` hvis siste steg er committet (ingen neste steg)
- React Router styrer navigasjon uavhengig av denne verdien

Lokale parametere som betyr "steget som vises nå" heter fortsatt `currentStepId` (f.eks. i `useCheckConsistency`, `checkConsistencyForSteps`, `stepUtils.getPreviousNextStep`).

### `søknadsdata` vs `draftFormValues`

| Felt | Type | Innhold | Oppdateres |
|------|------|---------|------------|
| `søknadsdata` | `Record<stepId, TCommitted>` | Committet domendata | Kun ved `commitState()` |
| `draftFormValues` | `Record<stepId, Record<string, unknown>>` | Rå RHF-skjemaverdier | Lagres til/leses fra mellomlagring-blob |

### `SøknadFormValuesContext` — to subsystemer

**Konsistenssjekk (browser back/forward):**
- `søknadFormValues` — in-memory unmount-lagrede verdier per steg
- `setFormValuesForStep` / `clearFormValuesForStep`
- `markSkipNextUnmountSaveForStep` / `shouldSaveOnUnmountForStep`

**Live getters (manuell mellomlagring):**
- `liveGettersRef` — `Map<stepId, () => StepFormValues>` i en ref (unngår re-renders)
- `registerGetValuesForStep` / `unregisterGetValuesForStep` / `getLiveFormValuesForStep`
- `getAllLiveFormValues()` — henter verdier fra ALLE registrerte getters (typisk kun ett steg montert)

---

## Hook-API

### `useStepData<TCommitted, TDraft>(stepId)`

```tsx
const { lagretData, draftFormValues, commit } = useStepData<MySøknadsdata, MyFormValues>(stepId);
const methods = useForm({ defaultValues: draftFormValues ?? toMyFormValues(lagretData) });
```

- `lagretData` — committet domendata (`søknadsdata[stepId]`), `undefined` første gang
- `draftFormValues` — midlertidige RHF-verdier fra mellomlagring-blob (`draftFormValues[stepId]`), bruk som `defaultValues` foran `lagretData` etter reload
- `commit(data)` — commitState + rydder draft + lagrer mellomlagring + navigerer til neste steg

### `useSaveSøknadFormValues(stepId, getValues)`

Lagrer skjemaverdier til `SøknadFormValuesContext` ved unmount. Brukes i hvert steg-form for å fange opp endringer via browser back/forward. Registrerer også live getter for `useMellomlagring`.

```tsx
useSaveSøknadFormValues(stepId, methods.getValues);
```

Hopper over lagring hvis `markSkipNextUnmountSaveForStep` er satt (settes automatisk av `commit()`).

### `useMellomlagring()`

For manuell lagring midt i et steg (f.eks. etter at bruker legger til et listeelement):

```tsx
const { lagre } = useMellomlagring();
// kall lagre() etter endring, ikke bare ved submit
await lagre();
```

`lagre()` henter live verdier fra `getAllLiveFormValues()` — uavhengig av `resumeStepId`. Dette er viktig fordi `resumeStepId` kan peke på et annet steg enn det brukeren ser på.

### `useCheckConsistency(currentStepId)`

Sjekker om foregående stegs umonterte skjemaverdier avviker fra committet `søknadsdata`. Returnerer første inkonsistente `stepId`, eller `undefined`. Aktiveres automatisk i `SøknadStep`. Krever at `formValuesToSøknadsdata` er satt på `SøknadRouter`.

---

## `SøknadStepForm` — standard RHF steg-skjema

Standard wrapper for RHF-baserte steg-skjema. Eksporteres fra `@sif/soknad-app`.

```tsx
<SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
  {/* skjemafelter */}
</SøknadStepForm>
```

Håndterer automatisk:
- Forrige-knapp via `useStepNavigation`
- Deaktivering av submit-knapp ved konsistenssjekk-treff (`useCheckConsistency`)
- Valgfri `submitDisabled`, `isFinalSubmit`, `submitLabel`

Erstatter app-spesifikk `AppForm`-boilerplate. Alle apper som bruker `@sif/soknad-app` + RHF skal bruke denne.

---

## `MellomlagringBlob` — format

```ts
interface MellomlagringBlob {
  versjon: number;
  resumeStepId: string;           // gjenopptakingspunkt
  søknadsdata: Record<string, unknown>;
  draftFormValues?: Record<string, Record<string, unknown>>;  // midlertidige verdier
}
```

`isMellomlagringBlob` i `SøknadRouter` validerer at `resumeStepId` er en string. Gammel mellomlagring med feltet `currentStepId` vil feile validering og forkastes (brukere starter forfra — OK siden mellomlagring er transient).

---

## `commitState`-algoritmen (Zustand)

1. Oppdater `søknadsdata[stepId] = data`
2. Beregn hvilke steg som nå er inkludert (`isIncluded`)
3. Slett `søknadsdata` for steg som falt ut
4. Reberegn `includedSteps` med `isCompleted`-flag
5. `resumeStepId = includedSteps[fromIndex + 1]?.stepId` (alltid neste i sekvens)
6. Returner `{ newResumeStepId, newRoute }` (ingen side-effekter i storen)

`useStepData.commit()` håndterer side-effektene etter: rydder draft-verdier, lagrer mellomlagring, navigerer.

---

## `SøknadRouterProps` — viktige valgfrie props

```ts
// Aktiverer konsistenssjekk (browser back/forward-advarsel)
formValuesToSøknadsdata?: (stepId: string, formValues: Record<string, unknown>) => Record<string, unknown> | undefined;

// Vises etter vellykket innsending; URL settes til /kvittering
kvitteringElement?: ReactNode;
```

`formValuesToSøknadsdata` er opt-in — uten den er konsistenssjekken deaktivert.

---

## Kjente fallgruver

| Problem | Årsak | Fix |
|---------|-------|-----|
| `lagre()` lagrer ikke for steget brukeren er på | `resumeStepId` ≠ montert steg | `getAllLiveFormValues()` brukes nå — løst |
| Konsistenssjekk virker ikke | `formValuesToSøknadsdata` ikke satt på `SøknadRouter` | Legg til prop og implementer switch per stepId |
| Kvitteringssiden vises ikke | `setSøknadSendt()` setter `resumeStepId: undefined` → `SøknadStepGuard` redirecter | `SøknadRouter` renderer `kvitteringElement` state-basert, ikke route-basert |
| Navigerer til feil steg etter back+re-submit | `resumeStepId` peker på et steg lenger frem | `commitState` bruker alltid `includedSteps[fromIndex + 1]` — løst |
| Velkommensiden blinker ved reload med mellomlagring | `children` ble rendret før init + navigate | `SøknadRouter` holder `children` tilbake til `isInitialized = true` — løst |
| Bruker sendes til velkommensiden i stedet for riktig steg ved reload | `init(blob)` uten påfølgende `navigate` | `SøknadRouter` navigerer automatisk til `resumeStepId` etter init — løst |
| Submit aktivt selv om `InconsistentFormValuesMessage` vises | `submitDisabled`-prop videresendt uten konsistenssjekk | Bruk `SøknadStepForm` — deaktiverer submit automatisk via `useCheckConsistency` |
