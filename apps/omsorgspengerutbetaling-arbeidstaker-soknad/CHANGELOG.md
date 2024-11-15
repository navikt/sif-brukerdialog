# @navikt/omsorgspengerutbetaling-arbeidstaker-soknad

## 1.10.0

### Minor Changes

-   Tak i bruk FormikFileUpload komponent

## 1.9.12

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.13.9
    -   @navikt/sif-common-soknad-ds@17.0.3
    -   @navikt/sif-common-forms-ds@12.1.3
    -   @navikt/sif-common-core-ds@9.20.9
    -   @navikt/sif-common-sentry@0.27.23
    -   @navikt/sif-common-api@0.3.6
    -   @navikt/sif-common-ui@0.8.35

## 1.9.11

### Patch Changes

-   Erstatte alle generelle lister med List-komponenten fra Aksel
-   Updated dependencies
    -   @navikt/sif-common-soknad-ds@17.0.2
    -   @navikt/sif-common-core-ds@9.20.8
    -   @navikt/sif-common-ui@0.8.34

## 1.9.10

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.13.7
    -   @navikt/sif-common-soknad-ds@17.0.1
    -   @navikt/sif-common-forms-ds@12.1.2
    -   @navikt/sif-common-core-ds@9.20.6
    -   @navikt/sif-common-utils@3.47.27
    -   @navikt/sif-common-api@0.3.5
    -   @navikt/sif-common-ui@0.8.33

## 1.9.9

### Patch Changes

-   Oppdatere informasjon om hvor informasjon om barn kommer fra
-   Updated dependencies
    -   @navikt/sif-common-ui@0.8.32

## 1.9.8

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.25
    -   @navikt/sif-common-formik-ds@1.13.6
    -   @navikt/sif-common-soknad-ds@16.0.6
    -   @navikt/sif-common-forms-ds@12.0.5
    -   @navikt/sif-common-core-ds@9.20.5
    -   @navikt/sif-common-sentry@0.27.22
    -   @navikt/sif-common-utils@3.47.26
    -   @navikt/sif-common-api@0.3.4
    -   @navikt/sif-common-ui@0.8.31

## 1.9.7

### Patch Changes

-   Oppdatere node image til node:20.18-alpine

## 1.9.6

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.24
    -   @navikt/sif-common-formik-ds@1.13.5
    -   @navikt/sif-common-soknad-ds@16.0.5
    -   @navikt/sif-common-forms-ds@12.0.4
    -   @navikt/sif-common-core-ds@9.20.4
    -   @navikt/sif-common-sentry@0.27.21
    -   @navikt/sif-common-utils@3.47.25
    -   @navikt/sif-common-api@0.3.3
    -   @navikt/sif-common-ui@0.8.30

## 1.9.5

### Patch Changes

-   Kun bruke key når en logger søknadSendt til amplitude

## 1.9.4

### Patch Changes

-   Pakkeoppdateringe - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.23
    -   @navikt/sif-common-formik-ds@1.13.4
    -   @navikt/sif-common-soknad-ds@16.0.4
    -   @navikt/sif-common-forms-ds@12.0.3
    -   @navikt/sif-common-core-ds@9.20.3
    -   @navikt/sif-common-sentry@0.27.20
    -   @navikt/sif-common-utils@3.47.24
    -   @navikt/sif-common-api@0.3.2
    -   @navikt/sif-common-ui@0.8.29

## 1.9.3

### Patch Changes

-   48e9ecc: Sende med spesifikk apiKey for amplitude
-   Updated dependencies [48e9ecc]
    -   @navikt/sif-common-amplitude@2.26.22
    -   @navikt/sif-common-soknad-ds@16.0.3
    -   @navikt/sif-common-env@0.1.1
    -   @navikt/sif-common-ui@0.8.28

## 1.9.2

### Patch Changes

-   Sende med locale ved logg av søknad sendt til amplitude

## 1.9.1

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.13.3
    -   @navikt/sif-common-soknad-ds@16.0.2
    -   @navikt/sif-common-forms-ds@12.0.2
    -   @navikt/sif-common-core-ds@9.20.2
    -   @navikt/sif-common-utils@3.47.23
    -   @navikt/sif-common-api@0.3.1
    -   @navikt/sif-common-ui@0.8.27

## 1.9.0

### Minor Changes

-   e1dfb2e: Flytter all env-logikk til egen pakke.

    -   Sletter getGitShaRequestHeader fra request headers i browser (settes av server)
    -   commonEnv som inneholder alle standard env variabler
    -   appEnv der det er behov, som ekstender commonEnv og legger til egne
    -   kaster exception når påkrevde env ikke finnes
    -   prefixe noen common envs med SIF_PUBLIC

    Innføre env.schema.ts i alle søknadsdialoger

    -   definerer hvilke envs som er påkrevd
    -   under bygg kopieres denne over og brukes ved oppstart av server for å kontrollere at alle envs er satt

    Refactoring av proxy setup i server

### Patch Changes

-   Bytte compiler av scss, pakkeoppdateringer minor/patch
-   Updated dependencies
-   Updated dependencies [e1dfb2e]
    -   @navikt/sif-common-amplitude@2.26.21
    -   @navikt/sif-common-formik-ds@1.13.2
    -   @navikt/sif-common-soknad-ds@16.0.0
    -   @navikt/sif-common-forms-ds@12.0.0
    -   @navikt/sif-common-core-ds@9.20.0
    -   @navikt/sif-common-sentry@0.27.19
    -   @navikt/sif-common-utils@3.47.22
    -   @navikt/sif-common-api@0.3.0
    -   @navikt/sif-common-ui@0.8.25
    -   @navikt/sif-common-env@0.1.0

## 1.8.1

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.20
    -   @navikt/sif-common-formik-ds@1.13.1
    -   @navikt/sif-common-soknad-ds@15.0.1
    -   @navikt/sif-common-forms-ds@11.0.1
    -   @navikt/sif-common-core-ds@9.19.1
    -   @navikt/sif-common-sentry@0.27.18
    -   @navikt/sif-common-utils@3.47.21
    -   @navikt/sif-common-api@0.2.1
    -   @navikt/sif-common-ui@0.8.24

## 1.8.0

### Minor Changes

-   989373a: - Gå over til å bruke noen få felleskomponenter og utils for filopplasting.
    -   Legge på validering av vedlegg på tvers av en søknad
    -   Fjerne sperre for bruker på å gå videre hvis det var for mange vedlegg. Erstattet med validering.

### Patch Changes

-   Updated dependencies [989373a]
    -   @navikt/sif-common-formik-ds@1.13.0
    -   @navikt/sif-common-soknad-ds@15.0.0
    -   @navikt/sif-common-core-ds@9.19.0
    -   @navikt/sif-common@0.2.0
    -   @navikt/sif-common-forms-ds@11.0.0

## 1.7.8

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.19
    -   @navikt/sif-common-formik-ds@1.12.25
    -   @navikt/sif-common-soknad-ds@14.0.20
    -   @navikt/sif-common-forms-ds@10.1.19
    -   @navikt/sif-common-core-ds@9.18.26
    -   @navikt/sif-common-sentry@0.27.17
    -   @navikt/sif-common-utils@3.47.20

## 1.7.7

### Patch Changes

-   Legge til K9_BRUKERDIALOG_PROSESSERING_API_URL i appSettings

## 1.7.6

### Patch Changes

-   Rydde i deps og noen minor/patch oppdateringer
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.24
    -   @navikt/sif-common-soknad-ds@14.0.19
    -   @navikt/sif-common-forms-ds@10.1.18
    -   @navikt/sif-common-core-ds@9.18.25
    -   @navikt/sif-common-utils@3.47.19

## 1.7.5

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.18
    -   @navikt/sif-common-formik-ds@1.12.23
    -   @navikt/sif-common-soknad-ds@14.0.18
    -   @navikt/sif-common-forms-ds@10.1.17
    -   @navikt/sif-common-core-ds@9.18.24
    -   @navikt/sif-common-sentry@0.27.16
    -   @navikt/sif-common-utils@3.47.18
    -   @navikt/sif-common-ui@0.8.23
    -   @navikt/sif-common@0.1.7

## 1.7.4

### Patch Changes

-   Bytte til debounce fra ds-react
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.22
    -   @navikt/sif-app-register@0.1.4
    -   @navikt/sif-common@0.1.6
    -   @navikt/sif-common-amplitude@2.26.17
    -   @navikt/sif-common-core-ds@9.18.23
    -   @navikt/sif-common-forms-ds@10.1.16
    -   @navikt/sif-common-hooks@0.2.4
    -   @navikt/sif-common-sentry@0.27.15
    -   @navikt/sif-common-soknad-ds@14.0.17
    -   @navikt/sif-common-ui@0.8.22
    -   @navikt/sif-common-utils@3.47.17

## 1.7.3

### Patch Changes

-   Pakkeoppdateringer -minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.16
    -   @navikt/sif-common-formik-ds@1.12.21
    -   @navikt/sif-common-soknad-ds@14.0.16
    -   @navikt/sif-common-forms-ds@10.1.15
    -   @navikt/sif-common-core-ds@9.18.22
    -   @navikt/sif-common-sentry@0.27.14
    -   @navikt/sif-app-register@0.1.3
    -   @navikt/sif-common-hooks@0.2.3
    -   @navikt/sif-common-utils@3.47.16
    -   @navikt/sif-common-ui@0.8.21
    -   @navikt/sif-common@0.1.5

### Patch Changes

-   Korrigere appStatus dataset

## 1.7.2

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.20
    -   @navikt/sif-common-soknad-ds@14.0.15
    -   @navikt/sif-common-forms-ds@10.1.14
    -   @navikt/sif-common-core-ds@9.18.21
    -   @navikt/sif-common-ui@0.8.20
    -   @navikt/sif-common@0.1.4

## 1.7.1

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.15
    -   @navikt/sif-common-formik-ds@1.12.19
    -   @navikt/sif-common-soknad-ds@14.0.14
    -   @navikt/sif-common-forms-ds@10.1.13
    -   @navikt/sif-common-core-ds@9.18.20
    -   @navikt/sif-common-sentry@0.27.13
    -   @navikt/sif-common-utils@3.47.15
    -   @navikt/sif-common-ui@0.8.19
    -   @navikt/sif-common@0.1.3

## 1.7.0

### Minor Changes

-   70809d1: Bruke common bibliotek for api kall

### Patch Changes

-   Updated dependencies [70809d1]
    -   @navikt/sif-common-formik-ds@1.12.18
    -   @navikt/sif-common-core-ds@9.18.19
    -   @navikt/sif-common@0.1.2

## 1.6.12

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.14
    -   @navikt/sif-common-formik-ds@1.12.17
    -   @navikt/sif-common-soknad-ds@14.0.13
    -   @navikt/sif-common-forms-ds@10.1.12
    -   @navikt/sif-common-core-ds@9.18.18
    -   @navikt/sif-common-sentry@0.27.12
    -   @navikt/sif-common-utils@3.47.14
    -   @navikt/sif-common-ui@0.8.18

## 1.6.11

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies [ad46a6b]
-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.18.16
    -   @navikt/sif-common-amplitude@2.26.13
    -   @navikt/sif-common-formik-ds@1.12.16
    -   @navikt/sif-common-soknad-ds@14.0.11
    -   @navikt/sif-common-forms-ds@10.1.11
    -   @navikt/sif-common-sentry@0.27.11
    -   @navikt/sif-common-utils@3.47.13
    -   @navikt/sif-common-ui@0.8.17

## 1.6.10

### Patch Changes

-   Pakkeoppdatering - react-intl-6.7.0
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.12
    -   @navikt/sif-common-formik-ds@1.12.15
    -   @navikt/sif-common-soknad-ds@14.0.10
    -   @navikt/sif-common-forms-ds@10.1.10
    -   @navikt/sif-common-core-ds@9.18.15
    -   @navikt/sif-common-sentry@0.27.10
    -   @navikt/sif-common-utils@3.47.12
    -   @navikt/sif-common-ui@0.8.16

## 1.6.9

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.11
    -   @navikt/sif-common-formik-ds@1.12.14
    -   @navikt/sif-common-soknad-ds@14.0.9
    -   @navikt/sif-common-forms-ds@10.1.9
    -   @navikt/sif-common-core-ds@9.18.14
    -   @navikt/sif-common-sentry@0.27.9
    -   @navikt/sif-common-utils@3.47.11

## 1.6.8

### Patch Changes

-   Pakkeoppdateringer - minor-patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.13
    -   @navikt/sif-common-soknad-ds@14.0.8
    -   @navikt/sif-common-forms-ds@10.1.8
    -   @navikt/sif-common-core-ds@9.18.13
    -   @navikt/sif-common-utils@3.47.10
    -   @navikt/sif-common-ui@0.8.15

## 1.6.7

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.10
    -   @navikt/sif-common-formik-ds@1.12.12
    -   @navikt/sif-common-soknad-ds@14.0.7
    -   @navikt/sif-common-forms-ds@10.1.7
    -   @navikt/sif-common-core-ds@9.18.12
    -   @navikt/sif-common-utils@3.47.9
    -   @navikt/sif-common-ui@0.8.14

## 1.6.6

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.9
    -   @navikt/sif-common-formik-ds@1.12.11
    -   @navikt/sif-common-soknad-ds@14.0.6
    -   @navikt/sif-common-forms-ds@10.1.6
    -   @navikt/sif-common-core-ds@9.18.11
    -   @navikt/sif-common-utils@3.47.8
    -   @navikt/sif-common-ui@0.8.13
    -   @navikt/sif-app-register@0.1.2
    -   @navikt/sif-common-hooks@0.2.2
    -   @navikt/sif-common-sentry@0.27.8

## 1.6.5

### Patch Changes

-   0fafe0e: Pakkeoppdateringer. Major Aksel og date-fns. Minor og patch på resten
-   Updated dependencies [0fafe0e]
    -   @navikt/sif-common-amplitude@2.26.8
    -   @navikt/sif-common-formik-ds@1.12.10
    -   @navikt/sif-common-soknad-ds@14.0.5
    -   @navikt/sif-common-forms-ds@10.1.5
    -   @navikt/sif-common-core-ds@9.18.10
    -   @navikt/sif-common-sentry@0.27.8
    -   @navikt/sif-app-register@0.1.2
    -   @navikt/sif-common-hooks@0.2.2
    -   @navikt/sif-common-utils@3.47.7
    -   @navikt/sif-common-ui@0.8.12

## 1.6.4

### Patch Changes

-   Pakkeoppdatering - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.9
    -   @navikt/sif-common-soknad-ds@14.0.4
    -   @navikt/sif-common-forms-ds@10.1.4
    -   @navikt/sif-common-core-ds@9.18.9
    -   @navikt/sif-common-utils@3.47.6
    -   @navikt/sif-common-ui@0.8.11
    -   @navikt/sif-app-register@0.1.1
    -   @navikt/sif-common-amplitude@2.26.7
    -   @navikt/sif-common-hooks@0.2.1
    -   @navikt/sif-common-sentry@0.27.7

## 1.6.3

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.7
    -   @navikt/sif-common-formik-ds@1.12.8
    -   @navikt/sif-common-soknad-ds@14.0.3
    -   @navikt/sif-common-forms-ds@10.1.3
    -   @navikt/sif-common-core-ds@9.18.8
    -   @navikt/sif-common-sentry@0.27.7
    -   @navikt/sif-common-ui@0.8.10
    -   @navikt/sif-app-register@0.1.1
    -   @navikt/sif-common-hooks@0.2.1
    -   @navikt/sif-common-utils@3.47.5

## 1.6.2

### Patch Changes

-   799b512: Pakkeoppdateringer - minor/patch
-   Updated dependencies [799b512]
    -   @navikt/sif-common-amplitude@2.26.6
    -   @navikt/sif-common-formik-ds@1.12.7
    -   @navikt/sif-common-soknad-ds@14.0.2
    -   @navikt/sif-common-forms-ds@10.1.2
    -   @navikt/sif-common-core-ds@9.18.7
    -   @navikt/sif-common-sentry@0.27.6
    -   @navikt/sif-app-register@0.1.1
    -   @navikt/sif-common-hooks@0.2.1
    -   @navikt/sif-common-utils@3.47.5
    -   @navikt/sif-common-ui@0.8.9

## 1.6.1

### Patch Changes

-   Updated dependencies [ee7d9fd]
    -   @navikt/sif-common-soknad-ds@14.0.1
    -   @navikt/sif-common-core-ds@9.18.6
    -   @navikt/sif-common-ui@0.8.8
    -   @navikt/sif-common-forms-ds@10.1.1

## 1.6.0

### Minor Changes

-   454d6e2: Ta i bruk Medlemskap fra sif-common-forms-ds

### Patch Changes

-   Updated dependencies [454d6e2]
    -   @navikt/sif-common-forms-ds@10.1.0
    -   @navikt/sif-common-soknad-ds@14.0.0

## 1.5.15

### Patch Changes

-   16f2ebf: Pakkeoppdateringer minor/patch
-   Updated dependencies [16f2ebf]
    -   @navikt/sif-common-amplitude@2.26.5
    -   @navikt/sif-common-formik-ds@1.12.6
    -   @navikt/sif-common-soknad-ds@13.2.9
    -   @navikt/sif-common-forms-ds@10.0.6
    -   @navikt/sif-common-core-ds@9.18.5
    -   @navikt/sif-common-sentry@0.27.5
    -   @navikt/sif-common-utils@3.47.4
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-hooks@0.2.0

## 1.5.14

### Patch Changes

-   Bugfix - sende med tittel til ErrorBoundary
-   Updated dependencies
    -   @navikt/sif-common-soknad-ds@13.2.8

## 1.5.13

### Patch Changes

-   485d6eb: Pakkeoppdateringer - minor/patch
-   Updated dependencies [485d6eb]
    -   @navikt/sif-common-amplitude@2.26.4
    -   @navikt/sif-common-formik-ds@1.12.5
    -   @navikt/sif-common-soknad-ds@13.2.7
    -   @navikt/sif-common-forms-ds@10.0.5
    -   @navikt/sif-common-core-ds@9.18.4
    -   @navikt/sif-common-sentry@0.27.4
    -   @navikt/sif-common-utils@3.47.3

## 1.5.12

### Patch Changes

-   @navikt/sif-common-soknad-ds@13.2.6

## 1.5.11

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.4
    -   @navikt/sif-common-soknad-ds@13.2.5
    -   @navikt/sif-common-forms-ds@10.0.4
    -   @navikt/sif-common-core-ds@9.18.3
    -   @navikt/sif-common-sentry@0.27.3
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-amplitude@2.26.3
    -   @navikt/sif-common-hooks@0.2.0
    -   @navikt/sif-common-utils@3.47.2

## 1.5.10

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.3
    -   @navikt/sif-common-core-ds@9.18.2
    -   @navikt/sif-common-forms-ds@10.0.3
    -   @navikt/sif-common-soknad-ds@13.2.4

## 1.5.9

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.3
    -   @navikt/sif-common-formik-ds@1.12.2
    -   @navikt/sif-common-soknad-ds@13.2.3
    -   @navikt/sif-common-forms-ds@10.0.2
    -   @navikt/sif-common-core-ds@9.18.2
    -   @navikt/sif-common-sentry@0.27.2
    -   @navikt/sif-common-utils@3.47.2
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-hooks@0.2.0

## 1.5.8

### Patch Changes

-   Verifiser innlogget bruker ved window.focus

## 1.5.7

### Patch Changes

-   Updated dependencies [a479061]
    -   @navikt/sif-common-soknad-ds@13.2.2

## 1.5.6

### Patch Changes

-   Updated dependencies [f15fd09]
-   Updated dependencies [f15fd09]
    -   @navikt/sif-common-amplitude@2.26.2
    -   @navikt/sif-common-soknad-ds@13.2.1

## 1.5.5

### Patch Changes

-   d5466f2: Bugfix - legge på fixAttachmentURL

## 1.5.4

### Patch Changes

-   a149706: Cleanup og legge til en manglende valideringstekst

## 1.5.3

### Patch Changes

-   Updated dependencies [b73c301]
    -   @navikt/sif-common-soknad-ds@13.2.0

## 1.5.2

### Patch Changes

-   Updated dependencies [f3457cb]
    -   @navikt/sif-common-soknad-ds@13.1.0

## 1.5.1

### Patch Changes

-   4e48646: Pakkeoppdateringer - minor/patch
-   Updated dependencies [4e48646]
    -   @navikt/sif-common-amplitude@2.26.1
    -   @navikt/sif-common-formik-ds@1.12.1
    -   @navikt/sif-common-soknad-ds@13.0.1
    -   @navikt/sif-common-forms-ds@10.0.1
    -   @navikt/sif-common-core-ds@9.18.1
    -   @navikt/sif-common-sentry@0.27.1
    -   @navikt/sif-common-utils@3.47.1

## 1.5.0

### Minor Changes

-   ee9cbed: Oppdatere til eslint 9. Krevde noen endringer i kode.

### Patch Changes

-   Updated dependencies [ee9cbed]
    -   @navikt/sif-common-amplitude@2.26.0
    -   @navikt/sif-common-formik-ds@1.12.0
    -   @navikt/sif-common-soknad-ds@13.0.0
    -   @navikt/sif-common-forms-ds@10.0.0
    -   @navikt/sif-common-core-ds@9.18.0
    -   @navikt/sif-common-sentry@0.27.0
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-hooks@0.2.0
    -   @navikt/sif-common-utils@3.47.0

## 1.4.20

### Patch Changes

-   664f1eb: Fjerne egen logging av sidevisning til amplitude. Dette er erstattet av dekoratørens besøk event.
-   Updated dependencies [664f1eb]
    -   @navikt/sif-common-amplitude@2.25.16

## 1.4.19

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-forms-ds@9.1.0

## 1.4.18

### Patch Changes

-   8a4685d: Gå over til å bruke aksel-maler for oppsummeringsiden

## 1.4.17

### Patch Changes

-   Updated dependencies [a8ae0fe]
    -   @navikt/sif-common-soknad-ds@12.0.10

## 1.4.16

### Patch Changes

-   008a462: Pakkeoppdateringer - minor/patch
-   Updated dependencies [008a462]
    -   @navikt/sif-common-amplitude@2.25.15
    -   @navikt/sif-common-formik-ds@1.11.6
    -   @navikt/sif-common-soknad-ds@12.0.9
    -   @navikt/sif-common-forms-ds@9.0.11
    -   @navikt/sif-common-core-ds@9.17.24
    -   @navikt/sif-common-sentry@0.26.17
    -   @navikt/sif-common-utils@3.46.12

## 1.4.15

### Patch Changes

-   Updated dependencies [d42de23]
    -   @navikt/sif-common-soknad-ds@12.0.8
    -   @navikt/sif-common-core-ds@9.17.23
    -   @navikt/sif-common-utils@3.46.11
    -   @navikt/sif-common-forms-ds@9.0.10

## 1.4.14

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.14
    -   @navikt/sif-common-formik-ds@1.11.5
    -   @navikt/sif-common-soknad-ds@12.0.7
    -   @navikt/sif-common-forms-ds@9.0.9
    -   @navikt/sif-common-core-ds@9.17.22
    -   @navikt/sif-common-sentry@0.26.16

## 1.4.13

### Patch Changes

-   Updated dependencies [24fe90e]
    -   @navikt/sif-common-formik-ds@1.11.4
    -   @navikt/sif-common-core-ds@9.17.21
    -   @navikt/sif-common-forms-ds@9.0.8
    -   @navikt/sif-common-soknad-ds@12.0.6

## 1.4.12

### Patch Changes

-   80824d8: Bruke Aksel mal for velkommenside
-   Updated dependencies [7f61cd6]
    -   @navikt/sif-common-soknad-ds@12.0.5

## 1.4.11

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.13
    -   @navikt/sif-common-formik-ds@1.11.3
    -   @navikt/sif-common-soknad-ds@12.0.4
    -   @navikt/sif-common-forms-ds@9.0.7
    -   @navikt/sif-common-core-ds@9.17.21
    -   @navikt/sif-common-sentry@0.26.15
    -   @navikt/sif-common-utils@3.46.10

## 1.4.10

### Patch Changes

-   Updated dependencies [12cfdc9]
-   Updated dependencies [4cb3c3b]
    -   @navikt/sif-common-core-ds@9.17.20
    -   @navikt/sif-common-soknad-ds@12.0.3
    -   @navikt/sif-common-forms-ds@9.0.6

## 1.4.9

### Patch Changes

-   Updated dependencies [569761e]
    -   @navikt/sif-common-formik-ds@1.11.2
    -   @navikt/sif-common-soknad-ds@12.0.2
    -   @navikt/sif-common-core-ds@9.17.19
    -   @navikt/sif-common-forms-ds@9.0.5

## 1.4.8

### Patch Changes

-   90ba6ff: Pakkeoppdateringer - minor/patch.

    -   ds-pakker
    -   storybook
    -   tailwindcss
    -   vite

-   Updated dependencies [90ba6ff]
    -   @navikt/sif-common-formik-ds@1.11.1
    -   @navikt/sif-common-soknad-ds@12.0.1
    -   @navikt/sif-common-forms-ds@9.0.5
    -   @navikt/sif-common-core-ds@9.17.19

## 1.4.7

### Patch Changes

-   Updated dependencies [2690b03]
    -   @navikt/sif-common-formik-ds@1.11.0
    -   @navikt/sif-common-core-ds@9.17.18
    -   @navikt/sif-common-forms-ds@9.0.4
    -   @navikt/sif-common-soknad-ds@12.0.0

## 1.4.6

### Patch Changes

-   Updated dependencies [72585dc]
-   Updated dependencies [bb419a1]
    -   @navikt/sif-common-formik-ds@1.10.0
    -   @navikt/sif-common-soknad-ds@11.0.0
    -   @navikt/sif-common-core-ds@9.17.18
    -   @navikt/sif-common-forms-ds@9.0.4

## 1.4.5

### Patch Changes

-   8240d14: Major oppdateringer av libs - ingen påvirkning av funksjonalitet
-   Pakkeoppdateringer - minor/patch
-   Updated dependencies [8240d14]
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.12
    -   @navikt/sif-common-formik-ds@1.9.8
    -   @navikt/sif-common-soknad-ds@10.16.3
    -   @navikt/sif-common-forms-ds@9.0.4
    -   @navikt/sif-common-core-ds@9.17.18
    -   @navikt/sif-common-sentry@0.26.14
    -   @navikt/sif-common-utils@3.46.9

## 1.4.4

### Patch Changes

-   Minor og patch oppdateringer
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.11
    -   @navikt/sif-common-formik-ds@1.9.7
    -   @navikt/sif-common-soknad-ds@10.16.2
    -   @navikt/sif-common-forms-ds@9.0.3
    -   @navikt/sif-common-core-ds@9.17.17
    -   @navikt/sif-common-sentry@0.26.13
    -   @navikt/sif-common-hooks@0.1.14
    -   @navikt/sif-common-utils@3.46.8

## 1.4.3

### Patch Changes

-   Updated dependencies [fd363d7]
    -   @navikt/sif-common-core-ds@9.17.16
    -   @navikt/sif-common-forms-ds@9.0.2
    -   @navikt/sif-common-soknad-ds@10.16.1

## 1.4.2

### Patch Changes

-   8c33962: Layoutendring - spacing på velkommen-side

## 1.4.1

### Patch Changes

-   Pakkeoppdateringer og trigge deploy for å få med oppdatert decorator
-   Updated dependencies
    -   @navikt/sif-common-hooks@0.1.13
    -   @navikt/sif-common-soknad-ds@10.16.1
    -   @navikt/sif-common-amplitude@2.25.10
    -   @navikt/sif-common-core-ds@9.17.15
    -   @navikt/sif-common-formik-ds@1.9.6
    -   @navikt/sif-common-forms-ds@9.0.2
    -   @navikt/sif-common-utils@3.46.7

## 1.4.0

### Minor Changes

-   f5c9ace: Oppdatere til Yarn 4. Endre Dockerfiler for å redusere image størrelse

## 1.3.11

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.9.6
    -   @navikt/sif-common-soknad-ds@10.16.1
    -   @navikt/sif-common-forms-ds@9.0.2
    -   @navikt/sif-common-core-ds@9.17.15
    -   @navikt/sif-common-sentry@0.26.12
    -   @navikt/sif-common-amplitude@2.25.10
    -   @navikt/sif-common-utils@3.46.7

## 1.3.10

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
-   Updated dependencies [1d31a53]
    -   @navikt/sif-common-amplitude@2.25.10
    -   @navikt/sif-common-formik-ds@1.9.5
    -   @navikt/sif-common-soknad-ds@10.16.0
    -   @navikt/sif-common-forms-ds@9.0.1
    -   @navikt/sif-common-core-ds@9.17.14
    -   @navikt/sif-common-sentry@0.26.11
    -   @navikt/sif-common-utils@3.46.7

## 1.3.9

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
-   Updated dependencies [0bb2df0]
    -   @navikt/sif-common-amplitude@2.25.9
    -   @navikt/sif-common-soknad-ds@10.15.13
    -   @navikt/sif-common-forms-ds@9.0.0
    -   @navikt/sif-common-core-ds@9.17.13
    -   @navikt/sif-common-formik-ds@1.9.4
    -   @navikt/sif-common-utils@3.46.6

## 1.3.8

### Patch Changes

-   a10b53c: Pakkeoppdateringer - minor/patch
-   Updated dependencies [a10b53c]
    -   @navikt/sif-common-amplitude@2.25.8
    -   @navikt/sif-common-formik-ds@1.9.4
    -   @navikt/sif-common-soknad-ds@10.15.12
    -   @navikt/sif-common-forms-ds@8.23.4
    -   @navikt/sif-common-core-ds@9.17.13
    -   @navikt/sif-common-sentry@0.26.10
    -   @navikt/sif-common-utils@3.46.6

## 1.3.7

### Patch Changes

-   b4e0847: Pakkeoppdateringer - minor/patch
-   Updated dependencies [b4e0847]
    -   @navikt/sif-common-amplitude@2.25.7
    -   @navikt/sif-common-formik-ds@1.9.3
    -   @navikt/sif-common-soknad-ds@10.15.11
    -   @navikt/sif-common-forms-ds@8.23.3
    -   @navikt/sif-common-core-ds@9.17.12
    -   @navikt/sif-common-sentry@0.26.9
    -   @navikt/sif-common-hooks@0.1.12
    -   @navikt/sif-common-utils@3.46.5

## 1.3.6

### Patch Changes

-   f184cf4: Pakkeoppdateringer - minor/patch
-   Updated dependencies [f184cf4]
    -   @navikt/sif-common-amplitude@2.25.6
    -   @navikt/sif-common-formik-ds@1.9.2
    -   @navikt/sif-common-soknad-ds@10.15.10
    -   @navikt/sif-common-forms-ds@8.23.2
    -   @navikt/sif-common-core-ds@9.17.11
    -   @navikt/sif-common-sentry@0.26.8
    -   @navikt/sif-common-utils@3.46.4

## 1.3.5

### Patch Changes

-   99e1bd2: Pakkeoppdateringer - minor/patch
-   Updated dependencies [99e1bd2]
    -   @navikt/sif-common-formik-ds@1.9.1
    -   @navikt/sif-common-soknad-ds@10.15.9
    -   @navikt/sif-common-forms-ds@8.23.1
    -   @navikt/sif-common-core-ds@9.17.10
    -   @navikt/sif-common-sentry@0.26.7
    -   @navikt/sif-common-amplitude@2.25.5
    -   @navikt/sif-common-utils@3.46.3

## 1.3.4

### Patch Changes

-   Updated dependencies [a739a56]
    -   @navikt/sif-common-formik-ds@1.9.0
    -   @navikt/sif-common-forms-ds@8.23.0
    -   @navikt/sif-common-core-ds@9.17.9
    -   @navikt/sif-common-soknad-ds@10.15.8

## 1.3.3

### Patch Changes

-   1972384: Pakkeoppdateringer minor/patch + uuid major
-   Updated dependencies [1972384]
    -   @navikt/sif-common-formik-ds@1.8.8
    -   @navikt/sif-common-soknad-ds@10.15.8
    -   @navikt/sif-common-forms-ds@8.22.3
    -   @navikt/sif-common-core-ds@9.17.9
    -   @navikt/sif-common-sentry@0.26.6
    -   @navikt/sif-common-utils@3.46.3

## 1.3.2

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.8.7
    -   @navikt/sif-common-soknad-ds@10.15.7
    -   @navikt/sif-common-forms-ds@8.22.2
    -   @navikt/sif-common-core-ds@9.17.8
    -   @navikt/sif-common-utils@3.46.2

## 1.3.1

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.5
    -   @navikt/sif-common-formik-ds@1.8.6
    -   @navikt/sif-common-soknad-ds@10.15.6
    -   @navikt/sif-common-forms-ds@8.22.1
    -   @navikt/sif-common-core-ds@9.17.7
    -   @navikt/sif-common-sentry@0.26.5
    -   @navikt/sif-common-utils@3.46.1

## 1.3.0

### Minor Changes

-   ecd2cdb: Endre fra å bruke dato-konstanter som settes ved last av applikasjonen, til funksjoner som henter ny dato.

### Patch Changes

-   Updated dependencies [ecd2cdb]
    -   @navikt/sif-common-forms-ds@8.22.0
    -   @navikt/sif-common-utils@3.46.0
    -   @navikt/sif-common-core-ds@9.17.6
    -   @navikt/sif-common-soknad-ds@10.15.5

## 1.2.6

### Patch Changes

-   6751f58: Pakkeoppdateringer - minor/patch
-   Updated dependencies [6751f58]
    -   @navikt/sif-common-amplitude@2.25.4
    -   @navikt/sif-common-formik-ds@1.8.5
    -   @navikt/sif-common-soknad-ds@10.15.5
    -   @navikt/sif-common-forms-ds@8.21.6
    -   @navikt/sif-common-core-ds@9.17.5
    -   @navikt/sif-common-sentry@0.26.4
    -   @navikt/sif-common-utils@3.45.4

## 1.2.5

### Patch Changes

-   cc9e4d3: Pakkeoppdateringer - minor/patch
-   Updated dependencies [cc9e4d3]
    -   @navikt/sif-common-formik-ds@1.8.4
    -   @navikt/sif-common-soknad-ds@10.15.4
    -   @navikt/sif-common-forms-ds@8.21.5
    -   @navikt/sif-common-core-ds@9.17.4

## 1.2.4

### Patch Changes

-   c36a566: Pakkeoppdateringer minor/patch
-   Updated dependencies [c36a566]
    -   @navikt/sif-common-amplitude@2.25.3
    -   @navikt/sif-common-formik-ds@1.8.3
    -   @navikt/sif-common-soknad-ds@10.15.3
    -   @navikt/sif-common-forms-ds@8.21.4
    -   @navikt/sif-common-core-ds@9.17.3
    -   @navikt/sif-common-sentry@0.26.3
    -   @navikt/sif-common-utils@3.45.3

## 1.2.3

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies [7943ea7]
-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.17.2
    -   @navikt/sif-common-amplitude@2.25.2
    -   @navikt/sif-common-formik-ds@1.8.2
    -   @navikt/sif-common-soknad-ds@10.15.2
    -   @navikt/sif-common-forms-ds@8.21.3
    -   @navikt/sif-common-sentry@0.26.2
    -   @navikt/sif-common-utils@3.45.2

## 1.2.2

### Patch Changes

-   20b3033: Pakkeoppdateringer - minor/patch
-   Updated dependencies [20b3033]
    -   @navikt/sif-common-amplitude@2.25.1
    -   @navikt/sif-common-formik-ds@1.8.1
    -   @navikt/sif-common-soknad-ds@10.15.1
    -   @navikt/sif-common-forms-ds@8.21.2
    -   @navikt/sif-common-core-ds@9.17.1
    -   @navikt/sif-common-sentry@0.26.1
    -   @navikt/sif-common-utils@3.45.1

## 1.2.1

### Patch Changes

-   049a75c: Legge til rette for flere språk
-   Updated dependencies [a98157a]
-   Updated dependencies [8e314e0]
    -   @navikt/sif-common-soknad-ds@10.15.0
    -   @navikt/sif-common-forms-ds@8.21.1

## 1.2.0

### Minor Changes

-   30b57da: Pakkeoppdatering - minor/patch

### Patch Changes

-   Updated dependencies [30b57da]
    -   @navikt/sif-common-amplitude@2.25.0
    -   @navikt/sif-common-formik-ds@1.8.0
    -   @navikt/sif-common-soknad-ds@10.14.0
    -   @navikt/sif-common-forms-ds@8.21.0
    -   @navikt/sif-common-core-ds@9.17.0
    -   @navikt/sif-common-sentry@0.26.0
    -   @navikt/sif-common-utils@3.45.0

## 1.1.18

### Patch Changes

-   Updated dependencies [99c9b1f]
    -   @navikt/sif-common-formik-ds@1.7.37
    -   @navikt/sif-common-core-ds@9.16.2
    -   @navikt/sif-common-forms-ds@8.20.7
    -   @navikt/sif-common-soknad-ds@10.13.36

## 1.1.17

### Patch Changes

-   Updated dependencies [d89b9f6]
    -   @navikt/sif-common-formik-ds@1.7.36
    -   @navikt/sif-common-core-ds@9.16.2
    -   @navikt/sif-common-forms-ds@8.20.7
    -   @navikt/sif-common-soknad-ds@10.13.36

## 1.1.16

### Patch Changes

-   c4d70c1: Pakkeoppdateringer - minor/patch
-   Updated dependencies [c4d70c1]
    -   @navikt/sif-common-amplitude@2.24.37
    -   @navikt/sif-common-formik-ds@1.7.35
    -   @navikt/sif-common-soknad-ds@10.13.36
    -   @navikt/sif-common-forms-ds@8.20.7
    -   @navikt/sif-common-core-ds@9.16.2
    -   @navikt/sif-common-sentry@0.25.34
    -   @navikt/sif-common-utils@3.44.22

## 1.1.15

### Patch Changes

-   9c29019: Pakkeoppdateringer - minor/patch
-   35938df: Pakkeoppdateringer - minor/patch
-   Updated dependencies [9c29019]
-   Updated dependencies [35938df]
    -   @navikt/sif-common-amplitude@2.24.36
    -   @navikt/sif-common-formik-ds@1.7.34
    -   @navikt/sif-common-soknad-ds@10.13.35
    -   @navikt/sif-common-forms-ds@8.20.6
    -   @navikt/sif-common-core-ds@9.16.1
    -   @navikt/sif-common-sentry@0.25.33
    -   @navikt/sif-common-utils@3.44.21

## 1.1.14

### Patch Changes

-   Pakkeoppdateringer - patch/minor
-   Updated dependencies
-   Updated dependencies [25d7bf0]
    -   @navikt/sif-common-amplitude@2.24.35
    -   @navikt/sif-common-formik-ds@1.7.33
    -   @navikt/sif-common-soknad-ds@10.13.34
    -   @navikt/sif-common-forms-ds@8.20.5
    -   @navikt/sif-common-core-ds@9.16.0
    -   @navikt/sif-common-sentry@0.25.32
    -   @navikt/sif-common-hooks@0.1.11
    -   @navikt/sif-common-utils@3.44.20

## 1.1.13

### Patch Changes

-   c418fc8: Pakkeoppdateringer minor/patch
-   Updated dependencies [c418fc8]
    -   @navikt/sif-common-amplitude@2.24.34
    -   @navikt/sif-common-formik-ds@1.7.32
    -   @navikt/sif-common-soknad-ds@10.13.33
    -   @navikt/sif-common-forms-ds@8.20.4
    -   @navikt/sif-common-core-ds@9.15.26
    -   @navikt/sif-common-sentry@0.25.31
    -   @navikt/sif-common-hooks@0.1.10
    -   @navikt/sif-common-utils@3.44.19

## 1.1.12

### Patch Changes

-   Updated dependencies [0bbee9f]
    -   @navikt/sif-common-soknad-ds@10.13.32

## 1.1.11

### Patch Changes

-   Updated dependencies [a30118d]
-   Updated dependencies [a30118d]
-   Updated dependencies [a30118d]
    -   @navikt/sif-common-forms-ds@8.20.3

## 1.1.10

### Patch Changes

-   6e08c34: Pakkeoppdateringer - minor og patch
-   Updated dependencies [6e08c34]
    -   @navikt/sif-common-amplitude@2.24.33
    -   @navikt/sif-common-formik-ds@1.7.31
    -   @navikt/sif-common-soknad-ds@10.13.31
    -   @navikt/sif-common-forms-ds@8.20.2
    -   @navikt/sif-common-core-ds@9.15.25
    -   @navikt/sif-common-utils@3.44.18

## 1.1.9

### Patch Changes

-   5ecde5a: Flytte lik logikk inn i felleskomponent SoknadApplication. Dette gjelder ErrorBoundry, AmplitudeProvider etc.
-   Updated dependencies [5ecde5a]
    -   @navikt/sif-common-soknad-ds@10.13.30
    -   @navikt/sif-common-core-ds@9.15.24
    -   @navikt/sif-common-forms-ds@8.20.1

## 1.1.8

### Patch Changes

-   Updated dependencies [09607be]
    -   @navikt/sif-common-forms-ds@8.20.1

## 1.1.7

### Patch Changes

-   Updated dependencies [368badf]
    -   @navikt/sif-common-forms-ds@8.20.0

## 1.1.6

### Patch Changes

-   Updated dependencies [ef7a531]
    -   @navikt/sif-common-core-ds@9.15.23
    -   @navikt/sif-common-forms-ds@8.19.18
    -   @navikt/sif-common-soknad-ds@10.13.29

## 1.1.5

### Patch Changes

-   399de32: Pakkeoppdateringer - minor/patch

    @storybook/builder-vite (8.0.6 -> 8.0.8)
    @storybook/nextjs (8.0.6 -> 8.0.8)
    @storybook/node-logger (8.0.6 -> 8.0.8)
    @storybook/preset-create-react-app (8.0.6 -> 8.0.8)
    @storybook/react-vite (8.0.6 -> 8.0.8)
    @storybook/react (8.0.6 -> 8.0.8)
    @storybook/test (8.0.6 -> 8.0.8)
    @testing-library/react (14.3.0 -> 14.3.1)
    @types/react-dom (18.2.24 -> 18.2.25)
    @types/react (18.2.75 -> 18.2.78)
    cypress (13.7.2 -> 13.7.3)
    eslint-config-next (14.1.4 -> 14.2.1)
    next (14.1.4 -> 14.2.1)
    sass (1.74.1 -> 1.75.0)
    storybook (8.0.6 -> 8.0.8)
    typescript (5.4.4 -> 5.4.5)
    vitest (1.4.0 -> 1.5.0)

-   Updated dependencies [399de32]
    -   @navikt/sif-common-amplitude@2.24.32
    -   @navikt/sif-common-formik-ds@1.7.30
    -   @navikt/sif-common-soknad-ds@10.13.29
    -   @navikt/sif-common-forms-ds@8.19.18
    -   @navikt/sif-common-core-ds@9.15.22
    -   @navikt/sif-common-sentry@0.25.30
    -   @navikt/sif-common-hooks@0.1.9
    -   @navikt/sif-common-utils@3.44.17

## 1.1.4

### Patch Changes

-   ad4123e: Pakkeoppdateringer minor/patch
-   Updated dependencies [ad4123e]
    -   @navikt/sif-common-amplitude@2.24.31
    -   @navikt/sif-common-formik-ds@1.7.29
    -   @navikt/sif-common-soknad-ds@10.13.28
    -   @navikt/sif-common-forms-ds@8.19.17
    -   @navikt/sif-common-core-ds@9.15.21
    -   @navikt/sif-common-sentry@0.25.29
    -   @navikt/sif-common-utils@3.44.16

## 1.1.3

### Patch Changes

-   Pakkeoppdateringer minor/patch + major fnrvalidator
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.30
    -   @navikt/sif-common-formik-ds@1.7.28
    -   @navikt/sif-common-soknad-ds@10.13.27
    -   @navikt/sif-common-forms-ds@8.19.16
    -   @navikt/sif-common-core-ds@9.15.20
    -   @navikt/sif-common-sentry@0.25.28
    -   @navikt/sif-common-utils@3.44.15

## 1.1.2

### Patch Changes

-   a478787: Pakkeoppdateringer - minor/patch. Eslint major -> 9
-   Updated dependencies [a478787]
    -   @navikt/sif-common-amplitude@2.24.29
    -   @navikt/sif-common-formik-ds@1.7.27
    -   @navikt/sif-common-soknad-ds@10.13.26
    -   @navikt/sif-common-forms-ds@8.19.15
    -   @navikt/sif-common-core-ds@9.15.19
    -   @navikt/sif-common-sentry@0.25.27
    -   @navikt/sif-common-hooks@0.1.8
    -   @navikt/sif-common-utils@3.44.14

## 1.1.1

### Patch Changes

-   Pakkeoppdateringer - minor patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.28
    -   @navikt/sif-common-formik-ds@1.7.26
    -   @navikt/sif-common-soknad-ds@10.13.25
    -   @navikt/sif-common-forms-ds@8.19.14
    -   @navikt/sif-common-core-ds@9.15.18
    -   @navikt/sif-common-sentry@0.25.26
    -   @navikt/sif-common-utils@3.44.13

## 1.1.0

### Minor Changes

-   6d888d8: Major pakkeoppdatering - http-proxy-middleware

## 1.0.23

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.27
    -   @navikt/sif-common-formik-ds@1.7.25
    -   @navikt/sif-common-soknad-ds@10.13.24
    -   @navikt/sif-common-forms-ds@8.19.13
    -   @navikt/sif-common-core-ds@9.15.17
    -   @navikt/sif-common-sentry@0.25.25
    -   @navikt/sif-common-utils@3.44.12

## 1.0.22

### Patch Changes

-   6ff87ec: Pakkeroppdateringer - minor / patch
-   Updated dependencies [6ff87ec]
    -   @navikt/sif-common-amplitude@2.24.26
    -   @navikt/sif-common-formik-ds@1.7.24
    -   @navikt/sif-common-soknad-ds@10.13.23
    -   @navikt/sif-common-forms-ds@8.19.12
    -   @navikt/sif-common-core-ds@9.15.16
    -   @navikt/sif-common-sentry@0.25.24
    -   @navikt/sif-common-utils@3.44.11

## 1.0.21

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.23
    -   @navikt/sif-common-soknad-ds@10.13.22
    -   @navikt/sif-common-forms-ds@8.19.11
    -   @navikt/sif-common-core-ds@9.15.15
    -   @navikt/sif-common-hooks@0.1.7
    -   @navikt/sif-common-utils@3.44.10
    -   @navikt/sif-common-amplitude@2.24.25

## 1.0.20

### Patch Changes

-   react-responsive-10.0.0
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.25
    -   @navikt/sif-common-formik-ds@1.7.22
    -   @navikt/sif-common-soknad-ds@10.13.21
    -   @navikt/sif-common-forms-ds@8.19.10
    -   @navikt/sif-common-core-ds@9.15.14
    -   @navikt/sif-common-sentry@0.25.23
    -   @navikt/sif-common-utils@3.44.9

## 1.0.19

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.24
    -   @navikt/sif-common-formik-ds@1.7.21
    -   @navikt/sif-common-soknad-ds@10.13.20
    -   @navikt/sif-common-forms-ds@8.19.9
    -   @navikt/sif-common-core-ds@9.15.13
    -   @navikt/sif-common-sentry@0.25.22
    -   @navikt/sif-common-utils@3.44.8

## 1.0.18

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.15.12
    -   @navikt/sif-common-forms-ds@8.19.8
    -   @navikt/sif-common-soknad-ds@10.13.19

## 1.0.17

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.23
    -   @navikt/sif-common-formik-ds@1.7.20
    -   @navikt/sif-common-soknad-ds@10.13.19
    -   @navikt/sif-common-forms-ds@8.19.8
    -   @navikt/sif-common-core-ds@9.15.11
    -   @navikt/sif-common-sentry@0.25.21
    -   @navikt/sif-common-utils@3.44.7

## 1.0.16

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.19
    -   @navikt/sif-common-core-ds@9.15.10
    -   @navikt/sif-common-forms-ds@8.19.7
    -   @navikt/sif-common-soknad-ds@10.13.18

## 1.0.15

### Patch Changes

-   Oppdatering til navikt/ds-6 versjoner
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.18
    -   @navikt/sif-common-soknad-ds@10.13.18
    -   @navikt/sif-common-forms-ds@8.19.7
    -   @navikt/sif-common-core-ds@9.15.9

## 1.0.14

### Patch Changes

-   77509a2: Generelle pakkeoppdatering
-   Updated dependencies [77509a2]
    -   @navikt/sif-common-amplitude@2.24.22
    -   @navikt/sif-common-formik-ds@1.7.17
    -   @navikt/sif-common-soknad-ds@10.13.17
    -   @navikt/sif-common-forms-ds@8.19.6
    -   @navikt/sif-common-core-ds@9.15.8
    -   @navikt/sif-common-sentry@0.25.20
    -   @navikt/sif-common-hooks@0.1.6
    -   @navikt/sif-common-utils@3.44.6

## 1.0.13

### Patch Changes

-   Pakkeoppdatering patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.16
    -   @navikt/sif-common-soknad-ds@10.13.16
    -   @navikt/sif-common-forms-ds@8.19.5
    -   @navikt/sif-common-core-ds@9.15.7

## 1.0.12

### Patch Changes

-   Patch oppdatering av sentry
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.21
    -   @navikt/sif-common-formik-ds@1.7.15
    -   @navikt/sif-common-soknad-ds@10.13.15
    -   @navikt/sif-common-forms-ds@8.19.4
    -   @navikt/sif-common-core-ds@9.15.6
    -   @navikt/sif-common-sentry@0.25.19
    -   @navikt/sif-common-utils@3.44.5

## 1.0.11

### Patch Changes

-   Pakkeoppdateringer minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.20
    -   @navikt/sif-common-formik-ds@1.7.14
    -   @navikt/sif-common-soknad-ds@10.13.14
    -   @navikt/sif-common-forms-ds@8.19.3
    -   @navikt/sif-common-core-ds@9.15.5
    -   @navikt/sif-common-sentry@0.25.18

## 1.0.10

### Patch Changes

-   e770491: Pakkeoppdateringer minor/patch
-   Updated dependencies [e770491]
    -   @navikt/sif-common-amplitude@2.24.19
    -   @navikt/sif-common-formik-ds@1.7.13
    -   @navikt/sif-common-soknad-ds@10.13.13
    -   @navikt/sif-common-forms-ds@8.19.2
    -   @navikt/sif-common-core-ds@9.15.4
    -   @navikt/sif-common-sentry@0.25.17
    -   @navikt/sif-common-utils@3.44.4

## 1.0.9

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.18
    -   @navikt/sif-common-formik-ds@1.7.12
    -   @navikt/sif-common-soknad-ds@10.13.12
    -   @navikt/sif-common-forms-ds@8.19.1
    -   @navikt/sif-common-core-ds@9.15.3
    -   @navikt/sif-common-utils@3.44.3

## 1.0.8

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-forms-ds@8.19.0

## 1.0.7

### Patch Changes

-   Pakkeoppdateringer patch/minor
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.17
    -   @navikt/sif-common-formik-ds@1.7.11
    -   @navikt/sif-common-soknad-ds@10.13.11
    -   @navikt/sif-common-forms-ds@8.18.3
    -   @navikt/sif-common-core-ds@9.15.2
    -   @navikt/sif-common-sentry@0.25.16
    -   @navikt/sif-common-utils@3.44.2

## 1.0.6

### Patch Changes

-   Legge til uiMessages i applikasjoner

## 1.0.5

### Patch Changes

-   a7f80d2: Pakkeoppdateringer minor/patch
    Oppdatere noen tester etter endringer i ds-pakker
-   Updated dependencies [a7f80d2]
    -   @navikt/sif-common-amplitude@2.24.16
    -   @navikt/sif-common-formik-ds@1.7.10
    -   @navikt/sif-common-soknad-ds@10.13.10
    -   @navikt/sif-common-forms-ds@8.18.2
    -   @navikt/sif-common-core-ds@9.15.1
    -   @navikt/sif-common-sentry@0.25.15
    -   @navikt/sif-common-utils@3.44.1

## 1.0.4

### Patch Changes

-   Updated dependencies [86d8f70]
    -   @navikt/sif-common-amplitude@2.24.15

## 1.0.3

### Patch Changes

-   Updated dependencies [06a4e60]
    -   @navikt/sif-common-core-ds@9.15.0
    -   @navikt/sif-common-utils@3.44.0
    -   @navikt/sif-common-forms-ds@8.18.1
    -   @navikt/sif-common-soknad-ds@10.13.9

## 1.0.2

### Patch Changes

-   Mindre pakkeoppdateringer patch/minor + husky major
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.14
    -   @navikt/sif-common-formik-ds@1.7.9
    -   @navikt/sif-common-soknad-ds@10.13.9
    -   @navikt/sif-common-forms-ds@8.18.1
    -   @navikt/sif-common-core-ds@9.14.3
    -   @navikt/sif-common-sentry@0.25.14
    -   @navikt/sif-common-utils@3.43.17

## 1.0.1

### Patch Changes

-   Updated dependencies [9dcabd8]
    -   @navikt/sif-common-forms-ds@8.18.0
