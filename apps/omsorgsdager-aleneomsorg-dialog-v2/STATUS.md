# Status

Oppdatert: 2026-11-27

## Nå

V2-appen har et kjørbart grunnlag for migreringen. Alle skjemasteg er implementert med v2-komponenter.

## Grunnramme som er implementert

Punktene under finnes i appskallet. De er ikke sluttverifisert mot hele v1-flyten før skjematikken og payload-pariteten er på plass.

- v2-routing og stegrekkefølge
- initialdata for søker og barn
- mellomlagring gjennom `@sif/soknad-app`
- velkomstside og kvittering med bokmål og nynorsk fra v1
- mock-API med felles mockdata fra `@sif/api`
- generert API-type og innsending mot mock-endepunkt
- logging og analytics ved innsendingfeil
- Vite-, Aksel-, Tailwind- og CSS-rigg
- Docker- og Nais-oppsett
- test som låser stegrekkefølgen
- «Om aleneomsorg for barn» med v1-tekster, validering, betingelser, v2-dialoger og mapping begge veier. Avvik fra v1: ubrukt logikk for delt bosted er fjernet, valg for slettede barn ryddes bort, og en skrivefeil i valideringsteksten på bokmål er rettet.
- «Tidspunkt for aleneomsorg» med v1-tekster, validering per barn, betinget datofelt og mapping begge veier. Valgt «I fjor eller tidligere» beholder ikke en tidligere utfylt dato.
- Oppsummering med v1-tekster og rekkefølge, søker- og barnopplysninger, bekreftelsescheckbox og innsending av brukerens bekreftelsesverdi.

Mappingen for «Om aleneomsorg for barn» bruker `ISODate` for datoer og er låst med enhetstester. Etter at `@sif/soknad-forms` og `@sif/validation` ble lagt til som direkte avhengigheter, passerer `pnpm lint:tsc`, `pnpm lint:eslint`, `pnpm test` og `pnpm build`.

## Bevisst midlertidig

- Innsending bruker mockhandleren; payloaden er implementert mot v1-kontrakten og den genererte typen, men er ikke sluttverifisert i brukerreisen.

## Neste steg

1. Verifiser hele DTO-mappingen og MSW-scenariene mot v1.
2. Verifiser brukerreisen mot v1.

## Når statusen oppdateres

Oppdater dokumentet når:

- et mocksteg erstattes med ekte skjematikk
- en v1-kontrakt er låst med test
- payload-mappingen endres
- en scenarioflyt eller valideringsregel er verifisert

`AGENTS.md` beskriver arbeidsreglene. `INNHOLD.md` peker til v1-kildene som er fasit.
