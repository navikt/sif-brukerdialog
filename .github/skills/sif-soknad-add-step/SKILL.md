---
name: sif-soknad-add-step
description: Legg til et nytt steg i en søknadsapp som bruker @sif/soknad og @sif/rhf — oppretter alle filer og oppdaterer config/routing/i18n.
---

# sif-soknad-add-step Skill

## Formål

Scaffold et komplett nytt steg i en søknadsapp. Etter at skillen er kjørt skal steget kompilere, rute korrekt og vise et tomt skjema klart for domeneinnhold.

## Når skal skillen brukes

- Bruker ber om å legge til et nytt steg/side i søknaden.
- Bruker ber eksplisitt om et nytt spørsmål eller skjema som skal ligge på en egen side / i et eget steg.

## Avgrensning

- **Kun** scaffold og kobling — ikke domenelogikk, API-kall eller avansert UI.
- Stegets innhold utvides etter at grunnstrukturen er på plass.
- For oppsett av selve setup-laget (context, store, hooks) → bruk `sif-soknad-setup`.
- For oppsett av `Soknad.tsx`, `VelkommenPage`, `KvitteringPage` og `steps/index.ts` → bruk `sif-soknad-setup` (seksjonen "Routing shell og pages").
- For i18n-konvensjoner utover det som dekkes her → bruk `sif-intl`.

## Arbeidsmodus

**Agenten skal ikke utforske kodebasen bredt.** Les kun filene som er nødvendige for å plassere steget riktig i den aktuelle appen:

1. `src/app/setup/config/SoknadStepId.ts` — eksisterende steg-IDer
2. `src/app/setup/config/soknadStepConfig.ts` — stepConfig og stepOrder
3. `src/app/i18n/nb/appMessages.ts` — eksisterende i18n-importer og nøkler
4. `src/app/types/Soknadsdata.ts` — eksisterende søknadsdatatype
5. `src/app/utils/formValuesToSoknadsdata.ts` — mapping fra form values til søknadsdata
6. `src/app/setup/hooks/useStepTitles.ts` — dersom appen bruker egen step-title mapping
7. `src/app/steps/index.ts` og `src/app/Soknad.tsx` — dersom appen eksporterer steg samlet og ruter dem her

Ikke les andre steg-mapper eller gjør generell utforsking utover dette med mindre appen faktisk avviker fra standardoppsettet.

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

### Steg 1a — Sjekk om paneler fra @sif/soknad-forms kan brukes

Før du bygger UI fra bunnen: sjekk om steget handler om noe `@sif/soknad-forms` allerede dekker.

| Steg handler om                                                   | Bruk panel                |
| ----------------------------------------------------------------- | ------------------------- |
| Valg av registrert barn (radiogruppe med fødselsdato + kildeinfo) | `VelgRegistrertBarnPanel` |

Hvis et panel passer: importer det og bruk `ANNET_BARN`-konstanten fra samme pakke i stedet for å definere den lokalt.

```tsx
import { ANNET_BARN, VelgRegistrertBarnPanel } from '@sif/soknad-forms';
```

Eksporter `ANNET_BARN` fra `types.ts` via re-eksport hvis andre filer i steget trenger den:

```ts
import { ANNET_BARN } from '@sif/soknad-forms';
export { ANNET_BARN };
```

---

### Steg 1b — Kartlegg betingelseslogikken fra v1 (ved migrering)

Hvis steget porteres fra en eksisterende app: **les v1-skjemakomponenten FØR du skriver kode.** Finn filen som heter `<Prefix>Form.tsx` eller tilsvarende i kildeappen.

Kartlegg eksplisitt:

```
felt A → alltid synlig
felt B → synlig når felt A === YES
felt C → synlig når felt B === NO
alert X → synlig når felt A === NO
```

Sjekk spesielt inversjonsfeil — det er den vanligste feilen ved portering:

| v1-kode             | Feil v2-kode       | Riktig v2-kode      |
| ------------------- | ------------------ | ------------------- |
| `kronisk === YES`   | `kronisk === NO`   | `kronisk === YES`   |
| `harBarn === false` | `harBarn === true` | `harBarn === false` |

Skriv ned kartleggingen som kommentarer øverst i `<Prefix>Form.tsx` eller som lokale variabler med selvforklarende navn, og verifiser mot v1 før du leverer.

### Steg 1c — API-typer fra k9-brukerdialog-prosessering-api

Pakken `@navikt/k9-brukerdialog-prosessering-api` re-eksporterer typer fra mange ytelser. Bruk **alltid** ytelse-spesifikk subpath — ikke flat import fra rot.

```ts
// ✅ Riktig — omsorgspenger-spesifikk Barn og søknadstype
import { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';
export type SøknadApiData = omsorgspenger.OmsorgspengerKroniskSyktBarnSøknad;

// ❌ Feil — henter fra legacy client/types.gen.ts som har andre (feil) typer
import { OmsorgspengerKroniskSyktBarnSøknad } from '@navikt/k9-brukerdialog-prosessering-api';
```

Tilgjengelige subpaths: `omsorgspenger`, `aktivitetspenger`, `ungdomsytelse`, `ettersendelse`, `omsorgspenger-aleneomsorg`, o.l. — se `src/index.ts` i pakken.

Samme prinsipp gjelder controllers i `sendSoknad.ts`:

```ts
// ✅
await omsorgspenger.OmsorgspengerUtvidetRettController.innsendingOmsorgspengerKroniskSyktBarnSøknad(...)
```

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

> **Valideringsnøkkel-format:** `{scope}.validation.{felt}.{errorCode}` — der `scope` er strengen sendt til `useSifValidate('oppsummeringForm')` og `errorCode` er enum-verdien fra validatoren (f.eks. `notChecked`, `yesOrNoIsUnanswered`). Nøkkelen må finnes i i18n-filene, ellers vises raw key i UI.

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

> **Route-strenger må ikke inneholde norske bokstaver (æ, ø, å).** Bruk ASCII-ekvivalenter: `legeerklaring` (ikke `legeerklæring`), `delt-bosted` osv. Norske tegn i URL-path bryter routing i nettlesere.

**Betingede steg** som bare skal vises for noen brukere bruker `isIncluded`:

```ts
[SøknadStepId.DELT_BOSTED]: {
    route: 'delt-bosted',
    isIncluded: (s) => s[SøknadStepId.OM_BARNET]?.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED,
    isCompleted: (s) => s[SøknadStepId.DELT_BOSTED] !== undefined,
},
```

`søknadStepOrder` skal alltid inneholde **alle** steg inkl. betingede — `isIncluded` filtrerer dynamisk basert på søknadsdata. Ikke bruk manuell `getSøknadStepOrder`-funksjon.

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
