# @navikt/sif-demo-app

## 0.3.2

### Patch Changes

- Oppdatere til nav-dekoratoren-moduler 3

## 0.3.1

### Patch Changes

- 67856dc: Pakkeoppdateringer - minor/patch
- Pakkeoppdateringer - minor/patch
- Updated dependencies [67856dc]
- Updated dependencies
    - @navikt/sif-common-formik-ds@2.2.1
    - @navikt/sif-common-core-ds@10.0.2
    - @navikt/sif-common-api@0.3.8
    - @navikt/sif-common-ui@0.8.37

## 0.3.0

### Minor Changes

- Endre i NumberInput

    - Formatere verdi i NumberInput ved blur/fokus
    - Kun tillate komma som desimalskille
    - Ta i bruk integerValue=true på inntekt i SN

### Patch Changes

- Updated dependencies
    - @navikt/sif-common-formik-ds@2.1.0

## 0.2.10

### Patch Changes

- Disabled changeset/cli
- Updated dependencies
    - @navikt/sif-common-api@0.3.7
    - @navikt/sif-common-core-ds@10.0.1
    - @navikt/sif-common-env@0.1.2
    - @navikt/sif-common-formik-ds@2.0.1
    - @navikt/sif-common-ui@0.8.36

## 0.2.9

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.13.9
    - @navikt/sif-common-core-ds@9.20.9
    - @navikt/sif-common-api@0.3.6
    - @navikt/sif-common-ui@0.8.35

## 0.2.8

### Patch Changes

- Erstatte alle generelle lister med List-komponenten fra Aksel
- Updated dependencies
    - @navikt/sif-common-core-ds@9.20.8
    - @navikt/sif-common-ui@0.8.34

## 0.2.7

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.13.7
    - @navikt/sif-common-core-ds@9.20.6
    - @navikt/sif-common-api@0.3.5
    - @navikt/sif-common-ui@0.8.33

## 0.2.6

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.13.6
    - @navikt/sif-common-core-ds@9.20.5
    - @navikt/sif-common-api@0.3.4
    - @navikt/sif-common-ui@0.8.31

## 0.2.5

### Patch Changes

- Oppdatere node image til node:20.18-alpine

## 0.2.4

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.13.5
    - @navikt/sif-common-core-ds@9.20.4
    - @navikt/sif-common-api@0.3.3
    - @navikt/sif-common-ui@0.8.30

## 0.2.3

### Patch Changes

- Pakkeoppdateringe - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.13.4
    - @navikt/sif-common-core-ds@9.20.3
    - @navikt/sif-common-api@0.3.2
    - @navikt/sif-common-ui@0.8.29

## 0.2.2

### Patch Changes

- 48e9ecc: Sende med spesifikk apiKey for amplitude
- Updated dependencies [48e9ecc]
    - @navikt/sif-common-env@0.1.1
    - @navikt/sif-common-ui@0.8.28

## 0.2.1

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.13.3
    - @navikt/sif-common-core-ds@9.20.2
    - @navikt/sif-common-api@0.3.1
    - @navikt/sif-common-ui@0.8.27

## 0.2.0

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

- Bytte compiler av scss, pakkeoppdateringer minor/patch
- Updated dependencies
- Updated dependencies [e1dfb2e]
    - @navikt/sif-common-formik-ds@1.13.2
    - @navikt/sif-common-core-ds@9.20.0
    - @navikt/sif-common-api@0.3.0
    - @navikt/sif-common-ui@0.8.25
    - @navikt/sif-common-env@0.1.0

## 0.1.9

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.13.1
    - @navikt/sif-common-core-ds@9.19.1
    - @navikt/sif-common-api@0.2.1
    - @navikt/sif-common-ui@0.8.24

## 0.1.8

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-formik-ds@1.12.25
    - @navikt/sif-common-core-ds@9.18.26

## 0.1.7

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-soknad-ds@14.0.15
    - @navikt/sif-common-core-ds@9.18.21
    - @navikt/sif-common-ui@0.8.20
    - @navikt/sif-common@0.1.4

## 0.1.6

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-soknad-ds@14.0.14
    - @navikt/sif-common-core-ds@9.18.20
    - @navikt/sif-common-ui@0.8.19
    - @navikt/sif-common@0.1.3

## 0.1.5

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-soknad-ds@14.0.13
    - @navikt/sif-common-core-ds@9.18.18
    - @navikt/sif-common-ui@0.8.18
    - @navikt/sif-common@0.1.1

## 0.1.4

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies [ad46a6b]
- Updated dependencies
    - @navikt/sif-common-core-ds@9.18.16
    - @navikt/sif-common-soknad-ds@14.0.11
    - @navikt/sif-common-ui@0.8.17
    - @navikt/sif-common@0.0.4

## 0.1.3

### Patch Changes

- Pakkeoppdatering - react-intl-6.7.0
- Updated dependencies
    - @navikt/sif-common-soknad-ds@14.0.10
    - @navikt/sif-common-core-ds@9.18.15
    - @navikt/sif-common-ui@0.8.16
    - @navikt/sif-common@0.0.3

## 0.1.2

### Patch Changes

- Pakkeoppdateringer - minor/patch
- Updated dependencies
    - @navikt/sif-common-soknad-ds@14.0.9
    - @navikt/sif-common-core-ds@9.18.14
    - @navikt/sif-common@0.0.2

## 0.1.1

### Patch Changes

- Pakkeoppdateringer - minor-patch

## 0.1.0

### Minor Changes

- f677f10: Sette opp demo-app som kan brukes for å teste ut større POCs.
