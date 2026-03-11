# sif-demo-app

Demo-app for en stegvis søknadsflyt.

Appen består av:

- et **generisk rammeverk** i `src/rammeverk`
- en **konkret søknadsimplementasjon** i `src/app`

Rammeverket håndterer navigasjon, state, guards og mellomlagring. Appen
definerer steg, data og API-integrasjoner.

---

# Oversikt

Tenk på appen slik:

- **rammeverk** = motoren som styrer søknadsflyten
- **app** = den konkrete søknaden (steg, UI og API)

Motoren vet **hvordan en søknadsprosess fungerer**, mens appen bestemmer
**hva søknaden inneholder**.

---

# Kjøring lokalt

Kjør i `apps/sif-demo-app`:

- `npm run dev`
- `npm run build`
- `npm run check:types`
- `npm run lint:eslint`
- `npm run test`

Appen kjører med `basename=/sif-demo`.

---

# Arkitektur

    rammeverk
     ├─ state og navigasjon
     ├─ guards
     ├─ consistency-check
     └─ steglogikk

    app
     ├─ steg og sider
     ├─ API-kall
     ├─ mapping
     └─ konfigurasjon

Stegene i appen kobles til motoren via en stegkonfigurasjon.

---

# Stegmodell

Stegene defineres i:

    src/app/config/søknadStepConfig.ts

Der beskrives:

- hvilke steg som finnes
- rekkefølgen (`søknadStepOrder`)
- om et steg er inkludert (`isIncluded`)
- om et steg er fullført (`isCompleted`)

Eksempel fra demo-appen:

    bosted
    barn
    oppsummering

---

# State og kontekst

Søknadsprosessen styres av en sentral store.

`createSøknadStore` holder blant annet:

- `søknadState`
- `currentStepId`
- `includedSteps`
- `søknadSendt`

og actions som:

- `init`
- `startSøknad`
- `setSøknadsdata`
- `setCurrentStep`
- `resetSøknad`

Store eksponeres til stegene via `createSøknadContext` og hooken
`useSøknadContext`.

Contexten samler:

- store-actions
- steg-navigasjon
- midlertidige skjemaverdier
- consistency-check

---

# Navigasjon og guards

Routing defineres i `src/app/Søknad.tsx`.

Viktige routes:

- `/` → `VelkommenPage`
- `/soknad/...` → steg
- `/kvittering` → `KvitteringPage`

`StepRouteGuard` sørger for at brukeren:

- ikke hopper til steg som ikke er inkludert
- ikke hopper forbi steg som ikke er fullført

---

# Mellomlagring

Appen mellomlagrer både:

- **submittet søknadsdata**
- **usubmittede skjemaverdier**

Dette gjør at brukeren kan:

- laste siden på nytt
- forlate og komme tilbake
- navigere frem og tilbake uten å miste data

Implementert via:

    src/app/hooks/useSøknadMellomlagring.ts

Denne wrapper `useYtelseMellomlagring`.

---

# Typisk steg-flyt

Et steg følger normalt denne flyten:

1.  Bruker fyller ut skjema
2.  Skjemadata mappes til søknadsdata
3.  `setSøknadsdata` oppdaterer store
4.  Data mellomlagres
5.  Navigasjon til neste steg

Denne flyten håndteres vanligvis via `useStepSubmit`.

---

# Stegimplementasjon

Hvert steg er en tynn komponent som fokuserer på UI og form.

Eksempler:

    src/app/steps/bosted/BostedSteg.tsx
    src/app/steps/barn/BarnSteg.tsx
    src/app/steps/oppsummering/OppsummeringSteg.tsx

Prosesslogikken (state, navigasjon, guards) ligger i rammeverket.

---

# Oppstart og dataflyt

Oppstart skjer i følgende rekkefølge:

1.  `src/main.tsx`
    - starter app
    - aktiverer mock
2.  `src/App.tsx`
    - setter opp providers og routing
3.  `AppInitialDataLoader`
    - henter søker
    - henter barn
    - laster mellomlagring
4.  `src/app/Søknad.tsx`
    - initialiserer store og context
    - registrerer steg-routes

---

# Innsending

API-klienter initialiseres i:

    src/app/setup/api/initApiClients.ts

Selve innsendingen:

    src/app/setup/api/sendSøknad.ts

Hook:

    src/app/hooks/useSendSøknad.ts

Dette pakker innsendingen i en `react-query` mutation.

Endelig innsending gjøres i `OppsummeringSteg`.

---

# Mock og scenarier

Mock brukes for lokal utvikling.

Oppstart:

    mock/enableMocking.ts

Scenarier:

    mock/scenarios/scenarioer.ts

MSW handlers:

    mock/msw/handlers.ts

---

# Viktige mapper

    src/app/config      stegdefinisjoner og konstanter
    src/app/context     appens context
    src/app/hooks       app-spesifikke hooks
    src/app/setup       init-data og API-oppsett
    src/app/steps       stegkomponenter

    src/rammeverk       generisk søknadsmotor

---

## Endre eller legge til steg

1. Oppdater `SøknadStepId`, `søknadStepConfig` og `søknadStepOrder`.
2. Oppdater `Søknadsdata` i `src/app/types/Søknadsdata.ts`.
3. Implementer stegkomponent under `src/app/steps/...`.
4. Legg til route i `src/app/Søknad.tsx`.
5. Oppdater API-mapping i `src/app/utils/søknadsdataToSøknadApiData.ts`.
6. Verifiser mellomlagring og navigering frem/tilbake.
