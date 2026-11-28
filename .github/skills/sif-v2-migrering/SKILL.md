---
name: sif-v2-migrering
type: action
description: Migrer en hel søknadsapp fra v1 (@navikt/sif-common-*) til v2 (@sif/soknad-app) — fasit, arbeidsflyt, snubletråder og sjekkliste før merge.
---

# sif-v2-migrering

## Bruk når

- En v1-app skal få en `-v2`-motpart.
- En migrert app skal verifiseres før merge.

Regler for hvordan en v2-app er bygd, står i `sif-soknad-setup`, `sif-soknad-add-step` og `sif-soknad-oppsummering`. Denne skillen dekker det som er særskilt for migrering. Enkeltdialoger porteres med `sif-dialog-migration`.

## Fasit

- **v1-appen** er fasit for flyt, stegrekkefølge, tekst (nb og nn), validering, betinget visning og oppsummering.
- **Samtykket på velkomstsiden** er et bevisst unntak. En migrert app bruker teksten og komponenten fra v2-rammeverket. Ordlyden i v1 skal ikke kopieres til v2.
- **Den genererte DTO-typen** fra `@sif/*-api` er fasit for innsendingen. Ikke lag lokale API-typer eller casts.
- **En fungerende v2-app** (se referanseappene i `sif-soknad-setup`) er fasit for Vite-, CSS-, Tailwind-, MSW- og Docker-riggen.

## Overgang fra v1 til v2

- Gjenopptak av v1-mellomlagring er ikke et krav. v1- og v2-mellomlagring har ulike skjemaer, og det er akseptabelt at brukeren må starte på nytt etter migreringen.
- Bruk en v2-versjon som gjør den gamle blob-en ugyldig. Verifiser at appen da starter på velkomstsiden og ikke prøver å bruke felt fra v1-formatet.
- Sammenlign v1 sin invalidering av mellomlagring med v2. Hvis søknaden avhenger av endringer i oppstartsdata, bruk `mellomlagringGrunnlag` med ikke-sensitive, grove verdier.

## Arbeidsflyt

1. Sett opp appskallet etter `sif-soknad-setup`. Sammenlign riggen med en v2-app, ikke med v1.
2. Port ett steg om gangen: Les v1-komponenten, i18n-filene, hjelpefunksjonene og typene først. Oppdater mappingen til søknadsdata og DTO, og legg til tester for mappingen.
3. Kjør `pnpm check:types`, `pnpm lint:eslint`, `pnpm test` og `pnpm build` i appen etter hvert steg. Playwright kjøres av utvikleren.
4. Arbeidsnotater (status, instrukser) kan ligge i appen underveis. Skriv dem etter at koden er ferdig, ikke før. Flytt varig lærdom til skills før merge, og slett notatene når appen er verifisert.

## Snubletråder

- **Appskallet er mer enn ruter.** v1 sin `SoknadApplication` og `App.tsx` har innstillinger for appstatus, språkvelger og analytics. Alle skal ha en v2-motpart. At en env-variabel ligger i Nais, betyr ikke at koden bruker den.
- **Legacy kommer inn bakveien.** Kopierte filer tar med seg `@navikt/sif-common-*`, også CSS-importer som `sif-ds-theme.css` (v2-versjonen ligger i `@sif/soknad-ui`). Legacy skal erstattes, ikke pakkes inn i en wrapper.
- **Indirekte avhengigheter.** Bygget kan virke selv om `@sif/soknad-forms` eller `@sif/validation` bare kommer med via en annen pakke. Hver pakke appen importerer fra, skal stå i appens `package.json`.
- **Tekst skrives om.** Agenten «forbedrer» formuleringer. Kopier ordrett. Bevisste avvik skal stå i PR-en.
- **Direkte `useIntl`.** Når appen eller pakken allerede har en intl-hook, for eksempel `useAppIntl` eller `useSifSoknadFormsIntl`, skal migrert kode bruke den også for `locale`. Bruk `useIntl` direkte bare hvis det ikke finnes en lokal wrapper, eller når selve wrapperen defineres i `i18n/index.tsx`.
- **Ekstra grener rundt delte komponenter.** Sjekk hva v2-komponenten gjør selv (for eksempel med en tom liste) før du legger til egne varianter.
- **Delte pakker.** En endring i `packages/core` for å dekke et behov i én app gjelder alle apper. Den er et avvik fra v1 og skal stå i PR-en.
- **Notater i utakt med koden.** Status som skrives før koden er endelig, blir feil (for eksempel en annen tallgrense enn den koden bruker).

## Verifiser før merge

- [ ] Ingen treff på `sif-common` i appens `src`, `package.json` og CSS
- [ ] `SøknadAppProvider` dekker alle innstillinger fra v1 sitt appskall
- [ ] Alle `SIF_PUBLIC_*`-variabler i v1 sine Nais-filer finnes i v2 og er enten brukt i koden eller bevisst utelatt
- [ ] Endringer i oppstartsdata som gjør en mellomlagret søknad ugyldig, har en v2-mekanisme i `mellomlagringGrunnlag`
- [ ] V1-mellomlagring blir ignorert og appen starter ryddig på velkomstsiden
- [ ] `Dockerfile` og `Dockerfile.dockerignore` er sammenlignet med en fungerende v2 Vite-app og bruker samme base images og oppsett
- [ ] nb- og nn-tekster er sammenlignet med v1, og avvik står i PR-en
- [ ] Kode i appen eller pakken bruker lokal intl-hook i stedet for direkte `useIntl` når en slik hook finnes
- [ ] Endringer i delte pakker står i PR-en
- [ ] MSW har eksplisitte handlere, uten catch-all
- [ ] Payload-testen sammenligner hele request-body-en, ikke bare deler av DTO-en. Den dekker v1-paritet og appens bekreftelsesverdier.
- [ ] Playwright-testen fanger og validerer innsendingens request-body minst én gang
- [ ] Initialdatafeil er vurdert eksplisitt for logging. 401/403 håndteres som tilgangsfeil, mens klientparsefeil og nettverksfeil må vurderes separat fra feil backend allerede logger. Ikke logg persondata eller request-/response-body.
- [ ] Arbeidsnotatene i appen stemmer med koden, og varig lærdom er flyttet til skills
