---
name: sif-formik-to-rhf
description: Migrer et skjema fra @navikt/sif-common-formik-ds (Formik) til @sif/rhf (React Hook Form). Bevarer oppførsel og data inn/ut.
---

# sif-formik-to-rhf Skill

## Formål

Konverter ett Formik-skjema til React Hook Form via `@sif/rhf`. Etter migrering skal:

- Skjemaet kompilere uten feil.
- Oppførsel og data inn/ut være identisk med Formik-varianten.
- Validering og i18n-nøkler fungere som før.

## Når skal skillen brukes

- Bruker ber om å erstatte Formik med RHF i et eksisterende skjema.
- Bruker nevner `formik til rhf`, `konverter skjema`, `bytt ut formik`, `migrer form`, `sif-common-formik-ds → sif/rhf`.

## Avgrensning og rør-ikke-regler

- Skillen gjelder **ett skjema om gangen**. Gjenta for hvert skjema.
- **Rør IKKE:**
  - `FormFields`-enum (behold eksisterende feltnavn)
  - `handleSubmit`-logikk utover try/catch-wrapping (se fallgruver)
  - API-kall, DTOer, onSuccess-callbacks
  - Layout/JSX-struktur inni felter (labels, descriptions, betinget visning)
  - Filnavn eller mappestruktur
- For rene i18n-endringer → bruk `sif-intl`.
- For nye felter → bruk `sif-soknad-modify-step`.

---

## Arbeidsmodus

Det finnes to strategier. Brukeren kan be om en spesifikk strategi. Hvis ikke spesifisert, velg **Strategi B** som standard — den gir færre mellomfeil og renere resultat.

---

### Strategi A — Mekanisk erstatning

Bytt Formik-kode med RHF-ekvivalenter linje for linje ved hjelp av erstatningstabellen.

**Fase 1 — Les (før kode)**

Les disse filene for skjemaet som skal migreres:

1. **Skjema-filen** (den som importerer `@navikt/sif-common-formik-ds`)
2. **i18n-filer** brukt av skjemaet (sjekk `validation.*`-nøkler)
3. **package.json** for workspace som eier skjemaet

**Fase 2 — Migrer**

Utfør alle endringer. Bruk erstatningstabellen under.

**Fase 3 — Verifiser**

- Sjekk at filen er feilfri (`get_errors`).
- Sjekk at `@sif/rhf` finnes i `package.json` → `dependencies`.
- Sjekk at i18n-nøkler matcher nye scope-mønster.

---

### Strategi B — Analyser → reimplementer (anbefalt)

Forstå hva skjemaet gjør først, skriv deretter ren RHF-kode fra scratch. Unngår å arve Formik-idiomer og gir færre mellomfeil.

**Fase 1 — Analyser (les, ikke skriv)**

Les skjema-filen, i18n-filer og package.json. Dokumenter følgende internt (ikke i koden):

1. **Props** — hva mottar komponenten (oppgaveReferanse, callbacks, etc.)
2. **Felter** — enum-verdier, typer, defaultValues
3. **Valideringsregler** — per felt: hvilken validator, evt. parametere
4. **i18n-scope** — full prefiks fra `nb.ts` (f.eks. `@ungUi.inntektForm`), inkl. alle valideringsnøkler
5. **Betinget visning** — hvilke felter vises/skjules basert på andre felter
6. **Submit-logikk** — hva skjer ved submit (DTO-bygging, mutateAsync, onSuccess)
7. **Knapper** — submit-label, cancel-label, loading-state

**Fase 2 — Reimplementer**

Skriv hele komponenten på nytt basert på analysen, **ikke** basert på Formik-koden. Bruk RHF-mønsteret direkte:

- `useForm<FormValues>` med `defaultValues`, `mode: 'onSubmit'`, `reValidateMode: 'onChange'`
- `createSifFormComponents<FormValues>()` for feltkomponenter
- `useSifValidate(scope)` med korrekt i18n-scope (inkl. namespace-prefiks)
- `<SifForm>` med `buttons`-prop
- `methods.watch()` for betinget visning
- `try/catch` rundt async submit

Behold: `FormFields`-enum, filnavn, mappestruktur, layout/JSX inni felter.

**Fase 3 — Verifiser**

- Sjekk at filen er feilfri (`get_errors`).
- Sjekk at `@sif/rhf` finnes i `package.json` → `dependencies`.
- Sjekk at i18n-nøkler matcher nye scope-mønster.
- Sjekk at alle Formik-importer er fjernet.

---

## Erstatningstabell

| Formik (`@navikt/sif-common-formik-ds`) | RHF (`@sif/rhf` + `react-hook-form`) |
|---|---|
| `getTypedFormComponents<Fields, Values, ValidationError>()` | `createSifFormComponents<FormValues>()` |
| `FormikWrapper initialValues={…} onSubmit={…} renderForm={({ values }) => …}` | `useForm<FormValues>({ defaultValues, mode: 'onSubmit', reValidateMode: 'onChange' })` + `<SifForm methods={methods} onSubmit={handleSubmit}>` |
| `<Form submitButtonLabel cancelButtonLabel submitPending onCancel includeValidationSummary formErrorHandler>` | `<SifForm buttons={…}>` — repliker knapper med `<Button type="submit" loading={isPending}>` / `<Button type="button" onClick={onCancel}>` |
| `values.feltNavn` (fra renderForm callback) | `methods.watch(feltNavn)` |
| `getIntlFormErrorHandler(intl, 'scope.validation')` | `useSifValidate('scope')` → `validateField(fieldName, validator)` |
| `validate={getYesOrNoValidator()}` (returnerer error-objekt `{ key, values }`) | `validate={validateField(fieldName, getYesOrNoValidator())}` (returnerer streng) |
| `YesOrNo` fra `@navikt/sif-common-formik-ds` | `YesOrNo` fra `@sif/rhf` |
| `ValidationError` type | Ikke nødvendig — fjern |
| `getNumberFromNumberInputValue(value)` | `getNumberFromNumberInputValue` fra `@sif/rhf/utils` — samme funksjon, ny import |
| `initialValues={data}` (pre-filled fra API) | `defaultValues: data` — funksjonelt ekvivalent |

## Import-endringer

### Fjern

```ts
import { getTypedFormComponents, getIntlFormErrorHandler, ValidationError, YesOrNo } from '@navikt/sif-common-formik-ds';
```

### Legg til

```ts
import { createSifFormComponents, SifForm, useSifValidate, YesOrNo } from '@sif/rhf';
import { useForm } from 'react-hook-form';
```

Validatorer fra `@navikt/sif-validation` beholdes uendret.

## Fallgruver

### 1. Scope-mismatch i `useSifValidate`

Formik: `getIntlFormErrorHandler(intl, 'myForm.validation')` — scope **inkluderer** `.validation`.
RHF: `useSifValidate('myForm')` — scope **ekskluderer** `.validation` (legges til automatisk).

Begge produserer `myForm.validation.fieldName.errorCode`. **Drop `.validation`-suffikset** når du setter scope.

**OBS — namespace-prefiks:** Bruk **full i18n-nøkkelprefiks** inkludert eventuelt namespace. Hvis i18n-nøklene har prefiks `@ungUi.inntektForm.validation.*`, må scope være `'@ungUi.inntektForm'` — ikke `'inntektForm'`. Se i `nb.ts` hva den faktiske prefiksen er.

### 2. async handleSubmit + avviste promises

Formik svelger rejected promises i `onSubmit`. RHF gjør det ikke — ubehandlede rejections kaster.

**Regel:** Hvis `handleSubmit` kaller `await mutateAsync(…)` eller andre async-operasjoner som kan feile, wrap i `try/catch`. La catchen være tom hvis mutation-hookets `error`-state håndterer visning.

### 3. Validering med interpolasjonsparametere

Formik-validate returnerer `{ key, values }` for feilmeldinger med parametere. RHF-validate returnerer en ren streng.

Når Formik-varianten returnerer `{ key: errorCode, values: { min: 5, maks: 2000 } }`, bruk `intl.formatMessage` direkte:

```ts
validate={(value) => {
    const errorCode = getStringValidator({ required: true, minLength: 5, maxLength: 2000 })(value);
    return errorCode
        ? intl.formatMessage(
              { id: `scope.validation.feltNavn.${errorCode}` },
              { min: 5, maks: 2000 },
          )
        : undefined;
}}
```

### 4. `showButtonArrows` og andre Form-props som forsvinner

Formik `<Form>` har props som `showButtonArrows`, `includeValidationSummary` og `formErrorHandler` som ikke har direkte ekvivalenter i `<SifForm>`. Disse droppes uten erstatning:

- `showButtonArrows` — finnes ikke i RHF, drop.
- `includeValidationSummary` — `SifForm` inkluderer `SifValidationSummary` automatisk.
- `formErrorHandler` — erstattes av `useSifValidate` (se fallgruve 1).

## Betinget visning

```ts
// Før: values[FormFields.felt] === YesOrNo.YES  (fra renderForm callback)
// Etter:
const feltValue = methods.watch(FormFields.felt);
// I JSX:
{feltValue === YesOrNo.YES ? <Textarea ... /> : null}
```

## i18n-nøkler

Valideringsnøkler må matche `<scope>.validation.<fieldName>.<errorCode>`.

**Sjekk:** Felt-enum i Formik og felt-navnene i i18n-nøklene må matche. Hvis formik brukte `formErrorHandler` med scope `'uttalelseForm.validation'` men felt-enum heter `harUttalelse`, må nøkkelen i `nb.ts` være:

```
'uttalelseForm.validation.harUttalelse.yesOrNoIsUnanswered': '...'
```

Hvis eksisterende nøkler bruker et annet feltnavn enn `FormFields`-enum, oppdater nøklene til å matche enum-verdien.

## package.json

Legg til `@sif/rhf` i `dependencies` for workspacen:

```json
"@sif/rhf": "workspace:*"
```

Kjør `yarn install` etterpå for å lenke pakken.

## DateRange-import

Noen filer importerer kun `DateRange`-typen fra `@navikt/sif-common-formik-ds`. Denne typen finnes også i `@navikt/sif-common-utils`. Bytt import hvis det er eneste formik-import:

```ts
// Før
import { DateRange } from '@navikt/sif-common-formik-ds';
// Etter
import { DateRange } from '@navikt/sif-common-utils';
```

## Sjekkliste

- [ ] Alle `@navikt/sif-common-formik-ds`-importer er fjernet fra skjemafilen
- [ ] `@sif/rhf` og `react-hook-form` brukes
- [ ] `FormikWrapper` → `useForm` + `SifForm`
- [ ] `Form` → `SifForm` med `buttons`-prop (repliker submit/cancel-oppførsel)
- [ ] `useSifValidate`-scope er uten `.validation`-suffiks
- [ ] async `handleSubmit` har try/catch rundt mutateAsync-kall
- [ ] Betinget visning bruker `methods.watch()` i stedet for `values`
- [ ] Validatorer med parametere bruker `intl.formatMessage` inline
- [ ] i18n-nøkler matcher `<scope>.validation.<field>.<errorCode>`
- [ ] `FormFields`-enum er uendret
- [ ] `@sif/rhf: workspace:*` finnes i `package.json`
- [ ] `DateRange`-importer er oppdatert (hvis aktuelt)
- [ ] Filen kompilerer uten feil
