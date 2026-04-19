# Verifikasjonsplan: omsorgspengesoknad-v2 vs v1

**Mål:** Verifisere at all tekst og oppførsel i v2 matcher v1.

## 1. Tekst-sammenligning (første ledd)

### 1.1 Mangler i v2 som finnes i v1

| Nøkkel                                                          | v1                                          | v2                                                             | Status       |
| --------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------------------- | ------------ |
| `steg.omBarnet.spm.barnetSøknadenGjelder.registrerteBarn.label` | "Barn registrert på deg"                    | **I `@sif/soknad-forms`**                                      | ✓ (eksternt) |
| `steg.omBarnet.spm.barnetSøknadenGjelder.født`                  | "Født {dato}"                               | **I `@sif/soknad-forms`**                                      | ✓ (eksternt) |
| `steg.omBarnet.spm.barnetSøknadenGjelder.info`                  | "Hvis du skal søke for flere barn..."       | **I `@sif/soknad-forms`**                                      | ✓ (eksternt) |
| `steg.omBarnet.alert.trengerIkkeSøke.tittel`                    | "Du trenger ikke søke for {barnetsFornavn}" | **MANGLER**                                                    | ⚠️           |
| `steg.omBarnet.alert.trengerIkkeSøke.tekst`                     | "Du har allerede et gyldig vedtak..."       | **MANGLER**                                                    | ⚠️           |
| `step.oppsummering.sendSøknad`                                  | "Send søknad"                               | **MANGLER** (brukes i v1 i oppsummering, men kanskje flyttet?) | ⚠️           |
| `page.kvittering.info.4.1`                                      | "Når søknaden er ferdigbehandlet..."        | **ANNET FORMAT** (kombinert i v2)                              | ⚠️           |
| `page.kvittering.info.4.2`                                      | "Du kan sjekke saksbehandlingstiden her."   | **ANNET FORMAT** (kombinert i v2)                              | ⚠️           |
| `step.omBarnet.stepTitle`                                       | "Barn"                                      | **ANNET NØKKELNAVN** → `step.omBarnet.title`                   | ⚠️           |
| `step.legeerklaering.stepTitle`                                 | "Legeerklæring"                             | **ANNET NØKKELNAVN** → `step.legeerklaering.title`             | ⚠️           |
| `step.deltBosted.stepTitle`                                     | "Delt fast bosted"                          | **ANNET NØKKELNAVN** → `step.deltBosted.title`                 | ⚠️           |
| `step.oppsummering.stepTitle`                                   | "Oppsummering"                              | **ANNET NØKKELNAVN** → `step.oppsummering.title`               | ⚠️           |

### 1.2 Tekster med ulik ordlyd

| Nøkkel                                                                     | v1                                                                                                            | v2             | Merknad       |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- | -------------- | ------------- |
| `steg.omBarnet.spm.høyereRisikoForFravær.label`                            | "Har du høyere risiko for fravær på jobb på grunn av barnets sykdom eller funksjonshemning? " (med mellomrom) | Uten mellomrom | ⚠️            |
| `omBarnetForm.validation.høyereRisikoForFraværBeskrivelse.stringIsTooLong` | 2000 tegn                                                                                                     | **1000 tegn**  | ⚠️ Forskjell! |

### 1.3 Nøkler med ulikt prefiks (kan være intensjonelt)

| v1 nøkkel               | v2 nøkkel                           |
| ----------------------- | ----------------------------------- |
| `steg.omBarnet.*`       | `omBarnetSteg.*` + `omBarnetForm.*` |
| `steg.legeerklaering.*` | `legeerklæringSteg.*`               |
| `steg.deltBosted.*`     | `deltBostedSteg.*`                  |
| `steg.oppsummering.*`   | `oppsummeringSteg.*`                |
| `page.velkommen.*`      | `page.velkommen.*` (likt)           |
| `page.kvittering.*`     | `page.kvittering.*` (likt)          |

---

## 2. Hva som er likt ✓

### Velkommen-side

- Alle 21 nøkler i velkommen samsvarer 1:1 mellom v1 og v2

### Om-barnet steg

- Alle spørsmålstekster (barnetSøknadenGjelder, fødselsdato, fødselsnummer, navn, relasjon, sammeAdresse, kroniskEllerFunksjonshemming, høyereRisikoForFravær, høyereRisikoForFraværBeskrivelse)
- Alle valideringstekster
- Alle alert-tekster (ikkeSammeAdresse, ikkeKronisk, ikkeHøyereRisiko)

### Legeerklæring steg

- counsellorpanel.1 og .2 samsvarer
- vedlegg.label/knappLabel samsvarer

### Delt bosted steg

- counsellorpanel samsvarer
- vedlegg.label samsvarer

### Oppsummering steg

- Alle oppsummeringstekster samsvarer
- Alle innsendingFeilet-tekster samsvarer
- bekrefterOpplysninger samsvarer

### Kvittering

- Alle nøkler samsvarer (bortsett fra at list formatet er annerledes)

---

## 3. Gjenstår å sjekke (funksjonelt)

1. **TrengerIkkeSøke-alert** - Finnes i v1, mangler i v2. Er dette implementert?
2. **RegistrerteBarn-label** - Brukes i v1 ved visning av barn. Er dette med?
3. **Send søknad-knapp** - Er teksten "Send søknad" flyttet til en annen plass?
4. **Max length** - Er 2000 → 1000 tegn en bevisst endring?

---

## 4. Anbefalt fremgangsmåte

1. Bekreft hva som er bevisste endringer (nøkkelnavn, max length)
2. Legg til manglende tekster i v2
3. Verifiser at manglende funksjonalitet er ivaretatt (TrengerIkkeSøke, registrerteBarn)
4. Gå videre til funksjonell verifikasjon når tekst er på plass
