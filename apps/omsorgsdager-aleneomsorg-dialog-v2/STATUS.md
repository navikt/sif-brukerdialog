# Status

Oppdatert: 2026-11-27

## Nå

V2-appen har et kjørbart grunnlag for migreringen. Brukeren kan gå fra velkomstside gjennom to mocksteg til oppsummering og kvittering med mock-API.

## Grunnramme som er implementert

Punktene under finnes i appskallet og er teknisk verifisert med dagens typecheck, lint, én kontrakttest og build. De er ikke sluttverifisert mot hele v1-flyten før skjematikken og payload-pariteten er på plass.

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

Siste kjente kontroll: `pnpm lint:tsc`, `pnpm lint:eslint`, `pnpm test` og `pnpm build` passerer. Dette er ikke en full funksjonell verifisering av søknaden.

## Bevisst midlertidig

- «Om aleneomsorg for barn» er et tomt mocksteg.
- «Tidspunkt for aleneomsorg» er et tomt mocksteg.
- Oppsummeringen har ikke v1-innhold eller bekreftelsescheckbox.
- DTO-mappingen bruker alle registrerte mockbarn med `TIDLIGERE`.
- Innsending bruker mockhandleren; payloaden er ikke godkjent som v1-ekvivalent.

## Neste steg

1. Implementer «Om aleneomsorg for barn» mot v1 som fasit.
2. Lås tekst, validering, betingelser og mapping med målrettede tester.
3. Implementer «Tidspunkt for aleneomsorg».
4. Implementer oppsummering, bekreftelse og v1-ekvivalent DTO-mapping.
5. Verifiser MSW-scenarier og brukerreise mot v1.

## Når statusen oppdateres

Oppdater dokumentet når:

- et mocksteg erstattes med ekte skjematikk
- en v1-kontrakt er låst med test
- payload-mappingen endres
- en scenarioflyt eller valideringsregel er verifisert

`AGENTS.md` beskriver arbeidsreglene. `INNHOLD.md` peker til v1-kildene som er fasit.
