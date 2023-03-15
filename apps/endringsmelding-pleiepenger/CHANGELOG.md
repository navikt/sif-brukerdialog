# @navikt/endringsmelding-pleiepenger

## 1.8.0

### Minor Changes

-   908bb770: Pakkeoppdateringer

### Patch Changes

-   Updated dependencies [908bb770]
    -   @navikt/sif-common-amplitude@2.10.0
    -   @navikt/sif-common-formik-ds@0.12.0
    -   @navikt/sif-common-soknad-ds@7.0.0
    -   @navikt/sif-common-forms-ds@5.0.0
    -   @navikt/sif-common-core-ds@7.0.0
    -   @navikt/sif-common-sentry@0.11.0
    -   @navikt/sif-common-utils@3.25.0

## 1.7.0

### Minor Changes

-   6f6bf8d: Tillate 5 tegn i input for arbeidstimer og prosent, slik at en godtar f.eks. 20,75 timer. Endret fra 4 tegn.

## 1.6.1

### Patch Changes

-   ecd4b4f: Pakkeoppdateringer
-   f033a9b: Env toggle for å styre logging av debuginfo til sentry
-   f033a9b: Patch-oppdatering av ds pakker
-   Updated dependencies [ecd4b4f]
-   Updated dependencies [f033a9b]
    -   @navikt/sif-common-amplitude@2.9.3
    -   @navikt/sif-common-formik-ds@0.11.5
    -   @navikt/sif-common-soknad-ds@6.0.3
    -   @navikt/sif-common-forms-ds@4.0.3
    -   @navikt/sif-common-core-ds@6.0.4
    -   @navikt/sif-common-sentry@0.9.6

## 1.6.0

### Minor Changes

-   ed5db1e: Håndtere at bruker kan ha arbeidsgiver i sak som ikke finnes i aareg for perioden.

## 1.5.5

### Patch Changes

-   7637a0b: Oppdatere packages
-   Updated dependencies [7637a0b]
    -   @navikt/sif-common-amplitude@2.9.2
    -   @navikt/sif-common-formik-ds@0.11.4
    -   @navikt/sif-common-soknad-ds@6.0.2
    -   @navikt/sif-common-forms-ds@4.0.2
    -   @navikt/sif-common-core-ds@6.0.3
    -   @navikt/sif-common-sentry@0.9.5
    -   @navikt/sif-common-utils@3.24.1

## 1.5.4

### Patch Changes

-   Utvide med 401 ignore i sentry

## 1.5.3

### Patch Changes

-   Oppdatere debug-info

## 1.5.2

### Patch Changes

-   Utvide logging - logger masked k9format

## 1.5.1

### Patch Changes

-   cb524e65: Korrigere avvik i beregning ved prosent - feil visning i arbeidstid-step. Var korrekt på oppsummering.
-   ab096d35: Logge debug-informasjon når sak hentes. Informasjonen som logges er et subsett hvor sensitive data ikke er med.
-   Updated dependencies [ab096d35]
-   Updated dependencies [cb524e65]
    -   @navikt/sif-common-sentry@0.8.2
    -   @navikt/sif-common-utils@3.24.0

## 1.5.0

### Minor Changes

-   5dd8ad5: Vise informasjon til bruker når vi ikke klarer å parse saken

### Patch Changes

-   633547b: Utvide feillogging verifyK9FormatArbeidstidTid
-   7c6db10: Pakkeoppdateringer
-   Updated dependencies [7c6db10]
    -   @navikt/sif-common-formik-ds@0.11.2
    -   @navikt/sif-common-soknad-ds@6.0.1
    -   @navikt/sif-common-forms-ds@4.0.1
    -   @navikt/sif-common-core-ds@6.0.1

## 1.4.0

### Minor Changes

-   42583ea: Utvide logging ved ugyldig k9format

## 1.3.0

### Minor Changes

-   66e4350: Legge til ytelse.dataBruktTilUtledning.soknadDialogCommitSha

### Patch Changes

-   d2d634b: Utvide med å logge antall arbeidsaktiviteter som kan endres når bruker starter en endring
-   d2d634b: Logge axiosError til sentry dersom innsending av melding feiler

## 1.2.1

### Patch Changes

-   dde26c4: Oppdatere packageversjoner
-   Updated dependencies [dde26c4]
    -   @navikt/sif-common-amplitude@2.9.1
    -   @navikt/sif-common-formik-ds@0.11.1
    -   @navikt/sif-common-soknad-ds@6.0.0
    -   @navikt/sif-common-forms-ds@4.0.0
    -   @navikt/sif-common-core-ds@6.0.0
    -   @navikt/sif-common-sentry@0.8.1
    -   @navikt/sif-common-utils@3.23.1

## 1.2.0

### Minor Changes

-   e6c5ea70: Oppdatere packages, inkludert major på axios

### Patch Changes

-   Updated dependencies [e6c5ea70]
    -   @navikt/sif-common-amplitude@2.9.0
    -   @navikt/sif-common-formik-ds@0.11.0
    -   @navikt/sif-common-soknad-ds@6.0.0
    -   @navikt/sif-common-forms-ds@4.0.0
    -   @navikt/sif-common-core-ds@6.0.0
    -   @navikt/sif-common-sentry@0.8.0
    -   @navikt/sif-common-utils@3.23.0

## 1.1.0

### Minor Changes

-   bfc208e7: Legge til GitSha ved innsending av søknader i alle apper

### Patch Changes

-   ac7641bf: Legge på commit_sha i søknadApiData
-   Updated dependencies [ac7641bf]
-   Updated dependencies [bfc208e7]
    -   @navikt/sif-common-core-ds@5.6.0
    -   @navikt/sif-common-forms-ds@4.0.0

## 1.0.3

### Patch Changes

-   a0d61e2: Redirect til ikke-tilgang-page

## 1.0.2

### Patch Changes

-   af0debb: Fjerne dobbel logging av ikkeTilgangÅrsak

## 1.0.1

### Patch Changes

-   9501b4c: Oppdatere tekst, korrigere log at søknad startes, korrigere ikkeTilgang log. tokenx update

## 1.0.0

### Major Changes

-   d0a2c73: Første versjon som legges ut i produksjon.

### Minor Changes

-   ef1a7bf: Oppdatert endringsdialog

### Patch Changes

-   Updated dependencies [ef1a7bf]
-   Updated dependencies [d0a2c73]
    -   @navikt/sif-common-utils@3.22.0
    -   @navikt/sif-common-amplitude@2.8.0
    -   @navikt/sif-common-formik-ds@0.10.0
    -   @navikt/sif-common-soknad-ds@6.0.0
    -   @navikt/sif-common-forms-ds@4.0.0
    -   @navikt/sif-common-core-ds@6.0.0
    -   @navikt/sif-common-sentry@0.7.0

## 0.5.2

### Patch Changes

-   10f034bd: Forbedre oppstart av applikasjon og håndtering av 401 - bruker ikke logget inn.
-   41408691: Pakkeoppdateringer
-   Updated dependencies [41408691]
-   Updated dependencies [10f034bd]
-   Updated dependencies [4e110301]
-   Updated dependencies [4325d8dc]
    -   @navikt/sif-common-amplitude@2.7.3
    -   @navikt/sif-common-sentry@0.6.2
    -   @navikt/sif-common-core-ds@5.4.0
    -   @navikt/sif-common-utils@3.21.0
    -   @navikt/sif-common-forms-ds@4.0.0

## 0.5.1

### Patch Changes

-   bfd9a33: Oppdatere pakker
-   Updated dependencies [bfd9a33]
    -   @navikt/sif-common-amplitude@2.7.2
    -   @navikt/sif-common-formik-ds@0.9.6
    -   @navikt/sif-common-soknad-ds@5.3.7
    -   @navikt/sif-common-forms-ds@3.3.4
    -   @navikt/sif-common-core-ds@5.3.5
    -   @navikt/sif-common-sentry@0.6.1

## 0.5.0

### Minor Changes

-   3165914: Migrering endringsmelding til k9-brukerdialog api, IDporten, tokenX

### Patch Changes

-   Updated dependencies [c681e36]
    -   @navikt/sif-common-formik-ds@0.9.5

## 0.4.3

### Patch Changes

-   4afefff: Oppdatere pakker
-   Updated dependencies [4afefff]
    -   @navikt/sif-common-amplitude@2.7.1
    -   @navikt/sif-common-formik-ds@0.9.4
    -   @navikt/sif-common-soknad-ds@5.3.5
    -   @navikt/sif-common-forms-ds@3.3.3
    -   @navikt/sif-common-core-ds@5.3.3
    -   @navikt/sif-common-utils@3.18.2

## 0.4.2

### Patch Changes

-   af051b61: Diverse pakkeoppdateringer
-   Updated dependencies [af051b61]
    -   @navikt/sif-common-amplitude@2.6.6
    -   @navikt/sif-common-formik-ds@0.9.3
    -   @navikt/sif-common-soknad-ds@5.3.3
    -   @navikt/sif-common-forms-ds@3.3.2
    -   @navikt/sif-common-core-ds@5.3.2
    -   @navikt/sif-common-sentry@0.5.6

## 0.4.1

### Patch Changes

-   e1997dd: Pakkeoppdateringer
-   Updated dependencies [e1997dd]
    -   @navikt/sif-common-amplitude@2.6.5
    -   @navikt/sif-common-formik-ds@0.9.2
    -   @navikt/sif-common-soknad-ds@5.3.2
    -   @navikt/sif-common-forms-ds@3.3.1
    -   @navikt/sif-common-core-ds@5.3.1
    -   @navikt/sif-common-sentry@0.5.5
    -   @navikt/sif-common-utils@3.18.1

## 0.4.0

### Minor Changes

-   1492b0a: Endre unknownRoute feilmelding

### Patch Changes

-   Updated dependencies [1492b0a]
    -   @navikt/sif-common-soknad-ds@5.3.0

## 0.3.0

### Minor Changes

-   451fef8: Legge til sjekk som gjør at bruker sendes til publicPath dersom en kommer til root (/)

### Patch Changes

-   Updated dependencies [451fef8]
    -   @navikt/sif-common-soknad-ds@5.2.0

## 0.2.0

### Minor Changes

-   225b95e: DurationText komponent + oppdatert endringsdialog
-   dd0a865: I hovedsak utvikling av endringsdialog, men noen endringer på fellespakker, f.eks. desimaltid i sif-common-utils

### Patch Changes

-   5101688: Oppdaterte pakker
-   5101688: Oppdatere pakker
-   d99ac0a: Pakkeoppdateringer - objec-hash, uuid
-   Updated dependencies [225b95e]
-   Updated dependencies [dd0a865]
-   Updated dependencies [5101688]
-   Updated dependencies [5101688]
-   Updated dependencies [d99ac0a]
    -   @navikt/sif-common-core-ds@5.3.0
    -   @navikt/sif-common-amplitude@2.6.4
    -   @navikt/sif-common-formik-ds@0.9.1
    -   @navikt/sif-common-forms-ds@4.0.0
    -   @navikt/sif-common-sentry@0.5.4
    -   @navikt/sif-common-soknad-ds@5.1.3
    -   @navikt/sif-common-utils@3.18.0

## 0.1.1

### Patch Changes

-   c735b7f: Oppdatere pakker
-   369914d: Oppdatert pakke av designsystemet
-   Updated dependencies [c735b7f]
-   Updated dependencies [369914d]
-   Updated dependencies [9afe1a5]
-   Updated dependencies [9afe1a5]
    -   @navikt/sif-common-amplitude@2.6.3
    -   @navikt/sif-common-core-ds@6.0.0
    -   @navikt/sif-common-formik-ds@0.9.0
    -   @navikt/sif-common-forms-ds@4.0.0
    -   @navikt/sif-common-sentry@0.5.3
    -   @navikt/sif-common-soknad-ds@6.0.0
    -   @navikt/sif-common-utils@3.17.2

## 0.1.0

### Minor Changes

-   827d044: Diverse UU justeringer

### Patch Changes

-   Updated dependencies [827d044]
    -   @navikt/sif-common-amplitude@2.6.1
    -   @navikt/sif-common-core-ds@5.0.1
    -   @navikt/sif-common-formik-ds@0.8.1
    -   @navikt/sif-common-forms-ds@3.0.1
    -   @navikt/sif-common-sentry@0.5.1
    -   @navikt/sif-common-soknad-ds@5.0.1
    -   @navikt/sif-common-utils@3.16.1
