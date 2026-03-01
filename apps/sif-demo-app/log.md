# soknad-rammeverk – Utviklingslogg

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
state/
  useSøknadState.ts  – Zustand store
  useSteg.ts         – { søknadsdata, submitSøknadsdata }
  useStegFlyt.ts     – Aktive steg, navigasjon-info
  useStegNavigasjon.ts – gåTilSteg, gåTilNeste, gåTilForrige
guards/
  useStegTilgang.ts  – Tilgangs-hook
routing/
  routeUtils.ts      –  getStegIdFromRoute
types.ts             – StegDefinisjon, StegConfig, getAktiveSteg, AktivtSteg
```

**Demo-app (`src/app/`):**

```
config/stegConfig.ts – StegId enum, DemoSøknadsdata, stegConfig, stegRekkefølge
hooks/useSøknadsdata.ts – Typet wrapper rundt createSøknadStore
steg/Steg1.tsx       – Personalia (navn)
steg/Steg2.tsx       – Kontakt (epost)
steg/Oppsummering.tsx – Viser data, send inn
pages/VelkommenPage.tsx
pages/KvitteringPage.tsx
SøknadRouter.tsx
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
- [ ] Legg til et dynamisk steg med `skalVises` for å teste

### Kort sikt

- [ ] MellomlagringObserver (koordiner mellom flyt-store og søknadsdata-store)
- [ ] Hydration fra mellomlagring
- [ ] Back/forward-håndtering (blokkér og vis panel)

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

## Filstruktur

```
src/
├── rammeverk/
│   ├── guards/
│   │   ├── useStegTilgang.ts
│   │   └── index.ts
│   ├── routing/
│   │   ├── routeUtils.ts
│   │   └── index.ts
│   ├── state/
│   │   ├── useSøknadState.ts
│   │   ├── useSteg.ts
│   │   ├── useStegFlyt.ts
│   │   ├── useStegNavigasjon.ts
│   │   └── index.ts
│   ├── types.ts
│   └── index.ts
├── app/
│   ├── config/
│   │   └── stegConfig.ts
│   ├── hooks/
│   │   ├── useSøknadsdata.ts
│   │   └── index.ts
│   ├── pages/
│   │   ├── VelkommenPage.tsx
│   │   └── KvitteringPage.tsx
│   ├── steg/
│   │   ├── Steg1.tsx
│   │   ├── Steg2.tsx
│   │   └── Oppsummering.tsx
│   └── SøknadRouter.tsx
├── App.tsx
└── main.tsx
```
