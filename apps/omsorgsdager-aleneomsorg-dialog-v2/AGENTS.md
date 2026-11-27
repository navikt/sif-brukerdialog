# Instrukser for v2-migreringen

## Hva som er fasit

V2-appen skal ikke bruke legacy-komponenter eller pakker fra `@navikt/sif-common-*`.
Dette gjelder også komponenter som kommer indirekte via `@sif/*`-pakker. Legacy-importer
skal erstattes med v2-ekvivalenter i `packages/core`, ikke flyttes bak en ny wrapper.

Les v1-appen i `apps/omsorgsdager-aleneomsorg-dialog` før du endrer tekst, steg eller synlig oppførsel. v1 er fasit for:

- brukerflyt og stegrekkefølge
- bokmål og nynorsk
- validering og feilmeldinger
- betinget visning
- oppsummering

Filer å starte med står i `INNHOLD.md`. Ikke erstatt v1 som fasit med en oppsummering i dokumentasjonen. Hvis v1 og dokumentasjonen avviker, undersøk v1 og kjørende v2-kode før du endrer noe.

Den genererte typen `OmsorgsdagerAleneOmOmsorgenSøknad` fra `@sif/k9-brukerdialog-prosessering-api` er fasit for innsendingens kontrakt. Ikke erstatt den med lokale API-typer eller casts.

## Hva som er ferdig og hva som er midlertidig

- Routing, initialdata, mellomlagring, i18n-rammeverk, velkomstside, kvittering, API-init, MSW, Nais og Docker er grunnlaget som v2-appen bygger videre på.
- «Tidspunkt for aleneomsorg» og oppsummeringen er portert fra v1 med ekte v2-flyt.
- DTO-mappingen bygger payload fra brukerens valgte barn og tidspunkt.

## Når et steg implementeres

1. Les v1-komponenten, i18n-filene, hjelpefunksjonene og typene som tilhører steget.
2. Portér tekst og synlig oppførsel ordrett til RHF og `@sif/soknad-app`.
3. Bruk v2-dialoger fra `@sif/soknad-forms` der de finnes.
4. La mocksteget erstattes, ikke pakkes inn i nytt tilstandslag.
5. Oppdater mappingen fra skjemaverdier til søknadsdata og videre til generert DTO.
6. Legg til målrettede tester for validering, betinget flyt og DTO.

Spørsmål i egne filer skal bare inneholde selve spørsmålet. Overskrifter, `FormLayout.Questions`,
gruppering, synlighetsregler og meldinger knyttet til stegflyten skal ligge i steget.
Spørsmålet eier feltbinding, tekster, validering og feltets beskrivelsetekst.
Legg også betingete spørsmål i egne filer. Hvert skjemaelement, for eksempel en radiogruppe og
en datovelger, skal da ha én ansvarlig spørsmålsfil som bare binder feltet, tekstene og valideringen.
Steg- eller gruppekomponenten eier `watch`, `clearErrors`, overskrift og betinget visning.

Bruk `FormLayout.Content` for toppnivået i steget, `FormLayout.Questions` for spacing mellom spørsmål
og relatert innhold, og `FormLayout.Section` for navngitte seksjoner. Ikke bruk
`FormLayout.Sections` i ny kode. Den gir samme spacing som `FormLayout.Content` og er utdatert.

## Kontrakter i grunnrammen

- `PUBLIC_PATH` normaliseres til avsluttende `/` ved klientens miljøgrense i `src/app/setup/appEnv.ts`. Bruk `getAppEnv().PUBLIC_PATH` videre.
- Generelle søker- og barnmocks hentes fra `@sif/api/mock-data`.
- MSW-handlere skal være eksplisitte. Ikke legg tilbake en catch-all-handler som skjuler manglende API-oppsett.
- `public/mockServiceWorker.js` skal være generert med samme MSW-versjon som appen, og Vite-proxyen skal følge `PUBLIC_PATH`.
- Vite-, CSS-, Tailwind- og dependency-riggen skal sammenlignes med en fungerende v2-app før den endres.
- Docker bygger v2-workspacen. Nais-navn må vurderes mot v1/v2-overgang per miljø, ikke utledes bare fra mappenavnet.
- Genererte controller-typer og Zod-validering skal bli stående i innsendingen.
- Innsendingsfeil skal rapporteres med analytics og `appLogger`, uten persondata eller payload i logger.

Denne filen beskriver forsøket i denne appen. Ikke utled felles repo-regler fra den før mønsteret er prøvd med ekte skjemasteg og minst én migrering til.
Les `STATUS.md` før du fortsetter, og oppdater den når et mocksteg, en testet kontrakt eller payload-mappingen endres.

## Verifisering

Kjør fra appen:

```bash
pnpm lint:tsc
pnpm lint:eslint
pnpm test
pnpm build
```

Ikke kjør Playwright i denne oppgaven. Brukeren kjører den.

## Avhengigheter

Nye avhengigheter legges bare inn i `package.json`. Ikke kjør `pnpm install`, og ikke endre `pnpm-lock.yaml`. Det gjør brukeren.
