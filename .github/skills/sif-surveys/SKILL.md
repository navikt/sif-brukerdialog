---
name: sif-surveys
type: referanse
description: Bruk denne skillen når en utvikler skal sette opp eller feilsøke Skyra-undersøkelser (skyra-survey) i en app via @navikt/sif-surveys.
---

# sif-surveys

## Bruk når

- En utvikler vil legge til Skyra i en app (typisk kvittering/oppsummering).
- En utvikler feilsøker hvorfor Skyra ikke vises eller ikke reloader.
- En ny slug skal registreres.

## Hurtigtrigger

- `skyra`, `skyra-survey`, `SkyraHandler`, `useSkyraReloader`
- `SkyraSlug`, `SkyraTestPage`, `slug`, `survey`

## Avgrensning

- Fokus: frontend-oppsett for visning av Skyra via `@navikt/sif-surveys`.
- Ikke fokus: administrasjon av undersøkelser i Skyra-plattformen.

## Pakken `@navikt/sif-surveys`

Alt Skyra-relatert ligger i `packages/sif-surveys`. Apper importerer direkte — ingen lokale re-eksporter.

### Eksporter

| Eksport            | Fil                             | Formål                                                                  |
| ------------------ | ------------------------------- | ----------------------------------------------------------------------- |
| `Skyra`            | `src/skyra/Skyra.tsx`           | Rendrer `<skyra-survey>`. Prop `slug: SkyraSlug`.                       |
| `SkyraSlug`        | `src/skyra/SkyraSlug.ts`        | Enum med alle registrerte slugs. Eneste tillatte verdier.               |
| `SkyraHandler`     | `src/skyra/SkyraHandler.tsx`    | Kaller `globalThis.skyra.reload()` ved route-endring.                   |
| `SkyraTestPage`    | `src/skyra/SkyraTestPage.tsx`   | Testside som rendrer én eller flere surveys. Prop `slugs: SkyraSlug[]`. |
| `useSkyraReloader` | `src/skyra/useSkyraReloader.ts` | Forsinket reload (2 s) ved mount.                                       |

### `SkyraSlug` — sentral enum

Alle gyldige slugs er registrert i `packages/sif-surveys/src/skyra/SkyraSlug.ts`. Komponentene `Skyra` og `SkyraTestPage` aksepterer **kun** `SkyraSlug`-verdier — feil slug gir kompileringsfeil.

Nye slugs legges til her. Spør utvikleren om slug-verdi først (format: `organisasjon/undersøkelse-navn`). Ikke gjenbruk slugs fra en annen app.

## Arbeidsmodus

### Ny slug i eksisterende app

1. Legg til enum-verdi i `SkyraSlug`.
2. Bruk den nye verdien i appen: `<Skyra slug={SkyraSlug.ny_verdi} />`.

### Skyra i ny app

1. **Avklar slug** — spør utvikleren. Ikke bruk placeholder fra andre apper.
2. Legg til slug i `SkyraSlug`-enumen i pakken.
3. Legg til `"@navikt/sif-surveys": "workspace:*"` i appens `package.json`.
4. Importer direkte fra `@navikt/sif-surveys`:
    ```tsx
    import { SkyraHandler, Skyra, SkyraSlug } from '@navikt/sif-surveys';
    ```
5. Monter `<SkyraHandler />` nær routeren (f.eks. i `Søknad.tsx`).
6. Render `<Skyra slug={SkyraSlug.min_app} />` der undersøkelsen skal vises.
7. Legg til testside-rute (`/skyra/test`):
    ```tsx
    import { SkyraTestPage, SkyraSlug } from '@navikt/sif-surveys';
    // ...
    if (globalThis.location.pathname.includes('skyra/test')) {
        return <SkyraTestPage slugs={[SkyraSlug.min_app_test]} />;
    }
    ```
8. Bruk `useSkyraReloader()` i steg der survey ikke dukker opp uten forsinket reload.

### Verifisering (kun på forespørsel)

1. Skyra-script er lastet — `globalThis.skyra` er tilgjengelig.
2. `SkyraHandler` er montert nær routeren.
3. `<Skyra slug={...} />` rendres på riktig side.
4. `useSkyraReloader` brukes der nødvendig.
5. Testsiden fungerer via `/skyra/test`.

## Referanseimplementasjon (opplaringspenger)

- `apps/opplaringspenger-soknad/src/app/søknad/Søknad.tsx` — `SkyraHandler`, `SkyraTestPage`
- `apps/opplaringspenger-soknad/src/app/pages/kvittering/KvitteringPage.tsx` — `<Skyra slug={SkyraSlug.opplaringspenger} />`
- `apps/opplaringspenger-soknad/src/app/søknad/steps/oppsummering/OppsummeringStep.tsx` — `useSkyraReloader()`

## Vanlige feil

1. `SkyraHandler` ikke montert — survey oppdateres ikke ved navigasjon.
2. Script ikke lastet — `globalThis.skyra` er `undefined`.
3. Slug ikke registrert i `SkyraSlug` — kompileringsfeil.
4. Komponent lagt til uten reloader på steg med asynkron rendering.
