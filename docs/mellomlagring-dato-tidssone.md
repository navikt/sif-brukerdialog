# Mellomlagring og tidssone-problematikk for datoer

> Status: Kjent teknisk gjeld — skal løses som del av mellomlagrings-rewrite

---

## Problemet

`Date`-objekter i formValues serialiseres via `JSON.stringify` til fulle UTC datetime-strenger
(f.eks. `"2023-01-03T23:00:00.000Z"`), selv om feltet kun representerer en dato uten klokkeslett.

Norsk midnatt 4. januar (UTC+1) = `2023-01-03T23:00:00.000Z` i UTC.

Når mellomlagringen leses opp på et annet tidspunkt eller i en annen tidssone, konverterer
`storageParser` datetime-strengen tilbake via `new Date(value)` — og resultatet avhenger av
tidssonen til nettleseren:

| Tidssone                             | Resultat  | Status |
| ------------------------------------ | --------- | ------ |
| Norge (UTC+1/+2) — samme som lagring | 4. januar | ✅     |
| Norge — DST-overgang i mellomtiden   | 3. januar | ❌     |
| Annen tidssone (f.eks. UTC-8)        | 3. januar | ❌     |

### Berørte felttyper

Alle felt i formValues som er `Date`-objekter, typisk:

- `DateRange.from` / `DateRange.to` (ferieuttak, utenlandsopphold, tidsperioder)
- `ansattFom` / `ansattTom` på arbeidsforhold og frilansoppdrag

Felter som allerede lagres som `ISODate`-strenger (`YYYY-MM-DD`) er **ikke** berørt:
`periodeFra`, `periodeTil`, `barnetsFødselsdato` o.l.

---

## Når oppstår feilen i praksis?

**Scenario 1 — tidssonebytte:** Bruker oppretter mellomlagring i én tidssone og åpner den i en annen. Lite sannsynlig for norske brukere.

**Scenario 2 — DST-overgang (mest realistisk):** Mellomlagring opprettes i norsk sommertid (UTC+2) og åpnes etter at vintertid har startet (UTC+1). Med 3 dagers TTL på mellomlagring er vinduet ett spesifikt 24-timersintervall per år (siste søndag i oktober). Siden dette gjelder alle Date-felt i alle søknadsdialoger, er det garantert å ramme noen brukere hvert år.

---

## Årsak og lagringsflyt

```
formValues (Date-objekter)
  → JSON.stringify (axios default)
  → Date.toISOString() = UTC datetime-streng  ← problem oppstår her
  → lagret i mellomlagring-API

mellomlagring-API
  → storageParser (custom transformResponse)
  → new Date(datetimeStreng)                  ← TZ-avhengig parsing
  → Date-objekter i formValues
```

Nøkkelfiler:

- `packages/sif-common-api/src/api/services/mellomlagringService.ts` — lagring (ingen custom replacer)
- `packages/sif-common-core-ds/src/utils/persistence/storageParser.ts` — henting (parser)

---

## Mulige løsninger

### A: Heuristisk `transformRequest` (kortsiktig)

Legg til en custom JSON-replacer i `getMellomlagringService` som konverterer `Date`-objekter
med lokal tid = midnatt til `YYYY-MM-DD`-strenger. Oppdater `storageParser` til å konvertere
`YYYY-MM-DD` → `Date` via `ISODateToDate`.

- ✅ Sentral fix i én fil, alle apper får det automatisk
- ✅ Backward-kompatibelt med eksisterende data (3 dagers TTL)
- ⚠️ Heuristikken er ikke 100% sikker for tidsstempler ved lokal midnatt

### B: Endre formValues-typer til `ISODate`-strenger (anbefalt, langsiktig)

Erstatt `Date`-objekter med `ISODate` (`string`) for alle date-only felter i formValues.
Datepicker-komponenter tar allerede strenger som input — konverteringen til `Date` skjer
internt i komponenten, ikke i formValues.

- ✅ Eliminerer problemet strukturelt — ingen `Date`-objekter å serialisere feil
- ✅ Passer naturlig inn i RHF-migreringen
- ⚠️ Krever endring i alle dialogs med `DateRange`-felter

---

## Anbefaling

Løs dette som del av mellomlagrings-rewrite / RHF-migreringen (Løsning B). Sørg for at nye
formValues bruker `ISODate`-strenger fremfor `Date`-objekter for alle date-only felter.
