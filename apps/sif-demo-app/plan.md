# soknad-rammeverk – Plan

## Status

**Fase:** Pilot-implementasjon i `sif-demo-app`

**Ferdig:**

- [x] Prosjektoppsett (Vite, TypeScript, Tailwind, Aksel, React Query, Zustand, React Router)
- [x] Mappestruktur (`src/rammeverk/` og `src/app/`)
- [x] Kjerntyper (`StegDefinisjon`, `StegProps`, `StegConfig`)
- [x] Zustand store (`useSøknadState`)
- [x] Hooks (`useSteg`, `useStegFlyt`, `useStegNavigasjon`)
- [x] Guards (`StegGuard`, `UgyldigNavigasjonPanel`)
- [x] Route utilities (`getStegRoute`, `getStegIdFromRoute`)
- [x] Demo stegConfig med 3 steg
- [x] Demo stegkomponenter (Steg1, Steg2, Oppsummering)
- [x] Sider (VelkommenPage, KvitteringPage)
- [x] SøknadRouter med routing
- [x] App.tsx ferdig wired
- [x] TypeScript kompilerer uten feil
- [x] Dev server kjører (`yarn dev` → http://localhost:8080/sif-demo)

**Pågår:**

- [ ] Gjennomgang av tilbakemeldinger på siste implementasjon
- [ ] Verifisere at flyten fungerer (Velkommen → Steg1 → Steg2 → Oppsummering → Kvittering)

**Gjenstår:**

- [ ] Test og fiks tilbakemeldinger
- [ ] Back/forward-blokkering
- [ ] MellomlagringObserver
- [ ] Hash/validering for mellomlagring
- [ ] Hydration ved oppstart

---

## Arkitektur (kompakt)

### Tre lag

| Lag                | Ansvar                                            |
| ------------------ | ------------------------------------------------- |
| soknad-rammeverk   | Flyt, state, routing, guards, mellomlagring       |
| soknad-ui          | Layout, header, stegindikator, navigasjonsknapper |
| skjema-komponenter | Gjenbrukbare skjemafelt                           |

### Mappestruktur

```
src/
  rammeverk/         # → pakke senere
    state/           # Zustand, hooks
    guards/          # StegGuard, UgyldigNavigasjonPanel
    routing/         # Route utilities
    mellomlagring/   # (kommer)
    types.ts
    index.ts
  app/               # App-spesifikk kode
    config/          # stegConfig
    steg/            # Stegkomponenter
    pages/           # Velkommen, Kvittering
    SøknadRouter.tsx
```

### Nøkkelbeslutninger

1. **Skjema-agnostisk** – Rammeverket er uavhengig av Formik/RHF. Steg mottar `initialData` og callbacks.

2. **To routere** – AppRouter (velkommen, kvittering) + SøknadRouter (alle steg)

3. **Appen eier routes** – stegConfig har kun logikk, appen definerer faktiske routes og komponenter

4. **Zustand = single source of truth** – React Query kun for persistens

5. **Back/forward** – Blokkér og vis panel, ikke auto-redirect

6. **Byggesteiner** – Composable hooks, ikke "magiske" komponenter

### State (Zustand)

```typescript
{
    currentStegId: string | undefined;
    søknadsdata: Partial<T>;
    currentStegSkjemadata: Record<string, unknown>;
    børMellomlagres: boolean;
    isSubmittingSteg: boolean;
    erSendt: boolean;
}
```

### Hooks

| Hook                  | Returnerer                                     |
| --------------------- | ---------------------------------------------- |
| `useSøknadState()`    | Hele Zustand store                             |
| `useSteg(stegId)`     | initialData, onSkjemadataChange, onStegSubmit  |
| `useStegFlyt()`       | aktiveSteg, currentStegId, forrige/neste, etc. |
| `useStegNavigasjon()` | gåTilSteg, gåTilNeste, gåTilForrige            |

### Navngivning

- Domene (norsk): søknad, steg, mellomlagring
- Teknisk (engelsk): state, guard, provider, hook

---

## Neste steg

Se [log.md](log.md) for detaljert fremdrift og tilbakemeldinger som må håndteres.

---

## Referanse

Full arkitekturdokumentasjon ligger i `/apps/aktivitetspenger-soknad/plan.md`
