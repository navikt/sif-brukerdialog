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
