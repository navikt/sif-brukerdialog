---
'@navikt/sif-common-formik-ds': major
---

Oppdatere til versjon 5 av designsystemet aksel. Breaking change på grunn av props som er endret på komponenter som bruker modal dialog.

# Props som er fjernet
- shouldCloseOnOverlayClick. Denne finnes ikke lenger i Aksel Modal. Dette gjelder:
-- packages/sif-common-formik-ds/src/components/formik-modal-form/FormikModalFormAndInfo.tsx
-- packages/sif-common-formik-ds/src/components/formik-modal-form/FormikModalFormAndList.tsx


