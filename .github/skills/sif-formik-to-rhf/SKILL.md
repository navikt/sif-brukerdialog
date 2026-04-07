name: sif-formik-to-rhf
description: Migrer et skjema fra @navikt/sif-common-formik-ds (Formik) til @sif/rhf (React Hook Form). Bevarer oppførsel og data inn/ut.
---

# sif-formik-to-rhf

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
4. **Spørsmål-komponenter** i `spørsmål/`-mappen — les alle for å fange validatorparametere (minLength, maxLength, disallowedValues, disallowInvalidBackendCharacters)
5. **Testfiler** (`__tests__/` og `.test.ts`-filer) for stegets utils

**Fase 2 — Migrer**

Utfør alle endringer. Bruk erstatningstabellen under.

**Fase 3 — Verifiser**

- Sjekk at filen er feilfri (`get_errors`).
- Sjekk at `@sif/rhf` finnes i `package.json` → `dependencies`.
- Sjekk at i18n-nøkler matcher nye scope-mønster.
- Sjekk validatorparitet mot kildeappen (se Strategi B Fase 3 for detaljer).
- Overfør relevante tester fra kildeappen.

---

### Strategi B — Analyser → reimplementer (anbefalt)

Forstå hva skjemaet gjør først, skriv deretter ren RHF-kode fra scratch. Unngår å arve Formik-idiomer og gir færre mellomfeil.

**Fase 1 — Analyser (les, ikke skriv)**

Les skjema-filen, i18n-filer og package.json. Dokumenter følgende internt (ikke i koden):

1. **Props** — hva mottar komponenten (oppgaveReferanse, callbacks, etc.)
2. **Felter** — enum-verdier, typer, defaultValues
3. **Valideringsregler** — per felt: hvilken validator, **alle parametere** (required, minLength, maxLength, disallowedValues, disallowInvalidBackendCharacters, allowHnr, etc.)
4. **i18n-scope** — full prefiks fra `nb.ts` (f.eks. `@ungInnsyn.inntektForm`), inkl. alle valideringsnøkler. List opp **alle mulige feilkoder** per validator.
5. **Betinget visning** — hvilke felter vises/skjules basert på andre felter
6. **Submit-logikk** — hva skjer ved submit (DTO-bygging, mutateAsync, onSuccess)
7. **Knapper** — submit-label, cancel-label, loading-state
8. **Tester** — list opp alle testfiler som dekker utils-funksjoner i steget

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
- Sjekk validatorparitet: sammenlign hvert felt sin validator og parametere mot kildeappen. Alle parametere (minLength, maxLength, disallowedValues, disallowInvalidBackendCharacters) må være identiske.
- Sjekk at alle mulige feilkoder fra hver validator har tilhørende i18n-nøkkel i `nb.ts` og `nn.ts`.
- Overfør tester fra kildeappens `__tests__/` og `.test.ts`-filer for utils-funksjoner som er med videre. Tilpass import (eksplisitt `import { describe, expect, it, vi } from 'vitest'` hvis appen ikke bruker globals).

---

## Erstatningstabell

| Formik (`@navikt/sif-common-formik-ds`)                                                                       | RHF (`@sif/rhf` + `react-hook-form`)                                                                                                           |
| ------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `getTypedFormComponents<Fields, Values, ValidationError>()`                                                   | `createSifFormComponents<FormValues>()`                                                                                                        |
| `FormikWrapper initialValues={…} onSubmit={…} renderForm={({ values }) => …}`                                 | `useForm<FormValues>({ defaultValues, mode: 'onSubmit', reValidateMode: 'onChange' })` + `<SifForm methods={methods} onSubmit={handleSubmit}>` |
| `<Form submitButtonLabel cancelButtonLabel submitPending onCancel includeValidationSummary formErrorHandler>` | `<SifForm buttons={…}>` — repliker knapper med `<Button type="submit" loading={isPending}>` / `<Button type="button" onClick={onCancel}>`      |
| `values.feltNavn` (fra renderForm callback)                                                                   | `methods.watch(feltNavn)`                                                                                                                      |
| `getIntlFormErrorHandler(intl, 'scope.validation')`                                                           | `useSifValidate('scope')` → `validateField(fieldName, validator)`                                                                              |
| `validate={getYesOrNoValidator()}` (returnerer error-objekt `{ key, values }`)                                | `validate={validateField(fieldName, getYesOrNoValidator())}` (returnerer streng)                                                               |
| `YesOrNo` fra `@navikt/sif-common-formik-ds`                                                                  | `YesOrNo` fra `@sif/rhf`                                                                                                                       |
| `ValidationError` type                                                                                        | Ikke nødvendig — fjern                                                                                                                         |
| `getNumberFromNumberInputValue(value)`                                                                        | `getNumberFromNumberInputValue` fra `@sif/rhf/utils` — samme funksjon, ny import                                                               |
| `initialValues={data}` (pre-filled fra API)                                                                   | `defaultValues: data` — funksjonelt ekvivalent                                                                                                 |

## Import-endringer

### Fjern

```ts
import {
    getTypedFormComponents,
    getIntlFormErrorHandler,
    ValidationError,
    YesOrNo,
} from '@navikt/sif-common-formik-ds';
```

### Legg til

```ts
import { createSifFormComponents, SifForm, useSifValidate, YesOrNo } from '@sif/rhf';
import { useForm } from 'react-hook-form';
```

Validatorer fra `@navikt/sif-validation` beholdes uendret.

## Komponenterstatninger

Ikke importer fra gamle pakker i v2-apper. Bruk Aksel-komponenter eller `@sif/*`-pakker:

| Gammel komponent | Gammel pakke                 | Erstatning   | Ny pakke                    |
| ---------------- | ---------------------------- | ------------ | --------------------------- |
| `ExpandableInfo` | `@navikt/sif-common-core-ds` | `ReadMore`   | `@navikt/ds-react`          |
| `FormLayout`     | `@navikt/sif-common-ui`      | `FormLayout` | `@sif/soknad-ui/components` |

## Fallgruver

### 1. Scope-mismatch i `useSifValidate`

Formik: `getIntlFormErrorHandler(intl, 'myForm.validation')` — scope **inkluderer** `.validation`.
RHF: `useSifValidate('myForm')` — scope **ekskluderer** `.validation` (legges til automatisk).

Begge produserer `myForm.validation.fieldName.errorCode`. **Drop `.validation`-suffikset** når du setter scope.

**OBS — namespace-prefiks:** Bruk **full i18n-nøkkelprefiks** inkludert eventuelt namespace. Hvis i18n-nøklene har prefiks `@ungInnsyn.inntektForm.validation.*`, må scope være `'@ungInnsyn.inntektForm'` — ikke `'inntektForm'`. Se i `nb.ts` hva den faktiske prefiksen er.

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

### 4. Spacing i knapperaden

Bruk alltid `gap="space-16"` på `<HStack>` rundt submit/cancel-knapper — ikke `space-4`:

```tsx
<HStack gap="space-16">
    <Button type="submit" loading={isPending}>
        …
    </Button>
    <Button variant="secondary" type="button" onClick={onCancel}>
        …
    </Button>
</HStack>
```

### 5. `showButtonArrows` og andre Form-props som forsvinner

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

### Vanlig inversjonsfeil ved portering

Den vanligste feilen ved migrering er invertert betingelseslogikk — man skriver `=== NO` der v1 hadde `=== YES` eller omvendt. Kartlegg eksplisitt betingelsene fra v1 FØR koding:

```
felt A → alltid synlig
felt B → synlig når felt A === YES   ← les nøye, ikke inverter
melding X → synlig når felt A === NO
```

Sjekk tabellen:

| v1-kode             | Feil v2-kode       | Riktig v2-kode      |
| ------------------- | ------------------ | ------------------- |
| `kronisk === YES`   | `kronisk === NO`   | `kronisk === YES`   |
| `harBarn === false` | `harBarn === true` | `harBarn === false` |

### Betinget visning — bruk `&&`, ikke `AriaLiveRegion`

`AriaLiveRegion` skal **kun** brukes rundt dynamiske meldinger som skal annonseres til skjermlesere. Bruk **ikke** `AriaLiveRegion` rundt spørsmål/skjemafelter — bruk `&&` i stedet:

```tsx
// Skjemafelter — bruk &&
{feltVerdi === YesOrNo.YES && <NyttFelt ... />}

// Gruppe av felter — bruk fragment
{feltVerdi === YesOrNo.YES && (
    <>
        <FeltA ... />
        <FeltB ... />
    </>
)}

// Melding som skal annonseres til skjermlesere — bruk AriaLiveRegion
<AriaLiveRegion visible={feltVerdi === YesOrNo.NO}>
    <QuestionRelatedMessage>
        <SifInfoMessage>...</SifInfoMessage>
    </QuestionRelatedMessage>
</AriaLiveRegion>
```

`FormLayout.Questions` er ikke nødvendig rundt betinget innhold — gapet styres av den ytre `FormLayout.Questions`.

### Feilmeldinger på betingede felter

Når felter skjules (unmountes) beholdes feilmeldinger i RHF's form state (RHF bruker `shouldUnregister: false` som default). Rydd opp med `clearErrors` i en `useEffect` som kjører når betingelsen som skjuler feltet endrer seg.

**Prinsipp:** dependency-arrayet skal inneholde det uttrykket som avgjør om feltet er synlig — enten det er en enkel verdi, en beregnet boolean, eller en kombinasjon.

```tsx
// Enkel verdi som dependency
useEffect(() => {
    if (triggerFelt !== YesOrNo.YES) {
        methods.clearErrors([FormFields.betingetFelt]);
    }
}, [triggerFelt]);

// Beregnet synlighetsuttrykk som dependency
const feltErSynlig = betingelse1 && betingelse2;

useEffect(() => {
    if (!feltErSynlig) {
        methods.clearErrors([FormFields.betingetFelt]);
    }
}, [feltErSynlig]);
```

Velg den varianten som passer skjemaets logikk. Det viktige er at `clearErrors` kalles for alle felter som forsvinner fra skjermen, uavhengig av hva som utløste skjulingen.

## i18n-nøkler og valideringskoder

Valideringsnøkler må matche `<scope>.validation.<fieldName>.<errorCode>`.

**Bruk alltid de eksakte feilkodene fra validatorens enum** — ikke dikk opp egne. Feil kode → valideringsmeldingen vises aldri.

| Validator                   | Faktiske feilkoder                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `getYesOrNoValidator`       | `yesOrNoIsUnanswered`                                                                                              |
| `getRequiredFieldValidator` | `noValue`                                                                                                          |
| `getStringValidator`        | `stringHasNoValue`, `stringIsTooShort`, `stringIsTooLong`                                                          |
| `getCheckedValidator`       | `notChecked`                                                                                                       |
| `getListValidator`          | `listIsEmpty`, `listHasTooFewItems`, `listHasTooManyItems`                                                         |
| `getDateValidator`          | `dateHasNoValue`, `dateHasInvalidFormat`, `dateIsBeforeMin`, `dateIsAfterMax`                                      |
| `getFødselsnummerValidator` | `fødselsnummerHasNoValue`, `fødselsnummerIsNot11Chars`, `fødselsnummerIsInvalid`, `fødselsnummerAsHnrIsNotAllowed` |

Finn alle koder i `packages/sif-validation/src/get*Validator.ts` via `enum Validate*Error`.

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
- [ ] Betinget visning kartlagt fra v1 og verifisert mot v1 (ingen inversjonsfeile)
- [ ] Betinget visning bruker `methods.watch()` + `&&`/fragment — ikke `AriaLiveRegion` rundt skjemafelter
- [ ] `AriaLiveRegion` brukes kun rundt dynamiske meldinger (`SifInfoMessage`, `InlineMessage`, `LocalAlert`)
- [ ] Betingede felter som skjules får `clearErrors` i `useEffect`
- [ ] Validatorer med parametere bruker `intl.formatMessage` inline
- [ ] i18n-nøkler bruker eksakte feilkoder fra `@navikt/sif-validation` (sjekk `enum Validate*Error`)
- [ ] `FormFields`-enum er uendret
- [ ] `@sif/rhf: workspace:*` finnes i `package.json`
- [ ] `DateRange`-importer er oppdatert (hvis aktuelt)
- [ ] Filen kompilerer uten feil
- [ ] Enhetstester skrevet for `*StegUtils.ts` (se under)

## Enhetstester for `*StegUtils.ts`

Mapping-funksjoner (`toFormValues` og `toSøknadsdata`) er rene funksjoner og enkle å teste. De dekker nøyaktig der inversjons- og mappingfeil oppstår — feil som ikke fanges av kompilator.

**Viktig:** La ikke AI skrive assertions basert på v2-koden — da verifiseres bare AI-ens egen (potensielt feil) forståelse. Bruk **v1-koden som sannhetskilde**:

1. Les `getOmBarnetSøknadsdataFromFormValues` (eller tilsvarende) i kildeappen
2. Kjør den mentalt eller faktisk med konkrete testdata
3. Bruk _det resultatet_ som forventet output i v2-testen

Alternativt: utvikler skriver assertions basert på domenekunnskap — ikke AI.

Opprett `__tests__/<prefix>StegUtils.test.ts` ved siden av utils-filen. Dekk minst:

- Betingede felt mappes korrekt når betingelsen er oppfylt
- Betingede felt er `undefined` når betingelsen ikke er oppfylt
- Round-trip: `toSøknadsdata → toFormValues` gir tilbake originale verdier

```ts
import { YesOrNo } from '@sif/rhf';
import { toOmBarnetSøknadsdata, toOmBarnetFormValues } from '../omBarnetStegUtils';

describe('toOmBarnetSøknadsdata', () => {
    it('lagrer høyereRisikoForFravær når kronisk er YES', () => {
        const result = toOmBarnetSøknadsdata({ kroniskEllerFunksjonshemming: YesOrNo.YES, høyereRisikoForFravær: YesOrNo.YES, ... }, registrerteBarn);
        expect(result?.høyereRisikoForFravær).toBe(true);
    });

    it('høyereRisikoForFravær er undefined når kronisk er NO', () => {
        const result = toOmBarnetSøknadsdata({ kroniskEllerFunksjonshemming: YesOrNo.NO, ... }, registrerteBarn);
        expect(result?.høyereRisikoForFravær).toBeUndefined();
    });
});
```
