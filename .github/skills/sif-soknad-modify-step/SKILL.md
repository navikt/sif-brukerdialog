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

| Validator               | Feilkode(r)                                          |
| ----------------------- | ---------------------------------------------------- |
| `getYesOrNoValidator`   | `yesOrNoIsUnanswered`                                |
| `getListValidator`      | `listIsEmpty`, `listHasTooFewItems`, `listHasTooManyItems` |
| `getRequiredFieldValidator` | `noValue`                                        |
| `getStringValidator`    | `stringHasNoValue`, `stringIsTooShort`, `stringIsTooLong` |
| `getCheckedValidator`   | `notChecked`                                         |

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

Bruk `methods.watch()` for å observere et annet felt, og vis det nye feltet betinget:

```tsx
const methods = useSøknadRhfForm(stepId, defaultValues);
const feltVerdi = methods.watch(<Prefix>FormFields.triggerFelt);

// I JSX:
{feltVerdi === YesOrNo.YES && (
    <NyKomponent ... />
)}
```

I `toSøknadsdata`, sett avhengige felter til `undefined` når betingelsen ikke er oppfylt:

```ts
nyttFelt: data.triggerFelt === YesOrNo.YES ? data.nyttFelt : undefined,
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
