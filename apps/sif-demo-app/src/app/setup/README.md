# Setup

Denne mappen er adapterlaget mellom appen og `@sif/soknad`.

Her samles det som trengs for å koble den konkrete søknaden til rammeverket:

- stegkonfigurasjon
- app-spesifikk store og context
- hooks for submit, default values, mellomlagring og avbryt
- wrappers rundt rammeverkets komponenter
- miljøoppsett og mellomlagringskonstanter

Målet er at resten av appen i stor grad skal kunne importere fra `@app/setup` i stedet for å kjenne detaljene i `@sif/soknad`.

## Flyten gjennom setup-laget

1. `søknadStepConfig.ts` definerer steg, routes og rekkefølge.
2. `useSøknadStore.ts` bygger appens store med `createSøknadStore` fra `@sif/soknad`.
3. `context/søknadContext.ts` bygger appens context med `createSøknadContext`.
4. Hooks i `hooks/` bruker denne contexten til å gi app-spesifikke hjelpefunksjoner.
5. Komponentene i `søknad/` kobler steg-UI til context, progresjon, consistency-check og navigasjon.
6. Resten av appen importerer normalt fra `@app/setup`.

## Mapper og filer

| Fil                                   | Ansvar                                                                            |
| ------------------------------------- | --------------------------------------------------------------------------------- |
| `søknad/søknadStepConfig.ts`          | Definerer steg, rekkefølge, routes og titler.                                     |
| `hooks/useSøknadStore.ts`             | Oppretter appens søknadsstore fra stegkonfigurasjonen.                            |
| `context/søknadContext.ts`            | Kobler store, stegkonfig og `formValuesToSøknadsdata` til appens `SøknadContext`. |
| `hooks/useSøknadForm.ts`              | Wrapper rundt `createSøknadForm` for usubmittede form values.                     |
| `hooks/useStepDefaultValues.ts`       | Henter default values fra form values eller lagrede søknadsdata.                  |
| `hooks/useStepSubmit.ts`              | Standard submit-flyt for steg: map, lagre, rydde og navigere videre.              |
| `hooks/useSøknadMellomlagring.ts`     | Kobler appen til mellomlagring for søknadsdata og skjemadata.                     |
| `hooks/useAvbrytSøknad.ts`            | Definerer hva avbryt betyr i appen.                                               |
| `søknad/SøknadStep.tsx`               | Standard wrapper for stegsider med progress, avbryt og consistency-varsel.        |
| `søknad/SøknadFormButtons.tsx`        | Knytter skjemaknapper til context og stegflyt.                                    |
| `wrappers/AppErrorBoundary.tsx`       | Kobler rammeverkets error boundary til Faro.                                      |
| `wrappers/AppSanityStatusChecker.tsx` | Kobler appstatus til miljøverdier og utilgjengelighetsvisning.                    |
| `env/appEnv.ts`                       | Leser browser-env for scenario, telemetri og appstatus.                           |
| `api/`                                | Tom mappe nå, naturlig plass for API-relatert oppsett.                            |

## Hva setup ikke gjør

`setup` er ikke stedet for:

- selve steginnholdet
- domenetyper og skjema-felter
- mapping til API-format utover det som trengs for oppsett av context/store
- konkrete sider som velkommen, kvittering eller feilsider

Det ligger fortsatt i resten av `src/app`.

## Tommelfingerregel

- rammeverk-API + app-spesifikk kobling = `setup`
- domene/UI for ett bestemt steg = ikke `setup`
