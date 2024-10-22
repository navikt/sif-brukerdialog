---
'@navikt/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn': minor
'@navikt/omsorgspengerutbetaling-arbeidstaker-soknad': minor
'@navikt/pleiepenger-i-livets-sluttfase-soknad': minor
'@navikt/omsorgsdager-aleneomsorg-dialog': minor
'@navikt/omsorgspengerutbetaling-soknad': minor
'@navikt/endringsmelding-pleiepenger': minor
'@navikt/sif-common-soknad-ds': minor
'@navikt/sif-common-forms-ds': minor
'@navikt/ungdomsytelse-veileder': minor
'@navikt/sif-common-core-ds': minor
'@navikt/pleiepenger-sykt-barn': minor
'@navikt/ungdomsytelse-soknad': minor
'@navikt/omsorgspengesoknad': minor
'@navikt/sif-common-api': minor
'@navikt/sif-common-env': minor
'@navikt/sif-ettersending': minor
'@navikt/sif-demo-app': minor
'@navikt/sif-server': minor
---

Flytter all env-logikk til egen pakke.

-   Sletter getGitShaRequestHeader fra request headers i browser (settes av server)
-   commonEnv som inneholder alle standard env variabler
-   appEnv der det er behov, som ekstender commonEnv og legger til egne
-   kaster exception når påkrevde env ikke finnes
-   prefixe noen common envs med SIF_PUBLIC

Innføre env.schema.ts i alle søknadsdialoger

-   definerer hvilke envs som er påkrevd
-   under bygg kopieres denne over og brukes ved oppstart av server for å kontrollere at alle envs er satt

Refactoring av proxy setup i server
