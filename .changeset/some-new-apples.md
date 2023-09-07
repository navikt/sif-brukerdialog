---
'@navikt/sif-common-soknad-ds': major
---

## Standardisere hvordan pageTitle settes i Step
Fjerne egen intl-key for pageTitle på de ulike stegene, og gå over til at denne genereres ut fra tittel på applikasjonen og tittel på steget. Formatet er da "_StegTittel - ApplikasjonTittel_"

**Fjernet prop fra Step.tsx er:**
* bannerTitle
* stepTitle

**Ny prop:**
* applicationTitle

