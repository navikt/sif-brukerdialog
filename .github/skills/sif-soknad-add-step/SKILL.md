---
name: sif-soknad-add-step
description: Legg til et nytt steg i en søknadsapp som bruker @sif/soknad og @sif/rhf — oppretter alle filer og oppdaterer config/routing/i18n.
---

# sif-soknad-add-step Skill

## Formål

Scaffold et komplett nytt steg i en søknadsapp. Etter at skillen er kjørt skal steget kompilere, rute korrekt og vise et tomt skjema klart for domeneinnhold.

## Når skal skillen brukes

- Bruker ber om å legge til et nytt steg/side i søknaden.
- Bruker nevner et nytt spørsmål/skjema som skal ha eget steg.

## Avgrensning

- **Kun** scaffold og kobling — ikke domenelogikk, API-kall eller avansert UI.
- Stegets innhold utvides etter at grunnstrukturen er på plass.
- For oppsett av selve setup-laget (context, store, hooks) → bruk `sif-soknad-setup`.
- For i18n-konvensjoner utover det som dekkes her → bruk `sif-intl`.

## Arbeidsmodus

**Agenten skal IKKE søke i kodebasen for å forstå mønsteret.** Alt som trengs er i denne skillen. Agenten trenger kun å lese følgende filer i appen for å plassere det nye steget riktig:

1. `src/app/setup/config/SoknadStepId.ts` — eksisterende steg-IDer
2. `src/app/setup/config/soknadStepConfig.ts` — stepConfig og stepOrder
3. `src/app/i18n/nb/appMessages.ts` — eksisterende i18n-importer og nøkler

Det er alt. Ikke les andre steg-mapper, ikke utforsk mappestruktur, ikke les SøknadStep/AppForm/hooks.

### Steg 1 — Bestem navnekonvensjoner

Utled navnene fra brukerens beskrivelse. Alle navn er konsekvente:

- `<Prefix>` = PascalCase (f.eks. `Periode`)
- `<prefix>` = lowerCamelCase (f.eks. `periode`)

| Konsept                 | Eksempel (for «Periode») |
| ----------------------- | ------------------------ |
| `StepId` enum-verdi     | `PERIODE`                |
| `StepId` string-verdi   | `'periode'`              |
| Mappename               | `periode`                |
| Route                   | `'periode'`              |
| Komponentprefix         | `Periode`                |
| Utils-filnavn           | `periodeStegUtils.ts`    |
| i18n-prefix             | `'periodeSteg'`          |
| i18n steg-tittel nøkkel | `'step.periode.title'`   |

I malene under brukes `<felt>` som plassholder for det **konkrete feltnavnet** du velger (f.eks. `harPeriode`, `harArbeid`). Det er lowerCamelCase og velges basert på hva spørsmålet handler om. Erstatt alle forekomster av `<felt>` med dette navnet, akkurat som `<Prefix>`/`<prefix>` erstattes med stegnavnet.

**Posisjon i stepOrder:** Plasser steget der brukeren ber om det. Hvis brukeren sier «førstesteg», legg det først. Hvis ingen posisjon er angitt, legg det sist før `OPPSUMMERING`.

### Steg 2 — Opprett nye filer

Opprett 5 filer under `src/app/steps/<mappename>/`:

#### `types.ts`

```ts
import { YesOrNo } from '@sif/rhf';
import { StepFormValues } from '@sif/soknad/types';

export enum <Prefix>FormFields {
    <felt> = '<felt>',
}

export interface <Prefix>FormValues extends StepFormValues {
    [<Prefix>FormFields.<felt>]?: YesOrNo;
}
```

> For andre felttyper enn YesOrNo, bruk `string`, `boolean`, osv. etter behov.

#### `<prefix>StegUtils.ts`

```ts
import { <Prefix>Søknadsdata } from '@app/types/Soknadsdata';
import { YesOrNo } from '@sif/rhf';

import { <Prefix>FormValues } from './types';

export const to<Prefix>FormValues = (
    søknadsdata: <Prefix>Søknadsdata | undefined,
): Partial<<Prefix>FormValues> => {
    if (søknadsdata?.<felt> === undefined) return {};
    return {
        <felt>: søknadsdata.<felt> ? YesOrNo.YES : YesOrNo.NO,
    };
};

export const to<Prefix>Søknadsdata = (data: <Prefix>FormValues): <Prefix>Søknadsdata => ({
    <felt>: data.<felt> === YesOrNo.YES,
});
```

#### `i18n/nb.ts`

```ts
export const <prefix>StegMessages_nb = {
    '<prefix>Steg.spørsmål.<felt>': '<spørsmålstekst>',
    '<prefix>Form.validation.<felt>.yesOrNoIsUnanswered': '<valideringstekst>',
};
```

#### `i18n/nn.ts`

Start med å spre `nb`. Nynorsk-oversettelse gjøres manuelt av utvikler i etterkant:

```ts
import { <prefix>StegMessages_nb } from './nb';

export const <prefix>StegMessages_nn: Record<keyof typeof <prefix>StegMessages_nb, string> = {
    ...<prefix>StegMessages_nb,
};
```

> For nøkkelstruktur-konvensjoner, ICU-parametre og `<AppText>` vs. `text()`-hook → se `sif-intl`.

#### `<Prefix>Form.tsx`

```tsx
import { useAppIntl } from '@app/i18n';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { useSøknadRhfForm, useStepDefaultValues, useStepSubmit } from '@app/setup/hooks';
import { AppForm } from '@app/setup/soknad/AppForm';
import { <Prefix>Søknadsdata } from '@app/types/Soknadsdata';
import { FormLayout } from '@navikt/sif-common-ui';
import { getYesOrNoValidator } from '@navikt/sif-validation';
import { createSifFormComponents, useSifValidate } from '@sif/rhf';

import { to<Prefix>FormValues, to<Prefix>Søknadsdata } from './<prefix>StegUtils';
import { <Prefix>FormFields, <Prefix>FormValues } from './types';

const { YesOrNoQuestion } = createSifFormComponents<<Prefix>FormValues>();

const stepId = SøknadStepId.<STEP_ID>;

export const <Prefix>Form = () => {
    const { validateField } = useSifValidate('<prefix>Form');
    const { text } = useAppIntl();

    const defaultValues = useStepDefaultValues<<Prefix>FormValues, <Prefix>Søknadsdata>({
        stepId,
        toFormValues: to<Prefix>FormValues,
    });

    const { onSubmit, isPending } = useStepSubmit<<Prefix>FormValues, <Prefix>Søknadsdata>({
        stepId,
        toSøknadsdata: to<Prefix>Søknadsdata,
    });

    const methods = useSøknadRhfForm(stepId, defaultValues);

    return (
        <AppForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending}>
            <FormLayout.Content>
                <FormLayout.Questions>
                    <YesOrNoQuestion
                        name={<Prefix>FormFields.<felt>}
                        legend={text('<prefix>Steg.spørsmål.<felt>')}
                        validate={validateField(<Prefix>FormFields.<felt>, getYesOrNoValidator())}
                    />
                </FormLayout.Questions>
            </FormLayout.Content>
        </AppForm>
    );
};
```

#### `<Prefix>Steg.tsx`

```tsx
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadStep } from '@app/setup/soknad/SoknadStep';

import { <Prefix>Form } from './<Prefix>Form';

export const <Prefix>Steg = () => (
    <SøknadStep stepId={SøknadStepId.<STEP_ID>}>
        <<Prefix>Form />
    </SøknadStep>
);
```

### Steg 3 — Oppdater eksisterende filer

Disse endringene er mekaniske og følger samme mønster for hvert steg:

#### 1. `src/app/setup/config/SoknadStepId.ts`

Legg til ny enum-verdi. Plasser den i riktig rekkefølge (f.eks. først = førstesteg).

#### 2. `src/app/setup/config/soknadStepConfig.ts`

Legg til i `søknadStepConfig`:

```ts
[SøknadStepId.<STEP_ID>]: {
    route: '<mappename>',
    isCompleted: (s) => s.<camelCase> !== undefined,
},
```

Legg til i `søknadStepOrder` på riktig posisjon.

#### 3. `src/app/types/Soknadsdata.ts`

Legg til type:

```ts
export type <Prefix>Søknadsdata = {
    <felt>: boolean;
};
```

Legg til i `Søknadsdata`-interface:

```ts
[SøknadStepId.<STEP_ID>]?: <Prefix>Søknadsdata;
```

#### 4. `src/app/utils/formValuesToSoknadsdata.ts`

Legg til import av utils og types fra det nye steget, og ny `case` i switch:

```ts
case SøknadStepId.<STEP_ID>:
    return to<Prefix>Søknadsdata(formValues as <Prefix>FormValues);
```

#### 5. `src/app/setup/hooks/useStepTitles.ts`

Legg til ny tittel i Record:

```ts
[SøknadStepId.<STEP_ID>]: text('step.<camelCase>.title'),
```

#### 6. `src/app/i18n/nb/appMessages.ts`

- Importer `<prefix>StegMessages_nb` fra stegets `i18n/nb.ts`
- Spread i `appMessages_nb`
- Legg til `'step.<camelCase>.title': '<Stegtittel>'`

#### 7. `src/app/steps/index.ts`

Legg til eksport:

```ts
export { <Prefix>Steg } from './<mappename>/<Prefix>Steg';
```

#### 8. `src/app/Soknad.tsx`

- Importer `<Prefix>Steg` fra `'./steps'`
- Legg til Route inne i `/soknad`-gruppen:

```tsx
<Route path={søknadStepConfig[SøknadStepId.<STEP_ID>].route} element={<<Prefix>Steg />} />
```

### Steg 4 — Verifiser

Kjør `npx tsc --noEmit` i app-mappen. Ingen feil = ferdig.

## Sjekkliste

- [ ] 5 nye filer opprettet (`types.ts`, `*StegUtils.ts`, `i18n/nb.ts`, `*Form.tsx`, `*Steg.tsx`)
- [ ] `SoknadStepId.ts` — ny enum-verdi
- [ ] `soknadStepConfig.ts` — config + stepOrder
- [ ] `Soknadsdata.ts` — type + interface-felt
- [ ] `formValuesToSoknadsdata.ts` — import + case
- [ ] `useStepTitles.ts` — ny tittel
- [ ] `appMessages.ts` — import + spread + steg-tittel
- [ ] `steps/index.ts` — eksport
- [ ] `Soknad.tsx` — import + Route
- [ ] `tsc --noEmit` passerer
