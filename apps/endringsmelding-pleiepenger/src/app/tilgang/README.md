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
Eksempel: 2026-10-26 gir 2026-07-01–2027-10-31. Se `utils/endringsperiode.ts`.

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

**Åpne ansettelsesperioder** — en manglende `from` eller `to` fylles inn med
perioden det sammenlignes mot (`ensureDateRange`). I regel 8 er det
endringsperioden, og i regel 9 er det søknadsperioden.

**Oppslagsperiode** — snittet av sakens samlede søknadsperiode og
endringsperioden. Regnes ut i fase 1 og brukes til arbeidsgiveroppslaget. Må ikke
regnes ut på nytt et annet sted.

## Rekkefølge

```
klassifiser aktuell/eldre  →  fase 1  →  hent arbeidsgivere  →  fase 2
```

## Fase 1 — vurderSaker

Evaluer i rekkefølge. Stopp ved første treff og returner én årsak.

| # | Regel | Årsak |
|---|-------|-------|
| 1 | Ingen saker overhodet | `harIngenSak` |
| 2 | Kun eldre saker | `søknadsperioderUtenforTillattEndringsperiode` |
| 3 | Uleselig format blant de aktuelle sakene | `harUgyldigK9FormatSak` |
| 4 | Flere aktuelle saker (eldre teller ikke) | `harMerEnnEnSak` |
| 5 | Saken har ingen søknadsperioder | `harIngenPerioder` |
| 6 | Tomt snitt mot endringsperioden | `søknadsperioderUtenforTillattEndringsperiode` |

Ved tilgang: returner saken og oppslagsperioden.

## Fase 2 — vurderArbeidsforhold

Evaluer alle tre. Samle årsakene i denne rekkefølgen.

| # | Regel | Årsak |
|---|-------|-------|
| 7 | Saken har SN-perioder | `harArbeidstidSomSelvstendigNæringsdrivende` |
| 8 | To ansettelser samme isouke med opphold | `enArbeidsgiverToAnsettelserSammeUkeMedOpphold` |
| 9 | Flere ansettelser hos ukjent arbeidsgiver | `harFlereAnsettelsesforholdHosUkjentArbeidsgiver` |

**7.** Slår til når det finnes SN-perioder i saken, uansett antall timer. Også
perioder med null timer.

**8.** Gjelder kun arbeidsgivere som finnes i saken. Klipp ansettelsesperiodene
til endringsperioden. Slår til når en periode starter i samme isouke som den
forrige sluttet, med minst én ledig dag mellom.

Sammenlign hver periode mot den seneste sluttdatoen som er dekket så langt, ikke
mot forrige periode. Perioder kan overlappe, og et opphold kan være dekket av en
tidligere periode.

**9.** Gjelder kun arbeidsgivere som **ikke** finnes i saken. Klipp
søknadsperiodene til endringsperioden. Tell ansettelser som overlapper en
søknadsperiode. En overlapp på én dag teller. Mer enn én ansettelse gir avslag.

## Krav til implementasjonen

- Sammenlign arbeidsgivere kun på organisasjonsnummer
  (`finnesArbeidsgiverIK9Sak`). `verifyK9Format` godtar arbeidstakere med bare
  `norskIdentitetsnummer` (privat arbeidsgiver). En slik arbeidstaker matcher
  aldri, og arbeidsgiveren regnes som ukjent.
- Bruk isouke (mandag–søndag). I JVM: `WeekFields.ISO`.
- Gjør alle datosammenligninger på dagsnivå.
- Frontend bruker nettleserens klokke. Backend skal bruke `Europe/Oslo` og regne
  ut endringsperioden én gang per vurdering.
- Behold `IngenTilgangÅrsak`-verdiene i kontrakten ut. Frontend har egen melding
  per årsak.
- Hold loggmetadataen utenfor reglene. Kriteriet der er minst én periode med
  `jobberNormaltTimerPerDag > 0`. Det er et annet kriterium enn regel 7.
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
