---
name: sif-date-handling
type: referanse
scope: v2-apper som bruker @sif/api, @sif/soknad, sif-utils og tilhørende pakker
description: Bruk denne skillen for å fange opp og rette feilaktig datoparsing fra backend i v2-apper — tidssoneproblemer, feil bruk av Date/dayjs og blandede ISODate/ISODateTime-verdier i frontend.
---

# sif-date-handling

> **Scope:** Gjelder v2-applikasjoner som bruker `@sif/api`, `@sif/soknad`, `sif-utils` og tilhørende pakker.

## Bruk når

- En verdi fra backend parses med `new Date(...)`, `dayjs(...)` eller `dayjs.utc(...)` uten å ta hensyn til tidssone.
- Det brukes kalenderoperasjoner (`add`, `startOf`, `endOf`) på et tidspunkt som ikke er konvertert til `Europe/Oslo` først.
- En `ISODate` (`YYYY-MM-DD`) behandles som et `Date`-objekt.
- Formattering skjer uten `.tz('Europe/Oslo')` og kan vise feil tid for brukere utenfor norsk tidssone.
- Backend returnerer en verdi uten eksplisitt tidssone (naiv streng) og koden antar UTC eller lokal tid.

## Leveranse

- Identifiser om feilen skyldes feil parsingstrategi, manglende tidssonekonvertering eller sammenblanding av `ISODate` og `ISODateTime`.
- Forklar kortfattet hva som er feil og hvorfor det er et problem (f.eks. sommertid-feil, brukerens lokale tidssone).
- Gi et minimalt kodeeksempel som viser riktig mønster.
- Ikke foreslå større refaktorering uten at brukeren ber om det.

## Hurtigtrigger

Bruk denne skillen umiddelbart hvis oppgaven nevner ett eller flere av disse signalene:

- `dayjs`, `Date`, `new Date`, `utc`, `.utc`, `.tz`, `timezone`, `Europe/Oslo`
- `ISODate`, `ISODateTime`, `YYYY-MM-DD`, `Z`, offset, `+02:00`
- `format`, `parse`, `add`, `subtract`, `startOf`, `endOf`
- `tidssone`, `sommertid`, `vintertid`, `UTC`, `norsk tid`
- dato/tid fra backend, API, DTO eller respons

## Grunnregel

Skill alltid mellom:

| Type                                        | Eksempel                        | Verktøy                                        |
| ------------------------------------------- | ------------------------------- | ---------------------------------------------- |
| `ISODate` — kalenderdato                    | `2026-06-30`                    | `dayjs(...)` direkte, eller string-operasjoner |
| `ISODateTime` / `Date` — absolutt tidspunkt | `2026-06-30T09:51:43.000+02:00` | `dayjs.utc(value).tz('Europe/Oslo')`           |

Disse skal ikke behandles likt.

---

## ISODate (`YYYY-MM-DD`)

`ISODate` er en ren kalenderdato — ingen klokkeslett, ingen tidssone. Behold den som string.

- Ikke bruk `Date` eller `new Date('YYYY-MM-DD')` — da introduserer du en tidssone utilsiktet.
- Sammenligning og sortering fungerer direkte som string.

```ts
// Sortering
dates.sort((a, b) => a.localeCompare(b));

// Validering
dayjs(value, 'YYYY-MM-DD', true).isValid();
```

---

## ISODateTime og Date — tidspunkt fra backend

Når backend sender dato/tid med eksplisitt tidssone (`Z` eller offset som `+02:00`), er det et absolutt tidspunkt. Konverter umiddelbart til `Europe/Oslo` slik at alle videre operasjoner skjer i norsk kalendertid:

```ts
const osloTime = dayjs.utc(value).tz('Europe/Oslo');
```

Dette gjelder også for `Date`-objekter — et `Date` har ingen tidssone, det er bare et absolutt tidspunkt. Uten `.tz('Europe/Oslo')` vil formattering og kalenderoperasjoner bruke UTC eller brukerens lokale tidssone.

**Kalenderoperasjoner** (`add`, `subtract`, `startOf`, `endOf`) må skje _etter_ konvertering til Oslo. Rundt sommertidsskiftet vil `add(1, 'day')` i UTC gi feil kalenderdag:

```ts
// Riktig — operasjon i norsk kalendertid
const osloTime = dayjs.utc(value).tz('Europe/Oslo');
osloTime.add(1, 'day');
osloTime.startOf('day');

// Feil — operasjon i UTC, konverter etterpå
dayjs.utc(value).add(1, 'day').tz('Europe/Oslo');
```

**Formattering** skal alltid skje i `Europe/Oslo`:

```ts
dayjs.utc(value).tz('Europe/Oslo').format('DD.MM.YYYY HH:mm');
dayjs(date).tz('Europe/Oslo').format('DD.MM.YYYY HH:mm'); // fra Date-objekt
```

---

## Naive dato/tid-strenger

Strenger uten tidssone er tvetydige:

```txt
2026-06-30T09:51:43
```

Ikke parse slike ukritisk med `dayjs.utc(...)` eller `dayjs(...)` før kontrakten er avklart.

Avklar først om backend mener:

- UTC
- `Europe/Oslo`
- brukerens lokale tid
- noe annet

Hvis backend mener norsk tid, parse eksplisitt som Oslo-tid:

```ts
dayjs.tz(value, 'Europe/Oslo');
```

---

## Vanlige feil

### Feil: direkte formattering uten tidssone

```ts
dayjs(value).format('DD.MM.YYYY HH:mm');
```

Dette formatterer i brukerens lokale tidssone.

Riktig:

```ts
dayjs.utc(value).tz('Europe/Oslo').format('DD.MM.YYYY HH:mm');
```

### Feil: kalenderoperasjon før konvertering til Oslo

```ts
dayjs.utc(value).startOf('day').tz('Europe/Oslo');
```

Riktig:

```ts
dayjs.utc(value).tz('Europe/Oslo').startOf('day');
```

### Feil: bruke `Date` for rene kalenderdatoer

```ts
new Date('2026-06-30');
```

Unngå dette for `ISODate`. Behold verdien som `YYYY-MM-DD`.

---

## Anbefalt mønster

Inntil videre: bruk `dayjs.utc(value).tz('Europe/Oslo')` direkte overalt der et tidspunkt fra backend skal håndteres.

På sikt anbefales en felles wrapper `osloDayjs` som alltid setter `Europe/Oslo`, slik at konverteringen ikke kan glemmes:

```ts
// utils/osloDayjs.ts  (ikke implementert ennå)
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export const osloDayjs = (value: string | Date) => dayjs.utc(value).tz('Europe/Oslo');
```

Når `osloDayjs` er på plass, brukes den overalt der et tidspunkt skal opereres på eller formatteres:

```ts
osloDayjs(backendValue).add(1, 'day');
osloDayjs(backendValue).format('DD.MM.YYYY HH:mm');
```

`osloDayjs` skal **ikke** brukes på `ISODate`-strenger (`YYYY-MM-DD`). Da vil dayjs tolke datoen som midnatt UTC og konvertere til norsk tid — noe som er feil.

---

## Sjekkliste

Når du ser datohåndtering i kode, sjekk:

- Er dette en `ISODate` eller et `ISODateTime`/`Date`?
- Hvis tidspunkt: konverteres det til `Europe/Oslo` før operasjoner og formattering?
- Skjer `add`, `startOf`, `endOf` _etter_ `.tz('Europe/Oslo')`?
- Brukes `dayjs(date).format(...)` uten `.tz('Europe/Oslo')` — mulig tidssone-feil?
- Brukes `new Date('YYYY-MM-DD')` på en `ISODate` — unødvendig og risikabelt?
- Er backend-verdien en naiv streng uten tidssone — er kontrakten avklart?
