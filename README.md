# sif-brukerdialog

Samling av kode for søknadsdialoger under Sykdom i familien

## Script

-   `npm run clean` - Sletter node_modules og lib foldere.
-   `npm i` - Installerer alle moduler
-   `npm run build-package` - Bygger alle moduler under packages.
-   `npm run build-app` - Bygger alle applikasjoner under apps med produksjonsinnstillinger (se script i app).
-   `npm run dev` - Bygger alle moduler under packages, og starter watch på alle packages. Initiell `npm run build-package` bør kjøres først.
-   `npm run test` - Kjører alle tester i apps og packages

## Utvikle på én applikasjon

-   Kjør `npm run dev` for å starte bygg og watch på alt under packages.
-   Gå til aktuell app og start nødvendige dev-script der.
-   Dersom det gjøres større endringer i en package, kan det være en må kjøre `npm run build-package` manuelt for at applikasjonen skal få det med seg. I VS Code kan det være en må kjøre "reload windows".

## Utvikling, endringer og publisering

-   Vi bruker @changesets/cli for å holde orden på versjoner. Se https://www.npmjs.com/package/@changesets/cli for mer informasjon om hvordan det brukes.
-   Egne rutiner finner vi ut av og dokumenterer her.
