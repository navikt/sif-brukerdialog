# appstatus-sanity-config

Sanity Studio for appstatus, som brukes til driftsmeldinger og status for søknadsdialogene i Sykdom i familien. Innholdet leses av `@navikt/appstatus-react-ds`.

Studioet bruker datasettet `production` i prosjektet `ryujtq87`. Det finnes ikke noe testdatasett, så alt som publiseres fra Studio, også lokalt, går rett ut i produksjon.

## Kommandoer

```bash
pnpm dev              # Starter Studio lokalt
pnpm build            # Bygger Studio til dist/
pnpm deploy           # Deployer Studio til Sanity
pnpm deploy-graphql   # Deployer GraphQL-API
pnpm lint:eslint
pnpm lint:tsc
```

Skjemaene ligger i `schemas/`. Endrer du feltnavn eller typer, må eksisterende innhold migreres og `appstatus-react-ds` oppdateres.
