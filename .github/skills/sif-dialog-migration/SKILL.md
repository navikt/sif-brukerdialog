---
name: sif-dialog-migration
description: Porter *ListAndDialog-komponenter fra sif-common-forms-ds (v1/Formik) til sif-soknad-forms (v2/RHF) via ModalFormAndList.
---

# sif-dialog-migration

## Formål

Porter en `*ListAndDialog`-komponent fra `packages/sif-common-forms-ds` til `packages/sif-soknad-forms`. Etter portering skal:

- Domenetype, felter og validering være identiske med v1.
- Generell dialog-state håndteres av `ModalFormAndList`, ikke en lokal state-maskin.
- Formik er erstattet med RHF (`useForm`, `createSifFormComponents`, `useSifValidate`).
- i18n-nøkler følger `@sifSoknadForms`-prefiksmønsteret.

## Når skal skillen brukes

- Bruker ber om å porte en dialog fra `sif-common-forms-ds` til `sif-soknad-forms`.
- Bruker nevner `porter dialog`, `migrer ListAndDialog`, `flytt til sif-soknad-forms`, `ModalFormAndList`, `BostedUtlandListAndDialog`, `UtenlandsoppholdListAndDialog` eller lignende.
- Bruker referer til en spesifikk v1-dialog som skal til v2.

## Avgrensning

- Skillen gjelder **én dialog om gangen**.
- For generell Formik→RHF i app-steg (ikke dialoger i `sif-soknad-forms`) → bruk `sif-formik-to-rhf`.
- For rene i18n-endringer → bruk `sif-intl`.

---

## Arkitektur

### ModalFormAndList

Generisk komponent i `packages/sif-soknad-forms/src/components/ModalFormAndList.tsx` som håndterer:

- Dialog-state (åpne for ny/rediger, lukke)
- Add/edit/delete-operasjoner på en liste
- Fokusretur til legg-til-knapp etter ny oppføring
- `maxItems`-begrensning og `emptyState`

Alle `*ListAndDialog`-porter bruker denne som orkestreringskomponent. Domenelogikk holdes i egne filer.

### Filstruktur per dialog

```
src/dialogs/<navn>/
  index.ts                    ← domenetype + barrel exports
  XxxDialogForm.tsx           ← useForm + createSifFormComponents + useSifValidate
  XxxDialog.tsx               ← Aksel Dialog shell rundt formen
  XxxList.tsx                 ← ItemListDarkside fra @navikt/sif-common-ui
  XxxListAndDialog.tsx        ← tynn wrapper: mapper domeneprops til ModalFormAndList
  XxxListAndDialog.stories.tsx
  i18n/
    nb.ts
    nn.ts
```

### Komponentansvar

| Fil | Ansvar |
|-----|--------|
| `XxxDialogForm` | RHF-form: felter, validering, `formValuesToXxx()`, `xxxToFormValues()` |
| `XxxDialog` | Aksel `Dialog`-shell: tittel, body (form), footer (knapper) |
| `XxxList` | Render liste med `ItemListDarkside`, label-rendering, formattering |
| `XxxListAndDialog` | Kobler `ModalFormAndList` med domenekomponentene via render-props |

---

## Arbeidsrekkefølge

For hver dialog som porteres:

1. **Les v1-kildene** — type, form, list, dialog, i18n. Kartlegg felter, validering og submit-logikk.
2. **Opprett domenetype** i `src/dialogs/<navn>/index.ts`.
3. **Opprett `XxxDialogForm`** — RHF-form med `useForm`, `createSifFormComponents`, `useSifValidate`. Inkluder `formValuesToXxx` og `xxxToFormValues`.
4. **Opprett `XxxDialog`** — Aksel `Dialog`-shell rundt formen.
5. **Opprett `XxxList`** — bruker `ItemListDarkside` fra `@navikt/sif-common-ui`.
6. **Opprett `XxxListAndDialog`** — tynn wrapper som kobler `ModalFormAndList` med domenekomponentene.
7. **Opprett story** — `XxxListAndDialog.stories.tsx` med `StoryFrame`. Intl håndteres globalt.
8. **Legg til i18n** — nb.ts og nn.ts under `src/dialogs/<navn>/i18n/`, aggregert i `src/i18n/index.tsx`.
9. **Eksporter** fra `src/dialogs/<navn>/index.ts` og `src/dialogs/index.ts`.
10. **Verifiser** — `get_errors` på alle nye filer + `lint:tsc`.

---

## Dialogform-regler

### Validering

- Bruk `useSifValidate('@sifSoknadForms.<xxxForm>')` — scope følger `@sifSoknadForms`-prefiksen.
- Bruk `getDateValidator`, `getRequiredFieldValidator` etc. fra `@navikt/sif-validation`.
- For `DateRangePicker`: `getDateValidator` per felt + `validate`-prop på gruppen for cross-field validering.

### Datakonvertering

- Bruk `validationUtils.getDateFromDateString` for eksplisitt datoparsing.
- Bruk `crypto.randomUUID()` for nye elementer.
- Bruk aktiv locale fra `sifIntl.locale` (via `useSifSoknadFormsIntl()`) når displaydata bygges, f.eks. `getCountryName(landkode, sifIntl.locale)`.
- Ikke hardkod `'nb'` i mapper-funksjoner som bygger brukervendt tekst.

### Miljøavhengigheter

- Unngå å lese app-miljø direkte via `@navikt/sif-common-env` i `packages/sif-soknad-forms` uten at det er strengt nødvendig.
- Husk at dialoger i `sif-soknad-forms` også kjøres i Storybook, hvor full `appSettings` ikke alltid finnes.
- Hvis en dialog trenger miljøstyrt oppførsel, foretrekk eksplisitt prop eller en liten lokal fallback fremfor å binde dialogen til app-env.

### Dialog-shell

- Bruk Aksel `Dialog` med `Dialog.Popup`, `Dialog.Header`, `Dialog.Body`, `Dialog.Footer`.
- `onOpenChange` skal wrappe cancel: `onOpenChange={(open) => { if (!open) onCancel(); }}`.
- Når en dialog ikke trenger å bevare intern state mens den er lukket, la dialogkomponenten returnere `null` når `isOpen === false` slik at innholdet unmountes mellom åpninger.
- Dette er spesielt nyttig for liste/dialog-mønstre der mange dialoginstanser ellers kan bli stående rendret i lukket tilstand.
- For RHF-baserte dialoger gir dette også ferske `useForm({ defaultValues })` ved ny mount, og er ofte enklere enn manuell `reset(...)`-logikk.
- Behold dialogen mounted mens den er lukket bare når det finnes en konkret grunn, for eksempel bevart lokal state, spesifikk fokus-/animasjonshåndtering eller annen eksplisitt oppførsel.
- Submit-knapp bruker `form={formId}` for å koble til formen i body.
- Hvis samme formkonfig-props må sendes gjennom flere lag (`XxxDialogForm` → `XxxDialog` → `XxxListAndDialog`), eksporter en egen delt config-type fra form-filen og gjenbruk den i wrapperne.
- Foretrekk en eksplisitt delt type som `XxxDialogFormConfig` fremfor å repetere feltene eller bygge wrapper-API på `Pick<Props, ...>` fra hele form-komponenten.

---

## Storybook-konvensjoner

Når du lager stories i `packages/sif-soknad-forms`:

1. **Ikke** legg lokal `IntlProvider` — intl er globalt satt opp i `.storybook/preview.js` via `withIntl`.
2. Bruk `StoryFrame` fra `src/storybook/components/StoryFrame.tsx` for layout (`maxWidth`, `minHeight`).
3. Bruk `withRHFForm` fra `src/storybook/decorators/withRHFForm.tsx` hvis storyen trenger RHF-kontekst, med `parameters.rhf.defaultValues`.
4. Hold lokal state kun for det som demonstreres (`useState` for liste eller åpen dialog).
5. Send inn sentrale props som påvirker dialoglogikken i storyen, ikke bare minimumsoppsett. Eksempler: `disallowedFødselsnumre`, placeholders, hjelpetekst og andre domeneprops som styrer validering eller visning.

### Story-eksempel

```tsx
import { StoryFrame } from '../../storybook/components/StoryFrame';

function XxxListAndDialogStory({ items }: StoryProps) {
    const [data, setData] = useState(items);
    return <XxxListAndDialog items={data} onChange={setData} addButtonLabel="Legg til" />;
}

const meta = {
    title: 'Dialogs/Xxx/ListAndDialog',
    component: XxxListAndDialogStory,
    decorators: [(Story) => <StoryFrame maxWidth={720} minHeight={700}><Story /></StoryFrame>],
    args: { items: exampleItems },
} satisfies Meta<typeof XxxListAndDialogStory>;
```

---

## i18n-konvensjoner

- Prefiks: `@sifSoknadForms.<xxx>.` for tekster, `@sifSoknadForms.<xxxForm>.validation.` for feilmeldinger.
- `nn.ts` types mot `nb.ts` med `Record<keyof typeof ..._nb, string>`.
- Ikke oversett tekster automatisk — kopier nb som utgangspunkt i nn.
- Aggreger i `src/i18n/index.tsx` sammen med andre dialogs meldinger.

---

## Referanseeksempel — BostedUtland

`XxxListAndDialog` er ~30 linjer:

```tsx
export const BostedUtlandListAndDialog = ({ minDate, maxDate, bosteder, addButtonLabel, onChange }: Props) => (
    <ModalFormAndList
        items={bosteder}
        getItemId={(b) => b.id}
        addButtonLabel={addButtonLabel}
        onChange={onChange}
        listRenderer={({ items, onEdit, onDelete }) => (
            <BostedUtlandList bosteder={items} onEdit={onEdit} onDelete={onDelete} />
        )}
        dialogRenderer={({ item, allItems, isOpen, onSubmit, onCancel }) => (
            <BostedUtlandFormDialog
                minDate={minDate} maxDate={maxDate}
                bosted={item} alleBosteder={allItems}
                isOpen={isOpen} onValidSubmit={onSubmit} onCancel={onCancel}
            />
        )}
    />
);
```

---

## Dialoger som skal porteres

Fra `packages/sif-common-forms-ds/src/forms/`:

| v1-mappe | Porteringsstatus |
|----------|-----------------|
| `bosted-utland` | Ferdig |
| `utenlandsopphold` | Ikke startet |
| `tidsperiode` | Ikke startet |
| `ferieuttak` | Ikke startet |
| `opptjening-utland` | Ikke startet |
| `enkeltdatoer` | Ikke startet |
| `annet-barn` | Ferdig |
| `utenlandsk-næring` | Ikke startet |
| `fravær` (perioder + dager) | Ikke startet |
| `fosterbarn` | Ikke startet |
