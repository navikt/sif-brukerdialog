# Status

Oppdatert: 2026-11-28

## Nå

Alle skjemasteg, oppsummering og kvittering er portert fra v1 med v2-komponenter. Funn fra code review er rettet. Det som gjenstår, er sluttverifisering av payload og brukerreise mot v1.

## Grunnramme som er implementert

Punktene under finnes i appskallet. De er ikke sluttverifisert mot hele v1-flyten før skjematikken og payload-pariteten er på plass.

- v2-routing og stegrekkefølge
- initialdata for søker og barn
- mellomlagring gjennom `@sif/soknad-app`
- velkomstside og kvittering med bokmål og nynorsk fra v1
- mock-API med felles mockdata fra `@sif/api` og scenarioer for registrerte barn og ingen registrerte barn
- scenarioheader i demo-modus
- Playwright-oppsett med scenarioer for registrert barn, fosterbarn og aleneomsorg til ulike tidspunkter
- a11y-sjekker i Playwright-flytene
- generert API-type og innsending mot mock-endepunkt
- logging og analytics ved innsendingfeil
- appstatus fra Sanity (driftsmeldinger og stenging av søknaden), som i v1
- Vite-, Aksel-, Tailwind- og CSS-rigg
- Docker- og Nais-oppsett
- appspesifikk `Dockerfile.dockerignore` som holder hemmeligheter og generert innhold utenfor byggkonteksten
- test som låser stegrekkefølgen
- «Om aleneomsorg for barn» med v1-tekster, validering, betingelser, v2-dialoger og mapping begge veier. Avvik fra v1: ubrukt logikk for delt bosted er fjernet, valg for slettede barn ryddes bort, og en skrivefeil i valideringsteksten på bokmål er rettet.
- Navn på manuelt tilknyttede barn begrenses til 100 tegn i den delte `AnnetBarnDialog` i `@sif/soknad-forms`. Avvik fra v1, som ikke hadde grense. Endringen gjelder alle apper som bruker dialogen.
- «Tidspunkt for aleneomsorg» med v1-tekster, validering per barn, betinget datofelt og mapping begge veier. Valgt «I fjor eller tidligere» beholder ikke en tidligere utfylt dato.
- Oppsummering med v1-tekster og rekkefølge, søker- og barnopplysninger, bekreftelsescheckbox og innsending av brukerens bekreftelsesverdi.

Mappingen for begge skjemasteg og DTO-en bruker `ISODate` for datoer og er låst med enhetstester. Playwright-flytene er skrevet, men må kjøres av utvikleren.

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
