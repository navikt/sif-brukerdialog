---
name: sif-soknad-modify-step
description: Legg til nye spørsmål/felter i et eksisterende steg i en søknadsapp som bruker @sif/soknad og @sif/rhf.
---

# sif-soknad-modify-step Skill

## Formål

Utvid et eksisterende steg med nye spørsmål. Etter at skillen er fulgt skal steget kompilere, nye felter vises korrekt (evt. betinget) og data mappes riktig til/fra søknadsdata.

## Når skal skillen brukes

- Bruker ber om å legge til et nytt spørsmål i et **eksisterende** steg.
- Bruker vil legge til en checkbox-liste, radiogruppe, tekstfelt, datepicker eller annet i et steg som allerede finnes.
- Bruker nevner betinget visning ("vis bare hvis …", "følgespørsmål").

## Avgrensning

- **Kun** endring av eksisterende steg — for å opprette helt nytt steg → bruk `sif-soknad-add-step`.
- For ren tekst/i18n-endring uten nye felter → bruk `sif-intl`.
- For API-henting → bruk `sif-api`.

## Arbeidsmodus

**Agenten trenger KUN å lese steget som skal endres.** Les disse filene:

1. `src/app/steps/<steg>/types.ts` — eksisterende felter og typer
2. `src/app/steps/<steg>/<Prefix>Form.tsx` — eksisterende skjema-komponent
3. `src/app/steps/<steg>/<prefix>StegUtils.ts` — eksisterende mapping
4. `src/app/steps/<steg>/i18n/nb.ts` — eksisterende tekster
5. `src/app/types/Soknadsdata.ts` — eksisterende søknadsdatatype
6. `src/app/steps/<steg>/i18n/nn.ts` — hvis steget allerede har separat nynorsk-fil

Ikke les andre steg eller utforsk mappestruktur utover dette.

---

## Paneler fra @sif/soknad-forms

Når en søknad porteres til nytt format, bruk ferdige paneler fra `@sif/soknad-forms` fremfor å implementere tilsvarende logikk manuelt. Panelene er typesikre, RHF-baserte og inneholder korrekt visning og i18n.

| Panel | Beskrivelse | Viktige props |
| ----- | ----------- | ------------- |
| `VelgRegistrertBarnPanel<T>` | Radiogruppe for valg av registrert barn med fødselsdato og kildeinfo | `name`, `registrerteBarn`, `inkluderAnnetBarn?`, `annetBarnLabel?`, `validate?` |

Eksporterte konstanter:
- `ANNET_BARN = 'annetBarn'` — verdien som settes i skjemaet når bruker velger "annet barn"

Bruksmønster:
```tsx
import { ANNET_BARN, VelgRegistrertBarnPanel } from '@sif/soknad-forms';

<VelgRegistrertBarnPanel<MyFormValues>
    name={MyFormFields.barnetSøknadenGjelder}
    registrerteBarn={registrerteBarn}
    inkluderAnnetBarn={true}
    validate={validateField(MyFormFields.barnetSøknadenGjelder, getRequiredFieldValidator())}
/>
```

Ved migrering fra gammel `VelgBarnFormPart` (fra `@navikt/sif-common-forms-ds`): erstatt den alltid med `VelgRegistrertBarnPanel`. Legg til `@sif/soknad-forms` i `dependencies` hvis det mangler i app-ens `package.json`.

---

## Komponentkatalog

`createSifFormComponents<T>()` fra `@sif/rhf` gir disse komponentene:

| Komponent        | Bruksområde                       | Verditype i FormValues    | Validator                                         |
| ---------------- | --------------------------------- | ------------------------- | ------------------------------------------------- |
| `YesOrNoQuestion` | Ja/nei-spørsmål                  | `YesOrNo`                 | `getYesOrNoValidator()`                            |
| `CheckboxGroup`  | Flervalg med checkboxer           | `string[]` / `enum[]`     | `getListValidator({ required: true })`             |
| `RadioGroup`     | Enkeltvalg med radioknapper       | `string` / `enum`         | `getRequiredFieldValidator()`                      |
| `TextField`      | Fritekstfelt                      | `string`                  | `getStringValidator({ required: true })`           |
| `Textarea`       | Lengre fritekst                   | `string`                  | `getStringValidator({ required: true, maxLength })` |
| `NumberInput`    | Tallfelt                          | `string`                  | `getNumberValidator({ required: true })`           |
| `Datepicker`     | Datovelger                        | `string`                  | `getDateValidator()`                               |
| `Select`         | Nedtrekksliste                    | `string`                  | `getRequiredFieldValidator()`                      |
| `Checkbox`       | Enkelt avkrysningsboks            | `boolean`                 | `getCheckedValidator()`                            |

Alle validatorer importeres fra `@navikt/sif-validation`.

## Validering

`useSifValidate(scope)` tar inn et **scope** (f.eks. `'barnForm'`) og returnerer `validateField(fieldName, validator)`. Denne genererer i18n-nøkkel for feilmelding:

```
<scope>.validation.<fieldName>.<errorCode>
```

**Scope-konvensjon:** Bruk `<prefix>Form` der `<prefix>` er lowerCamelCase av stegets domenenavn (f.eks. `barnForm`, `bostedForm`, `andreYtelserForm`).

Eksempler på error-koder fra `@navikt/sif-validation`:

| Validator                   | Feilkode(r)                                                                                                    |
| --------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `getYesOrNoValidator`       | `yesOrNoIsUnanswered`                                                                                          |
| `getListValidator`          | `listIsEmpty`, `listHasTooFewItems`, `listHasTooManyItems`                                                     |
| `getRequiredFieldValidator` | `noValue`                                                                                                      |
| `getStringValidator`        | `stringHasNoValue`, `stringIsTooShort`, `stringIsTooLong`                                                      |
| `getCheckedValidator`       | `notChecked`                                                                                                   |
| `getDateValidator`          | `dateHasNoValue`, `dateHasInvalidFormat`, `dateIsBeforeMin`, `dateIsAfterMax`                                  |
| `getFødselsnummerValidator` | `fødselsnummerHasNoValue`, `fødselsnummerIsNot11Chars`, `fødselsnummerIsInvalid`, `fødselsnummerAsHnrIsNotAllowed` |

**Viktig:** Bruk alltid de eksakte feilkodene fra validatorens enum — ikke dikk opp egne. Feil kode → valideringsmelding vises aldri. Du finner alle koder i `packages/sif-validation/src/get*Validator.ts` via `enum Validate*Error`.

Valideringsnøklene i `i18n/nb.ts` **må** matche dette mønsteret:

```ts
// scope = 'andreYtelserForm', felt = 'andreYtelser', feilkode = 'listIsEmpty':
'andreYtelserForm.validation.andreYtelser.listIsEmpty': 'Du må velge minst én ytelse',
```

---

## Steg-for-steg

### 1. Bestem feltdetaljer

Fra brukerens beskrivelse, bestem:

- **Feltnavn** (`lowerCamelCase`) — f.eks. `andreYtelser`
- **Felttype** — velg fra komponentkatalogen over
- **Verdier** (for CheckboxGroup/RadioGroup) — lag en enum
- **Betinget visning?** — vises feltet alltid, eller kun basert på et annet felt?
- **Valideringsregel** — hvilken validator + ev. options

### 2. Oppdater `types.ts`

#### Legg til verdienum (for CheckboxGroup/RadioGroup)

```ts
export enum <EnumNavn> {
    VERDI_1 = 'VERDI_1',
    VERDI_2 = 'VERDI_2',
    // ...
}
```

#### Utvid FormFields-enum

```ts
export enum <Prefix>FormFields {
    eksisterendeFelt = 'eksisterendeFelt',
    nyttFelt = 'nyttFelt',  // ← legg til
}
```

#### Utvid FormValues-interface

```ts
export interface <Prefix>FormValues extends StepFormValues {
    [<Prefix>FormFields.eksisterendeFelt]?: YesOrNo;
    [<Prefix>FormFields.nyttFelt]?: <EnumNavn>[];  // ← legg til
}
```

### 3. Oppdater `i18n/nb.ts`

Legg til tekster for spørsmålet, hvert alternativ og valideringsfeil:

```ts
export const <prefix>StegMessages_nb = {
    // eksisterende nøkler...
    '<prefix>Steg.spørsmål.<felt>': '<spørsmålstekst>',
    '<prefix>Steg.<felt>.<ENUM_VERDI_1>': '<visningstekst>',
    '<prefix>Steg.<felt>.<ENUM_VERDI_2>': '<visningstekst>',
    '<prefix>Form.validation.<felt>.<feilkode>': '<valideringstekst>',
};
```

> For nøkkelstruktur-konvensjoner, ICU-parametre (`{param}`, `plural`) og bruk av `<AppText>` vs. `text()`-hook → se `sif-intl`.

### 4. Oppdater eller opprett `i18n/nn.ts`

Start med å spre `nb` og la nynorsk-oversettelse gjøres manuelt av utvikler i etterkant:

```ts
import { <prefix>StegMessages_nb } from './nb';

export const <prefix>StegMessages_nn: Record<keyof typeof <prefix>StegMessages_nb, string> = {
    ...<prefix>StegMessages_nb,
};
```

> Ikke oversett tekstene automatisk. TypeScript sikrer full nøkkeldekning via `Record<keyof typeof ..._nb, string>`.

### 5. Oppdater `Soknadsdata.ts`

Utvid søknadsdatatypen med det nye feltet:

```ts
export type <Prefix>Søknadsdata = {
    eksisterendeFelt: boolean;
    nyttFelt?: <EnumNavn>[];  // ← legg til (optional hvis betinget)
};
```

### 6. Oppdater `<prefix>StegUtils.ts`

#### `toFormValues` — map søknadsdata → skjemaverdier

Legg til mapping av det nye feltet. For array-felt:

```ts
return {
    eksisterendeFelt: søknadsdata.eksisterendeFelt ? YesOrNo.YES : YesOrNo.NO,
    nyttFelt: søknadsdata.nyttFelt,  // ← legg til
};
```

#### `toSøknadsdata` — map skjemaverdier → søknadsdata

Håndter betinget logikk (nullstill felt hvis forutsetning ikke er oppfylt):

```ts
return {
    eksisterendeFelt: data.eksisterendeFelt === YesOrNo.YES,
    nyttFelt: data.eksisterendeFelt === YesOrNo.YES
        ? data.nyttFelt as <EnumNavn>[] | undefined
        : undefined,  // ← rydd opp når betingelse ikke er oppfylt
};
```

### 7. Oppdater `<Prefix>Form.tsx`

#### a) Utvid destructuring fra `createSifFormComponents`

```ts
const { YesOrNoQuestion, CheckboxGroup } = createSifFormComponents<<Prefix>FormValues>();
```

#### b) Legg til import av ny validator

```ts
import { getListValidator, getYesOrNoValidator } from '@navikt/sif-validation';
```

#### c) Oppgi scope til `useSifValidate`

```ts
const { validateField } = useSifValidate('<prefix>Form');
```

Scope-en bestemmer prefixen i valideringsnøkkelen: `<prefix>Form.validation.<felt>.<feilkode>`.

#### d) Legg til watch for betinget visning (hvis relevant)

```ts
const methods = useSøknadRhfForm(stepId, defaultValues);
const triggerFelt = methods.watch(<Prefix>FormFields.eksisterendeFelt);
```

#### d) Legg til komponent i JSX

For betinget visning, wrap i en betingelse:

```tsx
<FormLayout.Questions>
    <YesOrNoQuestion ... />
    {triggerFelt === YesOrNo.YES && (
        <CheckboxGroup
            name={<Prefix>FormFields.nyttFelt}
            legend={text('<prefix>Steg.spørsmål.<felt>')}
            validate={validateField(
                <Prefix>FormFields.nyttFelt,
                getListValidator({ required: true }),
            )}
            checkboxes={[
                { value: <EnumNavn>.VERDI_1, label: text('<prefix>Steg.<felt>.VERDI_1') },
                { value: <EnumNavn>.VERDI_2, label: text('<prefix>Steg.<felt>.VERDI_2') },
            ]}
        />
    )}
</FormLayout.Questions>
```

### 8. Verifiser

Kjør `npx tsc --noEmit` i app-mappen.

---

## Betinget visning — mønster

Bruk `methods.watch()` for å observere et annet felt, og vis det nye feltet betinget med vanlig `&&`-rendering:

```tsx
const methods = useSøknadRhfForm(stepId, defaultValues);
const feltVerdi = methods.watch(<Prefix>FormFields.triggerFelt);

// I JSX — ett felt:
{feltVerdi === YesOrNo.YES && (
    <NyKomponent ... />
)}

// Flere felt som gruppe — bruk fragment, ikke FormLayout.Questions:
{feltVerdi === YesOrNo.YES && (
    <>
        <FeltA ... />
        <FeltB ... />
    </>
)}
```

`FormLayout.Questions` er ikke nødvendig rundt betinget innhold — gapet styres av den ytre `FormLayout.Questions`.

I `toSøknadsdata`, sett avhengige felter til `undefined` når betingelsen ikke er oppfylt:

```ts
nyttFelt: data.triggerFelt === YesOrNo.YES ? data.nyttFelt : undefined,
```

### Feilmeldinger på betingede felter

Når felter skjules (unmountes) beholdes feilmeldinger i RHF sin form state. Rydd opp med `clearErrors` i en `useEffect`:

```tsx
useEffect(() => {
    if (feltVerdi !== YesOrNo.YES) {
        methods.clearErrors([<Prefix>FormFields.nyttFelt]);
    }
}, [feltVerdi]);
```

### AriaLiveRegion — kun for meldinger

`AriaLiveRegion` skal **kun** brukes rundt dynamiske meldinger som skjermlesere skal annonsere. Bruk **ikke** `AriaLiveRegion` rundt spørsmål/skjemafelter — bruk `&&` i stedet.

Kombinert med `QuestionRelatedMessage` (fra `@navikt/sif-common-ui`) trekkes meldingen visuelt nærmere spørsmålet den tilhører via `Bleed` med negativ top-margin:

```tsx
import { AriaLiveRegion } from '@sif/soknad-ui/components';
import { QuestionRelatedMessage } from '@navikt/sif-common-ui';

<YesOrNoQuestion name={...} ... />
<AriaLiveRegion visible={feltVerdi === YesOrNo.NO}>
    <QuestionRelatedMessage>
        <SifInfoMessage>...</SifInfoMessage>
    </QuestionRelatedMessage>
</AriaLiveRegion>
```

`QuestionRelatedMessage` inne i `AriaLiveRegion` fungerer korrekt — `Bleed`'s negative top-margin trekker meldingen opp mot spørsmålet over.

**Komponentvalg ved migrering:** Sjekk alltid hvilken status og presentasjon v1 bruker på tilsvarende melding. Bruk `SifInfoMessage` for info/warning, `InlineMessage` når den gamle løsningen var inline, og `LocalAlert status="error"` for feil. Ikke gjett. Finn meldingskomponenten i v1 (gjerne under `alert/`-mappe i steget) og bevar betydningen.

```
# Eksempel fra v1-mappestruktur:
steps/om-barnet/alert/IkkeKroniskEllerFuksjonshemningAlert.tsx → SifInfoMessage
steps/om-barnet/alert/TrengerIkkeSøkeForBarnAlert.tsx         → SifInfoMessage
steps/oppsummering/alert/UgyldigSøknadAlert.tsx               → LocalAlert status="error"
```

---

## Sjekkliste

- [ ] `types.ts` — evt. ny enum, nytt felt i FormFields og FormValues
- [ ] `i18n/nb.ts` — spørsmålstekst, alternativ-labels, valideringsmelding
- [ ] `i18n/nn.ts` — opprettet eller oppdatert med nynorsk (typed mot `nb`)
- [ ] `Soknadsdata.ts` — nytt felt i søknadsdatatype
- [ ] `*StegUtils.ts` — mapping begge veier, med opprydding av betingede felter
- [ ] `*Form.tsx` — ny komponent, evt. betinget visning, riktig validator
- [ ] `tsc --noEmit` passerer
