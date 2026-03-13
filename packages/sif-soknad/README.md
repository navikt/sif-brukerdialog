# Sif-søknad - Søknadsrammeverk

Generisk rammeverk for stegvis søknadsflyt.

Rammeverket eier flytlogikk (state, steg, navigasjon, guards, consistency), mens vertsapplikasjonen eier domene, UI, API og mellomlagring.

## Hva rammeverket løser

- sentral søknadsstate
- stegmodell med rekkefølge, inklusjon og fullført-status
- navigasjon mellom steg
- route-guard for gyldig steg
- bevaring av usubmittede skjemaverdier
- consistency-sjekk mellom form state og lagret søknadsdata
- generiske sidekomponenter for start/step/application

## Kjernekonsepter

1. `StepConfig` og `stepOrder`
   Definerer hvilke steg som finnes, hvilken route de har, om de er inkludert (`isIncluded`) og om de er fullført (`isCompleted`).

2. Store (`createSøknadStore`)
   Kilden til sannhet for flyten.
   Inneholder blant annet `søknadState`, `currentStepId`, `includedSteps` og actions som `init`, `startSøknad`, `setSøknadsdata`, `setCurrentStep`, `resetSøknad`, `setSøknadSendt`.

3. Context (`createSøknadContext`)
   Binder store, navigasjon og usubmittede form values i ett API for stegene.

4. Navigasjon og guard
   `useStepNavigation` og `StepRouteGuard` styrer gyldig flyt gjennom inkluderte steg.

5. Form values og consistency
   `SøknadFormValuesContext` holder usubmittede skjemadata.
   `useCheckSøknadStepData` avdekker avvik mellom form values og lagret søknadsdata.

## Moduloversikt

- `store`
- `context`
- `navigation`
- `consistency`
- `hooks`
- `types`
- `pages`
- `components`
- `utils`

## Public API (dagens)

Fra `src/rammeverk/index.ts`:

- `consistency`
- `context`
- `hooks`
- `navigation`
- `foundation` (store)

Undermoduler eksporterer blant annet:

- `createSøknadStore` (`store`)
- `createSøknadContext` (`context`)
- `StepRouteGuard`, `useStepNavigation` (`navigation`)
- `createSøknadForm` (`hooks`)
- `SøknadFormValuesProvider`, `useCheckSøknadStepData` (`consistency`)
- `ApplicationPage`, `StartPage`, `StepPage` (`pages`)
- `ErrorBoundary`, `AppHeader`, `SanityAppStatus` (`components`)

## Integrasjon i en app

1. Definer steg og søknadsdata
   Lag appens `Søknadsdata`, `SøknadStepId`, `stepConfig` og `stepOrder`.

2. Opprett store
   Bruk `createSøknadStore` med appens stegkonfigurasjon.

3. Opprett app-context
   Bruk `createSøknadContext` med:

- appens store-hook
- `stepConfig`
- `stepOrder`
- `stepTitles`
- `formValuesToSøknadsdata`

4. Sett opp routes
   Bruk `StepRouteGuard` rundt steg-rutene.

5. Koble steg
   Bruk context i stegene for submit/navigasjon, og eventuelt `createSøknadForm` for form-hook med auto-lagring av usubmittede verdier.

6. Koble mellomlagring og innsending i app-laget
   Rammeverket er bevisst uten domene-API og uten observability-vendor-kobling.

## Ansvarsdeling

Rammeverk:

- flyt og mekanikk
- generiske typer og hjelpefunksjoner
- UI-byggeklosser for søknadslayout

Vertsapplikasjon:

- domene og datamodell
- tekster og steginnhold
- API-klienter, mellomlagring og submit
- logging/observability (for eksempel Faro/Sentry)

## Designvalg

- Rammeverket er vendor-nøytralt mot API/telemetri.
- Rammeverket antar lineær stegflyt basert på `includedSteps`.
- Usynlige steg fjernes fra flyten via `isIncluded`.
- Progresjon beregnes fra `isCompleted`.
