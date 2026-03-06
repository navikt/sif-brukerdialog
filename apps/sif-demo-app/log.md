# soknad-rammeverk – Utviklingslogg

## 2026-03-05: Derivert stegstatus i store

Refaktorert stegstatus fra callback-basert til derivert state i store:

- `includedSteps` lagres i store, oppdateres atomisk ved endring av søknadsdata
- `StepDefinition` har nå `isCompleted`/`isIncluded` callbacks i config
- `createSøknadStore` tar `stepOrder` og `stepConfig` som options
- `useStepNavigation` tar `getIncludedSteps: () => IncludedStep[]` for fersk state ved navigasjon
- `StepRouteGuard` forenklet til `{ steps, currentStepId, isInitialized }`
- Fjernet `useSøknadStepStatus` hook (ikke lenger nødvendig)

Fikset routing ved mellomlagring:

- `SøknadIndexRedirect` navigerer til absolutt path
- `StepRouteGuard` venter på initialisering før redirect
- Root-route redirecter til `/soknad` hvis mellomlagring finnes

---

## 2026-03-03: Navnekonvensjoner og kommentargjennomgang

### Navnekonvensjoner

Besluttet å bruke engelske navn for tekniske konsepter, men beholde norske domeneord:

**Engelske navn:**

- `submitStep`, `setCurrentStep`, `navigateToStep`, `navigateToNextStep`
- `isStepCompleted`, `isInitialized`, `stepOrder`, `stepConfig`
- `getActiveStep`, `ActiveStep`, `StepStatusCallbacks`

**Norske domeneord (beholdes):**

- `søknad`, `søknadsdata`, `søker` - domenespesifikke begreper
- `mellomlagring` - beholdes pga. eksterne avhengigheter (`MellomlagringYtelse`, `useYtelseMellomlagring`)
- `børMellomlagres` - beholdes for konsistens med mellomlagring

### Kommentargjennomgang

Gått gjennom alle filer i `rammeverk/` og oppdatert kommentarer:

- Fjernet avvik mellom kommentarer og implementasjon
- Kortet ned verbose kommentarer
- Sørget for at variabelnavn i kommentarer matcher faktiske navn

---

## 2026-03-03: Forward-knapp-beskyttelse med FormSubmitGuard

### Problem

Brukere kan bruke nettleserens forward-knapp for å hoppe over steg uten å submitte skjemadata. Dette fører til at data i skjemaet ikke lagres.

### Løsning

Implementert mønster fra omsorgspengesoknad-appen:

1. **StepFormValuesContext** - React Context for å lagre skjemaverdier per steg
2. **usePersistFormValues** - Hook som lagrer skjemaverdier ved unmount
3. **useStepFormValuesStatus** - Sammenligner formValues med søknadsdata for tidligere steg
4. **InvalidStepInfo** - Viser advarsel hvis bruker har brukt forward-knappen

### Arkitektur

```
┌─────────────────────────────────────────────────────┐
│              StepFormValuesContext                   │
│  Lagrer skjemaverdier per steg i React Context       │
│  { [stegId]: formValues }                            │
└─────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────┴───────────────────────────┐
│              usePersistFormValues                    │
│  Ved unmount → lagrer getValues() til Context        │
└─────────────────────────────────────────────────────┘
                          ▲
                          │
┌─────────────────────────┴───────────────────────────┐
│              useStepFormValuesStatus                 │
│  Sammenligner formValues med søknadsdata             │
│  Returnerer: invalidSteps, hasInvalidSteps           │
└─────────────────────────────────────────────────────┘
```

### FormSubmitGuard-komponent

App-spesifikk komponent som kombinerer alt:

```typescript
// FormSubmitGuard.tsx - kombinerer persistering og validering
export const FormSubmitGuard = <T extends object>({ stepId, getValues }: Props<T>) => {
    const navigate = useNavigate();
    const { invalidSteps } = useSøknadsdataStatus(stegId);

    usePersistFormValues(stegId, getValues);

    return (
        <InvalidStepInfo
            invalidSteps={invalidSteps}
            getStepTitle={(id) => stegTitler[id as StegId]}
            onNavigateToStep={(id) => navigate(`/soknad/${stegConfig[id as StegId].route}`)}
        />
    );
};
```

### Forenklet bruk i stegene

Før - mange imports og manuell oppsett:

```typescript
const { invalidSteps } = useSøknadsdataStatus(stegId);
usePersistFormValues(stegId, () => getValues());
// ... i JSX:
<InvalidStepInfo
    invalidSteps={invalidSteps}
    getStepTitle={(id) => stegTitler[id as StegId]}
    onNavigateToStep={(id) => navigate(...)}
/>
```

Etter - én linje:

```typescript
<FormSubmitGuard stepId={stepId} getValues={() => getValues()} />
```

### Konvertert til react-hook-form

Alle steg-komponenter er konvertert fra useState til react-hook-form:

```typescript
// Før
const [navn, setNavn] = useState(appState?.søknadsdata[stegId]?.navn ?? '');

// Etter
const { register, handleSubmit, getValues } = useForm<Skjemadata>({
    defaultValues: { navn: appState?.søknadsdata[stegId]?.navn ?? '' },
});
```

### Nye filer i rammeverk

- `rammeverk/state/StepFormValuesContext.tsx` - Context for formValues
- `rammeverk/hooks/usePersistFormValues.ts` - Lagrer ved unmount
- `rammeverk/hooks/useStepFormValuesStatus.ts` - Validerer tidligere steg
- `rammeverk/components/InvalidStepInfo.tsx` - Advarsel-komponent

### Nye filer i app

- `app/components/FormSubmitGuard.tsx` - Kombinerer persistering og validering
- `app/hooks/useSøknadsdataStatus.ts` - App-spesifikk wrapper

---

## 2026-03-03: Fjernet app-importer fra rammeverk

### Motivasjon

Rammeverket skal være helt uavhengig av app-kode, slik at det kan gjenbrukes i flere apper uten endringer.

### Endringer

**Slettet ubrukte filer:**

- `guards/useStegTilgang.ts` - ikke brukt
- `guards/` mappen - tom etter sletting
- `state/useStegConfig.ts` - ikke brukt (men formatteren gjenopprettet den)
- `hooks/useAvbrytSøknad.ts` - app har egen versjon

**StegRouteGuard tar nå props i stedet for import:**

```typescript
// Før
const currentStegId = useSøknadStore((s) => s.currentStegId);

// Etter - tar prop
<StegRouteGuard currentStegId={currentStegId} ... />
```

**useStegNavigasjon tar nå setCurrentSteg som option:**

```typescript
// Før
const setCurrentSteg = useSøknadStore((s) => s.setCurrentSteg);

// Etter - tar option
useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus, setCurrentSteg });
```

**SøknadFooter forenklet:**

```typescript
// Før - med intern useAvbrytSøknad
<SøknadFooter avbrytCallback={...} velkommenPath={...} />

// Etter - ren presentasjonskomponent
<SøknadFooter onAvbryt={avbrytSøknad} />
```

### Resultat

Rammeverket har **ingen** imports fra app-kode. Alt er eksplisitt via props/options.

---

## 2026-03-03: Forenkling av factories og fjerning av Zustand-typer

### Motivasjon

Zustand-typene (`UseBoundStore<StoreApi<...>>`) var verbose og vanskelige å lese. Factories tok inn store-referanser med komplekse typer, noe som gjorde koden unødvendig kompleks.

### Endringer

**1. createMellomlagringHook tar hook i stedet for store**

Før:

```typescript
createMellomlagringHook({
    store: useSøknadStore,  // UseBoundStore<StoreApi<SøknadStoreActions<...>>>
    ...
});
```

Etter:

```typescript
createMellomlagringHook({
    useSøknadState: () => useSøknadStore((s) => s.søknadState),  // enkel funksjon
    ...
});
```

**2. Fjernet createAvbrytHandler**

Factory ga liten verdi - bare to funksjoner kalt etter hverandre. Erstattet med enkel app-hook:

```typescript
export const useAvbrytSøknad = () => {
    const resetSøknad = useSøknadStore((s) => s.resetSøknad);
    const { slettMellomlagring } = useMellomlagring();

    return useCallback(() => {
        resetSøknad();
        slettMellomlagring().catch(() => {});
    }, [resetSøknad, slettMellomlagring]);
};
```

**3. Fjernet SøknadStoreBase og SøknadStoreBaseActions**

Disse typene var kun brukt internt i factories - ikke lenger nødvendige.

**4. Fjernet SøknadStoreForMellomlagring**

Erstattet med enkel hook-basert interface.

**5. Forenklet MellomlagringObserver**

Før:

```typescript
<MellomlagringObserver
    callbacks={{ hentMellomlagring, lagreMellomlagring }}
    ...
/>
```

Etter:

```typescript
<MellomlagringObserver
    lagreMellomlagring={lagreMellomlagring}
    ...
/>
```

**6. Fjernet hentMellomlagring fra useMellomlagring**

`lagreMellomlagring` bygger nå dataene internt - ingen grunn til å eksponere en separat funksjon.

**7. MellomlagringData er nå intern type**

Ikke lenger eksportert - appen definerer sin egen Mellomlagring-type.

### Resultat

**Rammeverk eksporterer nå:**

- `createSøknadStore` - factory for app store
- `createMellomlagringHook` - factory for mellomlagring (tar hooks, ikke stores)
- `useStegNavigasjon` - navigasjon mellom steg
- `StegRouteGuard`, `SøknadIndexRedirect` - routing
- `MellomlagringObserver`, `SøknadFooter` - komponenter

**App-hooks (minimal kode):**

```typescript
// useSøknadStore.ts - 7 linjer
export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>();

// useMellomlagring.ts - 13 linjer
export const useMellomlagring = createMellomlagringHook({...});

// useAvbrytSøknad.ts - 14 linjer (ingen factory)
export const useAvbrytSøknad = () => {...};
```

### Filendringer

**Slettet:**

- `rammeverk/hooks/createAvbrytHandler.ts`

**Omdøpt:**

- `app/hooks/useAvbrytSøknadHandler.ts` → `app/hooks/useAvbrytSøknad.ts`

**Forenklet:**

- `rammeverk/state/createSøknadStore.ts` - fjernet SøknadStoreBase\* typer
- `rammeverk/hooks/createMellomlagringHook.ts` - tar hook i stedet for store
- `rammeverk/components/MellomlagringObserver.tsx` - enklere props

---

## 2026-03-02: Mellomlagring-implementasjon

### Motivasjon

Mellomlagring skal fungere likt for alle søknader som bruker rammeverket. Datastruktur og validering holdes i delt pakke (sif-common-query), mens app-spesifikk logikk ligger i hver app.

### Arkitektur

```
┌────────────────────────────────────────────────────┐
│              sif-common-query                      │
│  useYtelseMellomlagring<State, MetaData>           │
│  - Hent, lagre, slett                              │
│  - Hash-basert metadata-validering                 │
│  - Automatisk slett ved ugyldig metadata           │
└────────────────────────────────────────────────────┘
                          ▲
                          │
┌────────────────────────┴───────────────────────────┐
│                  Rammeverk                          │
│  MellomlagringObserver                              │
│  - Lytter på børMellomlagres-flagg                  │
│  - Kaller app-callbacks for å hente/lagre data      │
└────────────────────────────────────────────────────┘
                          ▲
                          │
┌────────────────────────┴───────────────────────────┐
│                    App                              │
│  useMellomlagring (kobler state + useYtelse...)     │
│  - Definerer metadata ({ søker, barn, versjon })    │
│  - getData(): { søknadsdata, currentStegId }        │
└────────────────────────────────────────────────────┘
```

### MellomlagringPayload-struktur

Data som sendes til/fra API:

```typescript
interface MellomlagringPayload<State> {
    søknadsdata: State; // App-spesifikk søknadsdata
    søknadHashString: string; // Hash av metadata
}
```

App definerer hva som inngår i mellomlagringen:

```typescript
// types/Mellomlagring.ts
interface Mellomlagring {
    søknadsdata: Søknadsdata;
    currentStegId: string | null;
}

interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
```

### Implementerte komponenter

**1. MellomlagringObserver (rammeverk)**

Generisk observer som lytter på børMellomlagres-flagget:

```typescript
interface MellomlagringCallbacks<Data> {
    getData: () => Data;
    lagre: (data: Data) => Promise<void>;
}

const MellomlagringObserver = <Data>({ callbacks }: Props<Data>) => {
    const børMellomlagres = useSøknadFlyt((s) => s.børMellomlagres);
    // Trigger lagring når flagget settes
};
```

**2. useYtelseMellomlagring (sif-common-query)**

Samlet hook for all mellomlagringslogikk med validering:

```typescript
const mellomlagring = useYtelseMellomlagring<Mellomlagring, MetaData>(ytelse, metadata);

// Returnerer:
// - data: Mellomlagring | null (null hvis ugyldig/mangler)
// - lagre(data): Promise<void>
// - slett(): Promise<void>
// - isLoading, isFetched, isLagring, isSletting
```

**3. useMellomlagring (app-hook)**

Kobler useYtelseMellomlagring med app-state:

```typescript
const useMellomlagring = () => {
    const metadata = { MELLOMLAGRING_VERSJON, søker, barn };
    const mellomlagring = useYtelseMellomlagring<Mellomlagring, MetaData>(ytelse, metadata);

    const getData = () => ({ søknadsdata, currentStegId });
    return { getData, lagre: mellomlagring.lagre, ... };
};
```

### Hydration-flyt

1. AppInfoLoader henter søker, barn og mellomlagring parallelt
2. Venter på mellomlagring.isFetched før rendering
3. Sender mellomlagring.data til Søknad-komponent
4. Søknad initialiserer state med useEffectOnce:
    - Initialiserer søknadState med eventuell mellomlagret søknadsdata
    - Setter currentStegId fra mellomlagring

```typescript
useEffectOnce(() => {
    init(søker, barn, mellomlagring?.søknadsdata);
    if (mellomlagring?.currentStegId) {
        setCurrentSteg(mellomlagring.currentStegId);
    }
});
```

### Lagring trigges av

- submitSteg() i useSøknadStore setter børMellomlagres = true
- MellomlagringObserver lytter og kaller lagre()
- Silent fail - feil blokkerer ikke bruker

### Endringer i sif-common-query

Refaktorerte mellomlagring-hooks til én samlet hook:

**Fjernet:**

- `useValidertMellomlagring.ts`
- `ytelseMellomlagringUtils.ts`

**Ny:** `useYtelseMellomlagring<State, MetaData>()` som:

- Henter, lagrer og sletter mellomlagring
- Validerer metadata-hash automatisk
- Sletter automatisk hvis metadata har endret seg
- Returnerer `{ data, lagre, slett, isLoading, isFetched, isLagring, isSletting }`

---

## 2026-03-01: Separasjon av søknadsdata fra rammeverket

### Motivasjon

Rammeverket eide `søknadsdata` i sin Zustand-store, noe som skapte for tett kobling mellom rammeverk og app. Appen måtte type-caste for å få riktig typing.

### Endringer

**1. Rammeverket eier kun flyt-metadata**

- Omdøpt `useSøknadState` → `useSøknadFlyt`
- Fjernet `søknadsdata`, `submitSteg`, `isSubmittingSteg`, `hydrate`
- Beholder: `currentStegId`, `børMellomlagres`, `erSendt`, `setCurrentSteg`, `setSøknadSendt`, `reset`

**2. Søknadsdata eies av appen**

- Appen oppretter egen Zustand-store i `src/app/hooks/useSøknadsdata.ts`
- Full typing uten generics eller type-casting
- Eksponerer `erStegFullført(stegId)` callback

**3. Callback-basert steg-status**

- `StegStatusCallbacks` interface: `{ erFullført, skalVises? }`
- `getAktiveSteg()` tar callbacks i stedet for søknadsdata
- `useStegFlyt`, `useStegTilgang`, `useStegNavigasjon` tar `stegStatus` prop

**4. Fjernet generics fra rammeverket**

- `StegConfig` og `StegDefinisjon` er ikke lenger generisk
- `SøknadIndexRedirect`, `getStegIdFromRoute` forenklet
- Rammeverket har nå ingen avhengighet til app-spesifikke typer

**5. Fjernet `useSteg` hook**

- Erstattet av app-spesifikk `useSøknadsdata` hook
- Appen har full kontroll over sin egen state

### Ny arkitektur

```
Rammeverk (flyt):              App (data):
┌─────────────────┐           ┌─────────────────┐
│ useSøknadFlyt   │           │ useSøknadsdata  │
│ - currentStegId │           │ - søknadsdata   │
│ - erSendt       │           │ - submitSteg    │
│ - reset()       │◄──────────│ - erStegFullført│
└─────────────────┘ callbacks └─────────────────┘
```

### Bruk i steg-komponenter

```typescript
export const Steg1 = () => {
    const søknadsdata = useSøknadsdata((s) => s.søknadsdata);
    const submitSteg = useSøknadsdata((s) => s.submitSteg);
    const erStegFullført = useSøknadsdata((s) => s.erStegFullført);

    const stegStatus = { erFullført: erStegFullført };

    const { erTilgjengelig } = useStegTilgang({
        stegId: StegId.PERSONALIA,
        stegRekkefølge,
        stegStatus,
    });

    const { gåTilNeste } = useStegNavigasjon({ stegConfig, stegRekkefølge, stegStatus });
    // ...
};
```

---

## 2026-02-28: Refaktorering og forenkling

### Endringer basert på tilbakemeldinger

**1. Guards → Hook**

- Fjernet `StegGuard` komponent og `UgyldigNavigasjonPanel`
- Opprettet `useStegTilgang` hook som returnerer `{ erTilgjengelig, erFullført, sisteGyldigeStegId }`
- Appen rendrer egen melding ved ugyldig tilgang

**2. Skjemadata isolert til steg**

- Fjernet skjemadata-typer fra stegConfig
- Skjemadata defineres lokalt i hver stegkomponent
- `useSteg()` forenklet til `{ søknadsdata, submitSøknadsdata }`
- Ingen `toSkjemadata`/`toSøknadsdata` i config

**3. StegId enum**

- Opprettet `StegId` enum for type-safe steg-referanser
- Brukes som key i stegConfig, søknadsdata, og stegRekkefølge
- URL-route kan overrides med `route` property

**4. Lineær flyt automatisk**

- Opprettet `getAktiveSteg()` utility
- Beregner tilgjengelighet automatisk (alle foregående må være fullført)
- Fjernet `erTilgjengelig` fra stegConfig
- Lagt til `skalVises` for dynamiske steg (valgfri)

**5. Route separert fra stegId**

- `route` property i stegConfig er valgfri
- Default: bruker stegId som route
- Eksempel: `id: 'personalia'` med `route: 'om-deg'` → URL `/soknad/om-deg`

**6. Typet app-hook**

- Opprettet `src/app/hooks/useSøknadsdata.ts` som re-eksporterer rammeverkets `useSøknadState` med typing
- **Viktig:** Deler SAMME store som rammeverket - bare en type-cast, ikke ny store
- Gir fullstendig typing av `DemoSøknadsdata` uten generics i komponenter
- Enkel tilnærming: kan utvides med flere typed hooks ved behøv

```typescript
// Riktig måte - re-eksporter med typing:
export const useSøknadsdata = useSøknadState as {
    (): AppSøknadState;
    <U>(selector: (state: AppSøknadState) => U): U;
};

// FEIL - oppretter ny store:
// export const useSøknadsdata = createSøknadStore<DemoSøknadsdata>();
```

### Gjeldende implementasjon

**Rammeverk (`src/rammeverk/`):**

```
components/
  MellomlagringObserver.tsx – Observer for automatisk lagring
  SøknadFooter.tsx          – Footer med navigasjonsknapper
state/
  useSøknadFlyt.ts    – Zustand store (currentStegId, børMellomlagres, erSendt)
  useStegFlyt.ts      – Aktive steg, navigasjon-info
  useStegNavigasjon.ts – gåTilSteg, gåTilNeste, gåTilForrige
guards/
  useStegTilgang.ts   – Tilgangs-hook
routing/
  routeUtils.ts       – getStegIdFromRoute, SøknadIndexRedirect
types.ts              – StegDefinisjon, StegConfig, getAktiveSteg, AktivtSteg
```

**Demo-app (`src/app/`):**

```
components/
  AppInfoLoader.tsx  – Laster søker, barn, mellomlagring
config/
  appConfig.ts       – APP_YTELSE, MELLOMLAGRING_VERSJON
  stegConfig.ts      – StegId enum, Søknadsdata, stegConfig, stegRekkefølge
hooks/
  useMellomlagring.ts – App-spesifikk mellomlagring-hook
  useSøknadStore.ts  – App-state (søknadState, init, submitSteg)
  useAppStore.ts     – Re-export av useSøknadStore
types/
  Mellomlagring.ts   – Mellomlagring, MellomlagringMetaData
  Søknadsdata.ts     – Søknadsdata-type
steg/
  Steg1.tsx          – Personalia (navn)
  Steg2.tsx          – Kontakt (epost)
  Oppsummering.tsx   – Viser data, send inn
pages/
  VelkommenPage.tsx
  KvitteringPage.tsx
  ErrorPage.tsx
  LoadingPage.tsx
Søknad.tsx           – Hovedkomponent med routing og initialisering
```

### Nåværende routes

| Path                   | Komponent          |
| ---------------------- | ------------------ |
| `/`                    | VelkommenPage      |
| `/kvittering`          | KvitteringPage     |
| `/soknad/om-deg`       | Steg1 (Personalia) |
| `/soknad/kontaktinfo`  | Steg2 (Kontakt)    |
| `/soknad/oppsummering` | Oppsummering       |

---

## TODO

### Neste sesjon

- [ ] Test full flyt i browser (verifiser at alt fungerer)

### Kort sikt

- [ ] Back/forward-håndtering (blokkér og vis panel)
- [ ] Legg til et dynamisk steg med `skalVises` for å teste

### Lengre sikt

- [ ] Trekk ut til `packages/soknad-rammeverk/`
- [ ] soknad-ui lag (layout, stegindikator)
- [ ] Migrer eksisterende apper

---

## Notater

### Separasjon av ansvar

Rammeverket eier flyt-logikk, appen eier data. Kommunikasjon skjer via callbacks:

Når du lager typede app-hooks, **re-eksporter** rammeverkets store med type-cast - **ikke** bruk `createSøknadStore()` som oppretter en ny separat store!

### Aksel 8 gap-syntax

```tsx
// Riktig:
<VStack gap="space-16">
```

### Bruk av StegId

```typescript
// I stegConfig
[StegId.PERSONALIA]: { id: StegId.PERSONALIA, ... }

// I søknadsdata
søknadsdata[StegId.PERSONALIA]?.navn

// I submit
submitSøknadsdata({ [StegId.PERSONALIA]: { navn } });
```

### Dynamiske steg (eksempel)

```typescript
[StegId.ARBEID]: {
    id: StegId.ARBEID,
    tittel: 'Arbeid',
    skalVises: (data) => data[StegId.PERSONALIA]?.harArbeid === true,
},
```

---

## Hooks oversikt

| Hook                        | Pakke            | Returnerer                                           |
| --------------------------- | ---------------- | ---------------------------------------------------- |
| `useSøknadFlyt()`           | rammeverk        | Flyt-state (currentStegId)                           |
| `useStegNavigasjon()`       | rammeverk        | `{ gåTilSteg, gåTilNeste, gåTilForrige }`            |
| `useStegTilgang()`          | rammeverk        | `{ erTilgjengelig, erFullført, sisteGyldigeStegId }` |
| `createSøknadStore()`       | rammeverk        | Factory for app Zustand store                        |
| `createMellomlagringHook()` | rammeverk        | Factory for mellomlagring hook                       |
| `useYtelseMellomlagring()`  | sif-common-query | `{ data, lagre, slett, isLoading, ... }`             |
| `useSøknadStore()`          | app              | App-state (søknadState, init, submitSteg, ...)       |
| `useMellomlagring()`        | app              | `{ lagreMellomlagring, slettMellomlagring }`         |
| `useAvbrytSøknad()`         | app              | Callback for å avbryte søknad                        |

---

## Filstruktur

```
src/
├── rammeverk/
│   ├── components/
│   │   ├── MellomlagringObserver.tsx
│   │   ├── SøknadFooter.tsx
│   │   └── index.ts
│   ├── hooks/
│   │   ├── createMellomlagringHook.ts
│   │   └── index.ts
│   ├── routing/
│   │   ├── routeUtils.ts
│   │   ├── StegRouteGuard.tsx
│   │   ├── SøknadIndexRedirect.tsx
│   │   └── index.ts
│   ├── state/
│   │   ├── createSøknadStore.ts
│   │   ├── useStegNavigasjon.ts
│   │   └── index.ts
│   ├── utils/
│   ├── types.ts
│   └── index.ts
├── app/
│   ├── components/
│   │   └── AppInfoLoader.tsx
│   ├── config/
│   │   ├── appConfig.ts
│   │   └── stegConfig.ts
│   ├── hooks/
│   │   ├── useAvbrytSøknad.ts
│   │   ├── useMellomlagring.ts
│   │   ├── useStegStatus.ts
│   │   ├── useSøknadStore.ts
│   │   └── index.ts
│   ├── pages/
│   ├── steg/
│   ├── types/
│   │   ├── Mellomlagring.ts
│   │   └── Søknadsdata.ts
│   └── Søknad.tsx
├── App.tsx
└── main.tsx
```
