---
'@navikt/sif-common-formik-ds': patch
---

Feilfiks når maks og min dato er på samme dag. Da ble undefined returnert, noe som igjen førte til at dropdownCaption ikke virket som forventet. Nå returneres alltid en min eller maks dato dersom dette er satt.
