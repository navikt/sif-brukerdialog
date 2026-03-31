# omsorgspengesoknad-v2 — migrasjonslogg

Migrering av `omsorgspengesoknad` til nytt oppsett med `@sif/soknad` og `@sif/rhf`.

---

## Status per sesjon (2026-03-31)

| Fase | Beskrivelse                         | Status             |
| ---- | ----------------------------------- | ------------------ |
| 1    | Bootstrap (Vite, TS, Tailwind, env) | ✅ Ferdig          |
| 2    | Setup-lag (context, hooks, config)  | ✅ Ferdig          |
| 3    | Initial data + API-klienter         | ✅ Ferdig          |
| 5a   | Steg: OM_BARNET                     | ✅ Ferdig          |
| 5b   | Steg: LEGEERKLÆRING (placeholder)   | ⬜ Neste           |
| 5c   | Steg: DELT_BOSTED                   | ⬜ Venter          |
| 5d   | Steg: OPPSUMMERING + innsending     | ⬜ Venter          |
| 4    | i18n-opprydding (nb/nn)             | ⬜ Etter alle steg |

`check:types` er ren ✅

---

## Arkitektur: tredelt datalag

```
OmBarnetFormValues          (fri UI-struktur, stegspesifikk)
       ↓ toSøknadsdata()
OmBarnetSøknadsdata         (normalisert domenemodell, date-string → Date, YesOrNo → boolean)
       ↓ toApiData()        (skjer i Oppsummering-steget)
SøknadApiData               (= OmsorgspengerKroniskSyktBarnSøknad fra k9-prosessering-api)
```

- `SøknadFormValues` er fri — trenger ikke matche API-ty.
- `Søknadsdata` er intern normalisert modell — lagres i mellomlagring.
- `SøknadApiData` mappes fra `Søknadsdata` kun i `OppsummeringSteg.tsx` via `toApiData()`.

---

## Filstruktur (komplett oversikt)

```
src/app/
├── Soknad.tsx                          ✅ Routing-skall, komplett
├── api/
│   ├── initApiClients.ts               ✅
│   └── sendSoknad.ts                   ✅
├── i18n/
│   ├── nb/appMessages.ts               ✅ (spreader step-messages)
│   ├── nn/appMessages.ts               ✅
│   └── index.ts                        ✅
├── lenker.ts                           ✅
├── pages/
│   ├── index.ts                        ✅
│   ├── kvittering/KvitteringPage.tsx   ✅
│   └── velkommen/VelkommenPage.tsx     ✅
├── setup/
│   ├── config/
│   │   ├── SoknadStepId.ts             ✅
│   │   └── soknadStepConfig.ts         ✅ (inkl. getSøknadStepOrder)
│   ├── constants.ts                    ✅
│   ├── context/soknadContext.ts        ✅
│   ├── hooks/
│   │   ├── index.ts                    ✅
│   │   ├── useAvbrytSoknad.ts          ✅
│   │   ├── useSoknadMellomlagring.ts   ✅
│   │   ├── useSoknadRhfForm.ts         ✅
│   │   ├── useSoknadState.ts           ✅
│   │   ├── useSoknadStore.ts           ✅
│   │   ├── useStepDefaultValues.ts     ✅
│   │   ├── useStepSubmit.ts            ✅
│   │   └── useStepTitles.ts            ✅
│   ├── soknad/SoknadStep.tsx           ✅
│   └── wrappers/                       ✅
├── steps/
│   ├── index.ts                        ✅ (eksporterer OmBarnetSteg)
│   └── om-barnet/                      ✅ KOMPLETT
│       ├── types.ts
│       ├── omBarnetStegUtils.ts
│       ├── OmBarnetForm.tsx
│       ├── OmBarnetSteg.tsx
│       └── i18n/
│           ├── nb.ts
│           └── nn.ts
└── types/
    ├── BarnSammeAdresse.ts             ✅
    ├── Mellomlagring.ts                ✅
    ├── SoknadApiData.ts                ✅
    ├── SoknadState.ts                  ✅
    ├── Soknadsdata.ts                  ✅ (OmBarnet komplett, LEGEERKLÆRING+DELT_BOSTED = TODO)
    └── SøkersRelasjonTilBarnet.ts      ✅
```

---

## Nøkkelfiler — viktige detaljer

### `setup/config/SoknadStepId.ts`

```ts
export enum SøknadStepId {
    OM_BARNET = 'omBarnet',
    LEGEERKLÆRING = 'legeerklaering',
    DELT_BOSTED = 'deltBosted',
    OPPSUMMERING = 'oppsummering',
}
```

### `setup/config/soknadStepConfig.ts`

- `søknadStepConfig` — komplett med alle 4 steg
- `getSøknadStepOrder(inkluderDeltBosted: boolean)` — klar, brukes for betinget DELT_BOSTED
- `søknadStepOrder` — default uten DELT_BOSTED

### `types/Soknadsdata.ts`

- `OmBarnetSøknadsdata` = union `registrertBarn | annetBarn` — KOMPLETT
- `LegeerklæringSøknadsdata = { // TODO }` — PLACEHOLDER
- `DeltBostedSøknadsdata = { // TODO }` — PLACEHOLDER
- `Søknadsdata extends BaseSøknadsdata` — alle 3 step-keys definert

### `types/BarnSammeAdresse.ts`

```ts
// Avledet fra API-type — ikke manuelt synkronisert
export type BarnSammeAdresse = OmsorgspengerKroniskSyktBarnSøknad['sammeAdresse'];
export const BarnSammeAdresse = { JA, JA_DELT_BOSTED, NEI } as const;
```

### `types/SøkersRelasjonTilBarnet.ts`

```ts
export type SøkersRelasjonTilBarnet = NonNullable<OmsorgspengerKroniskSyktBarnSøknad['relasjonTilBarnet']>;
export const SøkersRelasjonTilBarnet = { MOR, FAR, ADOPTIVFORELDER, FOSTERFORELDER } as const;
// Merk: verdiene er UPPERCASE ('MOR', 'FAR', ...) — matcher API
```

### `api/sendSoknad.ts`

```ts
// Bruker OmsorgspengerUtvidetRettController fra k9-brukerdialog-prosessering-api
await OmsorgspengerUtvidetRettController.innsendingOmsorgspengerKroniskSyktBarnSøknad({ body: data });
```

---

## Kjente gotchas og løsninger

| Problem                                                          | Løsning                                                                     |
| ---------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `StartPage` krever `children` prop                               | Bruk `<span />` som plassholder                                             |
| VStack `gap="4"` er ugyldig                                      | Bruk `gap="space-16"` (gammel verdi × 4)                                    |
| `toSøknadsdata` i `useStepSubmit` kan ikke returnere `undefined` | Kast `Error` i wrapper — validering i skjema hindrer at dette faktisk skjer |
| `SøkersRelasjonTilBarnet` verdier er UPPERCASE                   | Derives fra API-type — ikke skriv verdier manuelt                           |
| Datepicker validator `{ required: true }` ugyldig                | Bruk `getDateValidator({ required: true, max: new Date() })`                |

---

## Neste sesjon: steg som skal lages

### Fase 5b — LEGEERKLÆRING (placeholder)

**Strategi:** Vedlegg-opplasting (`legeerklæring: string[]` i API) krever felles vedlegg-komponent som ikke er portet ennå. Lag et placeholder-steg som lar bruker gå videre.

**Filer som skal opprettes:**

```
src/app/steps/legeerklarering/
├── types.ts                    — tom LegeerklæringFormValues
├── legeerklæringStegUtils.ts   — toFormValues + toSøknadsdata (placeholder)
├── LegeerklæringForm.tsx       — viser Alert "Under utvikling"
├── LegeerklæringSteg.tsx
└── i18n/
    ├── nb.ts
    └── nn.ts
```

**Oppdateringer:**

- `src/app/steps/index.ts` — legg til `LegeerklæringSteg`
- `src/app/Soknad.tsx` — legg til Route for `søknadStepConfig[SøknadStepId.LEGEERKLÆRING].route`
- `src/app/i18n/nb/appMessages.ts` — spre `legeerklæringStegMessages_nb`
- `src/app/types/Soknadsdata.ts` — fyll ut `LegeerklæringSøknadsdata`:
    - Forslag: `{ harLastetOppLegeerklæring: false }` eller bare `Record<string, never>`

**API-felt for referanse:**

```ts
legeerklæring: string[]  // liste med vedlegg-IDer fra opplasting
```

---

### Fase 5c — DELT_BOSTED (betinget steg)

**Logikk:**

- Steget inkluderes kun hvis `søknadsdata.omBarnet.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED`
- `getSøknadStepOrder(inkluderDeltBosted)` er klar i `soknadStepConfig.ts`
- Etter OM_BARNET `onSubmit` må `includedSteps` re-beregnes basert på `sammeAdresse`

**Oppdateringer i `useSøknadStore` / `soknadContext`:**

- Sjekk om store støtter dynamisk oppdatering av `includedSteps` via `commitStep`
- Alternativt: les `søknadsdata.omBarnet?.sammeAdresse` i `Soknad.tsx` og pass ny stepOrder til SøknadContextProvider

**Filer:**

```
src/app/steps/delt-bosted/
├── types.ts
├── deltBostedStegUtils.ts
├── DeltBostedForm.tsx          — kan også være placeholder (vedlegg: samværsavtale)
├── DeltBostedSteg.tsx
└── i18n/nb.ts + nn.ts
```

**API-felt:** `samværsavtale?: string[]` — vedlegg, kan være placeholder

---

### Fase 5d — OPPSUMMERING + innsending

**Her skjer `toApiData()`** — mapper `Søknadsdata → SøknadApiData`.

**Filer:**

```
src/app/steps/oppsummering/
├── types.ts                    — OppsummeringFormValues { harBekreftetOpplysninger: boolean }
├── oppsummeringUtils.ts        — toApiData(søknadsdata: Søknadsdata): SøknadApiData
├── OppsummeringForm.tsx
├── OppsummeringSteg.tsx
└── i18n/nb.ts + nn.ts
```

**`toApiData` — mapping fra Søknadsdata til OmsorgspengerKroniskSyktBarnSøknad:**

```ts
// Ref: types/SoknadApiData.ts = OmsorgspengerKroniskSyktBarnSøknad
// Ref: omBarnetSøknadsdata for barn-feltene
// legeerklæring: string[] — fra LegeerklæringSøknadsdata
// samværsavtale?: string[] — fra DeltBostedSøknadsdata (valgfritt)
```

**Innsending:**

```ts
import { sendSøknad } from '@app/api/sendSoknad';
// Kalles fra OppsummeringForm etter harBekreftetOpplysninger = true
await sendSøknad(apiData);
```

**Oppdater `Soknad.tsx`** med Route for oppsummering + LEGEERKLÆRING + DELT_BOSTED.

---

## Referansemønster: steg-scaffold

Se `src/app/steps/om-barnet/` som fullstendig referanse.

### Mønster for `*Form.tsx`

```tsx
export const OmBarnetForm = () => {
    const barn = useSøknadState().barn; // hent state om nødvendig
    const stepId = SøknadStepId.OM_BARNET;
    const defaultValues = useStepDefaultValues({ stepId, toFormValues: toOmBarnetFormValues });
    const { onSubmit, isPending } = useStepSubmit({
        stepId,
        toSøknadsdata: (data) => {
            const result = toOmBarnetSøknadsdata(data, barn);
            if (!result) throw new Error('toSøknadsdata returnerte undefined etter validering');
            return result;
        },
    });
    const { form, handleSubmit } = useSoknadRhfForm({ defaultValues, onSubmit });
    // ...
};
```

### Mønster for `*Steg.tsx`

```tsx
export const OmBarnetSteg = () => (
    <SøknadStep stepId={SøknadStepId.OM_BARNET}>
        <OmBarnetForm />
    </SøknadStep>
);
```

---

## Fase 4 — i18n (gjøres sist)

- All `nb.ts` per steg er allerede opprettet underveis
- `nn.ts` i alle steg spreader kun `nb`-messages — må fylles ut med nynorsk når stegene er fullført
- Skill `sif-intl` beskriver mønsteret for parametersjekk og meningssjekk

---

## Relevante skills å lese

| Oppgave                 | Skill                    |
| ----------------------- | ------------------------ |
| Legge til nytt steg     | `sif-soknad-add-step`    |
| Legge til felt i steg   | `sif-soknad-modify-step` |
| Sette opp pages/routing | `sif-soknad-pages`       |
| i18n nb/nn              | `sif-intl`               |
| API-henting             | `sif-api`                |
| Setup-arkitektur        | `sif-soknad-setup`       |
