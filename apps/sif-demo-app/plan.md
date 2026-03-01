# soknad-rammeverk – Plan

## Visjon

Bygge et gjenbrukbart rammeverk for stegbaserte søknadsapper i React. Rammeverket skal være:

- **Skjema-agnostisk** – fungerer med Formik, React Hook Form, eller ren React state
- **Transparent** – ingen "magi", composable byggesteiner
- **Fleksibelt** – støtter lineær og dynamisk stegflyt

---

## Arkitektur

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
│   ├── state/           # Zustand store, hooks
│   ├── guards/          # useStegTilgang
│   ├── routing/         # Route utilities
│   ├── types.ts         # Typer og utilities
│   └── index.ts         # Public API
├── app/                 # App-spesifikk kode
│   ├── config/          # StegId enum, stegConfig, søknadsdata-type
│   ├── steg/            # Stegkomponenter (med egen skjemadata)
│   ├── pages/           # Velkommen, Kvittering
│   └── SøknadRouter.tsx
```

---

## Nøkkelbeslutninger

### 1. StegId enum

Alle steg har en enum-verdi som brukes konsekvent:

- Som key i `stegConfig`
- Som key i `søknadsdata`
- Som URL-route (med valgfri override via `route`)

```typescript
export enum StegId {
    PERSONALIA = 'personalia',
    KONTAKT = 'kontakt',
    OPPSUMMERING = 'oppsummering',
}
```

### 2. stegConfig – kun metadata

Ingen logikk for tilgjengelighet i config. Dynamiske steg bruker `skalVises`:

```typescript
export const stegConfig: StegConfig<DemoSøknadsdata> = {
    [StegId.PERSONALIA]: {
        id: StegId.PERSONALIA,
        route: 'om-deg', // Valgfri URL-override
        tittel: 'Personalia',
        // skalVises: (data) => ..., // Kun for dynamiske steg
    },
};
```

### 3. Skjemadata isolert til steg

Skjemadata er intern til hvert steg. Defineres lokalt i stegkomponenten:

```typescript
// I Steg1.tsx
interface Steg1Skjemadata {
    navn: string;
}

export const Steg1 = () => {
    const { søknadsdata, submitSøknadsdata } = useSteg<DemoSøknadsdata>();
    const [navn, setNavn] = useState(søknadsdata[StegId.PERSONALIA]?.navn ?? '');

    const handleSubmit = () => {
        submitSøknadsdata({ [StegId.PERSONALIA]: { navn } });
        gåTilNeste();
    };
};
```

### 4. Lineær flyt utledes automatisk

`getAktiveSteg()` utility beregner:

- **skalVises** – filtrerer ut dynamiske steg
- **erTilgjengelig** – alle foregående må være fullført
- **erFullført** – søknadsdata for steget eksisterer

```typescript
const aktiveSteg = getAktiveSteg(stegRekkefølge, stegConfig, søknadsdata);
// [{ stegId, erTilgjengelig, erFullført }, ...]
```

### 5. Tilgang håndteres i stegkomponenter

Ingen StegGuard-komponent. Hvert steg bruker `useStegTilgang`:

```typescript
const { erTilgjengelig, sisteGyldigeStegId } = useStegTilgang({
    stegId: StegId.PERSONALIA,
    stegConfig,
    stegRekkefølge,
});

if (!erTilgjengelig) {
    return <MinEgenUgyldigMelding />;
}
```

### 6. State (Zustand)

```typescript
{
    currentStegId: string | null;
    søknadsdata: Partial<TSøknadsdata>;
    børMellomlagres: boolean;
    isSubmittingSteg: boolean;
    erSendt: boolean;
}
```

### 7. Navngivning

- **Domene (norsk):** søknad, steg, mellomlagring
- **Teknisk (engelsk):** state, guard, provider, hook

---

## Hooks

| Hook                  | Returnerer                                           |
| --------------------- | ---------------------------------------------------- |
| `useSøknadState()`    | Hele Zustand store                                   |
| `useSteg<T>()`        | `{ søknadsdata, submitSøknadsdata }`                 |
| `useStegFlyt()`       | `{ aktiveSteg, currentStegId, forrige/neste,  }`     |
| `useStegNavigasjon()` | `{ gåTilSteg, gåTilNeste, gåTilForrige }`            |
| `useStegTilgang()`    | `{ erTilgjengelig, erFullført, sisteGyldigeStegId }` |

---

## Status

Se [log.md](log.md) for detaljert fremdrift.

**Ferdig:**

- [x] Prosjektoppsett med Vite, TypeScript, Aksel 8, Zustand, React Query, React Router
- [x] Rammeverk-kjerne: types, state, guards, routing
- [x] Demo med 3 steg (Personalia, Kontakt, Oppsummering)
- [x] StegId enum og forenklet stegConfig
- [x] `getAktiveSteg()` utility for lineær flyt
- [x] Hook-basert tilgangskontroll (`useStegTilgang`)

**Gjenstår:**

- [ ] Test full flyt i browser
- [ ] MellomlagringObserver
- [ ] Hydration fra mellomlagring
- [ ] Back/forward-håndtering
- [ ] Trekk ut til `packages/soknad-rammeverk/`

---

## Referanse

Full arkitekturdokumentasjon ligger i `/apps/aktivitetspenger-soknad/plan.md`
