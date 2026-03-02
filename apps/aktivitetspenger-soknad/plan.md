## soknad-rammeverk – Oppsummering av beslutninger

---

### Overordnet arkitektur

**Tre lag:**
| Lag | Ansvar |
|-----|--------|
| **soknad-rammeverk** | Flyt, state, routing, guards, mellomlagring-logikk, utils |
| **soknad-ui** | Visuelle rammer: layout, header, stegindikator, navigasjonsknapper |
| **skjema-komponenter** | Gjenbrukbare skjemafelt (utvikles separat) |

**Begrunnelse:** Tydelig separasjon mellom flyt/logikk, visuell presentasjon, og skjemahåndtering.

---

### Prosjektstruktur

**Alt i én app til å begynne med:**

```
apps/soknad-demo/
  src/
    rammeverk/           # Alt som skal bli pakke senere
      state/
      routing/
      guards/
      mellomlagring/
      utils/
      index.ts           # Public API
    app/                 # App-spesifikk kode
      steg/
      config/
      pages/
    main.tsx
    App.tsx
  mock/
  nais/
  Dockerfile
  ...
```

**Utgangspunkt:** Kopier `apps/aktivitetspenger-soknad/` – har allerede Vite, Vitest, Tailwind, MSW, Docker, NAIS, Zustand, React Query, React Router.

**Begrunnelse:**

- Raskere i gang, ingen pakke-oppsett
- Tydelig skille – alt i `rammeverk/` er kandidat for utrekking til pakke
- Importerer fra `@/rammeverk` internt, enkelt å bytte til pakke senere
- Gjenbruker infrastruktur som allerede fungerer

---

### Skjema-agnostisk rammeverk

Rammeverket er helt uavhengig av skjemabibliotek (Formik, React Hook Form, etc.).

**Grensesnitt mot steg:**

- Steg mottar `initialData` og callbacks
- Steg rapporterer endringer via `onSkjemadataChange`
- Steg signaliserer submit via `onStegSubmit`

**Begrunnelse:** Gir frihet til å velge/bytte skjemaløsning per steg eller over tid.

---

### Routing-struktur

**To routere:**
| Router | Innhold |
|--------|---------|
| **AppRouter** | Velkommen, Kvittering, IkkeTilgangSide, Loading/bootstrap |
| **Søknad** | Alle steg inkludert oppsummering |

**URL-struktur:** `/soknad/{steg-id}` (navngitte steg, ikke numeriske)

**Feilhåndtering:**

- `IkkeTilgangSide`: Egen route (`/ikke-tilgang`)
- Andre feil: Vises inline på siden der feilen oppstår (ikke egen route)

**Begrunnelse:** Tydelig separasjon mellom app-nivå og søknadsnivå. Inline feilvisning gir bedre brukeropplevelse.

---

### Appen eier routes og komponenter

Appen definerer sine egne routes og stegkomponenter. stegConfig inneholder kun logikk/metadata.

```
stegConfig = { logikk per steg }
Steg = app-spesifikke komponenter som bruker useSteg()
```

**Begrunnelse:** Full kontroll i appen, enklere å forstå flyten, rammeverket gir kun hooks og utilities.

---

### stegConfig – kun logikk

Definerer metadata og logikk per steg:

- `id` – intern identifikator
- `route` (valgfri) – URL-segment, default = id
- `tittel`
- `erTilgjengelig(søknadsdata)` – avgjør om steget vises i flyten
- `toSkjemadata(søknadsdata)` – transformerer ved navigering tilbake
- `toSøknadsdata(skjemadata)` – transformerer ved submit

Separat `stegRekkefølge`-array definerer rekkefølgen.

**Route-mapping:** Rammeverket tilbyr utilities for å mappe mellom stegId og route (`getStegRoute`, `getStegIdFromRoute`).

**"Utfylt" er implisitt:** Et steg regnes som utfylt når `søknadsdata` for steget eksisterer (satt ved submit). Ikke del av stegConfig.

**Begrunnelse:** Ren data/logikk, ingen komponenter. Transformering defineres per steg.

---

### Dynamisk stegflyt

Stegflyten varierer basert på brukerens svar.

**`useStegFlyt()` hook gir:**

- `aktiveSteg` – filtrert liste basert på `erTilgjengelig`
- `currentStegId`, `currentIndex`
- `forrigeStegId`, `nesteStegId`
- `erFørsteSteg`, `erSisteSteg`
- `getStegInfo(id)`

**Begrunnelse:** Brukes til stegindikator, navigasjonsknapper, guards.

---

### Oppsummering er siste steg

Oppsummering håndteres i Søknad som et vanlig steg, men:

- Har egen logikk for "Send inn"-knapp
- Er alltid siste steg i flyten

**Begrunnelse:** Konsistent behandling, men egen submit-logikk.

---

### Innsending av søknad

Innsendingslogikk håndteres i oppsummeringssteget (app-spesifikt), ikke i rammeverket.

**Rammeverket tilbyr:**

- `useSøknadState()` for å hente søknadsdata
- `setSøknadSendt()` for å markere søknad som sendt og tømme state

**Oppsummeringssteget eier:**

- API-kall til backend
- Feilhåndtering (vise feilmeldinger, retry, etc.)
- Kalle `setSøknadSendt()` ved suksess
- Navigere til kvittering

**`setSøknadSendt()` gjør:**

- Setter `erSendt = true`
- Tømmer søknadsdata, skjemadata, currentStegId
- Sletter mellomlagring (hvis aktiv)

**Begrunnelse:** Innsending kan ha ulike feilsituasjoner som må håndteres i steget. Rammeverket gir kun state-opprydding.

---

### State-arkitektur

**Zustand for klient wizard-state:**

- `currentStegId`
- `søknadsdata` (bekreftet, transformert)
- `currentStegSkjemadata` (usubmitterte endringer)
- `børMellomlagres`
- `isSubmittingSteg`
- `erSendt`

**React Query for server-data:**

- Hente/lagre mellomlagring
- Hente initialData (søker, barn, etc.)

**Begrunnelse:** Zustand er single source of truth for flyt. React Query brukes kun til persistens, ikke live UI-state.

---

### Back/forward-håndtering

Ved route-innlasting:

1. Sjekk om utledet søknadsdata fra lagret skjemadata matcher lagret søknadsdata
2. Hvis ikke: blokker visning, vis "Ugyldig navigasjon"-panel
3. Bruker må eksplisitt navigere tilbake – ingen auto-redirect

**Skjemadata lagres kun i klient-state** (Zustand), ikke til server.

**Begrunnelse:** Unngår at bruker ser inkonsistent state. Eksplisitt blokkering er bedre enn redirect.

---

### Mellomlagring

**Valgfritt** – ikke alle søknader vil ha mellomlagring.

**Ansvarsfordeling:**
| Pakke | Ansvar |
|-------|--------|
| sif-common-query | Kun API-kall (hent, lagre, slett) |
| soknad-rammeverk | Logikk: hash, validering, state, utils |

**MellomlagringObserver-mønster:**

- Separat komponent som lytter på `børMellomlagres` i Zustand
- Trigger lagring når flagget settes
- Uavhengig av både rammeverk og skjemaløsning
- Legges kun til i apper som trenger mellomlagring

**Payload inneholder:**

- `versjon` (bumpes ved strukturendring)
- `hashString` (hash av metadata)
- `currentStegId`
- `søknadsdata` (transformert)
- `skjemadata` (rå, per steg)

**Begrunnelse:** Samme mønster som i dag (Redux → Zustand). Løs kobling, enkelt å teste.

---

### Submit + mellomlagring + pending

Ved steg-submit:

1. `isSubmittingSteg = true`
2. Søknadsdata oppdateres
3. `børMellomlagres = true`
4. MellomlagringObserver lagrer (silent fail ved feil)
5. `isSubmittingSteg = false`, naviger til neste

**Begrunnelse:** Viser pending-state på knappen. Mellomlagringsfeil blokkerer ikke brukeren.

---

### Hydration ved oppstart

Ved lasting av appen:

1. Hent mellomlagring
2. Valider: sjekk versjon og hash mot current metadata
3. Hvis gyldig: hydrer state, naviger til steget bruker var på
4. Hvis ugyldig: slett mellomlagring via React Query, bruker kommer til velkomstsiden

**Hash genereres av app-spesifikk metadata** (søker, barn, etc.) – varierer per søknad.

**Begrunnelse:** Unngår å hydrere utdatert/inkonsistent data. Ugyldig mellomlagring slettes uten melding til bruker.

---

### Navngivning

**Blandet språk:**
| Type | Språk | Eksempler |
|------|-------|-----------|
| Domene | Norsk | søknad, steg, mellomlagring |
| Teknisk | Engelsk | state, guard, provider, hook |

Eksempler: `useSøknadState`, `StegGuard`, `MellomlagringObserver`

---

### Byggesteiner, ikke magi

Rammeverket tilbyr composable byggesteiner, ikke store komponenter med mange props:

| Byggestein              | Ansvar                           |
| ----------------------- | -------------------------------- |
| `SøknadStateProvider`   | Zustand context, stegkonfig      |
| `MellomlagringObserver` | Lytter på state, trigger lagring |
| `StegGuard`             | Tilgang og konsistenssjekk       |
| `useSteg(stegId)`       | initialData, callbacks           |
| `useStegFlyt()`         | Dynamisk stegflyt                |
| `useStegNavigasjon()`   | Navigasjon mellom steg           |
| `useSøknadState()`      | Tilgang til hele staten          |

**Begrunnelse:** Eksplisitt kontroll, ingen "magi", enkelt å teste og forstå.

---

### Søknadsflyt (happy path)

1. Bruker logger inn, kommer til appen
2. InitialData hentes (søker, barn, etc.)
3. Mellomlagring hentes og valideres
    - Gyldig: hydrer state, naviger til steget bruker var på
    - Ugyldig: slett mellomlagring, gå til velkommen
4. Velkommen-side vises
5. Bruker velger å starte søknaden (klikker "Start søknad")
6. Bruker er nå "inne i søknaden" – går gjennom steg, svarer på spørsmål
7. Ved steg-submit: skjemadata → søknadsdata → mellomlagring
8. Ved navigering tilbake: søknadsdata → skjemadata
9. Oppsummering: søknadsdata → apidata → visning
10. Ved innsending: `setSøknadSendt()` → state tømmes, mellomlagring slettes
11. Oppsummeringssteget navigerer til kvittering

---

### Migreringsstrategi

1. Kopier `apps/aktivitetspenger-soknad/` til `apps/soknad-demo/`
2. Slett app-spesifikk kode (steg, søknadsdata, etc.)
3. Behold infrastruktur (vite, msw, docker, nais)
4. Opprett `src/rammeverk/` og `src/app/` mappestruktur
5. Oppdater package.json navn og scripts
6. Implementer rammeverk med 2-3 dummy-steg
7. Verifiser: refresh, back/forward, mellomlagring
8. Trekk ut `src/rammeverk/` til `packages/soknad-rammeverk/`
9. Migrer eksisterende apper gradvis

**Begrunnelse:** Ikke bygg alt generisk først. Lær av pilot, deretter generaliser.
