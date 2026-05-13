# sif-brukerdialog

Samling av kode for søknadsdialoger under Sykdom i familien

## Script

-   `pnpm clean` - Sletter node_modules og lib foldere.
-   `pnpm install` - Installerer alle moduler
-   `pnpm build` - Bygger alle applikasjoner under apps med produksjonsinnstillinger (se script i app).
-   `pnpm test` - Kjører alle tester i apps og packages
-   `pnpm build --concurrency=2` - Bygger med redusert parallellitet (anbefalt for Next.js-apper)

## Utvikle på én applikasjon

-   Kjør `pnpm dev` i app-mappen for å starte dev-server.
-   Kopier .env.example til .env i app-folder
-   Dersom det gjøres større endringer i en package, kan det være en må kjøre `pnpm build` for at applikasjonen skal få det med seg. I VS Code kan det være en må kjøre "reload windows".

## Utvikling, endringer og publisering

-   -Vi bruker @changesets/cli for å holde orden på versjoner. Se https://www.npmjs.com/package/@changesets/cli for mer informasjon om hvordan det brukes-.

## Produksjonssetting av applikasjoner

-   Alle applikasjoner skal prodsettes automatisk dersom det er endringer på main-branchen som berører applikasjonen. Dette gjøres ved å sette opp workflows som fanger opp push til main med endringer under path til applikasjonen.

### Lage PR fra branch med endret kode, og som medfører versjons-bump

#### Oppsummert

-   Lag PR med oppdatert kode og changeset fil
-   PR merges til main og ny PR med oppdaterte versjoner lages automatisk
-   PR med versjoner merges inn og en publiserer til npmjs

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.
