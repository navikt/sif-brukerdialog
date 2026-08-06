# Oppgavetyper i brukerdialog

Brukerdialog-oppgaver er oppgaver som sendes til brukerne via Min Side og Aktørregisteret. Hver oppgavetype representerer noe brukeren må gjøre eller bekrefte knyttet til ytelsen sin.

## Oversikt

| Oppgavetype                                                                    | Ytelse                          | Kategori | Lovreferanse                                                                                                                                                                                                                                 | Beskrivelse                                                                                                                                                                                         |
| ------------------------------------------------------------------------------ | ------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [BEKREFT_ENDRET_STARTDATO](oppgavetyper/BEKREFT_ENDRET_STARTDATO.md)           | Ungdomsytelse                   | Varsel   | [§ 8 jf. § 3 og § 6 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse](https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182)                                                                                              | Bruker kan uttale seg om ny startdato i ungdomsprogrammet                                                                                                                                           |
| [BEKREFT_ENDRET_SLUTTDATO](oppgavetyper/BEKREFT_ENDRET_SLUTTDATO.md)           | Ungdomsytelse                   | Varsel   | [§ 8 jf. § 3 og § 6 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse](https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182)                                                                                              | Bruker kan uttale seg om ny sluttdato i ungdomsprogrammet                                                                                                                                           |
| [BEKREFT_ENDRET_PERIODE](oppgavetyper/BEKREFT_ENDRET_PERIODE.md)               | Ungdomsytelse                   | Varsel   | [§ 8 jf. § 3 og § 6 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse](https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182)                                                                                              | Bruker kan uttale seg om endring i periode (start, slutt eller fjerning)                                                                                                                            |
| [BEKREFT_AVVIK_REGISTERINNTEKT](oppgavetyper/BEKREFT_AVVIK_REGISTERINNTEKT.md) | Ungdomsytelse, Aktivitetspenger | Varsel   | - **Ungdomsytelse:** [§ 11 i Forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse (gjelder fra 1. august 2025)](https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182)<br>- **Aktivitetspenger:** ingen lovreferanse klar ennå | Bruker kan uttale seg som avvik i inntekt eller ytelse. Avvik i inntekt benyttes for å dokumentere forskjell mellom faktisk inntekt og inntekt registrert i Arbeidsgiver- og arbeidstakerregisteret |
| [RAPPORTER_INNTEKT](oppgavetyper/RAPPORTER_INNTEKT.md)                         | Ungdomsytelse, Aktivitetspenger | Oppgave  | - **Ungdomsytelse:** [§ 11 i Forskrift om forsøk med ungdomsprogram og ungdomsprogramytelse (gjelder fra 1. august 2025)](https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182)<br>- **Aktivitetspenger:** ingen lovreferanse klar ennå | Bruker rapporterer inntekt for foregående måned                                                                                                                                                     |
| [SØK_YTELSE](oppgavetyper/SØK_YTELSE.md)                                       | Ungdomsytelse                   | Oppgave  | [§ 8 jf. § 3 og §§ 6, 9 og 10 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse](https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182)                                                                                    | Bruker oppfordres til å søke om ytelsen                                                                                                                                                             |
| [BEKREFT_BOSTED](oppgavetyper/BEKREFT_BOSTED.md)                               | Aktivitetspenger                | Varsel   |                                                                                                                                                                                                                                              | Bruker kan uttale seg om opplysninger vedrørende bosted og om bruker bor i Trondheim                                                                                                                |
| [BEKREFT_AUTOMATISK_OPPHOR](oppgavetyper/BEKREFT_AUTOMATISK_OPPHOR.md)         | Ungdomsytelse                   | Varsel   | [§ 8 jf. § 3 i Forskrift om forsøk om ungdomsprogram og ungdomsprogramytelse](https://lovdata.no/dokument/LTI/forskrift/2025-06-20-1182)                                                                                                     | Bruker varsles om opphør ved maksdato (260/300 dager)                                                                                                                                               |

Skjermbilder for oppgavene er tilgjengelig via storybook:
https://navikt.github.io/sif-brukerdialog/ung-innsyn-storybook/

## Kategorier

**Varsel** — oppgaver som varsler brukeren om en endring og ber om bekreftelse. Flyten styres via Min Side-varsel.

**Oppgave** — oppgaver der brukeren aktivt skal registrere noe (f.eks. rapportere inntekt eller søke ytelse).

## Statuser

Alle oppgavetyper følger samme statusmodell:

| Status    | Beskrivelse                                    |
| --------- | ---------------------------------------------- |
| `ULØST`   | Oppgaven er opprettet og venter på svar        |
| `LØST`    | Bruker har svart og oppgaven er behandlet      |
| `AVBRUTT` | Oppgaven ble avbrutt (f.eks. av saksbehandler) |
| `UTLØPT`  | Fristen gikk ut uten svar                      |

## Felles kontrakt

Alle oppgavetyper implementerer `OppgavetypeDataDto` og returnerer sin `OppgaveType` via `oppgavetype()`-metoden.

Kode: [`kontrakt/src/main/java/no/nav/ung/brukerdialog/kontrakt/oppgaver/`](../../kontrakt/src/main/java/no/nav/ung/brukerdialog/kontrakt/oppgaver/)
