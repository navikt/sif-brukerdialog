---
'@navikt/sif-common-formik-ds': patch
---

Fjerne setTimeout i onSubmit - den forhindret å bruke clock() i cypress-tester.
