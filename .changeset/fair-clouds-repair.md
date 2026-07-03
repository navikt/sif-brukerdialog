---
'@navikt/dine-pleiepenger': patch
'@navikt/sif-common-api': patch
'@navikt/sif-common-formik-ds': patch
'@navikt/sif-common-utils': minor
'@navikt/sif-ettersending': patch
'@navikt/sif-validation': patch
'@sif/api': patch
---

Refaktoring av Date-håndtering slik at en ikke får tidssonefeil når en håndterer datoer. Dette er første refaktoring av 2. Denne dekker direkte feilsituasjoner som har vært i dagens løsninger når en har vært i en annen tidssone. Runde to er å erstatte Date med ISODate for rene datoer.
