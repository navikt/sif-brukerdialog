# Innhold og brukeroppførsel

`apps/omsorgsdager-aleneomsorg-dialog` er fasit for tekst, synlig flyt og oppførsel i v1-appen. Dette dokumentet dupliserer ikke fasiten. Les kildene i v1 når et steg flyttes, og kontroller eventuelle avvik direkte mot v1.

## Velkomstside

Kilder:

- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/velkommen/VelkommenPage.tsx`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/velkommen/VelkommenGuideContent.tsx`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/velkommen/OmSøknaden.tsx`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/velkommen/BehandlingAvPersonopplysningerContent.tsx`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/velkommen/i18n/nb.ts`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/velkommen/i18n/nn.ts`

## Steg: Om aleneomsorg for barn

Kilder:

- `apps/omsorgsdager-aleneomsorg-dialog/src/app/søknad/steps/om-omsorgen-for-barn/`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/types/søknadsdata/OmOmsorgenForBarnSøknadsdata.ts`

## Steg: Tidspunkt for aleneomsorg

Kilder:

- `apps/omsorgsdager-aleneomsorg-dialog/src/app/søknad/steps/tidspunkt-for-aleneomsorg/`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/types/søknadsdata/TidspunktForAleneomsorgSøknadsdata.ts`

## Oppsummering

Kilder:

- `apps/omsorgsdager-aleneomsorg-dialog/src/app/søknad/steps/oppsummering/`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/søknad/steps/oppsummering/i18n/nb.ts`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/søknad/steps/oppsummering/i18n/nn.ts`

## Kvittering

Kilder:

- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/kvittering/KvitteringPage.tsx`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/kvittering/i18n/nb.ts`
- `apps/omsorgsdager-aleneomsorg-dialog/src/app/pages/kvittering/i18n/nn.ts`

## Innsending

Sammenlign synlig oppførsel mot v1, men bruk den genererte typen `OmsorgsdagerAleneOmOmsorgenSøknad` fra `@sif/k9-brukerdialog-prosessering-api` som payload-kontrakt.

## Midlertidig tilstand

Innsendingen går mot mockhandleren. Payloaden er ikke sluttverifisert i brukerreisen. Se `STATUS.md`.
