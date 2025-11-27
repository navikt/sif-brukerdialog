---
'@navikt/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn': patch
'@navikt/omsorgspengerutbetaling-arbeidstaker-soknad': patch
'@navikt/pleiepenger-i-livets-sluttfase-soknad': patch
'@navikt/omsorgsdager-aleneomsorg-dialog': patch
'@navikt/omsorgspengerutbetaling-soknad': patch
'@navikt/endringsmelding-pleiepenger': patch
'@navikt/sif-common-formik-ds': patch
'@navikt/sif-common-soknad-ds': patch
'@navikt/opplaringspenger-soknad': patch
'@navikt/ungdomsytelse-deltaker': patch
'@navikt/ungdomsytelse-veileder': patch
'@navikt/sif-common-core-ds': patch
'@navikt/pleiepenger-sykt-barn': patch
'@navikt/omsorgspengesoknad': patch
'@navikt/dine-pleiepenger': patch
'@navikt/sif-ettersending': patch
'@navikt/sif-demo-app': patch
---

- Refactoring av dockerfiler. Bruke turbo sin prune funksjonalitet og yarn --immutable.
- Justere workflows for deploy
- Skru av prometheus metrics - var ikke brukt
- Korrigere dependencies pga --immutable
- Forenkle getDisabledDates pga ts warning
