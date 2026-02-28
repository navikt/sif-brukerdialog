# soknad-rammeverk – Utviklingslogg

## 2026-02-28: Første implementasjon

### Gjort

- Opprettet `sif-demo-app` med full prosjektstruktur
- Implementert rammeverk-kjerne:
    - `types.ts` – StegDefinisjon, StegProps, StegConfig
    - `useSøknadState.ts` – Zustand store med alle actions
    - `useSteg.ts` – Hook for stegkomponenter
    - `useStegFlyt.ts` – Dynamisk stegflyt-hook
    - `useStegNavigasjon.ts` – Navigasjonshook
    - `StegGuard.tsx` – Tilgangskontroll per steg
    - `UgyldigNavigasjonPanel.tsx` – Visning ved ugyldig navigasjon
    - `routeUtils.ts` – Mapping mellom stegId og route

- Implementert demo-app:
    - `stegConfig.ts` – 3 steg (personalia, kontakt, oppsummering)
    - `Steg1.tsx`, `Steg2.tsx`, `Oppsummering.tsx`
    - `VelkommenPage.tsx`, `KvitteringPage.tsx`
    - `SøknadRouter.tsx`
    - `App.tsx` med full routing

### Tekniske valg

- Aksel 8: bruker `gap="space-4"` (ikke `gap="4"`)
- React Router 7 med BrowserRouter
- Basename: `/sif-demo`

### Ventende tilbakemeldinger

Bruker har tilbakemeldinger på siste implementasjon som må gjennomgås.

---

## TODO

### Umiddelbart

- [ ] Gjennomgå brukers tilbakemeldinger på implementasjonen
- [ ] Test flyten manuelt i browser
- [ ] Verifiser at StegGuard blokkerer direkte URL-tilgang

### Kort sikt

- [ ] Implementer back/forward-håndtering
- [ ] Legg til MellomlagringObserver
- [ ] Implementer hydration fra mellomlagring

### Lengre sikt

- [ ] Trekk ut til `packages/soknad-rammeverk/`
- [ ] Migrer eksisterende apper

---

## Filstruktur (nåværende)

```
src/
├── rammeverk/
│   ├── guards/
│   │   ├── StegGuard.tsx
│   │   ├── UgyldigNavigasjonPanel.tsx
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

---

## Notater

### Aksel gap-syntax (v8)

```tsx
// Feil:
<VStack gap="4">

// Riktig:
<VStack gap="space-4">
```

### Routes

| Path                   | Komponent      |
| ---------------------- | -------------- |
| `/`                    | VelkommenPage  |
| `/kvittering`          | KvitteringPage |
| `/soknad/personalia`   | Steg1          |
| `/soknad/kontakt`      | Steg2          |
| `/soknad/oppsummering` | Oppsummering   |
