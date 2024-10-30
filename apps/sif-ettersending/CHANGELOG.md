# @navikt/sif-ettersending

## 3.41.4

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
    -   @navikt/sif-common-ui@0.8.29

## 3.41.3

### Patch Changes

-   48e9ecc: Sende med spesifikk apiKey for amplitude
-   Updated dependencies [48e9ecc]
    -   @navikt/sif-common-amplitude@2.26.22
    -   @navikt/sif-common-soknad-ds@16.0.3
    -   @navikt/sif-common-env@0.1.1
    -   @navikt/sif-common-ui@0.8.28

## 3.41.2

### Patch Changes

-   Sende med locale ved logg av søknad sendt til amplitude

## 3.41.1

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.13.3
    -   @navikt/sif-common-soknad-ds@16.0.2
    -   @navikt/sif-common-forms-ds@12.0.2
    -   @navikt/sif-common-core-ds@9.20.2
    -   @navikt/sif-common-utils@3.47.23
    -   @navikt/sif-common-ui@0.8.27

## 3.41.0

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

## 3.40.1

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

## 3.40.0

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

## 3.39.5

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

## 3.39.4

### Patch Changes

-   Rydde i deps og noen minor/patch oppdateringer
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.24
    -   @navikt/sif-common-soknad-ds@14.0.19
    -   @navikt/sif-common-forms-ds@10.1.18
    -   @navikt/sif-common-core-ds@9.18.25
    -   @navikt/sif-common-utils@3.47.19

## 3.39.3

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

## 3.39.2

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

## 3.39.1

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

## 3.39.0

### Minor Changes

-   5fa2f8b: La til mulighet for brukere å ettersende uten fnr av barn i PP sykt barn

## 3.38.0

### Minor Changes

-   765aabe: Bruke common server-oppsett

## 3.37.24

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.20
    -   @navikt/sif-common-soknad-ds@14.0.15
    -   @navikt/sif-common-forms-ds@10.1.14
    -   @navikt/sif-common-core-ds@9.18.21
    -   @navikt/sif-common-ui@0.8.20

## 3.37.23

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

## 3.37.22

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

## 3.37.21

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

## 3.37.20

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

## 3.37.19

### Patch Changes

-   Pakkeoppdateringer - minor-patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.13
    -   @navikt/sif-common-soknad-ds@14.0.8
    -   @navikt/sif-common-forms-ds@10.1.8
    -   @navikt/sif-common-core-ds@9.18.13
    -   @navikt/sif-common-utils@3.47.10
    -   @navikt/sif-common-ui@0.8.15

## 3.37.18

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

## 3.37.17

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

## 3.37.16

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

## 3.37.15

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

## 3.37.14

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

## 3.37.13

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

## 3.37.12

### Patch Changes

-   Updated dependencies [ee7d9fd]
    -   @navikt/sif-common-soknad-ds@14.0.1
    -   @navikt/sif-common-core-ds@9.18.6
    -   @navikt/sif-common-ui@0.8.8
    -   @navikt/sif-common-forms-ds@10.1.1

## 3.37.11

### Patch Changes

-   Updated dependencies [454d6e2]
    -   @navikt/sif-common-forms-ds@10.1.0
    -   @navikt/sif-common-soknad-ds@14.0.0

## 3.37.10

### Patch Changes

-   16f2ebf: Pakkeoppdateringer minor/patch
-   Updated dependencies [16f2ebf]
    -   @navikt/sif-common-amplitude@2.26.5
    -   @navikt/sif-common-formik-ds@1.12.6
    -   @navikt/sif-common-soknad-ds@13.2.9
    -   @navikt/sif-common-core-ds@9.18.5
    -   @navikt/sif-common-sentry@0.27.5
    -   @navikt/sif-common-utils@3.47.4
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-hooks@0.2.0

## 3.37.9

### Patch Changes

-   Bugfix - sende med tittel til ErrorBoundary
-   Updated dependencies
    -   @navikt/sif-common-soknad-ds@13.2.8

## 3.37.8

### Patch Changes

-   485d6eb: Pakkeoppdateringer - minor/patch
-   Updated dependencies [485d6eb]
    -   @navikt/sif-common-amplitude@2.26.4
    -   @navikt/sif-common-formik-ds@1.12.5
    -   @navikt/sif-common-soknad-ds@13.2.7
    -   @navikt/sif-common-core-ds@9.18.4
    -   @navikt/sif-common-sentry@0.27.4
    -   @navikt/sif-common-utils@3.47.3

## 3.37.7

### Patch Changes

-   @navikt/sif-common-soknad-ds@13.2.6

## 3.37.6

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.4
    -   @navikt/sif-common-soknad-ds@13.2.5
    -   @navikt/sif-common-core-ds@9.18.3
    -   @navikt/sif-common-sentry@0.27.3
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-amplitude@2.26.3
    -   @navikt/sif-common-hooks@0.2.0
    -   @navikt/sif-common-utils@3.47.2

## 3.37.5

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.3
    -   @navikt/sif-common-core-ds@9.18.2
    -   @navikt/sif-common-soknad-ds@13.2.4

## 3.37.4

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.26.3
    -   @navikt/sif-common-formik-ds@1.12.2
    -   @navikt/sif-common-soknad-ds@13.2.3
    -   @navikt/sif-common-core-ds@9.18.2
    -   @navikt/sif-common-sentry@0.27.2
    -   @navikt/sif-common-utils@3.47.2
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-hooks@0.2.0

## 3.37.3

### Patch Changes

-   87c67fa: Verifiser innlogget bruker ved window.focus

## 3.37.2

### Patch Changes

-   Updated dependencies [a479061]
    -   @navikt/sif-common-soknad-ds@13.2.2

## 3.37.1

### Patch Changes

-   Updated dependencies [f15fd09]
-   Updated dependencies [f15fd09]
    -   @navikt/sif-common-amplitude@2.26.2
    -   @navikt/sif-common-soknad-ds@13.2.1

## 3.37.0

### Minor Changes

-   b73c301: Fix attachmentURLUtils export

### Patch Changes

-   Updated dependencies [b73c301]
    -   @navikt/sif-common-soknad-ds@13.2.0

## 3.36.2

### Patch Changes

-   f3457cb: Bugfix - URL til vedlegg i frontend
-   Updated dependencies [f3457cb]
    -   @navikt/sif-common-soknad-ds@13.1.0

## 3.36.1

### Patch Changes

-   4e48646: Pakkeoppdateringer - minor/patch
-   Updated dependencies [4e48646]
    -   @navikt/sif-common-amplitude@2.26.1
    -   @navikt/sif-common-formik-ds@1.12.1
    -   @navikt/sif-common-soknad-ds@13.0.1
    -   @navikt/sif-common-core-ds@9.18.1
    -   @navikt/sif-common-sentry@0.27.1
    -   @navikt/sif-common-utils@3.47.1

## 3.36.0

### Minor Changes

-   ee9cbed: Oppdatere til eslint 9. Krevde noen endringer i kode.

### Patch Changes

-   Updated dependencies [ee9cbed]
    -   @navikt/sif-common-amplitude@2.26.0
    -   @navikt/sif-common-formik-ds@1.12.0
    -   @navikt/sif-common-soknad-ds@13.0.0
    -   @navikt/sif-common-core-ds@9.18.0
    -   @navikt/sif-common-sentry@0.27.0
    -   @navikt/sif-app-register@0.1.0
    -   @navikt/sif-common-hooks@0.2.0
    -   @navikt/sif-common-utils@3.47.0

## 3.35.13

### Patch Changes

-   664f1eb: Fjerne egen logging av sidevisning til amplitude. Dette er erstattet av dekoratørens besøk event.
-   Updated dependencies [664f1eb]
    -   @navikt/sif-common-amplitude@2.25.16

## 3.35.12

### Patch Changes

-   Updated dependencies [a8ae0fe]
    -   @navikt/sif-common-soknad-ds@12.0.10

## 3.35.11

### Patch Changes

-   008a462: Pakkeoppdateringer - minor/patch
-   Updated dependencies [008a462]
    -   @navikt/sif-common-amplitude@2.25.15
    -   @navikt/sif-common-formik-ds@1.11.6
    -   @navikt/sif-common-soknad-ds@12.0.9
    -   @navikt/sif-common-core-ds@9.17.24
    -   @navikt/sif-common-sentry@0.26.17
    -   @navikt/sif-common-utils@3.46.12

## 3.35.10

### Patch Changes

-   Updated dependencies [d42de23]
    -   @navikt/sif-common-soknad-ds@12.0.8
    -   @navikt/sif-common-core-ds@9.17.23
    -   @navikt/sif-common-utils@3.46.11

## 3.35.9

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.14
    -   @navikt/sif-common-formik-ds@1.11.5
    -   @navikt/sif-common-soknad-ds@12.0.7
    -   @navikt/sif-common-core-ds@9.17.22
    -   @navikt/sif-common-sentry@0.26.16

## 3.35.8

### Patch Changes

-   Updated dependencies [24fe90e]
    -   @navikt/sif-common-formik-ds@1.11.4
    -   @navikt/sif-common-core-ds@9.17.21
    -   @navikt/sif-common-soknad-ds@12.0.6

## 3.35.7

### Patch Changes

-   baff1f2: La til valg av barn for alle ettesendelser PP sykt barn

## 3.35.6

### Patch Changes

-   Updated dependencies [7f61cd6]
    -   @navikt/sif-common-soknad-ds@12.0.5

## 3.35.5

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.13
    -   @navikt/sif-common-formik-ds@1.11.3
    -   @navikt/sif-common-soknad-ds@12.0.4
    -   @navikt/sif-common-core-ds@9.17.21
    -   @navikt/sif-common-sentry@0.26.15
    -   @navikt/sif-common-utils@3.46.10

## 3.35.4

### Patch Changes

-   Updated dependencies [12cfdc9]
-   Updated dependencies [4cb3c3b]
    -   @navikt/sif-common-core-ds@9.17.20
    -   @navikt/sif-common-soknad-ds@12.0.3

## 3.35.3

### Patch Changes

-   Updated dependencies [569761e]
    -   @navikt/sif-common-formik-ds@1.11.2
    -   @navikt/sif-common-soknad-ds@12.0.2
    -   @navikt/sif-common-core-ds@9.17.19

## 3.35.2

### Patch Changes

-   90ba6ff: Pakkeoppdateringer - minor/patch.

    -   ds-pakker
    -   storybook
    -   tailwindcss
    -   vite

-   Updated dependencies [90ba6ff]
    -   @navikt/sif-common-formik-ds@1.11.1
    -   @navikt/sif-common-soknad-ds@12.0.1
    -   @navikt/sif-common-core-ds@9.17.19

## 3.35.1

### Patch Changes

-   Updated dependencies [2690b03]
    -   @navikt/sif-common-formik-ds@1.11.0
    -   @navikt/sif-common-core-ds@9.17.18
    -   @navikt/sif-common-soknad-ds@12.0.0

## 3.35.0

### Minor Changes

-   72585dc: Endrer tekst og layout (ikon) på forrige og neste knapper + send inn knapp. I henhold til Aksel.

### Patch Changes

-   Updated dependencies [72585dc]
-   Updated dependencies [bb419a1]
    -   @navikt/sif-common-formik-ds@1.10.0
    -   @navikt/sif-common-soknad-ds@11.0.0
    -   @navikt/sif-common-core-ds@9.17.18

## 3.34.5

### Patch Changes

-   8240d14: Major oppdateringer av libs - ingen påvirkning av funksjonalitet
-   Pakkeoppdateringer - minor/patch
-   Updated dependencies [8240d14]
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.12
    -   @navikt/sif-common-formik-ds@1.9.8
    -   @navikt/sif-common-soknad-ds@10.16.3
    -   @navikt/sif-common-core-ds@9.17.18
    -   @navikt/sif-common-sentry@0.26.14
    -   @navikt/sif-common-utils@3.46.9

## 3.34.4

### Patch Changes

-   Minor og patch oppdateringer
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.11
    -   @navikt/sif-common-formik-ds@1.9.7
    -   @navikt/sif-common-soknad-ds@10.16.2
    -   @navikt/sif-common-core-ds@9.17.17
    -   @navikt/sif-common-sentry@0.26.13
    -   @navikt/sif-common-hooks@0.1.14
    -   @navikt/sif-common-utils@3.46.8

## 3.34.3

### Patch Changes

-   Updated dependencies [fd363d7]
    -   @navikt/sif-common-core-ds@9.17.16
    -   @navikt/sif-common-soknad-ds@10.16.1

## 3.34.2

### Patch Changes

-   8c33962: Layoutendring - spacing på velkommen-side

## 3.34.1

### Patch Changes

-   Pakkeoppdateringer og trigge deploy for å få med oppdatert decorator
-   Updated dependencies
    -   @navikt/sif-common-hooks@0.1.13
    -   @navikt/sif-common-soknad-ds@10.16.1
    -   @navikt/sif-common-amplitude@2.25.10
    -   @navikt/sif-common-core-ds@9.17.15
    -   @navikt/sif-common-formik-ds@1.9.6
    -   @navikt/sif-common-utils@3.46.7

## 3.34.0

### Minor Changes

-   f5c9ace: Oppdatere til Yarn 4. Endre Dockerfiler for å redusere image størrelse

## 3.33.13

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.9.6
    -   @navikt/sif-common-soknad-ds@10.16.1
    -   @navikt/sif-common-core-ds@9.17.15
    -   @navikt/sif-common-sentry@0.26.12
    -   @navikt/sif-common-amplitude@2.25.10
    -   @navikt/sif-common-utils@3.46.7

## 3.33.12

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   1d31a53: Oppdatere SoknadVelkommenPage
    Bruke oppdatert side i ettersending og omsorgspengesoknad
    Bruke Aksel-maler for oppsummering i ettersending
-   Updated dependencies
-   Updated dependencies [1d31a53]
    -   @navikt/sif-common-amplitude@2.25.10
    -   @navikt/sif-common-formik-ds@1.9.5
    -   @navikt/sif-common-soknad-ds@10.16.0
    -   @navikt/sif-common-core-ds@9.17.14
    -   @navikt/sif-common-sentry@0.26.11
    -   @navikt/sif-common-utils@3.46.7

## 3.33.11

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.9
    -   @navikt/sif-common-soknad-ds@10.15.13
    -   @navikt/sif-common-core-ds@9.17.13
    -   @navikt/sif-common-formik-ds@1.9.4
    -   @navikt/sif-common-utils@3.46.6

## 3.33.10

### Patch Changes

-   Updated dependencies [a10b53c]
    -   @navikt/sif-common-amplitude@2.25.8
    -   @navikt/sif-common-formik-ds@1.9.4
    -   @navikt/sif-common-soknad-ds@10.15.12
    -   @navikt/sif-common-core-ds@9.17.13
    -   @navikt/sif-common-sentry@0.26.10
    -   @navikt/sif-common-utils@3.46.6

## 3.33.9

### Patch Changes

-   b4e0847: Pakkeoppdateringer - minor/patch
-   Updated dependencies [b4e0847]
    -   @navikt/sif-common-amplitude@2.25.7
    -   @navikt/sif-common-formik-ds@1.9.3
    -   @navikt/sif-common-soknad-ds@10.15.11
    -   @navikt/sif-common-core-ds@9.17.12
    -   @navikt/sif-common-sentry@0.26.9
    -   @navikt/sif-common-hooks@0.1.12
    -   @navikt/sif-common-utils@3.46.5

## 3.33.8

### Patch Changes

-   f184cf4: Pakkeoppdateringer - minor/patch
-   Updated dependencies [f184cf4]
    -   @navikt/sif-common-amplitude@2.25.6
    -   @navikt/sif-common-formik-ds@1.9.2
    -   @navikt/sif-common-soknad-ds@10.15.10
    -   @navikt/sif-common-core-ds@9.17.11
    -   @navikt/sif-common-sentry@0.26.8
    -   @navikt/sif-common-utils@3.46.4

## 3.33.7

### Patch Changes

-   99e1bd2: Pakkeoppdateringer - minor/patch
-   Updated dependencies [99e1bd2]
    -   @navikt/sif-common-formik-ds@1.9.1
    -   @navikt/sif-common-soknad-ds@10.15.9
    -   @navikt/sif-common-core-ds@9.17.10
    -   @navikt/sif-common-sentry@0.26.7
    -   @navikt/sif-common-amplitude@2.25.5
    -   @navikt/sif-common-utils@3.46.3

## 3.33.6

### Patch Changes

-   Updated dependencies [a739a56]
    -   @navikt/sif-common-formik-ds@1.9.0
    -   @navikt/sif-common-core-ds@9.17.9
    -   @navikt/sif-common-soknad-ds@10.15.8

## 3.33.5

### Patch Changes

-   1972384: Pakkeoppdateringer minor/patch + uuid major
-   Updated dependencies [1972384]
    -   @navikt/sif-common-formik-ds@1.8.8
    -   @navikt/sif-common-soknad-ds@10.15.8
    -   @navikt/sif-common-core-ds@9.17.9
    -   @navikt/sif-common-sentry@0.26.6
    -   @navikt/sif-common-utils@3.46.3

## 3.33.4

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.8.7
    -   @navikt/sif-common-soknad-ds@10.15.7
    -   @navikt/sif-common-core-ds@9.17.8
    -   @navikt/sif-common-utils@3.46.2

## 3.33.3

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.25.5
    -   @navikt/sif-common-formik-ds@1.8.6
    -   @navikt/sif-common-soknad-ds@10.15.6
    -   @navikt/sif-common-core-ds@9.17.7
    -   @navikt/sif-common-sentry@0.26.5
    -   @navikt/sif-common-utils@3.46.1

## 3.33.2

### Patch Changes

-   Updated dependencies [ecd2cdb]
    -   @navikt/sif-common-utils@3.46.0
    -   @navikt/sif-common-core-ds@9.17.6
    -   @navikt/sif-common-soknad-ds@10.15.5

## 3.33.1

### Patch Changes

-   6751f58: Pakkeoppdateringer - minor/patch
-   Updated dependencies [6751f58]
    -   @navikt/sif-common-amplitude@2.25.4
    -   @navikt/sif-common-formik-ds@1.8.5
    -   @navikt/sif-common-soknad-ds@10.15.5
    -   @navikt/sif-common-core-ds@9.17.5
    -   @navikt/sif-common-sentry@0.26.4
    -   @navikt/sif-common-utils@3.45.4

## 3.33.0

### Minor Changes

-   b1344ce: Endre tekster på kvitteringssiden for å informere bedre om Dine pleiepenger.

## 3.32.5

### Patch Changes

-   cc9e4d3: Pakkeoppdateringer - minor/patch
-   Updated dependencies [cc9e4d3]
    -   @navikt/sif-common-formik-ds@1.8.4
    -   @navikt/sif-common-soknad-ds@10.15.4
    -   @navikt/sif-common-core-ds@9.17.4

## 3.32.4

### Patch Changes

-   c36a566: Pakkeoppdateringer minor/patch
-   Updated dependencies [c36a566]
    -   @navikt/sif-common-amplitude@2.25.3
    -   @navikt/sif-common-formik-ds@1.8.3
    -   @navikt/sif-common-soknad-ds@10.15.3
    -   @navikt/sif-common-core-ds@9.17.3
    -   @navikt/sif-common-sentry@0.26.3
    -   @navikt/sif-common-utils@3.45.3

## 3.32.3

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies [7943ea7]
-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.17.2
    -   @navikt/sif-common-amplitude@2.25.2
    -   @navikt/sif-common-formik-ds@1.8.2
    -   @navikt/sif-common-soknad-ds@10.15.2
    -   @navikt/sif-common-sentry@0.26.2
    -   @navikt/sif-common-utils@3.45.2

## 3.32.2

### Patch Changes

-   20b3033: Pakkeoppdateringer - minor/patch
-   Updated dependencies [20b3033]
    -   @navikt/sif-common-amplitude@2.25.1
    -   @navikt/sif-common-formik-ds@1.8.1
    -   @navikt/sif-common-soknad-ds@10.15.1
    -   @navikt/sif-common-core-ds@9.17.1
    -   @navikt/sif-common-sentry@0.26.1
    -   @navikt/sif-common-utils@3.45.1

## 3.32.1

### Patch Changes

-   94e2ae3: Legge til rette for flere språk
-   94e2ae3: Endre til å bruke typede komponenter og hooks for alle tekster i dialogen. Gir mulighet for flere målformer.
-   Updated dependencies [a98157a]
    -   @navikt/sif-common-soknad-ds@10.15.0

## 3.32.0

### Minor Changes

-   30b57da: Pakkeoppdatering - minor/patch

### Patch Changes

-   Updated dependencies [30b57da]
    -   @navikt/sif-common-amplitude@2.25.0
    -   @navikt/sif-common-formik-ds@1.8.0
    -   @navikt/sif-common-soknad-ds@10.14.0
    -   @navikt/sif-common-core-ds@9.17.0
    -   @navikt/sif-common-sentry@0.26.0
    -   @navikt/sif-common-utils@3.45.0

## 3.31.9

### Patch Changes

-   Updated dependencies [99c9b1f]
    -   @navikt/sif-common-formik-ds@1.7.37
    -   @navikt/sif-common-core-ds@9.16.2
    -   @navikt/sif-common-soknad-ds@10.13.36

## 3.31.8

### Patch Changes

-   Updated dependencies [d89b9f6]
    -   @navikt/sif-common-formik-ds@1.7.36
    -   @navikt/sif-common-core-ds@9.16.2
    -   @navikt/sif-common-soknad-ds@10.13.36

## 3.31.7

### Patch Changes

-   c4d70c1: Pakkeoppdateringer - minor/patch
-   Updated dependencies [c4d70c1]
    -   @navikt/sif-common-amplitude@2.24.37
    -   @navikt/sif-common-formik-ds@1.7.35
    -   @navikt/sif-common-soknad-ds@10.13.36
    -   @navikt/sif-common-core-ds@9.16.2
    -   @navikt/sif-common-sentry@0.25.34
    -   @navikt/sif-common-utils@3.44.22

## 3.31.6

### Patch Changes

-   9c29019: Pakkeoppdateringer - minor/patch
-   35938df: Pakkeoppdateringer - minor/patch
-   Updated dependencies [9c29019]
-   Updated dependencies [35938df]
    -   @navikt/sif-common-amplitude@2.24.36
    -   @navikt/sif-common-formik-ds@1.7.34
    -   @navikt/sif-common-soknad-ds@10.13.35
    -   @navikt/sif-common-core-ds@9.16.1
    -   @navikt/sif-common-sentry@0.25.33
    -   @navikt/sif-common-utils@3.44.21

## 3.31.5

### Patch Changes

-   Pakkeoppdateringer - patch/minor
-   Updated dependencies
-   Updated dependencies [25d7bf0]
    -   @navikt/sif-common-amplitude@2.24.35
    -   @navikt/sif-common-formik-ds@1.7.33
    -   @navikt/sif-common-soknad-ds@10.13.34
    -   @navikt/sif-common-core-ds@9.16.0
    -   @navikt/sif-common-sentry@0.25.32
    -   @navikt/sif-common-hooks@0.1.11
    -   @navikt/sif-common-utils@3.44.20

## 3.31.4

### Patch Changes

-   c418fc8: Pakkeoppdateringer minor/patch
-   Updated dependencies [c418fc8]
    -   @navikt/sif-common-amplitude@2.24.34
    -   @navikt/sif-common-formik-ds@1.7.32
    -   @navikt/sif-common-soknad-ds@10.13.33
    -   @navikt/sif-common-core-ds@9.15.26
    -   @navikt/sif-common-sentry@0.25.31
    -   @navikt/sif-common-hooks@0.1.10
    -   @navikt/sif-common-utils@3.44.19

## 3.31.3

### Patch Changes

-   Updated dependencies [0bbee9f]
    -   @navikt/sif-common-soknad-ds@10.13.32

## 3.31.2

### Patch Changes

-   6e08c34: Pakkeoppdateringer - minor og patch
-   Updated dependencies [6e08c34]
    -   @navikt/sif-common-amplitude@2.24.33
    -   @navikt/sif-common-formik-ds@1.7.31
    -   @navikt/sif-common-soknad-ds@10.13.31
    -   @navikt/sif-common-core-ds@9.15.25
    -   @navikt/sif-common-utils@3.44.18

## 3.31.1

### Patch Changes

-   5ecde5a: Flytte lik logikk inn i felleskomponent SoknadApplication. Dette gjelder ErrorBoundry, AmplitudeProvider etc.
-   Updated dependencies [5ecde5a]
    -   @navikt/sif-common-soknad-ds@10.13.30
    -   @navikt/sif-common-core-ds@9.15.24

## 3.31.0

### Minor Changes

-   99222b7: Digital ettersendelse PP sykt barn

## 3.30.6

### Patch Changes

-   Updated dependencies [ef7a531]
    -   @navikt/sif-common-core-ds@9.15.23
    -   @navikt/sif-common-soknad-ds@10.13.29

## 3.30.5

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
    -   @navikt/sif-common-core-ds@9.15.22
    -   @navikt/sif-common-sentry@0.25.30
    -   @navikt/sif-common-hooks@0.1.9
    -   @navikt/sif-common-utils@3.44.17

## 3.30.4

### Patch Changes

-   ad4123e: Pakkeoppdateringer minor/patch
-   Updated dependencies [ad4123e]
    -   @navikt/sif-common-amplitude@2.24.31
    -   @navikt/sif-common-formik-ds@1.7.29
    -   @navikt/sif-common-soknad-ds@10.13.28
    -   @navikt/sif-common-core-ds@9.15.21
    -   @navikt/sif-common-sentry@0.25.29
    -   @navikt/sif-common-utils@3.44.16

## 3.30.3

### Patch Changes

-   Pakkeoppdateringer minor/patch + major fnrvalidator
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.30
    -   @navikt/sif-common-formik-ds@1.7.28
    -   @navikt/sif-common-soknad-ds@10.13.27
    -   @navikt/sif-common-core-ds@9.15.20
    -   @navikt/sif-common-sentry@0.25.28
    -   @navikt/sif-common-utils@3.44.15

## 3.30.2

### Patch Changes

-   a478787: Pakkeoppdateringer - minor/patch. Eslint major -> 9
-   Updated dependencies [a478787]
    -   @navikt/sif-common-amplitude@2.24.29
    -   @navikt/sif-common-formik-ds@1.7.27
    -   @navikt/sif-common-soknad-ds@10.13.26
    -   @navikt/sif-common-core-ds@9.15.19
    -   @navikt/sif-common-sentry@0.25.27
    -   @navikt/sif-common-hooks@0.1.8
    -   @navikt/sif-common-utils@3.44.14

## 3.30.1

### Patch Changes

-   Pakkeoppdateringer - minor patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.28
    -   @navikt/sif-common-formik-ds@1.7.26
    -   @navikt/sif-common-soknad-ds@10.13.25
    -   @navikt/sif-common-core-ds@9.15.18
    -   @navikt/sif-common-sentry@0.25.26
    -   @navikt/sif-common-utils@3.44.13

## 3.30.0

### Minor Changes

-   6d888d8: Major pakkeoppdatering - http-proxy-middleware

## 3.29.30

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.27
    -   @navikt/sif-common-formik-ds@1.7.25
    -   @navikt/sif-common-soknad-ds@10.13.24
    -   @navikt/sif-common-core-ds@9.15.17
    -   @navikt/sif-common-sentry@0.25.25
    -   @navikt/sif-common-utils@3.44.12

## 3.29.29

### Patch Changes

-   6ff87ec: Pakkeroppdateringer - minor / patch
-   Updated dependencies [6ff87ec]
    -   @navikt/sif-common-amplitude@2.24.26
    -   @navikt/sif-common-formik-ds@1.7.24
    -   @navikt/sif-common-soknad-ds@10.13.23
    -   @navikt/sif-common-core-ds@9.15.16
    -   @navikt/sif-common-sentry@0.25.24
    -   @navikt/sif-common-utils@3.44.11

## 3.29.28

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.23
    -   @navikt/sif-common-soknad-ds@10.13.22
    -   @navikt/sif-common-core-ds@9.15.15
    -   @navikt/sif-common-hooks@0.1.7
    -   @navikt/sif-common-utils@3.44.10
    -   @navikt/sif-common-amplitude@2.24.25

## 3.29.27

### Patch Changes

-   react-responsive-10.0.0
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.25
    -   @navikt/sif-common-formik-ds@1.7.22
    -   @navikt/sif-common-soknad-ds@10.13.21
    -   @navikt/sif-common-core-ds@9.15.14
    -   @navikt/sif-common-sentry@0.25.23
    -   @navikt/sif-common-utils@3.44.9

## 3.29.26

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.24
    -   @navikt/sif-common-formik-ds@1.7.21
    -   @navikt/sif-common-soknad-ds@10.13.20
    -   @navikt/sif-common-core-ds@9.15.13
    -   @navikt/sif-common-sentry@0.25.22
    -   @navikt/sif-common-utils@3.44.8

## 3.29.25

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.15.12
    -   @navikt/sif-common-soknad-ds@10.13.19

## 3.29.24

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.23
    -   @navikt/sif-common-formik-ds@1.7.20
    -   @navikt/sif-common-soknad-ds@10.13.19
    -   @navikt/sif-common-core-ds@9.15.11
    -   @navikt/sif-common-sentry@0.25.21
    -   @navikt/sif-common-utils@3.44.7

## 3.29.23

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.19
    -   @navikt/sif-common-core-ds@9.15.10
    -   @navikt/sif-common-soknad-ds@10.13.18

## 3.29.22

### Patch Changes

-   Oppdatering til navikt/ds-6 versjoner
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.18
    -   @navikt/sif-common-soknad-ds@10.13.18
    -   @navikt/sif-common-core-ds@9.15.9

## 3.29.21

### Patch Changes

-   77509a2: Generelle pakkeoppdatering
-   Updated dependencies [77509a2]
    -   @navikt/sif-common-amplitude@2.24.22
    -   @navikt/sif-common-formik-ds@1.7.17
    -   @navikt/sif-common-soknad-ds@10.13.17
    -   @navikt/sif-common-core-ds@9.15.8
    -   @navikt/sif-common-sentry@0.25.20
    -   @navikt/sif-common-hooks@0.1.6
    -   @navikt/sif-common-utils@3.44.6

## 3.29.20

### Patch Changes

-   Pakkeoppdatering patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.16
    -   @navikt/sif-common-soknad-ds@10.13.16
    -   @navikt/sif-common-core-ds@9.15.7

## 3.29.19

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.21
    -   @navikt/sif-common-formik-ds@1.7.15
    -   @navikt/sif-common-soknad-ds@10.13.15
    -   @navikt/sif-common-core-ds@9.15.6
    -   @navikt/sif-common-sentry@0.25.19
    -   @navikt/sif-common-utils@3.44.5

## 3.29.18

### Patch Changes

-   Pakkeoppdateringer minor/patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.20
    -   @navikt/sif-common-formik-ds@1.7.14
    -   @navikt/sif-common-soknad-ds@10.13.14
    -   @navikt/sif-common-core-ds@9.15.5
    -   @navikt/sif-common-sentry@0.25.18

## 3.29.17

### Patch Changes

-   e770491: Pakkeoppdateringer minor/patch
-   Updated dependencies [e770491]
    -   @navikt/sif-common-amplitude@2.24.19
    -   @navikt/sif-common-formik-ds@1.7.13
    -   @navikt/sif-common-soknad-ds@10.13.13
    -   @navikt/sif-common-core-ds@9.15.4
    -   @navikt/sif-common-sentry@0.25.17
    -   @navikt/sif-common-utils@3.44.4

## 3.29.16

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.18
    -   @navikt/sif-common-formik-ds@1.7.12
    -   @navikt/sif-common-soknad-ds@10.13.12
    -   @navikt/sif-common-core-ds@9.15.3
    -   @navikt/sif-common-utils@3.44.3

## 3.29.15

### Patch Changes

-   Pakkeoppdateringer patch/minor
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.17
    -   @navikt/sif-common-formik-ds@1.7.11
    -   @navikt/sif-common-soknad-ds@10.13.11
    -   @navikt/sif-common-core-ds@9.15.2
    -   @navikt/sif-common-sentry@0.25.16
    -   @navikt/sif-common-utils@3.44.2

## 3.29.14

### Patch Changes

-   Legge til uiMessages i applikasjoner

## 3.29.13

### Patch Changes

-   a7f80d2: Pakkeoppdateringer minor/patch
    Oppdatere noen tester etter endringer i ds-pakker
-   Updated dependencies [a7f80d2]
    -   @navikt/sif-common-amplitude@2.24.16
    -   @navikt/sif-common-formik-ds@1.7.10
    -   @navikt/sif-common-soknad-ds@10.13.10
    -   @navikt/sif-common-core-ds@9.15.1
    -   @navikt/sif-common-sentry@0.25.15
    -   @navikt/sif-common-utils@3.44.1

## 3.29.12

### Patch Changes

-   Updated dependencies [86d8f70]
    -   @navikt/sif-common-amplitude@2.24.15

## 3.29.11

### Patch Changes

-   Updated dependencies [06a4e60]
    -   @navikt/sif-common-core-ds@9.15.0
    -   @navikt/sif-common-utils@3.44.0
    -   @navikt/sif-common-soknad-ds@10.13.9

## 3.29.10

### Patch Changes

-   Mindre pakkeoppdateringer patch/minor + husky major
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.14
    -   @navikt/sif-common-formik-ds@1.7.9
    -   @navikt/sif-common-soknad-ds@10.13.9
    -   @navikt/sif-common-core-ds@9.14.3
    -   @navikt/sif-common-sentry@0.25.14
    -   @navikt/sif-common-utils@3.43.17

## 3.29.9

### Patch Changes

-   7a66141: Pakkeoppdateringer
    -   jsdom major
    -   patch og minor
-   100f013: Dependabotfix - vite
-   Updated dependencies [7a66141]
-   Updated dependencies [100f013]
    -   @navikt/sif-common-formik-ds@1.7.8
    -   @navikt/sif-common-soknad-ds@10.13.8
    -   @navikt/sif-common-core-ds@9.14.2
    -   @navikt/sif-common-sentry@0.25.13
    -   @navikt/sif-app-register@0.0.6
    -   @navikt/sif-common-amplitude@2.24.13
    -   @navikt/sif-common-hooks@0.1.5
    -   @navikt/sif-common-utils@3.43.16

## 3.29.8

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.7
    -   @navikt/sif-common-soknad-ds@10.13.7
    -   @navikt/sif-common-core-ds@9.14.1
    -   @navikt/sif-common-utils@3.43.15
    -   @navikt/sif-common-amplitude@2.24.12

## 3.29.7

### Patch Changes

-   Updated dependencies [75fe136]
    -   @navikt/sif-common-core-ds@9.14.0
    -   @navikt/sif-common-utils@3.43.14
    -   @navikt/sif-common-soknad-ds@10.13.6

## 3.29.6

### Patch Changes

-   Feilretting i ds-pakker
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.6
    -   @navikt/sif-common-soknad-ds@10.13.6
    -   @navikt/sif-common-core-ds@9.13.6

## 3.29.5

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.12
    -   @navikt/sif-common-formik-ds@1.7.5
    -   @navikt/sif-common-soknad-ds@10.13.5
    -   @navikt/sif-common-core-ds@9.13.5
    -   @navikt/sif-common-sentry@0.25.12
    -   @navikt/sif-common-utils@3.43.13

## 3.29.4

### Patch Changes

-   de82059: Minor/patch pakkeoppdateringer
-   Updated dependencies [de82059]
    -   @navikt/sif-common-amplitude@2.24.11
    -   @navikt/sif-common-formik-ds@1.7.4
    -   @navikt/sif-common-soknad-ds@10.13.4
    -   @navikt/sif-common-core-ds@9.13.4
    -   @navikt/sif-common-sentry@0.25.11
    -   @navikt/sif-common-utils@3.43.12

## 3.29.3

### Patch Changes

-   Minor og patch pakkeoppdateringer
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.10
    -   @navikt/sif-common-formik-ds@1.7.3
    -   @navikt/sif-common-soknad-ds@10.13.3
    -   @navikt/sif-common-core-ds@9.13.3
    -   @navikt/sif-common-sentry@0.25.10
    -   @navikt/sif-common-utils@3.43.11

## 3.29.2

### Patch Changes

-   Pakkeoppdateringer patch og noe minor
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.9
    -   @navikt/sif-common-formik-ds@1.7.2
    -   @navikt/sif-common-soknad-ds@10.13.2
    -   @navikt/sif-common-core-ds@9.13.2
    -   @navikt/sif-common-sentry@0.25.9
    -   @navikt/sif-common-utils@3.43.10

## 3.29.1

### Patch Changes

-   Generelle pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.1
    -   @navikt/sif-common-soknad-ds@10.13.1
    -   @navikt/sif-common-core-ds@9.13.1
    -   @navikt/sif-common-sentry@0.25.8
    -   @navikt/sif-common-utils@3.43.9
    -   @navikt/sif-common-amplitude@2.24.8

## 3.29.0

### Minor Changes

-   c12a07f: Oppdatere date-fns til 3.0.6 (fra 2.30.0) og chromatic til 10.2.0 (minor)

### Patch Changes

-   Updated dependencies [c12a07f]
    -   @navikt/sif-common-formik-ds@1.7.0
    -   @navikt/sif-common-soknad-ds@10.13.0
    -   @navikt/sif-common-core-ds@9.13.0

## 3.28.6

### Patch Changes

-   23f75ff: Generelle pakkeoppdateringer - patch og minor
-   Updated dependencies [23f75ff]
    -   @navikt/sif-common-amplitude@2.24.8
    -   @navikt/sif-common-formik-ds@1.6.6
    -   @navikt/sif-common-soknad-ds@10.12.6
    -   @navikt/sif-common-core-ds@9.12.6
    -   @navikt/sif-common-sentry@0.25.7
    -   @navikt/sif-common-utils@3.43.8

## 3.28.5

### Patch Changes

-   306a348: Pakkeoppdateringer.
    -   @navikt/ds-\*: minor
    -   sentry: minor
    -   vite: patch
-   Updated dependencies [306a348]
    -   @navikt/sif-common-formik-ds@1.6.5
    -   @navikt/sif-common-soknad-ds@10.12.5
    -   @navikt/sif-common-core-ds@9.12.5
    -   @navikt/sif-common-sentry@0.25.6

## 3.28.4

### Patch Changes

-   Oppdatert ds pakker
-   Updated dependencies
    -   @navikt/sif-app-register@0.0.5
    -   @navikt/sif-common-amplitude@2.24.7
    -   @navikt/sif-common-core-ds@9.12.4
    -   @navikt/sif-common-formik-ds@1.6.4
    -   @navikt/sif-common-hooks@0.1.4
    -   @navikt/sif-common-sentry@0.25.5
    -   @navikt/sif-common-soknad-ds@10.12.4
    -   @navikt/sif-common-utils@3.43.7

## 3.28.3

### Patch Changes

-   Pakkeoppdateringer - patch
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.6
    -   @navikt/sif-common-formik-ds@1.6.3
    -   @navikt/sif-common-soknad-ds@10.12.3
    -   @navikt/sif-common-core-ds@9.12.3
    -   @navikt/sif-common-utils@3.43.6

## 3.28.2

### Patch Changes

-   Patch oppdateringer
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.24.5
    -   @navikt/sif-common-formik-ds@1.6.2
    -   @navikt/sif-common-soknad-ds@10.12.2
    -   @navikt/sif-common-core-ds@9.12.2
    -   @navikt/sif-common-hooks@0.1.3
    -   @navikt/sif-common-utils@3.43.5

## 3.28.1

### Patch Changes

-   e7bf8d1: Patch oppdateringer av pakker
-   Updated dependencies [e7bf8d1]
    -   @navikt/sif-common-amplitude@2.24.4
    -   @navikt/sif-common-formik-ds@1.6.1
    -   @navikt/sif-common-soknad-ds@10.12.1
    -   @navikt/sif-common-core-ds@9.12.1
    -   @navikt/sif-common-sentry@0.25.4
    -   @navikt/sif-common-utils@3.43.4

## 3.28.0

### Minor Changes

-   573c55d: Diverse oppdateringer i forbindelse med uu-gjennomgang.

### Patch Changes

-   Updated dependencies [573c55d]
    -   @navikt/sif-common-formik-ds@1.6.0
    -   @navikt/sif-common-soknad-ds@10.12.0
    -   @navikt/sif-common-core-ds@9.12.0

## 3.27.1

### Patch Changes

-   406b044: Patch pakkeoppdateringer
-   Updated dependencies [406b044]
    -   @navikt/sif-common-amplitude@2.24.3
    -   @navikt/sif-common-formik-ds@1.5.3
    -   @navikt/sif-common-soknad-ds@10.11.1
    -   @navikt/sif-common-core-ds@9.11.3
    -   @navikt/sif-common-sentry@0.25.3
    -   @navikt/sif-common-utils@3.43.3

## 3.27.0

### Minor Changes

-   2331115: Oppdatert react-router-dom. Endringer i ettersending og pleiepenger på grunn av feil bruk av navigate i ny versjon.

### Patch Changes

-   6084e23: Diverse mindre pakkeoppdateringer - versjonstrigger
-   Updated dependencies [2331115]
-   Updated dependencies [6084e23]
    -   @navikt/sif-common-soknad-ds@10.11.0
    -   @navikt/sif-app-register@0.0.4
    -   @navikt/sif-common-amplitude@2.24.2
    -   @navikt/sif-common-core-ds@9.11.2
    -   @navikt/sif-common-formik-ds@1.5.2
    -   @navikt/sif-common-hooks@0.1.2
    -   @navikt/sif-common-sentry@0.25.2
    -   @navikt/sif-common-utils@3.43.2

## 3.26.1

### Patch Changes

-   295d3ad: Diverse mindre pakkeoppdateringer - versjonstrigger
-   Updated dependencies [295d3ad]
    -   @navikt/sif-app-register@0.0.3
    -   @navikt/sif-common-amplitude@2.24.1
    -   @navikt/sif-common-core-ds@9.11.1
    -   @navikt/sif-common-formik-ds@1.5.1
    -   @navikt/sif-common-hooks@0.1.1
    -   @navikt/sif-common-sentry@0.25.1
    -   @navikt/sif-common-soknad-ds@10.10.1
    -   @navikt/sif-common-utils@3.43.1

## 3.26.0

### Minor Changes

-   53b47be: Nav Dekoratøren 2 i alle apper
    Vite 5
    patch og noen minor
    Beholder react-router-dom 6.19.0 pga navigasjon knekker i noen apper

### Patch Changes

-   Updated dependencies [53b47be]
    -   @navikt/sif-common-amplitude@2.24.0
    -   @navikt/sif-common-formik-ds@1.5.0
    -   @navikt/sif-common-soknad-ds@10.10.0
    -   @navikt/sif-common-core-ds@9.11.0
    -   @navikt/sif-common-sentry@0.25.0
    -   @navikt/sif-common-utils@3.43.0

## 3.25.0

### Minor Changes

-   Oppdaterte pakker. Minor og patch

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.23.0
    -   @navikt/sif-common-formik-ds@1.4.0
    -   @navikt/sif-common-soknad-ds@10.9.0
    -   @navikt/sif-common-core-ds@9.10.0
    -   @navikt/sif-common-sentry@0.24.0
    -   @navikt/sif-common-hooks@0.1.0
    -   @navikt/sif-common-utils@3.42.0

## 3.24.0

### Minor Changes

-   d31f28ec: Minor og patch oppdateringer på ds, react-router-dom, vite, msw

### Patch Changes

-   Updated dependencies [d31f28ec]
    -   @navikt/sif-common-amplitude@2.22.0
    -   @navikt/sif-common-formik-ds@1.3.0
    -   @navikt/sif-common-soknad-ds@10.8.0
    -   @navikt/sif-common-core-ds@9.9.0
    -   @navikt/sif-common-sentry@0.23.0
    -   @navikt/sif-common-utils@3.41.0

## 3.23.17

### Patch Changes

-   6d3b3cbe: Minor og patch oppdateringer + nextjs major -> 14
-   Updated dependencies [6d3b3cbe]
    -   @navikt/sif-common-formik-ds@1.2.3
    -   @navikt/sif-common-soknad-ds@10.7.11
    -   @navikt/sif-common-core-ds@9.8.11
    -   @navikt/sif-common-sentry@0.22.7
    -   @navikt/sif-common-amplitude@2.21.9
    -   @navikt/sif-common-utils@3.40.11

## 3.23.16

### Patch Changes

-   Updated dependencies [19c424d7]
    -   @navikt/sif-app-register@0.0.2

## 3.23.15

### Patch Changes

-   09ae5814: Patch-oppdateringer
-   Updated dependencies [09ae5814]
    -   @navikt/sif-common-formik-ds@1.2.2
    -   @navikt/sif-common-soknad-ds@10.7.10
    -   @navikt/sif-common-core-ds@9.8.10
    -   @navikt/sif-common-utils@3.40.11

## 3.23.14

### Patch Changes

-   b4d45cf9: Diverse mindre pakkeoppdateringer
-   Updated dependencies [b4d45cf9]
    -   @navikt/sif-common-amplitude@2.21.9
    -   @navikt/sif-common-formik-ds@1.2.1
    -   @navikt/sif-common-soknad-ds@10.7.9
    -   @navikt/sif-common-core-ds@9.8.9
    -   @navikt/sif-common-sentry@0.22.6
    -   @navikt/sif-common-utils@3.40.10

## 3.23.13

### Patch Changes

-   Updated dependencies [e815a9a8]
    -   @navikt/sif-common-formik-ds@1.2.0
    -   @navikt/sif-common-core-ds@9.8.8
    -   @navikt/sif-common-soknad-ds@10.7.8

## 3.23.12

### Patch Changes

-   Updated dependencies [afe04538]
    -   @navikt/sif-common-formik-ds@1.1.6
    -   @navikt/sif-common-core-ds@9.8.8
    -   @navikt/sif-common-soknad-ds@10.7.8

## 3.23.11

### Patch Changes

-   Updated dependencies [1d7c508f]
    -   @navikt/sif-common-formik-ds@1.1.5
    -   @navikt/sif-common-core-ds@9.8.8
    -   @navikt/sif-common-soknad-ds@10.7.8

## 3.23.10

### Patch Changes

-   cb7e6653: Oppdatere ds pakker etter at versjon 5.9.1 hadde feil. Fikset i v. 5.9.2
-   Updated dependencies [5c44f78b]
-   Updated dependencies [cb7e6653]
    -   @navikt/sif-common-formik-ds@1.1.4
    -   @navikt/sif-common-amplitude@2.21.8
    -   @navikt/sif-common-soknad-ds@10.7.8
    -   @navikt/sif-common-core-ds@9.8.8
    -   @navikt/sif-common-utils@3.40.9

## 3.23.9

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.21.7
    -   @navikt/sif-common-formik-ds@1.1.3
    -   @navikt/sif-common-soknad-ds@10.7.7
    -   @navikt/sif-common-core-ds@9.8.7
    -   @navikt/sif-common-sentry@0.22.5
    -   @navikt/sif-common-utils@3.40.8

## 3.23.8

### Patch Changes

-   Pakkeoppdatering som fikser datepicker + modal bug
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.21.6
    -   @navikt/sif-common-formik-ds@1.1.2
    -   @navikt/sif-common-soknad-ds@10.7.6
    -   @navikt/sif-common-core-ds@9.8.6
    -   @navikt/sif-common-utils@3.40.7

## 3.23.7

### Patch Changes

-   71381778: Patch pakkeoppdateringer
-   Updated dependencies [71381778]
    -   @navikt/sif-common-amplitude@2.21.5
    -   @navikt/sif-common-formik-ds@1.1.1
    -   @navikt/sif-common-soknad-ds@10.7.5
    -   @navikt/sif-common-core-ds@9.8.5
    -   @navikt/sif-common-sentry@0.22.4
    -   @navikt/sif-common-utils@3.40.6

## 3.23.6

### Patch Changes

-   60eb7ee9: Pakkeoppdateringer. Endret import av DatePickerProps i sif-common-formik-ds
-   Updated dependencies [60eb7ee9]
    -   @navikt/sif-common-formik-ds@1.1.0
    -   @navikt/sif-common-amplitude@2.21.4
    -   @navikt/sif-common-soknad-ds@10.7.4
    -   @navikt/sif-common-core-ds@9.8.4
    -   @navikt/sif-common-sentry@0.22.3
    -   @navikt/sif-common-utils@3.40.5

## 3.23.5

### Patch Changes

-   2a1e2526: Pakkeoppdateringer
-   Updated dependencies [2a1e2526]
    -   @navikt/sif-common-amplitude@2.21.3
    -   @navikt/sif-common-formik-ds@1.0.5
    -   @navikt/sif-common-soknad-ds@10.7.3
    -   @navikt/sif-common-core-ds@9.8.3
    -   @navikt/sif-common-sentry@0.22.2
    -   @navikt/sif-common-utils@3.40.4

## 3.23.4

### Patch Changes

-   Pakkeoppdateringer
-   Updated dependencies
    -   @navikt/sif-common-amplitude@2.21.2
    -   @navikt/sif-common-formik-ds@1.0.4
    -   @navikt/sif-common-soknad-ds@10.7.2
    -   @navikt/sif-common-core-ds@9.8.2
    -   @navikt/sif-common-utils@3.40.3

## 3.23.3

### Patch Changes

-   81e7e155: Bruke BodyLong i alle SifGuidePanel
-   Updated dependencies [81e7e155]
    -   @navikt/sif-common-formik-ds@1.0.3
    -   @navikt/sif-common-core-ds@9.8.1
    -   @navikt/sif-common-utils@3.40.2
    -   @navikt/sif-common-soknad-ds@10.7.1

## 3.23.2

### Patch Changes

-   Updated dependencies [c129755f]
    -   @navikt/sif-common-formik-ds@1.0.2
    -   @navikt/sif-common-core-ds@9.8.0
    -   @navikt/sif-common-soknad-ds@10.7.1

## 3.23.1

### Patch Changes

-   Updated dependencies [92fbd8f8]
    -   @navikt/sif-common-formik-ds@1.0.1
    -   @navikt/sif-common-core-ds@9.8.0
    -   @navikt/sif-common-soknad-ds@10.7.1

## 3.23.0

### Minor Changes

-   fd07933f: Ersattet ds-datepicker med DatePicker fra Aksel

### Patch Changes

-   Updated dependencies [fd07933f]
-   Updated dependencies [e2967240]
    -   @navikt/sif-common-formik-ds@1.0.0
    -   @navikt/sif-common-core-ds@9.8.0
    -   @navikt/sif-common-soknad-ds@10.7.1

## 3.22.0

### Minor Changes

-   55e1f323: Oppdatere tekster for valg av hva etterseldenselen gjelder ved omsorgspenger.
-   55e1f323: Oppdatere titler på søknadsdialoger i ettersendelse + rydde i valg som bruker må gjøre når en velger å sende inn dokumentasjon for en av omsorgspenger-ytelsene.

### Patch Changes

-   Pakkeoppdateringer
-   Updated dependencies [55e1f323]
-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.7.0
    -   @navikt/sif-common-amplitude@2.21.1
    -   @navikt/sif-common-formik-ds@0.6.1
    -   @navikt/sif-common-soknad-ds@10.7.1
    -   @navikt/sif-common-sentry@0.22.1
    -   @navikt/sif-common-utils@3.40.1

## 3.21.0

### Minor Changes

-   61eee34c: Bytte til å bruke react-dropzone komponet for filopplasting. Enkel porting av eksisterende komponent til ny.

### Patch Changes

-   Updated dependencies [61eee34c]
    -   @navikt/sif-common-formik-ds@0.6.0
    -   @navikt/sif-common-core-ds@9.6.0
    -   @navikt/sif-common-soknad-ds@10.7.0

## 3.20.0

### Minor Changes

-   96810cd6: Pakkeoppdateringer og fix etter breaking change i react-router-dom. Sørger for at bruker blir værende på kvitteringsside når søknad er innsendt. Bug var at bruker ble sendt direkte til velkommenside etter å ha sendt inn søknad.

### Patch Changes

-   Updated dependencies [96810cd6]
-   Updated dependencies [96810cd6]
-   Updated dependencies [96810cd6]
-   Updated dependencies [96810cd6]
    -   @navikt/sif-common-formik-ds@0.5.0
    -   @navikt/sif-common-amplitude@2.21.0
    -   @navikt/sif-common-soknad-ds@10.6.0
    -   @navikt/sif-common-core-ds@9.5.0
    -   @navikt/sif-common-sentry@0.22.0
    -   @navikt/sif-common-utils@3.40.0

## 3.19.0

### Minor Changes

-   ad5092d1: Sette document.title basert på søknadsnavn og stegnavn
-   4cde9eca: Redirect til Min side etter at dokumenter er sendt

### Patch Changes

-   5f655843: Ersatte ordet funksjonshemming med funksjonshemning
-   Updated dependencies [ad5092d1]
    -   @navikt/sif-common-soknad-ds@10.5.0
