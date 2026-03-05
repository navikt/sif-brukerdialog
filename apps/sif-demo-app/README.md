# sif-demo-app

Demo-app og referanseimplementasjon for søknadsrammeverket.

---

## Overordnet dataflyt

```
AppInfoLoader
  └── henter søker, barn, mellomlagring (via react-query)
      └── Søknad (props: søker, barn, mellomlagring?)
            ├── init() → useSøknadStore
            ├── StepFormValuesProvider  (skjemadata mellom navigeringer)
            └── Routes
                  ├── /            → VelkommenPage | redirect til /soknad
                  ├── /soknad      → SøknadIndexRedirect → riktig steg
                  ├── /soknad/:steg → StepRouteGuard → steg-komponenter
                  └── /kvittering  → KvitteringPage
```

---

## Rammeverket (`src/rammeverk`)

Rammeverket eier all generisk søknadslogikk. Søknaden konfigurerer og bruker den.

### State – `createSøknadStore`

```typescript
const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>({
    stepOrder: søknadStepOrder,
    stepConfig: søknadStepConfig,
});
```

Gir følgende state og actions:

| Felt / action                                                  | Beskrivelse                                              |
| -------------------------------------------------------------- | -------------------------------------------------------- |
| `søknadState`                                                  | All søknadsdata inkl. søker, barn og `søknadsdata`       |
| `currentStepId`                                                | Aktivt steg. `undefined` betyr at søknad ikke er startet |
| `includedSteps`                                                | Beregnede steg basert på `isIncluded` i stepConfig       |
| `init(initialState, mellomlagretSøknadsdata?, currentStepId?)` | Kalles én gang ved oppstart                              |
| `startSøknad(firstStepId)`                                     | Setter currentStepId, nullstiller søknadsdata            |
| `setSøknadsdata(partial)`                                      | Oppdaterer søknadsdata for ett steg                      |
| `setCurrentStep(stepId)`                                       | Oppdaterer aktivt steg                                   |
| `resetSøknad()`                                                | Nullstiller currentStepId og søknadsdata                 |

### Routing

**`SøknadIndexRedirect`** – Redirecter fra `/soknad` til mellomlagret steg, eller til startsiden.

```tsx
<SøknadIndexRedirect stepConfig={søknadStepConfig} mellomlagretStepId={currentStepId} />
```

**`StepRouteGuard`** – Venter på initialisering, redirecter hvis `currentStepId` mangler eller URL-steget ikke er inkludert.

```tsx
<StepRouteGuard steps={includedSteps} currentStepId={currentStepId} isInitialized={!!søknadState} />
```

### State – `StepFormValuesContext`

Beholder skjemaverdier som ikke er submittet, slik at browser back/forward fungerer og reload gjenoppretter verdier fra mellomlagring.

```tsx
<StepFormValuesProvider initialValues={mellomlagring?.skjemadata}>
```

Brukes i steg via `useStepFormValues()`:

- `getStepFormValues(stepId)` – henter lagrede skjemaverdier
- `setStepFormValues(stepId, values)` – lagrer underveis
- `clearAllStepFormValues()` – nullstilles ved submit

### Hooks

**`useStepNavigation`** – Håndterer navigering mellom steg basert på `includedSteps`.

```typescript
const { navigateToNextStep, navigateToPreviousStep, canGoPrevious } = useStepNavigation({
    stepConfig,
    getIncludedSteps: () => useSøknadStore.getState().includedSteps,
    setCurrentStep,
});
```

### Komponenter

- **`SøknadFooter`** – Rendrer "Avbryt"-knapp. Tar `onAvbryt` som prop.
- **`StepFormValuesGuard`** – Lagrer skjemaverdier ved navigering bort (blur).
- **`InvalidStepInfo`** – Vises hvis et steg er ugyldig.

---

## Søknaden (`src/app`)

### Steg-konfigurasjon

```typescript
export const søknadStepConfig: StepConfig<Søknadsdata> = {
    [SøknadStepId.HOBBY]: {
        id: SøknadStepId.HOBBY,
        route: 'hobby',
        isIncluded: (s) => s.personalia?.harHobby === 'ja', // dynamisk steg
        isCompleted: (s) => s.hobby !== undefined,
    },
    // ...
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.PERSONALIA,
    SøknadStepId.HOBBY,
    SøknadStepId.KONTAKT,
    SøknadStepId.OPPSUMMERING,
];
```

### Mellomlagring – `useSøknadMellomlagring`

Wrapper rundt `useYtelseMellomlagring` fra `@navikt/sif-common-query`. Leser state direkte fra store for å unngå stale closures.

| Eksport                               | Beskrivelse                                            |
| ------------------------------------- | ------------------------------------------------------ |
| `lagreSøknad()`                       | Lagrer søknadsdata etter steg-submit (uten skjemadata) |
| `lagreSøknadOgSkjemadata(skjemadata)` | Lagrer med skjemadata (for autosave midt i steg)       |
| `slettMellomlagring()`                | Sletter og fjerner fra react-query cache               |
| `isPending`                           | `true` mens lagring/sletting pågår                     |

### Avbryt – `useAvbrytSøknad`

```typescript
const avbrytSøknad = useAvbrytSøknad();
// → resetSøknad() + clearAllStepFormValues() + slettMellomlagring() + navigate('/')
```

`resetSøknad()` nullstiller `currentStepId` synkront i store. Routing i `Søknad.tsx` leser fra store, så brukeren lander på `VelkommenPage` uten hvit side.

### Steg-implementasjon med `AppSøknadStep`

```tsx
<AppSøknadStep<TSkjemadata, TSøknadsdata>
    stepId={SøknadStepId.PERSONALIA}
    toSøknadsdata={(data) => mapToSøknadsdata(data)}
    toFormValues={(søknadsdata) => mapToFormValues(søknadsdata)}>
    {({ defaultValues, onSubmit, isPending, onPrevious }) => (
        <PersonaliaForm
            defaultValues={defaultValues}
            onSubmit={onSubmit}
            isPending={isPending}
            onPrevious={onPrevious}
        />
    )}
</AppSøknadStep>
```

`AppSøknadStep` håndterer:

- Henting av defaultValues (fra skjemadata eller søknadsdata)
- Submit → `setSøknadsdata` → `lagreSøknad` → `navigateToNextStep`
- Forrige-knapp via `onPrevious`
- `ValidSøknadStepGuard` som redirecter ut av steget hvis det ikke er gyldig å vise

---

## Checklist for ny søknad

- [ ] Definer `SøknadStepId` enum og `Søknadsdata`-type
- [ ] Lag `søknadStepConfig` og `søknadStepOrder`
- [ ] Lag `SøknadState` interface (extends med søker/barn/etc.)
- [ ] Opprett `useSøknadStore` via `createSøknadStore`
- [ ] Implementer `useSøknadMellomlagring` med app-spesifikk `APP_YTELSE`
- [ ] Implementer `useAvbrytSøknad`
- [ ] Sett opp `AppInfoLoader` som henter søker, barn og mellomlagring
- [ ] Sett opp `Søknad`-komponent med routes og `StepFormValuesProvider`
- [ ] Implementer hvert steg med `AppSøknadStep`
- [ ] Implementer oppsummeringsside og kvitteringsside
