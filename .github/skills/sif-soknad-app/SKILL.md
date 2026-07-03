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

- **`sif-soknad-setup`** — som setter opp en ny _app_ som bruker rammeverket.
- **`sif-soknad-add-step`** — som legger til steg i en _app_.

Disse skillene handler om å _bruke_ rammeverket fra en app. Denne skillen handler om rammeverket _i seg selv_.

---

## Pakke og plassering

```
packages/sif-soknad-app/src/
  components/       SøknadAppProvider, SøknadRouter, SøknadStep, SøknadStepForm,
                    SøknadStepContext, SøknadStepGuard, SøknadVelkommenPage, StepRouteGuard
  consistency/      SøknadStepFormContext, checkConsistencyForSteps, InconsistentFormValuesMessage
  context/          SøknadAppContext
  hooks/            useStepData, useSøknadsdata, useMellomlagring, useSaveSøknadFormValues,
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
<SøknadAppProvider>              ← Faro, AppErrorBoundary, QueryClient, Analytics, Sentry-init
  <SøknadRouter>                 ← Zustand-store, mellomlagring-init, context-provider
    <SøknadStepFormProvider>   ← in-session skjemaverdier per steg (konsistenssjekk + live getters)
      <SøknadAppContext.Provider>← store + config eksponert til alle hooks
        {children}               ← appen sine <Routes> bor her
```

- `SøknadRouter` er primært en kontekst-provider, men har to `useEffect` med navigering:
    - Ved mount: henter mellomlagring → kaller `init(blob)` → navigerer til `resumeStepId` hvis gyldig blob
    - Ved `søknadSendt`: navigerer til `/kvittering`
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

### `søknadsdata` vs `draftFormValues` vs `persistedFormValues`

| Felt                  | Type                                      | Innhold                     | Oppdateres                              |
| --------------------- | ----------------------------------------- | --------------------------- | --------------------------------------- |
| `søknadsdata`         | `Record<stepId, TCommitted>`              | Committet domendata         | Kun ved `commitState()`                 |
| `persistedFormValues` | `Record<stepId, Record<string, unknown>>` | Rå RHF-skjemaverdier (blob) | Lagres til/leses fra mellomlagring-blob |
| `draftFormValues`     | `Record<stepId, Record<string, unknown>>` | In-session skjemaverdier    | Lagres ved steg-unmount denne sesjonen  |

`useStepData` returnerer `draftFormValues` (context, høyest prioritet) ?? `persistedFormValues` (blob, fallback ved reload).

### `SøknadStepFormContext` — to subsystemer

**Konsistenssjekk (browser back/forward):**

- `draftFormValues` — in-memory unmount-lagrede verdier per steg
- `setFormValuesForStep` / `clearFormValuesForStep`
- `markSkipNextUnmountSaveForStep` / `shouldSaveOnUnmountForStep`

**Live getters (manuell mellomlagring):**

- `liveGettersRef` — `Map<stepId, () => StepFormValues>` i en ref (unngår re-renders)
- `registerGetValuesForStep` / `unregisterGetValuesForStep`
- `getAllLiveFormValues()` — henter verdier fra ALLE registrerte getters (typisk kun ett steg montert)

---

## Hook-API

### `useStepData<TCommitted, TDraft>(stepId)`

```tsx
const { lagretData, draftFormValues, commit } = useStepData<MySøknadsdata, MyFormValues>(stepId);
const methods = useForm({ defaultValues: draftFormValues ?? toMyFormValues(lagretData) });
```

- `lagretData` — committet domendata (`søknadsdata[stepId]`), `undefined` første gang
- `draftFormValues` — beste tilgjengelige skjemaverdier: in-session (back/forward) hvis satt, ellers `persistedFormValues` fra mellomlagring-blob. Bruk som `defaultValues` foran `lagretData`.
- `commit(data)` — commitState + rydder draft + lagrer mellomlagring + navigerer til neste steg

### `useSøknadsdata<T>()`

Henter all committet søknadsdata castet til appens domene-type. Bruk i oppsummering.

```tsx
const søknadsdata = useSøknadsdata<Søknadsdata>();
```

### `useSaveSøknadFormValues(stepId, getValues)`

Lagrer skjemaverdier til `SøknadStepFormContext` ved unmount. Brukes i hvert steg-form for å fange opp endringer via browser back/forward. Registrerer også live getter for `useMellomlagring`.

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

Merk: `SøknadStepForm` kaller også `useCheckConsistency` internt for å deaktivere submit-knappen. De to kallene (fra `SøknadStep` og `SøknadStepForm`) er uavhengige og harmløse.

---

## `SøknadAppProvider`

Ytterste wrapper-komponent — brukes av apper som ikke setter opp providers selv.

```tsx
<SøknadAppProvider
    applicationKey="min-app"
    appVersion={import.meta.env.VITE_APP_VERSION}
    sentryConfig={{ dsn: '...', application: 'min-app' }}
    telemetryCollectorURL={import.meta.env.VITE_TELEMETRY_URL}>
    <App />
</SøknadAppProvider>
```

Setter opp:

- `FaroProvider` — Grafana Faro observability
- `AppErrorBoundary` — global error boundary
- `SifQueryClientProvider` — React Query-klient
- `AnalyticsProvider` — analytics-instans
- `DevBranchInfo` — vises kun i dev/PR-bygg
- Sentry-init — kjøres én gang (modul-global flaggvariabel)

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

## `SøknadVelkommenPage`

Ferdig velkomstside — wrapper rundt `StartPage` fra `@sif/soknad-ui`.

```tsx
<SøknadVelkommenPage title="Søknad om aktivitetspenger" guide={{ navn: 'Kari Veileder', content: <p>...</p> }}>
    {/* valgfritt ekstra innhold */}
</SøknadVelkommenPage>
```

Bruker `useStartSøknad` internt — kaller `startSøknad({ harForståttRettigheterOgPlikter })` ved klikk.

---

## `useStartSøknad()`

```tsx
const { startSøknad } = useStartSøknad();
await startSøknad({ harForståttRettigheterOgPlikter: true });
// eller med startdata:
await startSøknad({ harForståttRettigheterOgPlikter: true, annenData: '...' });
```

Aksepterer `initialSøknadsdata: Record<string, unknown>` (default `{}`). Initialiserer storen med `resumeStepId = stepOrder[0]`, lagrer mellomlagring (fire-and-forget) og navigerer til første steg.

---

## `MellomlagringBlob` — format

```ts
interface MellomlagringBlob {
    versjon: number;
    resumeStepId: string; // gjenopptakingspunkt
    søknadsdata: Record<string, unknown>;
    draftFormValues?: Record<string, Record<string, unknown>>; // midlertidige verdier
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

// Basepath for steg-ruter (default: '/soknad')
basePath?: string;

// URL for "fortsett senere"-navigering (default: 'https://www.nav.no/minside')
resumeLaterUrl?: string;

// Valgfri tilleggsvalidering av mellomlagret blob — returner null for å forkaste
validateMellomlagring?: (blob: MellomlagringBlob) => MellomlagringBlob | null;
```

`formValuesToSøknadsdata` er opt-in — uten den er konsistenssjekken deaktivert.

**Implementasjonsmønster i appen:** Lag en `useFormValuesToSøknadsdata`-hook som returnerer funksjonen. Hook-mønsteret er foretrukket fremfor statisk utility fordi konverteringen typisk trenger app-kontekst (f.eks. `barn`, `søker`):

```ts
// src/app/hooks/useFormValuesToSøknadsdata.ts
export const useFormValuesToSøknadsdata = () => {
    const { barn } = useAppContext();
    return useCallback(
        (stepId, formValues) => {
            switch (stepId) {
                case SøknadStepId.OM_BARNET:
                    return toOmBarnetSøknadsdata(formValues as unknown as OmBarnetFormValues, barn) as
                        | Record<string, unknown>
                        | undefined;
                // ...
                default:
                    return undefined;
            }
        },
        [barn],
    );
};

// src/app/Soknad.tsx
const formValuesToSøknadsdata = useFormValuesToSøknadsdata();
```

`undefined` fra `default`-casen betyr "hopp over konsistenssjekk for dette steget" — bruk som bevisst escape hatch, ikke som placeholder. Steg som trenger dynamisk data (f.eks. arbeidsgivere hentet basert på brukervalg): commit den hentede dataen som del av søknadsdata, slik at konverteringen forblir en ren funksjon av formValues.

## `SøknadStepGuard` — props

```tsx
<SøknadStepGuard basePath="/soknad" initialPath="/" />
```

- `basePath` — skal matche `<Route path="...">` i appen (default: `'/soknad'`)
- `initialPath` — redirect-sti ved ugyldig steg-URL (default: `'/'`)

---

## Kjente fallgruver

| Problem                                                              | Årsak                                                                                     | Fix                                                                           |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| `lagre()` lagrer ikke for steget brukeren er på                      | `resumeStepId` ≠ montert steg                                                             | `getAllLiveFormValues()` brukes nå — løst                                     |
| Konsistenssjekk virker ikke                                          | `formValuesToSøknadsdata` ikke satt på `SøknadRouter`                                     | Lag `useFormValuesToSøknadsdata`-hook og implementer switch per stepId        |
| Falsk inconsistency-advarsel for ett steg                            | `formValuesToSøknadsdata` returnerer `undefined` for steget, men søknadsdata er committet | Implementer konverteringen — bruk hook-mønster med app-kontekst i closure     |
| Kvitteringssiden vises ikke                                          | `setSøknadSendt()` setter `resumeStepId: undefined` → `SøknadStepGuard` redirecter        | `SøknadRouter` renderer `kvitteringElement` state-basert, ikke route-basert   |
| Navigerer til feil steg etter back+re-submit                         | `resumeStepId` peker på et steg lenger frem                                               | `commitState` bruker alltid `includedSteps[fromIndex + 1]` — løst             |
| Velkommensiden blinker ved reload med mellomlagring                  | `children` ble rendret før init + navigate                                                | `SøknadRouter` holder `children` tilbake til `isInitialized = true` — løst    |
| Bruker sendes til velkommensiden i stedet for riktig steg ved reload | `init(blob)` uten påfølgende `navigate`                                                   | `SøknadRouter` navigerer automatisk til `resumeStepId` etter init — løst      |
| Submit aktivt selv om `InconsistentFormValuesMessage` vises          | `submitDisabled`-prop videresendt uten konsistenssjekk                                    | Bruk `SøknadStepForm` — deaktiverer submit automatisk via `SøknadStepContext` |
