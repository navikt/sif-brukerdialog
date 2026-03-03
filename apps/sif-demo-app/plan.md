# soknad-rammeverk – Plan

## Visjon

Bygge et gjenbrukbart rammeverk for stegbaserte søknadsapper i React. Rammeverket skal være:

- **Skjema-agnostisk** – fungerer med Formik, React Hook Form, eller ren React state
- **Transparent** – ingen "magi", composable byggesteiner
- **Fleksibelt** – støtter lineær og dynamisk stegflyt
- **Enkelt** – minimale generics, ingen Zustand-typer eksponert

---

## Arkitektur

### Designprinsipper

1. **Rammeverket kjenner ikke app-typer** - tar inn hooks/funksjoner, ikke stores
2. **Factory-pattern kun der det gir verdi** - createSøknadStore, createMellomlagringHook
3. **Enkel kode i appen** - factory returnerer ferdig hook, appen skriver minimal config
4. **Ingen Zustand-typer eksponert** - rammeverket bruker enkle interfaces

### Tre lag

| Lag                    | Ansvar                                 |
| ---------------------- | -------------------------------------- |
| **soknad-rammeverk**   | Flyt, state, routing, mellomlagring    |
| **soknad-ui**          | Layout, header, stegindikator (kommer) |
| **skjema-komponenter** | Gjenbrukbare skjemafelt (separat)      |

### Mappestruktur

```
src/
├── rammeverk/           # → pakke senere
│   ├── state/           # createSøknadStore, useStegNavigasjon, useStegConfig
│   ├── routing/         # Route utilities, StegRouteGuard
│   ├── hooks/           # createMellomlagringHook
│   ├── components/      # MellomlagringObserver, SøknadFooter
│   ├── types.ts         # Typer og utilities
│   └── index.ts         # Public API
├── app/                 # App-spesifikk kode
│   ├── config/          # StegId enum, stegConfig, SøknadState
│   ├── hooks/           # useSøknadStore, useMellomlagring, useAvbrytSøknad
│   ├── steg/            # Stegkomponenter (med egen skjemadata)
│   ├── pages/           # Velkommen, Kvittering
│   └── Søknad.tsx       # Hovedkomponent med routing
```

---

## Nøkkelbeslutninger

### 1. createSøknadStore factory

Rammeverket tilbyr en factory som lager typet Zustand-store:

```typescript
// App definerer sine typer
interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}

// Factory lager store med all logikk
export const useSøknadStore = createSøknadStore<SøknadState, Søknadsdata>();
```

Factory gir: `søknadState`, `init`, `submitSteg`, `resetSøknad`, `erStegFullført`, `børMellomlagres`, `setBørMellomlagres`

### 2. Mellomlagring uten store-referanse

`createMellomlagringHook` tar inn en hook, ikke en store-type:

```typescript
export const useMellomlagring = createMellomlagringHook({
    useSøknadState: () => useSøknadStore((s) => s.søknadState),
    ytelse: APP_YTELSE,
    getMetadata: (state) => ({
        MELLOMLAGRING_VERSJON,
        søker: state.søker,
        barn: state.barn,
    }),
});
```

Returnerer: `{ lagreMellomlagring, slettMellomlagring, isPending }`

### 3. Avbryt søknad - enkel app-hook

Ingen factory - appen skriver en enkel hook direkte:

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

### 4. MellomlagringObserver

Tar bare `lagreMellomlagring` funksjon - ingen callbacks-objekt:

```typescript
<MellomlagringObserver
    børMellomlagres={børMellomlagres}
    setBørMellomlagres={setBørMellomlagres}
    lagreMellomlagring={lagreMellomlagring}
/>
```

### 5. børMellomlagres settes automatisk

`submitSteg` setter automatisk `børMellomlagres = true` - navigasjon håndterer ikke mellomlagring.

### 6. StegId enum

Alle steg har en enum-verdi som brukes konsekvent:

```typescript
export enum StegId {
    PERSONALIA = 'personalia',
    KONTAKT = 'kontakt',
    OPPSUMMERING = 'oppsummering',
}
```

### 7. Callback-basert stegstatus

`getAktiveSteg()` og hooks tar callbacks fra appen:

```typescript
const stegStatus = { erFullført: (id) => søknadsdata[id] !== undefined };
const aktiveSteg = getAktiveSteg(stegRekkefølge, stegStatus);
```

---

## Hooks og komponenter

| API                           | Pakke            | Returnerer/Props                                     |
| ----------------------------- | ---------------- | ---------------------------------------------------- |
| `createSøknadStore()`         | rammeverk        | Factory for app Zustand store                        |
| `createMellomlagringHook()`   | rammeverk        | Factory for mellomlagring hook                       |
| `useStegNavigasjon()`         | rammeverk        | `{ gåTilSteg, gåTilNeste, gåTilForrige }`            |
| `usePersistFormValues()`      | rammeverk        | Lagrer formValues ved unmount                        |
| `useStepFormValuesStatus()`   | rammeverk        | Validerer at tidligere steg er submittet             |
| `StegRouteGuard`              | rammeverk        | Routing guard (props: currentStegId, erInitialisert) |
| `MellomlagringObserver`       | rammeverk        | Auto-lagrer ved børMellomlagres                      |
| `SøknadFooter`                | rammeverk        | Footer med avbryt-knapp (prop: onAvbryt)             |
| `InvalidStepInfo`             | rammeverk        | Advarsel når bruker har brukt forward-knapp          |
| `StepFormValuesProvider`      | rammeverk        | Context provider for step form values                |
| `useYtelseMellomlagring()`    | sif-common-query | `{ data, lagre, slett, isLoading, ... }`             |
| `useSøknadStore()`            | app              | App-state (søknadState, init, submitSteg, ...)       |
| `useMellomlagring()`          | app              | `{ lagreMellomlagring, slettMellomlagring }`         |
| `useAvbrytSøknad()`           | app              | Callback for å avbryte søknad                        |
| `useSøknadsdataStatus()`      | app              | App-spesifikk wrapper for useStepFormValuesStatus    |
| `StegValidering`              | app              | Kombinerer persistering og validering                |

---

## Status

Se [log.md](log.md) for detaljert fremdrift.

**Ferdig:**

- [x] Prosjektoppsett med Vite, TypeScript, Aksel 8, Zustand, React Query, React Router
- [x] Rammeverk-kjerne: types, state, routing, hooks, components
- [x] Demo med 4 steg (Personalia, Kontakt, Kjæledyr, Oppsummering)
- [x] StegId enum og forenklet stegConfig
- [x] `getAktiveSteg()` utility for lineær flyt
- [x] Separasjon av søknadsdata fra rammeverket (callback-basert)
- [x] `createSøknadStore` factory med automatisk børMellomlagres
- [x] `createMellomlagringHook` factory uten Zustand-typer
- [x] Forenklet MellomlagringObserver og SøknadFooter
- [x] Hydration fra mellomlagring
- [x] Hash-basert metadata-validering (i sif-common-query)
- [x] **Ingen app-importer i rammeverket** - alt via props/options
- [x] **Forward-knapp-beskyttelse** - oppdager usubmittede endringer og viser advarsel
- [x] **StegValidering-komponent** - kombinerer persistering og validering

**Gjenstår:**

- [ ] Test full flyt i browser
- [ ] Trekk ut til `packages/soknad-rammeverk/`
