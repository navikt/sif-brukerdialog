# Tilgangskontroll for endringsmelding pleiepenger

Spesifikasjon for reglene som avgjør om en bruker kan bruke endringsmeldingen.
Implementasjonen i denne mappen er fasit, og skal kunne flyttes til backend.

Kjøres i dag i frontend.

## Inn og ut

**Inn**

| Verdi | Kilde |
|---|---|
| Sakene til bruker | innsyn (`innsyn/sak`) |
| Arbeidsgivere med ansettelsesperioder | AA-registeret (`oppslag/arbeidsgiver` med `inkluderAlleAnsettelsesperioder=true`), hentes for oppslagsperioden fra fase 1. Gir også historiske perioder. `ansattFom`/`ansattTom` kan mangle |
| Tillatt endringsperiode | regnes ut fra dagens dato |

**Ut** — tilgang, eller en liste med `IngenTilgangÅrsak`. Ved avslag fra fase 2
også `{ erArbeidstaker, erFrilanser, erSN }` som loggmetadata. Siden
`IngenTilgangPage` viser bare melding for den første årsaken.

## Definisjoner som må implementeres

**Tillatt endringsperiode** — fra den 1. i måneden tre måneder tilbake, til og
med siste dag i måneden 12 måneder fram. Begge ender settes til midnatt.
Eksempel: 2026-10-26 gir 2026-07-01–2027-10-31, og 2027-02-10 gir
2026-11-01–2028-02-29. Se `utils/endringsperiode.ts`.

**Aktuell sak** — alle saker som ikke er eldre. Det gjelder også saker uten
søknadsperioder og saker som ligger etter endringsperioden. De gir avslag i
fase 1.

**Eldre sak** — alle søknadsperioder slutter før endringsperioden starter. Eldre
saker skal ikke blokkere, og ikke telle med i vurderingen av om bruker har flere
saker. De skal skilles ut for å kunne gi ulik melding ved «ingen sak» og «bare
gamle saker».

**Sak uten søknadsperioder** er ikke eldre. Den skal gi `harIngenPerioder`.

**Sak med ugyldig format** — saken består ikke `verifyK9Format`. Søknadsperiodene
leses likevel separat (`lesSøknadsperioder`). Hvis de kan leses og saken er
eldre, legges den blant de eldre sakene. Ellers er den aktuell og gir
`harUgyldigK9FormatSak`.

**Kjent arbeidsgiver** — en arbeidstaker i saken med minst én periode over 0
normaltimer. Andre arbeidstakere regnes som ukjente. Søknadsflyten behandler en
arbeidsgiver med bare 0 timer som et ukjent arbeidsforhold, og tilgangskontrollen
må gjøre det samme.

**SN i saken** — SN-info med minst én periode over 0 normaltimer. SN-info der
alle periodene har 0 normaltimer, regnes som fraværende.

Begge filtrene ligger i `fjernK9SakArbeidstidMedIngenNormalarbeidstid`
(`utils/parseK9Format.ts`) og kjøres før reglene.

**Åpne ansettelsesperioder** — en manglende `from` eller `to` fylles inn med
perioden det sammenlignes mot (`ensureDateRange`). Ved to ansettelser samme
isouke er det endringsperioden, og ved flere ansettelser hos ukjent
arbeidsgiver er det søknadsperioden.

**Oppslagsperiode** — snittet av sakens samlede søknadsperiode og
endringsperioden. Regnes ut i fase 1 og brukes til arbeidsgiveroppslaget. Må ikke
regnes ut på nytt et annet sted.

## Rekkefølge

```
klassifiser aktuell/eldre  →  fase 1  →  hent arbeidsgivere  →  fase 2
```

## Fase 1 — vurderSaker

Evaluer i rekkefølge. Stopp ved første treff og returner én årsak.

| Regel | Årsak |
|-------|-------|
| Ingen saker overhodet | `harIngenSak` |
| Kun eldre saker | `søknadsperioderUtenforTillattEndringsperiode` |
| Uleselig format blant de aktuelle sakene | `harUgyldigK9FormatSak` |
| Flere aktuelle saker (eldre teller ikke) | `harMerEnnEnSak` |
| Saken har ingen søknadsperioder | `harIngenPerioder` |
| Tomt snitt mot endringsperioden | `søknadsperioderUtenforTillattEndringsperiode` |

Ved tilgang: returner saken og oppslagsperioden.

## Fase 2 — vurderArbeidsforhold

Evaluer alle tre. Samle årsakene i denne rekkefølgen.

| Regel | Årsak |
|-------|-------|
| Saken har SN-perioder | `harArbeidstidSomSelvstendigNæringsdrivende` |
| To ansettelser samme isouke med opphold | `enArbeidsgiverToAnsettelserSammeUkeMedOpphold` |
| Flere ansettelser hos ukjent arbeidsgiver | `harFlereAnsettelsesforholdHosUkjentArbeidsgiver` |

**SN-perioder.** Slår til når saken har SN (se definisjonen over), altså minst
én SN-periode over 0 normaltimer. SN med bare 0 normaltimer gir ikke avslag.

**To ansettelser samme isouke med opphold.** Gjelder kun arbeidsgivere som finnes i saken. Klipp ansettelsesperiodene
til endringsperioden. Slår til når en periode starter i samme isouke som den
forrige sluttet, med minst én ledig dag mellom.

Sammenlign hver periode mot den seneste sluttdatoen som er dekket så langt, ikke
mot forrige periode. Perioder kan overlappe, og et opphold kan være dekket av en
tidligere periode.

**Flere ansettelser hos ukjent arbeidsgiver.** Gjelder kun arbeidsgivere som **ikke** finnes i saken. Klipp
søknadsperiodene til endringsperioden. Tell ansettelser som overlapper en
søknadsperiode. En overlapp på én dag teller. Mer enn én ansettelse gir avslag.

## Krav til implementasjonen

- Sammenlign arbeidsgivere kun på organisasjonsnummer
  (`finnesArbeidsgiverIK9Sak`), og bare mot kjente arbeidsgivere (se
  definisjonen over). `verifyK9Format` godtar arbeidstakere med bare
  `norskIdentitetsnummer` (privat arbeidsgiver). En slik arbeidstaker matcher
  aldri, og arbeidsgiveren regnes som ukjent.
- Bruk isouke (mandag–søndag). I JVM: `WeekFields.ISO`.
- Gjør alle datosammenligninger på dagsnivå.
- Frontend bruker nettleserens klokke. Backend skal bruke `Europe/Oslo` og regne
  ut endringsperioden én gang per vurdering.
- Behold `IngenTilgangÅrsak`-verdiene i kontrakten ut. Frontend har egen melding
  per årsak.
- Hold loggmetadataen utenfor reglene. Den skal aldri påvirke om bruker får
  tilgang.
- Port `getSamletDateRangeForK9Saker` og `finnesArbeidsgiverIK9Sak` fra
  `utils/k9SakUtils.ts`.

## Testgrunnlag

Testene i `__tests__/` er skrevet som tabeller med forventet årsakliste. De kan
oversettes direkte til backend-tester.

| Fil | Dekker |
|---|---|
| `vurderSaker.test.ts` | fase 1 |
| `vurderArbeidsforhold.test.ts` | fase 2, inkludert flere samtidige årsaker |
| `lesSøknadsperioder.test.ts` | klassifisering og uleselige saker |
| `ingenTilgangMeta.test.ts` | loggmetadata |
