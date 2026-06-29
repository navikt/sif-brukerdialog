---
name: sif-date-handling
type: referanse
description: Bruk denne skillen når en utvikler jobber med dato, tid, parsing, formattering, Day.js, ISODate, ISODateTime, UTC eller tidssonehåndtering i frontend.
---

# sif-date-handling

## Bruk når

- En utvikler parser dato/tid fra backend.
- En utvikler formatterer dato/tid for visning.
- En utvikler bruker Day.js med `utc`, `timezone`, `tz`, `add`, `subtract`, `startOf` eller `endOf`.
- En utvikler jobber med `ISODate`, `ISODateTime`, `Date`, `YYYY-MM-DD`, `Z`, offset eller `Europe/Oslo`.
- En utvikler spør om datoer kan påvirkes av brukerens tidssone.

## Leveranse

- Forklar om verdien er en kalenderdato (`ISODate`) eller et tidspunkt (`ISODateTime`/`Date`).
- Anbefal riktig parsing og formattering.
- Påpek risiko for brukerens lokale tidssone.
- Gi minimalt kodeeksempel.
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

1. **Kalenderdato**  
   Eksempel: `2026-06-30`  
   Dette er en dato uten klokkeslett og uten tidssone.

2. **Tidspunkt**  
   Eksempel: `2026-06-30T09:51:43.000+02:00` eller `2026-06-30T07:51:43.000Z`  
   Dette er et absolutt tidspunkt.

Disse skal ikke behandles likt.

---

## ISODate (`YYYY-MM-DD`)

`ISODate` representerer en ren kalenderdato.

Anbefaling:

- Ikke bruk `Date` for rene kalenderdatoer.
- Ikke bruk `new Date('YYYY-MM-DD')`.
- Ikke la brukerens lokale tidssone påvirke datoen.
- Sammenligning og sortering kan gjøres som string når formatet alltid er `YYYY-MM-DD`.

Eksempel:

```ts
export const sortDates = (d1: ISODate, d2: ISODate): number => d1.localeCompare(d2);
```

Ved parsing/validering av `ISODate`, bruk strict parsing dersom Day.js brukes:

```ts
dayjs(value, 'YYYY-MM-DD', true).isValid();
```

---

## Tidspunkt fra backend

Når backend sender dato/tid som ISO 8601 med eksplisitt tidssone (`Z` eller offset som `+02:00`), skal verdien behandles som et absolutt tidspunkt.

Hvis frontend-domenet er norsk tid, parse slik:

```ts
const d = dayjs.utc(value).tz('Europe/Oslo');
```

Dette betyr:

- Backend-verdien tolkes som et absolutt tidspunkt.
- Tidspunktet konverteres umiddelbart til `Europe/Oslo`.
- Videre datooperasjoner skjer i norsk tid.

Eksempel:

```ts
const value = '2026-06-30T09:51:43.000+02:00';

const osloTime = dayjs.utc(value).tz('Europe/Oslo');
```

---

## Kalenderoperasjoner

Utfør `add`, `subtract`, `startOf`, `endOf` og lignende etter at tidspunktet er konvertert til `Europe/Oslo`.

Riktig:

```ts
const osloTime = dayjs.utc(value).tz('Europe/Oslo');

const nextDay = osloTime.add(1, 'day');
const startOfDay = osloTime.startOf('day');
```

Unngå:

```ts
const nextDay = dayjs.utc(value).add(1, 'day').tz('Europe/Oslo');
```

Grunnen er at operasjonen da skjer i UTC, ikke i norsk kalendertid. Det kan gi feil rundt overgang til og fra sommertid.

---

## Formattering

Hvis kravet er at alle brukere skal se norsk tid, skal formattering alltid skje i `Europe/Oslo`.

```ts
dayjs(date).tz('Europe/Oslo').format('DD.MM.YYYY kl. HH.mm');
```

Dette gjelder også når input er et `Date`-objekt. Et `Date`-objekt har ingen egen tidssone; det representerer bare et absolutt tidspunkt. Uten `.tz('Europe/Oslo')` vil formatteringen bruke brukerens lokale tidssone.

Eksempel:

```ts
const OSLO = 'Europe/Oslo';
const compactFormatWithTime = 'DD.MM.YYYY kl. HH.mm';

const formatDateTime = (date: Date, locale?: string) =>
    dayjs(date).tz(OSLO).locale(getValidLocale(locale)).format(compactFormatWithTime);
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

## Anbefalt hjelpefunksjon

For backend-tidspunkter:

```ts
const OSLO = 'Europe/Oslo';

export const parseBackendDateTime = (value: string) =>
    dayjs.utc(value).tz(OSLO);
```

For formattering:

```ts
export const formatDateTimeInOslo = (date: Date, locale?: string) =>
    dayjs(date).tz(OSLO).locale(getValidLocale(locale)).format('DD.MM.YYYY kl. HH.mm');
```

---

## Sjekkliste

Når du ser datohåndtering i kode, sjekk:

- Er dette en ren kalenderdato eller et tidspunkt?
- Kommer verdien fra backend?
- Har backend-verdien `Z` eller offset?
- Skal visning alltid være norsk tid?
- Skjer `add`, `startOf`, `endOf` osv. etter konvertering til `Europe/Oslo`?
- Formatteres `Date` med `.tz('Europe/Oslo')`?
- Brukes `Date` unødvendig for `ISODate`?
