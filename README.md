# sif-brukerdialog

Samling av kode for søknadsdialoger under Sykdom i familien

## Script

-   `yarn clean` - Sletter node_modules og lib foldere.
-   `yarn` - Installerer alle moduler
-   `yarn build-package` - Bygger alle moduler under packages.
-   `yarn build-app` - Bygger alle applikasjoner under apps med produksjonsinnstillinger (se script i app).
-   `yarn dev` - Bygger alle moduler under packages, og starter watch på alle packages. Initiell `yarn build-package` bør kjøres først.
-   `yarn test` - Kjører alle tester i apps og packages

## Utvikle på én applikasjon

-   Kjør `yarn dev` for å starte bygg og watch på alt under packages.
-   Gå til aktuell app og start nødvendige dev-script der.
-   Dersom det gjøres større endringer i en package, kan det være en må kjøre `yarn build-package` manuelt for at applikasjonen skal få det med seg. I VS Code kan det være en må kjøre "reload windows".

## Utvikling, endringer og publisering

-   Vi bruker @changesets/cli for å holde orden på versjoner. Se https://www.npmjs.com/package/@changesets/cli for mer informasjon om hvordan det brukes.

### Lage PR fra branch med endret kode, og som medfører versjons-bump

#### Oppsummert

-   Lag PR med oppdatert kode og changeset fil
-   PR merges til main og ny PR med oppdaterte versjoner lages automatisk
-   PR med versjoner merges inn og en publiserer til npmjs

#### Detaljert

1. Lag PR med oppdatert kode, samt en changeset fil:
    - Kjør `yarn changeset`
    - Velg pakker som skal oppdateres
    - Velg riktig bump for pakken
    - Skriv en kort oppsummering på hva som er gjort
    - commit og push
2. Når PR merges inn på main, vil det bli laget en `Changeset version`-PR med oppdaterte versjonsnumre. NB! Se over at PR'en ikke inneholder noen bumps som er feil. Den tar av og til med pakker som ikke skal være med. Korriger dersom det er feil.
3. Når `Changeset version` er merget til main, kan en hente ned `main`-branchen bygg alle pakker `yarn bp` og kjøre `yarn changeset publish`. Da vil alle versjoner som er oppdatert pushes til npmjs.
