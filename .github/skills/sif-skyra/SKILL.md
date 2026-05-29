---
name: sif-skyra
type: referanse
description: Bruk denne skillen når en utvikler skal sette opp eller feilsøke Skyra-undersøkelser (skyra-survey) i en app, basert på mønsteret fra opplæringspenger-soknad.
---

# sif-skyra

## Bruk når

- En utvikler vil legge til Skyra i en app (typisk i kvittering/oppsummering).
- En utvikler trenger en felles oppskrift for Skyra-oppsett som kan gjenbrukes på tvers av apper.
- En utvikler feilsøker hvorfor Skyra ikke vises eller ikke reloader ved navigasjon.

## Leveranse

- Trinnvis oppsett for Skyra-komponent, reload-håndtering og plassering i app-flyt.
- Sjekkliste for verifisering i ny app.
- Referanse til konkrete filer i `opplaringspenger-soknad`.

## Hurtigtrigger

Bruk skillen umiddelbart ved ord/fraser som:

- `skyra`, `skyra-survey`, `SkyraHandler`, `useSkyraReloader`
- `slug`, `SkyraTestPage`, `reload`, `survey`

## Avgrensning

- Fokus: frontend-oppsett for visning av Skyra-komponent i React-appene.
- Ikke fokus: innhold/administrasjon av selve undersøkelsen i Skyra-plattformen.
- Ikke fokus: server/proxy utover det som trengs for at script lastes i klient.

## Slug — viktig!

**Slugen er unik per app.** Den kobles opp mot en spesifikk undersøkelse i Skyra-plattformen og kan ikke gjenbrukes fra en annen app. Det er kun én slug per app — ingen forskjell mellom prod og test.

- Slugen opprettes av den som administrerer undersøkelsen i Skyra.
- Eksempel fra opplæringspenger:
    ```ts
    export enum Slug {
        soknad_om_opplaringspenger = 'arbeids-og-velferdsetaten-nav/soknad-om-opplaeringspenger',
    }
    ```
- **Kopier aldri slugs fra en annen app** — undersøkelsen vil da vises feil eller ikke i det hele tatt.

**Hvis slugen ikke er avklart: spør utvikleren eksplisitt før du setter opp koden (se arbeidsmodus nedenfor).**

## Arbeidsmodus

### Fase 0 — Avklar slug (obligatorisk før implementering på kvitteringsside)

Hvis brukeren ber om å sette opp Skyra på kvitteringssiden (eller annen konkret side) i en app, og slugen **ikke** er oppgitt:

1. Still følgende spørsmål til utvikleren **før du skriver noen kode**:
    - Hva er slug for denne appen? (format: `organisasjon/undersøkelse-navn`)
2. Vent på svar. Ikke bruk eksempel-slugs fra opplæringspenger som plassholdere — de vil peke mot feil undersøkelse.
3. Når slug er bekreftet, fortsett med implementering.

Hvis brukeren eksplisitt sier at slug ikke er klar ennå, lag koden med tydelig `TODO`-kommentar:

```ts
export enum Slug {
    // TODO: Legg inn korrekt slug fra Skyra for denne appen
    app = 'TODO/erstatt-med-korrekt-slug',
}
```

### Fase 1 - Oppsettoppskrift

Når slug er avklart (eller brukeren eksplisitt aksepterer TODO-plassholder):

1. Opprett lokal `Skyra`-komponent med riktig slug for appen.
2. Legg til `SkyraHandler` som kaller `globalThis.skyra.reload()` ved route-endring.
3. Legg til `useSkyraReloader` for steg/sider der survey kommer sent i livssyklusen.
4. Monter `SkyraHandler` høyt i appflyten (nær router/søknadscontainer).
5. Render `<Skyra slug={...} />` på ønsket side (typisk kvittering).
6. Legg til testside/ruter for verifisering av visning og reload.

### Fase 2 - Verifisering i repo (kun når bruker ber om det)

Ved eksplisitt forespørsel om verifisering i en app, sjekk i denne rekkefølgen:

1. Skyra-script er lastet i klient, slik at `globalThis.skyra` er tilgjengelig.
2. `Skyra`-komponent finnes og bruker `skyra-survey` med riktig slug.
3. `SkyraHandler` er montert i appens hovedflyt.
4. `useSkyraReloader` brukes på steg/sider som trenger forsinket reload.
5. Skyra-komponenten er plassert på riktig side (f.eks. kvittering).
6. Testsider/ruter finnes og fungerer (`/skyra/test...`).

## Referanseimplementasjon (opplaringspenger)

Disse filene viser etablert mønster som skal gjenbrukes:

- Skyra-byggesteiner:
    - `apps/opplaringspenger-soknad/src/app/skyra/Skyra.tsx`
    - `apps/opplaringspenger-soknad/src/app/skyra/SkyraHandler.tsx`
    - `apps/opplaringspenger-soknad/src/app/skyra/useSkyraReloader.ts`
    - `apps/opplaringspenger-soknad/src/app/skyra/SkyraTestPage.tsx`
- Integrasjon i flyt:
    - `apps/opplaringspenger-soknad/src/app/søknad/Søknad.tsx`
    - `apps/opplaringspenger-soknad/src/app/søknad/steps/oppsummering/OppsummeringStep.tsx`
    - `apps/opplaringspenger-soknad/src/app/pages/kvittering/KvitteringPage.tsx`

## Sjekkliste for ny app

1. Skyra-script er tilgjengelig i klientmiljøet for appen.
2. `skyra-survey` rendres i DOM når aktuell side vises.
3. `Skyra.tsx` har korrekte slugs for appen.
4. `SkyraHandler` er montert nær routeren.
5. `useSkyraReloader` er koblet inn der survey ikke dukker opp uten reload.
6. `<Skyra slug={...} />` er plassert der undersøkelsen skal vises.
7. Testsider/ruter er tilgjengelige i dev for manuell verifisering.

## Vanlige feil

1. `SkyraHandler` er ikke montert, så survey oppdateres ikke ved navigasjon.
2. Script er ikke lastet (mangler provider/loader), så `globalThis.skyra` er `undefined`.
3. Slug kopiert fra en annen app — undersøkelsen vises ikke eller viser feil innhold.
4. Kun komponent er lagt til, men uten reloader på steg med asynkron rendering.
