# @navikt/sif-server

## 0.4.0

### Minor Changes

- Oppdatere til React19

## 0.3.7

### Patch Changes

- Oppdatere til nav-dekoratoren-moduler 3

## 0.3.6

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.3.5

### Patch Changes

- Disabled changeset/cli
- Updated dependencies
    - @navikt/sif-common-env@0.1.2

## 0.3.4

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.3.3

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.3.2

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.3.1

### Patch Changes

- Pakkeoppdateringe - minor/patch

## 0.3.0

### Minor Changes

- e1dfb2e: Flytter all env-logikk til egen pakke.

    - Sletter getGitShaRequestHeader fra request headers i browser (settes av server)
    - commonEnv som inneholder alle standard env variabler
    - appEnv der det er behov, som ekstender commonEnv og legger til egne
    - kaster exception når påkrevde env ikke finnes
    - prefixe noen common envs med SIF_PUBLIC

    Innføre env.schema.ts i alle søknadsdialoger

    - definerer hvilke envs som er påkrevd
    - under bygg kopieres denne over og brukes ved oppstart av server for å kontrollere at alle envs er satt

    Refactoring av proxy setup i server

### Patch Changes

- e1dfb2e: Refactor hvordan env variabler settes inn i appSettings
- Bytte compiler av scss, pakkeoppdateringer minor/patch
- Updated dependencies [e1dfb2e]
    - @navikt/sif-common-env@0.1.0

## 0.2.7

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.2.6

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.2.5

### Patch Changes

- Legge til K9_BRUKERDIALOG_PROSESSERING_API_URL i appSettings

## 0.2.4

### Patch Changes

- Bytte til debounce fra ds-react

## 0.2.3

### Patch Changes

- Pakkeoppdateringer -minor/patch

## 0.2.2

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.2.1

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.2.0

### Minor Changes

- 052ef4b: Vedleggservice i common, og ta denne i bruk i omsorgspengerutbetaling-sn-fl

## 0.1.3

### Patch Changes

- Pakkeoppdateringer - minor/patch
- ad46a6b: Godta at reverseProxies ikke er satt, men logge til console

## 0.1.2

### Patch Changes

- Pakkeoppdatering - react-intl-6.7.0

## 0.1.1

### Patch Changes

- Pakkeoppdateringer - minor/patch

## 0.1.0

### Minor Changes

- f677f10: Sette opp egen server som kan tas bruk i søknadsdialoger.
