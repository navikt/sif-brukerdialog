# @navikt/sif-common-ui

## 0.1.2

### Patch Changes

-   Disabled changeset/cli

## 0.1.1

### Patch Changes

-   48e9ecc: Sende med spesifikk apiKey for amplitude

## 0.1.0

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

## 0.2.0

### Minor Changes

-   989373a: - Gå over til å bruke noen få felleskomponenter og utils for filopplasting.
    -   Legge på validering av vedlegg på tvers av en søknad
    -   Fjerne sperre for bruker på å gå videre hvis det var for mange vedlegg. Erstattet med validering.

### Patch Changes

-   Updated dependencies [989373a]
    -   @navikt/sif-common-formik-ds@1.13.0

## 0.1.7

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.23
    -   @navikt/sif-common-core-ds@9.18.24
    -   @navikt/sif-common-sentry@0.27.16
    -   @navikt/sif-common-utils@3.47.18

## 0.1.6

### Patch Changes

-   Bytte til debounce fra ds-react
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.22
    -   @navikt/sif-common-core-ds@9.18.23
    -   @navikt/sif-common-sentry@0.27.15
    -   @navikt/sif-common-utils@3.47.17

## 0.1.5

### Patch Changes

-   Pakkeoppdateringer -minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.21
    -   @navikt/sif-common-core-ds@9.18.22
    -   @navikt/sif-common-sentry@0.27.14
    -   @navikt/sif-common-utils@3.47.16

## 0.1.4

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.20
    -   @navikt/sif-common-core-ds@9.18.21

## 0.1.3

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.19
    -   @navikt/sif-common-core-ds@9.18.20
    -   @navikt/sif-common-sentry@0.27.13
    -   @navikt/sif-common-utils@3.47.15

## 0.1.2

### Patch Changes

-   70809d1: Justere common og attachment logikk
-   Updated dependencies [70809d1]
    -   @navikt/sif-common-formik-ds@1.12.18
    -   @navikt/sif-common-core-ds@9.18.19

## 0.1.1

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.17
    -   @navikt/sif-common-core-ds@9.18.18
    -   @navikt/sif-common-sentry@0.27.12
    -   @navikt/sif-common-utils@3.47.14

## 0.1.0

### Minor Changes

-   052ef4b: Vedleggservice i common, og ta denne i bruk i omsorgspengerutbetaling-sn-fl

### Patch Changes

-   Updated dependencies [052ef4b]
    -   @navikt/sif-common-core-ds@9.18.17

## 0.0.4

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies [ad46a6b]
-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.18.16
    -   @navikt/sif-common-formik-ds@1.12.16
    -   @navikt/sif-common-sentry@0.27.11
    -   @navikt/sif-common-utils@3.47.13

## 0.0.3

### Patch Changes

-   Pakkeoppdatering - react-intl-6.7.0
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.15
    -   @navikt/sif-common-core-ds@9.18.15
    -   @navikt/sif-common-sentry@0.27.10
    -   @navikt/sif-common-utils@3.47.12

## 0.0.2

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.14
    -   @navikt/sif-common-core-ds@9.18.14
    -   @navikt/sif-common-sentry@0.27.9
    -   @navikt/sif-common-utils@3.47.11

## 0.8.11

### Patch Changes

-   Pakkeoppdatering - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.9
    -   @navikt/sif-common-core-ds@9.18.9
    -   @navikt/sif-common-utils@3.47.6

## 0.8.10

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.8
    -   @navikt/sif-common-core-ds@9.18.8
    -   @navikt/sif-common-utils@3.47.5

## 0.8.9

### Patch Changes

-   799b512: Pakkeoppdateringer - minor/patch
-   Updated dependencies [799b512]
    -   @navikt/sif-common-formik-ds@1.12.7
    -   @navikt/sif-common-core-ds@9.18.7
    -   @navikt/sif-common-utils@3.47.5

## 0.8.8

### Patch Changes

-   ee7d9fd: Rydde i intl-tekstnøkler. Legge til scope i fellespakker for å se hvilken pakke teksten kommer fra.
-   Updated dependencies [ee7d9fd]
    -   @navikt/sif-common-core-ds@9.18.6

## 0.8.7

### Patch Changes

-   16f2ebf: Pakkeoppdateringer minor/patch
-   Updated dependencies [16f2ebf]
    -   @navikt/sif-common-formik-ds@1.12.6
    -   @navikt/sif-common-core-ds@9.18.5
    -   @navikt/sif-common-utils@3.47.4

## 0.8.6

### Patch Changes

-   Updated dependencies [485d6eb]
    -   @navikt/sif-common-formik-ds@1.12.5
    -   @navikt/sif-common-core-ds@9.18.4
    -   @navikt/sif-common-utils@3.47.3

## 0.8.5

### Patch Changes

-   ProgressStepper - kun tillate klikk på steg som er ferdige

## 0.8.4

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.4
    -   @navikt/sif-common-core-ds@9.18.3
    -   @navikt/sif-common-utils@3.47.2

## 0.8.3

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.3
    -   @navikt/sif-common-core-ds@9.18.2

## 0.8.2

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.12.2
    -   @navikt/sif-common-core-ds@9.18.2
    -   @navikt/sif-common-utils@3.47.2

## 0.8.1

### Patch Changes

-   4e48646: Pakkeoppdateringer - minor/patch
-   Updated dependencies [4e48646]
    -   @navikt/sif-common-formik-ds@1.12.1
    -   @navikt/sif-common-core-ds@9.18.1
    -   @navikt/sif-common-utils@3.47.1

## 0.8.0

### Minor Changes

-   ee9cbed: Oppdatere til eslint 9. Krevde noen endringer i kode.

### Patch Changes

-   Updated dependencies [ee9cbed]
    -   @navikt/sif-common-formik-ds@1.12.0
    -   @navikt/sif-common-core-ds@9.18.0
    -   @navikt/sif-common-utils@3.47.0

## 0.7.29

### Patch Changes

-   008a462: Pakkeoppdateringer - minor/patch
-   Updated dependencies [008a462]
    -   @navikt/sif-common-formik-ds@1.11.6
    -   @navikt/sif-common-core-ds@9.17.24
    -   @navikt/sif-common-utils@3.46.12

## 0.7.28

### Patch Changes

-   d42de23: Oppdaterte felleskomponenter ifbm aksel-oppsummeringsmal
-   Updated dependencies [d42de23]
    -   @navikt/sif-common-core-ds@9.17.23
    -   @navikt/sif-common-utils@3.46.11

## 0.7.27

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.11.5
    -   @navikt/sif-common-core-ds@9.17.22

## 0.7.26

### Patch Changes

-   Updated dependencies [24fe90e]
    -   @navikt/sif-common-formik-ds@1.11.4
    -   @navikt/sif-common-core-ds@9.17.21

## 0.7.25

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.11.3
    -   @navikt/sif-common-core-ds@9.17.21
    -   @navikt/sif-common-utils@3.46.10

## 0.7.24

### Patch Changes

-   Updated dependencies [12cfdc9]
    -   @navikt/sif-common-core-ds@9.17.20

## 0.7.23

### Patch Changes

-   Updated dependencies [569761e]
    -   @navikt/sif-common-formik-ds@1.11.2
    -   @navikt/sif-common-core-ds@9.17.19

## 0.7.22

### Patch Changes

-   90ba6ff: Pakkeoppdateringer - minor/patch.

    -   ds-pakker
    -   storybook
    -   tailwindcss
    -   vite

-   Updated dependencies [90ba6ff]
    -   @navikt/sif-common-formik-ds@1.11.1
    -   @navikt/sif-common-core-ds@9.17.19

## 0.7.21

### Patch Changes

-   Updated dependencies [2690b03]
    -   @navikt/sif-common-formik-ds@1.11.0
    -   @navikt/sif-common-core-ds@9.17.18

## 0.7.20

### Patch Changes

-   347828a: Bruke FormProgress komponent fra Aksel i stedet for egen komponent. Justere headingstørrelser der dette var nødvendig.
-   Updated dependencies [72585dc]
    -   @navikt/sif-common-formik-ds@1.10.0
    -   @navikt/sif-common-core-ds@9.17.18

## 0.7.19

### Patch Changes

-   Updated dependencies [8240d14]
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.9.8
    -   @navikt/sif-common-core-ds@9.17.18
    -   @navikt/sif-common-utils@3.46.9

## 0.7.18

### Patch Changes

-   Minor og patch oppdateringer
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.9.7
    -   @navikt/sif-common-core-ds@9.17.17
    -   @navikt/sif-common-utils@3.46.8

## 0.7.17

### Patch Changes

-   Updated dependencies [fd363d7]
    -   @navikt/sif-common-core-ds@9.17.16

## 0.7.16

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.9.6
    -   @navikt/sif-common-core-ds@9.17.15
    -   @navikt/sif-common-utils@3.46.7

## 0.7.15

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.9.5
    -   @navikt/sif-common-core-ds@9.17.14
    -   @navikt/sif-common-utils@3.46.7

## 0.7.14

### Patch Changes

-   Updated dependencies [a10b53c]
    -   @navikt/sif-common-formik-ds@1.9.4
    -   @navikt/sif-common-core-ds@9.17.13
    -   @navikt/sif-common-utils@3.46.6

## 0.7.13

### Patch Changes

-   b4e0847: Pakkeoppdateringer - minor/patch
-   Updated dependencies [b4e0847]
    -   @navikt/sif-common-formik-ds@1.9.3
    -   @navikt/sif-common-core-ds@9.17.12
    -   @navikt/sif-common-utils@3.46.5

## 0.7.12

### Patch Changes

-   f184cf4: Pakkeoppdateringer - minor/patch
-   Updated dependencies [f184cf4]
    -   @navikt/sif-common-formik-ds@1.9.2
    -   @navikt/sif-common-core-ds@9.17.11
    -   @navikt/sif-common-utils@3.46.4

## 0.7.11

### Patch Changes

-   99e1bd2: Pakkeoppdateringer - minor/patch
-   Updated dependencies [99e1bd2]
    -   @navikt/sif-common-formik-ds@1.9.1
    -   @navikt/sif-common-core-ds@9.17.10
    -   @navikt/sif-common-utils@3.46.3

## 0.7.10

### Patch Changes

-   Updated dependencies [a739a56]
    -   @navikt/sif-common-formik-ds@1.9.0
    -   @navikt/sif-common-core-ds@9.17.9

## 0.7.9

### Patch Changes

-   1972384: Pakkeoppdateringer minor/patch + uuid major
-   Updated dependencies [1972384]
    -   @navikt/sif-common-formik-ds@1.8.8
    -   @navikt/sif-common-core-ds@9.17.9
    -   @navikt/sif-common-utils@3.46.3

## 0.7.8

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.8.7
    -   @navikt/sif-common-core-ds@9.17.8
    -   @navikt/sif-common-utils@3.46.2

## 0.7.7

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.8.6
    -   @navikt/sif-common-core-ds@9.17.7
    -   @navikt/sif-common-utils@3.46.1

## 0.7.6

### Patch Changes

-   Updated dependencies [ecd2cdb]
    -   @navikt/sif-common-utils@3.46.0
    -   @navikt/sif-common-core-ds@9.17.6

## 0.7.5

### Patch Changes

-   6751f58: Pakkeoppdateringer - minor/patch
-   Updated dependencies [6751f58]
    -   @navikt/sif-common-formik-ds@1.8.5
    -   @navikt/sif-common-core-ds@9.17.5
    -   @navikt/sif-common-utils@3.45.4

## 0.7.4

### Patch Changes

-   Updated dependencies [cc9e4d3]
    -   @navikt/sif-common-formik-ds@1.8.4
    -   @navikt/sif-common-core-ds@9.17.4

## 0.7.3

### Patch Changes

-   c36a566: Pakkeoppdateringer minor/patch
-   Updated dependencies [c36a566]
    -   @navikt/sif-common-formik-ds@1.8.3
    -   @navikt/sif-common-core-ds@9.17.3
    -   @navikt/sif-common-utils@3.45.3

## 0.7.2

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies [7943ea7]
-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.17.2
    -   @navikt/sif-common-formik-ds@1.8.2
    -   @navikt/sif-common-utils@3.45.2

## 0.7.1

### Patch Changes

-   20b3033: Pakkeoppdateringer - minor/patch
-   Updated dependencies [20b3033]
    -   @navikt/sif-common-formik-ds@1.8.1
    -   @navikt/sif-common-core-ds@9.17.1
    -   @navikt/sif-common-utils@3.45.1

## 0.7.0

### Minor Changes

-   30b57da: Pakkeoppdatering - minor/patch

### Patch Changes

-   Updated dependencies [30b57da]
    -   @navikt/sif-common-formik-ds@1.8.0
    -   @navikt/sif-common-core-ds@9.17.0
    -   @navikt/sif-common-utils@3.45.0

## 0.6.35

### Patch Changes

-   Updated dependencies [99c9b1f]
    -   @navikt/sif-common-formik-ds@1.7.37
    -   @navikt/sif-common-core-ds@9.16.2

## 0.6.34

### Patch Changes

-   Updated dependencies [d89b9f6]
    -   @navikt/sif-common-formik-ds@1.7.36
    -   @navikt/sif-common-core-ds@9.16.2

## 0.6.33

### Patch Changes

-   c4d70c1: Pakkeoppdateringer - minor/patch
-   Updated dependencies [c4d70c1]
    -   @navikt/sif-common-formik-ds@1.7.35
    -   @navikt/sif-common-core-ds@9.16.2
    -   @navikt/sif-common-utils@3.44.22

## 0.6.32

### Patch Changes

-   9c29019: Pakkeoppdateringer - minor/patch
-   Updated dependencies [9c29019]
-   Updated dependencies [35938df]
    -   @navikt/sif-common-formik-ds@1.7.34
    -   @navikt/sif-common-core-ds@9.16.1
    -   @navikt/sif-common-utils@3.44.21

## 0.6.31

### Patch Changes

-   Pakkeoppdateringer - patch/minor
-   Updated dependencies
-   Updated dependencies [25d7bf0]
    -   @navikt/sif-common-formik-ds@1.7.33
    -   @navikt/sif-common-core-ds@9.16.0
    -   @navikt/sif-common-utils@3.44.20

## 0.6.30

### Patch Changes

-   c418fc8: Pakkeoppdateringer minor/patch
-   Updated dependencies [c418fc8]
    -   @navikt/sif-common-formik-ds@1.7.32
    -   @navikt/sif-common-core-ds@9.15.26
    -   @navikt/sif-common-utils@3.44.19

## 0.6.29

### Patch Changes

-   6e08c34: Pakkeoppdateringer - minor og patch
-   Updated dependencies [6e08c34]
    -   @navikt/sif-common-formik-ds@1.7.31
    -   @navikt/sif-common-core-ds@9.15.25
    -   @navikt/sif-common-utils@3.44.18

## 0.6.28

### Patch Changes

-   Updated dependencies [5ecde5a]
    -   @navikt/sif-common-core-ds@9.15.24

## 0.6.27

### Patch Changes

-   Updated dependencies [ef7a531]
    -   @navikt/sif-common-core-ds@9.15.23

## 0.6.26

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
    -   @navikt/sif-common-formik-ds@1.7.30
    -   @navikt/sif-common-core-ds@9.15.22
    -   @navikt/sif-common-utils@3.44.17

## 0.6.25

### Patch Changes

-   ad4123e: Pakkeoppdateringer minor/patch
-   Updated dependencies [ad4123e]
    -   @navikt/sif-common-formik-ds@1.7.29
    -   @navikt/sif-common-core-ds@9.15.21
    -   @navikt/sif-common-utils@3.44.16

## 0.6.24

### Patch Changes

-   Pakkeoppdateringer minor/patch + major fnrvalidator
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.28
    -   @navikt/sif-common-core-ds@9.15.20
    -   @navikt/sif-common-utils@3.44.15

## 0.6.23

### Patch Changes

-   a478787: Pakkeoppdateringer - minor/patch. Eslint major -> 9
-   Updated dependencies [a478787]
    -   @navikt/sif-common-formik-ds@1.7.27
    -   @navikt/sif-common-core-ds@9.15.19
    -   @navikt/sif-common-utils@3.44.14

## 0.6.22

### Patch Changes

-   Pakkeoppdateringer - minor patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.26
    -   @navikt/sif-common-core-ds@9.15.18
    -   @navikt/sif-common-utils@3.44.13

## 0.6.21

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.25
    -   @navikt/sif-common-core-ds@9.15.17
    -   @navikt/sif-common-utils@3.44.12

## 0.6.20

### Patch Changes

-   6ff87ec: Pakkeroppdateringer - minor / patch
-   Updated dependencies [6ff87ec]
    -   @navikt/sif-common-formik-ds@1.7.24
    -   @navikt/sif-common-core-ds@9.15.16
    -   @navikt/sif-common-utils@3.44.11

## 0.6.19

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.23
    -   @navikt/sif-common-core-ds@9.15.15
    -   @navikt/sif-common-utils@3.44.10

## 0.6.18

### Patch Changes

-   react-responsive-10.0.0
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.22
    -   @navikt/sif-common-core-ds@9.15.14
    -   @navikt/sif-common-utils@3.44.9

## 0.6.17

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.21
    -   @navikt/sif-common-core-ds@9.15.13
    -   @navikt/sif-common-utils@3.44.8

## 0.6.16

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.15.12

## 0.6.15

### Patch Changes

-   Pakkeoppdateringer - minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.20
    -   @navikt/sif-common-core-ds@9.15.11
    -   @navikt/sif-common-utils@3.44.7

## 0.6.14

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.19
    -   @navikt/sif-common-core-ds@9.15.10

## 0.6.13

### Patch Changes

-   Oppdatering til navikt/ds-6 versjoner
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.18
    -   @navikt/sif-common-core-ds@9.15.9

## 0.6.12

### Patch Changes

-   77509a2: Generelle pakkeoppdatering
-   Updated dependencies [77509a2]
    -   @navikt/sif-common-formik-ds@1.7.17
    -   @navikt/sif-common-core-ds@9.15.8
    -   @navikt/sif-common-utils@3.44.6

## 0.6.11

### Patch Changes

-   Pakkeoppdatering patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.16
    -   @navikt/sif-common-core-ds@9.15.7

## 0.6.10

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.15
    -   @navikt/sif-common-core-ds@9.15.6
    -   @navikt/sif-common-utils@3.44.5

## 0.6.9

### Patch Changes

-   Pakkeoppdateringer minor/patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.14
    -   @navikt/sif-common-core-ds@9.15.5

## 0.6.8

### Patch Changes

-   e770491: Pakkeoppdateringer minor/patch
-   Updated dependencies [e770491]
    -   @navikt/sif-common-formik-ds@1.7.13
    -   @navikt/sif-common-core-ds@9.15.4
    -   @navikt/sif-common-utils@3.44.4

## 0.6.7

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.12
    -   @navikt/sif-common-core-ds@9.15.3
    -   @navikt/sif-common-utils@3.44.3

## 0.6.6

### Patch Changes

-   Pakkeoppdateringer patch/minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.11
    -   @navikt/sif-common-core-ds@9.15.2
    -   @navikt/sif-common-utils@3.44.2

## 0.6.5

### Patch Changes

-   a7f80d2: Pakkeoppdateringer minor/patch
    Oppdatere noen tester etter endringer i ds-pakker
-   Updated dependencies [a7f80d2]
    -   @navikt/sif-common-formik-ds@1.7.10
    -   @navikt/sif-common-core-ds@9.15.1
    -   @navikt/sif-common-utils@3.44.1

## 0.6.4

### Patch Changes

-   Updated dependencies [06a4e60]
    -   @navikt/sif-common-core-ds@9.15.0
    -   @navikt/sif-common-utils@3.44.0

## 0.6.3

### Patch Changes

-   Mindre pakkeoppdateringer patch/minor + husky major
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.9
    -   @navikt/sif-common-core-ds@9.14.3
    -   @navikt/sif-common-utils@3.43.17

## 0.6.2

### Patch Changes

-   100f013: Dependabotfix - vite
-   Updated dependencies [7a66141]
-   Updated dependencies [100f013]
    -   @navikt/sif-common-formik-ds@1.7.8
    -   @navikt/sif-common-core-ds@9.14.2
    -   @navikt/sif-common-utils@3.43.16

## 0.6.1

### Patch Changes

-   Pakkeoppdateringer - minor og patch
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.7
    -   @navikt/sif-common-core-ds@9.14.1
    -   @navikt/sif-common-utils@3.43.15

## 0.6.0

### Minor Changes

-   75fe136: - Flytte DurationText-komponent til sif-common-ui.
    -   Flytte alt inline tekst til intol i sif-common-ui
    -   Lage støtte for nynorsk i sif-common-ui
    -   Oppdaterte berørte applikasjoner som brukte DurationText

### Patch Changes

-   Updated dependencies [75fe136]
    -   @navikt/sif-common-core-ds@9.14.0
    -   @navikt/sif-common-utils@3.43.14

## 0.5.6

### Patch Changes

-   Feilretting i ds-pakker
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.6
    -   @navikt/sif-common-core-ds@9.13.6

## 0.5.5

### Patch Changes

-   Pakkeoppdateringer - patch og minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.5
    -   @navikt/sif-common-core-ds@9.13.5
    -   @navikt/sif-common-utils@3.43.13

## 0.5.4

### Patch Changes

-   de82059: Minor/patch pakkeoppdateringer
-   Updated dependencies [de82059]
    -   @navikt/sif-common-formik-ds@1.7.4
    -   @navikt/sif-common-core-ds@9.13.4
    -   @navikt/sif-common-utils@3.43.12

## 0.5.3

### Patch Changes

-   Minor og patch pakkeoppdateringer
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.3
    -   @navikt/sif-common-core-ds@9.13.3
    -   @navikt/sif-common-utils@3.43.11

## 0.5.2

### Patch Changes

-   Pakkeoppdateringer patch og noe minor
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.2
    -   @navikt/sif-common-core-ds@9.13.2
    -   @navikt/sif-common-utils@3.43.10

## 0.5.1

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.7.1
    -   @navikt/sif-common-core-ds@9.13.1
    -   @navikt/sif-common-utils@3.43.9

## 0.5.0

### Minor Changes

-   c12a07f: Oppdatere date-fns til 3.0.6 (fra 2.30.0) og chromatic til 10.2.0 (minor)

### Patch Changes

-   Updated dependencies [c12a07f]
    -   @navikt/sif-common-formik-ds@1.7.0
    -   @navikt/sif-common-core-ds@9.13.0

## 0.4.7

### Patch Changes

-   23f75ff: Generelle pakkeoppdateringer - patch og minor
-   Updated dependencies [23f75ff]
    -   @navikt/sif-common-formik-ds@1.6.6
    -   @navikt/sif-common-core-ds@9.12.6
    -   @navikt/sif-common-utils@3.43.8

## 0.4.6

### Patch Changes

-   306a348: Pakkeoppdateringer.
    -   @navikt/ds-\*: minor
    -   sentry: minor
    -   vite: patch
-   Updated dependencies [306a348]
    -   @navikt/sif-common-formik-ds@1.6.5
    -   @navikt/sif-common-core-ds@9.12.5

## 0.4.5

### Patch Changes

-   Oppdatert ds pakker
-   Updated dependencies
    -   @navikt/sif-common-core-ds@9.12.4
    -   @navikt/sif-common-formik-ds@1.6.4
    -   @navikt/sif-common-utils@3.43.7

## 0.4.4

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.6.3
    -   @navikt/sif-common-core-ds@9.12.3
    -   @navikt/sif-common-utils@3.43.6

## 0.4.3

### Patch Changes

-   Fjerne webpack

## 0.4.2

### Patch Changes

-   Patch oppdateringer
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.6.2
    -   @navikt/sif-common-core-ds@9.12.2
    -   @navikt/sif-common-utils@3.43.5

## 0.4.1

### Patch Changes

-   e7bf8d1: Patch oppdateringer av pakker
-   Updated dependencies [e7bf8d1]
    -   @navikt/sif-common-formik-ds@1.6.1
    -   @navikt/sif-common-core-ds@9.12.1
    -   @navikt/sif-common-utils@3.43.4

## 0.4.0

### Minor Changes

-   573c55d: Diverse oppdateringer i forbindelse med uu-gjennomgang.

### Patch Changes

-   Updated dependencies [573c55d]
    -   @navikt/sif-common-formik-ds@1.6.0
    -   @navikt/sif-common-core-ds@9.12.0

## 0.3.3

### Patch Changes

-   406b044: Patch pakkeoppdateringer
-   Updated dependencies [406b044]
    -   @navikt/sif-common-formik-ds@1.5.3
    -   @navikt/sif-common-core-ds@9.11.3
    -   @navikt/sif-common-utils@3.43.3

## 0.3.2

### Patch Changes

-   6084e23: Diverse mindre pakkeoppdateringer - versjonstrigger
-   Updated dependencies [6084e23]
    -   @navikt/sif-common-core-ds@9.11.2
    -   @navikt/sif-common-formik-ds@1.5.2
    -   @navikt/sif-common-utils@3.43.2

## 0.3.1

### Patch Changes

-   295d3ad: Diverse mindre pakkeoppdateringer - versjonstrigger
-   Updated dependencies [295d3ad]
    -   @navikt/sif-common-core-ds@9.11.1
    -   @navikt/sif-common-formik-ds@1.5.1
    -   @navikt/sif-common-utils@3.43.1

## 0.3.0

### Minor Changes

-   53b47be: Nav Dekoratøren 2 i alle apper
    Vite 5
    patch og noen minor
    Beholder react-router-dom 6.19.0 pga navigasjon knekker i noen apper

### Patch Changes

-   Updated dependencies [53b47be]
    -   @navikt/sif-common-formik-ds@1.5.0
    -   @navikt/sif-common-core-ds@9.11.0
    -   @navikt/sif-common-utils@3.43.0

## 0.2.0

### Minor Changes

-   Oppdaterte pakker. Minor og patch

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.4.0
    -   @navikt/sif-common-core-ds@9.10.0
    -   @navikt/sif-common-utils@3.42.0

## 0.1.0

### Minor Changes

-   d31f28ec: Minor og patch oppdateringer på ds, react-router-dom, vite, msw

### Patch Changes

-   Updated dependencies [d31f28ec]
    -   @navikt/sif-common-formik-ds@1.3.0
    -   @navikt/sif-common-core-ds@9.9.0
    -   @navikt/sif-common-utils@3.41.0

## 0.0.18

### Patch Changes

-   Updated dependencies [6d3b3cbe]
    -   @navikt/sif-common-formik-ds@1.2.3
    -   @navikt/sif-common-core-ds@9.8.11
    -   @navikt/sif-common-utils@3.40.11

## 0.0.17

### Patch Changes

-   09ae5814: Patch-oppdateringer
-   Updated dependencies [09ae5814]
    -   @navikt/sif-common-formik-ds@1.2.2
    -   @navikt/sif-common-core-ds@9.8.10
    -   @navikt/sif-common-utils@3.40.11

## 0.0.16

### Patch Changes

-   b4d45cf9: Diverse mindre pakkeoppdateringer
-   Updated dependencies [b4d45cf9]
    -   @navikt/sif-common-formik-ds@1.2.1
    -   @navikt/sif-common-core-ds@9.8.9
    -   @navikt/sif-common-utils@3.40.10

## 0.0.15

### Patch Changes

-   Updated dependencies [e815a9a8]
    -   @navikt/sif-common-formik-ds@1.2.0
    -   @navikt/sif-common-core-ds@9.8.8

## 0.0.14

### Patch Changes

-   Updated dependencies [afe04538]
    -   @navikt/sif-common-formik-ds@1.1.6
    -   @navikt/sif-common-core-ds@9.8.8

## 0.0.13

### Patch Changes

-   Updated dependencies [1d7c508f]
    -   @navikt/sif-common-formik-ds@1.1.5
    -   @navikt/sif-common-core-ds@9.8.8

## 0.0.12

### Patch Changes

-   cb7e6653: Oppdatere ds pakker etter at versjon 5.9.1 hadde feil. Fikset i v. 5.9.2
-   Updated dependencies [5c44f78b]
-   Updated dependencies [cb7e6653]
    -   @navikt/sif-common-formik-ds@1.1.4
    -   @navikt/sif-common-core-ds@9.8.8
    -   @navikt/sif-common-utils@3.40.9

## 0.0.11

### Patch Changes

-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.1.3
    -   @navikt/sif-common-core-ds@9.8.7
    -   @navikt/sif-common-utils@3.40.8

## 0.0.10

### Patch Changes

-   Pakkeoppdatering som fikser datepicker + modal bug
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.1.2
    -   @navikt/sif-common-core-ds@9.8.6
    -   @navikt/sif-common-utils@3.40.7

## 0.0.9

### Patch Changes

-   71381778: Patch pakkeoppdateringer
-   Updated dependencies [71381778]
    -   @navikt/sif-common-formik-ds@1.1.1
    -   @navikt/sif-common-core-ds@9.8.5
    -   @navikt/sif-common-utils@3.40.6

## 0.0.8

### Patch Changes

-   60eb7ee9: Pakkeoppdateringer. Endret import av DatePickerProps i sif-common-formik-ds
-   Updated dependencies [60eb7ee9]
    -   @navikt/sif-common-formik-ds@1.1.0
    -   @navikt/sif-common-core-ds@9.8.4
    -   @navikt/sif-common-utils@3.40.5

## 0.0.7

### Patch Changes

-   2a1e2526: Pakkeoppdateringer
-   Updated dependencies [2a1e2526]
    -   @navikt/sif-common-formik-ds@1.0.5
    -   @navikt/sif-common-core-ds@9.8.3
    -   @navikt/sif-common-utils@3.40.4

## 0.0.6

### Patch Changes

-   Pakkeoppdateringer
-   Updated dependencies
    -   @navikt/sif-common-formik-ds@1.0.4
    -   @navikt/sif-common-core-ds@9.8.2
    -   @navikt/sif-common-utils@3.40.3

## 0.0.5

### Patch Changes

-   81e7e155: Bruke BodyLong i alle SifGuidePanel
-   Updated dependencies [81e7e155]
    -   @navikt/sif-common-formik-ds@1.0.3
    -   @navikt/sif-common-core-ds@9.8.1
    -   @navikt/sif-common-utils@3.40.2

## 0.0.4

### Patch Changes

-   Updated dependencies [c129755f]
    -   @navikt/sif-common-formik-ds@1.0.2
    -   @navikt/sif-common-core-ds@9.8.0

## 0.0.3

### Patch Changes

-   Updated dependencies [92fbd8f8]
    -   @navikt/sif-common-formik-ds@1.0.1
    -   @navikt/sif-common-core-ds@9.8.0
