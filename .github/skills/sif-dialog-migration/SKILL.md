---
name: sif-dialog-migration
type: action
description: Porter *ListAndDialog-komponenter fra sif-common-forms-ds (v1/Formik) til sif-soknad-forms (v2/RHF) via ModalFormAndList.
---

# sif-dialog-migration

## Bruk når

- Bruker ber om å porte en dialog fra `sif-common-forms-ds` til `sif-soknad-forms`.
- Bruker nevner `porter dialog`, `migrer ListAndDialog`, `flytt til sif-soknad-forms`, `ModalFormAndList`, eller en spesifikk v1-dialog.
- Bruker referer til en spesifikk v1-dialog som skal til v2.

## Leveranse

- Domenetype i `src/dialogs/<navn>/index.ts`
- `XxxDialogForm` — RHF-form med felter, validering og konverteringsfunksjoner
- `XxxDialog` — Aksel Dialog-shell
- `XxxList` — liste med `ItemListDarkside`
- `XxxListAndDialog` — kobler `ModalFormAndList` med domenekomponentene
- Story i `.stories.tsx`
- i18n (`nb.ts` og `nn.ts`) under `src/dialogs/<navn>/i18n/`
- Eksport fra `src/dialogs/<navn>/index.ts` og `src/dialogs/index.ts`

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

| Fil                | Ansvar                                                                 |
| ------------------ | ---------------------------------------------------------------------- |
| `XxxDialogForm`    | RHF-form: felter, validering, `formValuesToXxx()`, `xxxToFormValues()` |
| `XxxDialog`        | Aksel `Dialog`-shell: tittel, body (form), footer (knapper)            |
| `XxxList`          | Render liste med `ItemListDarkside`, label-rendering, formattering     |
| `XxxListAndDialog` | Kobler `ModalFormAndList` med domenekomponentene via render-props      |

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
10. **Verifiser teknisk** — `get_errors` på alle nye filer + `lint:tsc`.
11. **Verifiser innholdsparitet** — sammenlign v1 og v2 komponent for komponent: form, list og summary (se Innholdsverifisering under).

---

## Dialogform-regler

### Validering

- Bruk `useSifValidate('@sifSoknadForms.<xxxForm>')` — scope følger `@sifSoknadForms`-prefiksen.
- Bruk `getDateValidator`, `getRequiredFieldValidator` etc. fra `@navikt/sif-validation`.
- For `DateRangePicker`: `getDateValidator` per felt + `validate`-prop på gruppen for cross-field validering.

### Datakonvertering

- Bruk `crypto.randomUUID()` for nye elementer.
- Bruk aktiv locale fra `sifIntl.locale` (via `useSifSoknadFormsIntl()`) når displaydata bygges, f.eks. `getCountryName(landkode, sifIntl.locale)`.
- Ikke hardkod `'nb'` i mapper-funksjoner som bygger brukervendt tekst.

#### Datohåndtering i dialoger

Dato-APIet er delt i to lag:

| Lag                       | Pakke                                    | Funksjon                                                              | Bruksområde                                                                                           |
| ------------------------- | ---------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| Datepicker-parsing        | `@sif/rhf` → `datePickerUtils`           | `parseDatePickerValue(value)`                                         | Konverterer brukerinput fra datepicker (ISO-streng eller norske datoformater) til `Date \| undefined` |
| Generell ISO-konvertering | `@navikt/sif-common-utils` → `dateUtils` | `dateToISODate(date)`, `ISODateToDate(iso)`, `isISODateString(value)` | Konvertering mellom `Date` og `ISODate`-strenger                                                      |

**Regler:**

- I `formValuesToXxx()`-funksjoner der verdier kommer fra datepicker-felter, bruk `datePickerUtils.parseDatePickerValue(value)` for å parse til `Date`.
- I `xxxToFormValues()`-funksjoner der `Date` skal til formverdi, bruk `dateUtils.dateToISODate(date)` for å konvertere til ISO-streng.
- For typeguard/sjekk om en streng er gyldig ISO-dato, bruk `dateUtils.isISODateString(value)`.
- `new Date(...)` er blokkert i portert runtime-kode for skjemaer med mindre bruker eksplisitt har godkjent det.
- `ISODateToDate` kan brukes i tester og mock-data, men ikke som erstatning for `parseDatePickerValue` i skjemaflyt.
- `validationUtils.getDateFromDateString` (fra `@navikt/sif-validation`) brukes fortsatt internt i validatorer — ikke bland den inn i dialog-mapping.

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
    decorators: [
        (Story) => (
            <StoryFrame maxWidth={720} minHeight={700}>
                <Story />
            </StoryFrame>
        ),
    ],
    args: { items: exampleItems },
} satisfies Meta<typeof XxxListAndDialogStory>;
```

---

## Innholdsverifisering (BLOKKERENDE)

Etter porting av en dialog **må** alle renderbare komponenter verifiseres mot v1-originalen. Denne sjekken er blokkerende — dialogen regnes ikke som ferdig portert før den er bestått.

Dette gjelder **alle** komponenttyper som rendrer brukersynlig innhold:

- **DialogForm** — felter, labels, legends, hjelpetekst, betinget visning, validering
- **List** — label-rendering, tittel, formatering av verdier
- **Summary** — alle verdier, betingede blokker, formatering

### Fremgangsmåte

For hver komponenttype som finnes i v1:

1. **Les v1-komponenten** — åpne `sif-common-forms-ds/src/forms/<xxx>/Xxx*.tsx` og list opp alt innhold som rendres.
2. **Les v2-komponenten** — åpne `sif-soknad-forms/src/dialogs/<xxx>/Xxx*.tsx` og list opp alt innhold som rendres.
3. **Sammenlign felt for felt** — hvert felt, label, betinget blokk og formatert verdi i v1 skal ha en tilsvarende del i v2.
4. **Rapporter avvik** — hvis noe mangler eller avviker, fiks det før oppgaven avsluttes.

### Sjekkliste — Form

- [ ] Alle felter fra v1 form er representert i v2 form
- [ ] Labels, legends og descriptions matcher ordrett
- [ ] Betinget visning har samme betingelse (ingen inversjoner)
- [ ] Valideringsregler og parametere er identiske
- [ ] Hjelpetekst og veiledningstekst er med

### Sjekkliste — List

- [ ] Alle verdier i v1 list label-rendering er representert i v2
- [ ] Tittel/header for hvert element matcher
- [ ] Formatering av datoer, landnavn og andre verdier er lik

### Sjekkliste — Summary

- [ ] Alle felter fra v1 Summary er representert i v2 Summary
- [ ] Betingede blokker har samme betingelse (f.eks. `erNyoppstartet`, `registrertINorge`)
- [ ] Ja/Nei-spørsmål som vises i v1 vises også i v2 (ikke bare detaljfeltene)
- [ ] Datoer, tall og tekst formateres likt
- [ ] Rekkefølgen på blokkene er konsistent med v1

### Typiske feil

- **YesOrNo widened til string**: `YesOrNo`-felt i `FormValues` typet som `string` i stedet for `YesOrNo`. RHF støtter enum-typer direkte — bruk `YesOrNo`-typen og unngå `as YesOrNo`-caster i konverteringsfunksjonene.
- **Manglende felt i form**: v1 har et felt som v2 mangler helt — ofte betingede felter som vises under spesifikke tilstander.
- **Manglende verdier i list**: v1 label-rendering viser flere verdier enn v2 (f.eks. dato, type, detaljer).
- **Manglende ytre Ja/Nei-svar i summary**: v1 viser både spørsmålet (Ja/Nei) og detaljene, v2 hopper over spørsmålet og viser bare detaljene.
- **Manglende betinget blokk**: v1 har en blokk som vises under en spesifikk betingelse, v2 mangler den helt.
- **Feil betingelse**: v2 bruker en annen betingelse enn v1 for å vise en blokk.
- **Invertert betingelse**: v2 bruker `=== YES` der v1 bruker `=== NO` eller omvendt.

### Når v2-typen avviker fra v1-API-typen

v1 bruker ofte en API-data-type (flat/nested DTO), mens v2 bruker en form-nær type med `YesOrNo`-felter. Sørg for at alle verdier fra DTO-en som v1 rendrer, også er tilgjengelig og rendret via v2-typen.

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
                minDate={minDate}
                maxDate={maxDate}
                bosted={item}
                alleBosteder={allItems}
                isOpen={isOpen}
                onValidSubmit={onSubmit}
                onCancel={onCancel}
            />
        )}
    />
);
```

---

## Dialoger som skal porteres

Fra `packages/sif-common-forms-ds/src/forms/`:

| v1-mappe                    | Porteringsstatus |
| --------------------------- | ---------------- |
| `bosted-utland`             | Ferdig           |
| `utenlandsopphold`          | Ikke startet     |
| `tidsperiode`               | Ikke startet     |
| `ferieuttak`                | Ikke startet     |
| `opptjening-utland`         | Ikke startet     |
| `enkeltdatoer`              | Ikke startet     |
| `annet-barn`                | Ferdig           |
| `utenlandsk-næring`         | Ikke startet     |
| `fravær` (perioder + dager) | Ikke startet     |
| `fosterbarn`                | Ikke startet     |
