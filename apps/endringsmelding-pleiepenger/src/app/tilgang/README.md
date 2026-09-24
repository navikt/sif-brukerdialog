# Tilgangskontroll for endringsmelding pleiepenger

Spesifikasjon for reglene som avgjør om en bruker kan bruke endringsmeldingen.
Implementasjonen i denne mappen er fasit, og skal kunne flyttes til backend.

Kjøres i dag i frontend bak feature-toggelen `SIF_PUBLIC_NY_TILGANGSKONTROLL`.

## Inn og ut

**Inn**

| Verdi | Kilde |
|---|---|
| Sakene til bruker | innsyn |
| Arbeidsgivere med ansettelsesperioder | AA-registeret, hentes for oppslagsperioden fra fase 1 |
| Tillatt endringsperiode | regnes ut fra dagens dato |

**Ut** — tilgang, eller en liste med `IngenTilgangÅrsak`. Ved avslag fra fase 2
også `{ erArbeidstaker, erFrilanser, erSN }` som loggmetadata.

## Definisjoner som må implementeres

**Tillatt endringsperiode** — fra den 1. i måneden tre måneder tilbake, til og
med 12 måneder fram fra inneværende måned. Begge ender settes til midnatt.
Se `utils/endringsperiode.ts`.

**Aktuell sak** — har minst én søknadsperiode inn i endringsperioden.

**Eldre sak** — alle søknadsperioder slutter før endringsperioden starter. Eldre
saker skal ikke blokkere, og ikke telle med i vurderingen av om bruker har flere
saker. De skal skilles ut for å kunne gi ulik melding ved «ingen sak» og «bare
gamle saker».

**Sak uten søknadsperioder** er ikke eldre. Den skal gi `harIngenPerioder`.

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

**9.** Gjelder kun arbeidsgivere som **ikke** finnes i saken. Tell bare
ansettelser som overlapper en søknadsperiode. Mer enn én gir avslag.

## Krav til implementasjonen

- Sammenlign arbeidsgivere kun på organisasjonsnummer
  (`finnesArbeidsgiverIK9Sak`). Bekreft mot kildedataene at saken alltid har
  orgnr — uten orgnr regnes arbeidsgiver som ukjent.
- Bruk isouke (mandag–søndag). I JVM: `WeekFields.ISO`.
- Gjør alle datosammenligninger på dagsnivå.
- Bruk samme dato og tidssone som frontend når endringsperioden regnes ut.
- Behold `IngenTilgangÅrsak`-verdiene i kontrakten ut. Frontend har egen melding
  per årsak.
- Hold loggmetadataen utenfor reglene. Kriteriet der er timer over null, altså et
  annet kriterium enn regel 7.
- Port `getSamletDateRangeForK9Saker` og `finnesArbeidsgiverIK9Sak` fra
  `utils/k9SakUtils.ts`.

## Testgrunnlag

`__tests__/` har 50 tester skrevet som tabeller av tilfeller med forventet
årsakliste, og kan oversettes direkte til backend-tester.

| Fil | Dekker |
|---|---|
| `vurderSaker.test.ts` | fase 1 |
| `vurderArbeidsforhold.test.ts` | fase 2, inkludert flere samtidige årsaker |
| `lesSøknadsperioder.test.ts` | klassifisering og uleselige saker |
| `ingenTilgangMeta.test.ts` | loggmetadata |
