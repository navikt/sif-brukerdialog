# Agent Briefing: `@sif/soknad-app` — konfigurasjonsdrevet søknadsrammeverk

> **NB: Ignorer følgende skills — de beskriver det gamle oppsettet som denne oppgaven erstatter:**
> - `sif-migration-baseline`
> - `sif-soknad-setup`
> - `sif-soknad-add-step`
> - `sif-soknad-modify-step`
> - `sif-soknad-oppsummering`
> - `sif-initial-data-loader`
> - `sif-formik-to-rhf`
>
> Disse beskriver v2-oppsett med `@sif/soknad` og `setup/hooks/`-mønsteret. Det nye oppsettet i denne oppgaven erstatter nettopp det. Følg kun briefingen i dette dokumentet.

---

## Hovedmål

Vi har 13 søknadsapper i monorepoet som alle bygger rammeverket sitt fra de samme byggeklossene — routing, mellomlagring, steg-navigasjon, store-oppsett — ved å kopiere ~20 boilerplate-filer per app. Målet er å eliminere all denne boilerplaten ved å lage en ny pakke `@sif/soknad-app` som eksponerer et høynivå konfigurasjonsdrevet API. Appen skal kun inneholde det som er **unikt**: steg-innhold, datahenting, domeneobjekter og DTO-mapping. Alt generelt ivaretas av rammeverket.

**Prinsipp:** Det som er unikt for søknaden skal alltid være synlig i app-koden. Det som er generell mekanikk skal leve i pakken.

---

## Teknisk kontekst

**Monorepo:** pnpm + Turborepo. Pakker i `packages/`, apper i `apps/`.

**Eksisterende pakke som erstattes:** `packages/sif-soknad/` — brukes i dag av noen få apper. Den nye pakken skal *ikke* ha avhengighet til `@sif/soknad` — alt relevant flyttes over og reimplementeres.

**Pilot-app:** `apps/aktivitetspenger-soknad/` — brukes som første migrering for å verifisere konseptet.

**Se disse filene for å forstå dagens oppsett:**
- `packages/sif-soknad/src/` — lavnivå-primitiver (store, context, navigation, typer)
- `apps/aktivitetspenger-soknad/src/app/setup/` — all boilerplate som skal elimineres
- `apps/aktivitetspenger-soknad/src/app/Soknad.tsx` — routing-shell
- `apps/aktivitetspenger-soknad/src/useInitialData.ts` — initial data-henting
- `packages/sif-rhf/package.json` — mal for pakke-oppsett i monorepoet

---

## Ansvarsfordeling

### `@sif/soknad-app` eier (mekanikk — ikke søknadsspesifikt):
- `useStepData(stepId)` — eksponerer `{ lagretData, commit, formData, setFormData }`
- `useAvbryt()` — slett mellomlagring + reset store
- `onSøknadSendt()` — DELETE mellomlagring + clear store + naviger til kvittering
- `SøknadRouter` — routing-skall med `StepRouteGuard`, mellomlagring-init
- `SøknadStep` — steg-wrapper med progress, navigasjonsknapper
- Mellomlagring — PUT/GET/DELETE som opak blob: `{ versjon, currentStepId, søknadsdata: Record<StepId, unknown> }`
- Steg-evaluator — re-evaluer `isIncluded`/`isCompleted` ved submit, slett data for ekskluderte steg automatisk
- `SøknadFrameworkIntlKeys` — TypeScript-type med alle i18n-nøkler rammeverket forventer
- Alle typer: `StepConfig`, `BaseSøknadsdata`, `StepFormValues`, `Mellomlagring` osv.

### Appen eier (søknadsspesifikt — alltid synlig i app-koden):
- `SøknadStepId` (enum) + `soknadStepConfig` (route, isCompleted, isIncluded)
- `Søknadsdata`-typen (domeneobjekt per steg)
- `AppContext` (søker, barn osv.) + `useAppContext` — vanlig React-kontekst, appen setter opp selv
- `useInitialData` — hvilke API-hooks som trengs, loading/error/success-logikk
- `App.tsx` — setter opp AppContext, rendrer `<SøknadRouter>` når data er klar
- `Soknad.tsx` — route-lista (synlig søknadsinnhold)
- `*Form.tsx` per steg — alt skjema-innhold (formbibliotek-agnostisk — RHF, Formik, plain state)
- `*StegUtils.ts` per steg — `toFormValues` + `toSøknadsdata`
- `soknadsdataToDTO` — mapping til backend-DTO
- `VelkommenPage` + `KvitteringPage`
- i18n-filer inkl. rammeverkets påkrevde nøkler

---

## Nøkkeldesign-beslutninger

### `useStepData` erstatter `useStepSubmit` + `useStepDefaultValues`
- `lagretData` — committede domeneobjekter fra store (opak `unknown`, steget caster selv)
- `commit(data)` — lagrer domeneobjekt, kjører steg-evaluator, trigger mellomlagring PUT, navigerer til neste steg
- `formData` / `setFormData` — in-memory skjema-state (mistes ved refresh), opak blob

### Mellomlagring
- Rammeverket lagrer `{ versjon, currentStepId, søknadsdata: Record<StepId, unknown> }`
- Ingen `skjemadata`-lag — in-memory `formData` lever kun i Zustand-store, mistes ved refresh
- Rammeverket sjekker versjon + currentStepId-eksistens; appen leverer valgfri `validateMellomlagring?: (blob) => blob | null`
- `onSøknadSendt()` trigger automatisk DELETE

### Tekster
- Rammeverket kaller `useIntl()` internt med faste nøkler
- Steg-titler: rammeverket slår opp `step.${stepId}.title` automatisk
- Appen merger rammeverkets nøkler inn i sine `nb.ts`/`nn.ts`

### Dialoger (avbryt / fortsett senere)
- Rammeverket har default-implementasjoner
- Appen kan override via `dialogs: { avbryt: MinKomponent }` i konfig
- Komponenter får `onConfirm`/`onCancel` som props fra rammeverket

### Navigasjonsmodell
- Back: fri, endrer ikke søknadsdata
- Forward: kun via submit — søknadsdata oppdateres kun ved submit
- `isIncluded`/`isCompleted` re-evalueres kun ved submit (ikke reaktivt)
- Steg som ekskluderes ved submit: data slettes automatisk fra store

---

## Konfig-eksempel

```ts
// soknadStepConfig (appen)
const søknadStepConfig = {
  [SøknadStepId.STARTDATO]: {
    route: 'startdato',
    isCompleted: (s) => s.startdato !== undefined,
  },
  [SøknadStepId.BOSTED_UTLAND]: {
    route: 'bosted-utland',
    isCompleted: (s) => s.bostedUtland !== undefined,
    isIncluded: (s) => s.bosted?.harBoddIUtlandet === true,
  },
}

// Soknad.tsx (appen — alltid synlig)
<SøknadRouter
  config={søknadStepConfig}
  stepOrder={søknadStepOrder}
  ytelse="aktivitetspenger"
  versjon={1}
  validateMellomlagring={(blob) => blob}
  dialogs={{ avbryt: MinAvbrytDialog }}>
  <Route path="/startdato" element={<StartdatoSteg />} />
  <Route path="/bosted-utland" element={<BostedUtlandSteg />} />
  <Route path="/oppsummering" element={<OppsummeringSteg />} />
</SøknadRouter>

// I et steg (formbibliotek-agnostisk)
const { lagretData, commit, formData, setFormData } = useStepData(SøknadStepId.STARTDATO)
const { søker } = useAppContext()

// App.tsx (appen)
if (isLoading) return <LoadingPage />
if (isError)   return <ErrorPage />
return (
  <AppContext.Provider value={{ søker, barn, kontonummer }}>
    <SøknadApp />
  </AppContext.Provider>
)
```

---

## Implementasjonskontrakt

Disse fire tingene er kritiske å få riktig. Avvik her vil ikke oppdages av `tsc`.

### 1. Zustand-storens form

Storen inneholder **kun** rammeverkets data — ingen søker, ingen barn:

```ts
interface SøknadStore {
  søknadsdata: Record<string, unknown>   // committede domeneobjekter per stepId
  formData: Record<string, unknown>      // in-memory skjema-state per stepId (mistes ved refresh)
  currentStepId: string | undefined
  includedSteps: IncludedStep[]          // avledet — recomputes ved commit
  søknadSendt: boolean

  // Actions
  init(mellomlagring: MellomlagringBlob | null): void
  commit(stepId: string, data: unknown): void   // se algoritme under
  setFormData(stepId: string, data: unknown): void
  clearFormData(stepId: string): void
  setSøknadSendt(): void
  reset(): void
}
```

`søker`, `barn` og andre API-data er **ikke** i storen — de lever i appens `AppContext`.

---

### 2. Pakke-API — TypeScript-interfaces

```ts
// useStepData — brukes i steg-komponenten
function useStepData<T = unknown>(stepId: string): {
  lagretData: T | undefined        // søknadsdata[stepId] — steget caster selv
  commit: (data: T) => Promise<void>
  formData: unknown | undefined    // in-memory draft
  setFormData: (data: unknown) => void
}

// SøknadRouter — props
interface SøknadRouterProps {
  config: Record<string, StepDefinition>   // route, isCompleted, isIncluded?
  stepOrder: string[]
  ytelse: string
  versjon: number
  validateMellomlagring?: (blob: MellomlagringBlob) => MellomlagringBlob | null
  dialogs?: {
    avbryt?: ComponentType<{ onConfirm: () => void; onCancel: () => void }>
    fortsettSenere?: ComponentType<{ onConfirm: () => void; onCancel: () => void }>
  }
  children: ReactNode
}

// SøknadStep — brukes direkte i steg-komponent (erstatter *Steg.tsx)
interface SøknadStepProps {
  stepId: string
  children: ReactNode
}

// MellomlagringBlob — det rammeverket lagrer
interface MellomlagringBlob {
  versjon: number
  currentStepId: string
  søknadsdata: Record<string, unknown>
}

// StepDefinition
interface StepDefinition {
  route: string
  isCompleted: (søknadsdata: Record<string, unknown>) => boolean
  isIncluded?: (søknadsdata: Record<string, unknown>) => boolean
}

// DialogProps eksporteres slik at appen kan bruke den ved override
interface DialogProps {
  onConfirm: () => void
  onCancel: () => void
}
```

---

### 3. `commit()`-algoritmen

Rekkefølgen er viktig — spesielt at ekskluderte steg ryddes *før* navigering:

```
commit(stepId, data):
  1. søknadsdata[stepId] = data
  2. tidligerInkluderte = includedSteps.map(s => s.stepId)
  3. nyInkluderte = stepOrder.filter(id => config[id].isIncluded?.(søknadsdata) ?? true)
  4. For hvert steg i tidligerInkluderte som IKKE er i nyInkluderte:
       delete søknadsdata[stegId]
       delete formData[stegId]
  5. Oppdater includedSteps basert på nyInkluderte + isCompleted
  6. currentStepId = neste inkluderte steg som ikke er completed
  7. PUT mellomlagring (debounced 500ms): { versjon, currentStepId, søknadsdata }
  8. Navigate til config[currentStepId].route
```

---

### 4. `SøknadRouter` — init ved mount

```
Ved mount:
  1. GET /mellomlagring
  2. Hvis 404 / tom: init store med tom søknadsdata, currentStepId = undefined
  3. Hvis funnet:
     a. Sjekk blob.versjon === props.versjon  → forkast hvis mismatch
     b. Sjekk blob.currentStepId finnes i props.stepOrder  → forkast hvis ikke
     c. Kall props.validateMellomlagring?.(blob) → forkast (null) eller bruk returnert blob
     d. init store med blob.søknadsdata + blob.currentStepId
```

`StepRouteGuard` (intern komponent i `SøknadRouter`) styrer tilgang:
- Ikke initialisert → `null` (unngår blink)
- `currentStepId` er undefined → `<Navigate to="/" />`
- Nåværende URL matcher steg som ikke er i `includedSteps` → redirect til `currentStepId`-ruten
- Nåværende URL er foran første uferdige steg → redirect til første uferdige steg

---

### 5. `SøknadFrameworkIntlKeys` — påkrevde nøkler

Rammeverket forutsetter at disse nøklene finnes i appens IntlProvider.
Eksporter typen slik at appen får compile-time feil ved manglende nøkler.

```ts
type SøknadFrameworkIntlKeys = {
  // Navigasjonsknapper
  'soknad.steg.neste': string
  'soknad.steg.forrige': string
  'soknad.steg.send': string

  // Avbryt-dialog
  'soknad.avbryt.tittel': string
  'soknad.avbryt.bekreft': string
  'soknad.avbryt.avbryt': string

  // Fortsett senere-dialog
  'soknad.fortsettSenere.tittel': string
  'soknad.fortsettSenere.bekreft': string
  'soknad.fortsettSenere.avbryt': string
}

// Steg-titler følger konvensjonen: `step.${stepId}.title`
// Eks: 'step.startdato.title', 'step.om-barnet.title'
// Disse er ikke i SøknadFrameworkIntlKeys — de er steg-spesifikke og defineres av appen.
```

---

### 6. `useAvbryt` og `onSøknadSendt`

```ts
// useAvbryt — kaller rammeverkets avbryt-logikk
function useAvbryt(): { avbryt: () => Promise<void> }
// avbryt(): DELETE mellomlagring → store.reset() → navigate('/')

// useSøknadSendt — kall etter vellykket innsending
function useSøknadSendt(): { onSøknadSendt: () => Promise<void> }
// onSøknadSendt(): DELETE mellomlagring → store.setSøknadSendt() → navigate('/kvittering')
```

---

### 7. Hva `*Steg.tsx` erstattes av

I dag: én `*Steg.tsx` per steg (`<SøknadStep stepId={...}><Form /></SøknadStep>`).

I nytt oppsett: `SøknadStep` importeres direkte fra `@sif/soknad-app` og brukes inne i steg-komponenten. `*Steg.tsx` trengs ikke lenger.

```tsx
// StartdatoSteg.tsx (direkte — ingen egen Steg-wrapper)
import { SøknadStep, useStepData } from '@sif/soknad-app'

const StartdatoSteg = () => {
  const { lagretData, commit, formData, setFormData } = useStepData(SøknadStepId.STARTDATO)
  // ... form-logikk
  return (
    <SøknadStep stepId={SøknadStepId.STARTDATO}>
      {/* skjema-innhold */}
    </SøknadStep>
  )
}
```

---

## Gjennomføring

### Fase 1 — Ny pakke `packages/sif-soknad-app/`

1. Scaffold pakke (package.json, tsconfig, eslint) — bruk `packages/sif-rhf/` som mal
2. Flytt typer fra `packages/sif-soknad/src/types/` som grunnlag — tilpass til nytt oppsett
3. Flytt og tilpass store (`createSøknadStore`) og navigasjon (`StepRouteGuard`, `routeUtils`) fra `packages/sif-soknad/src/`
4. Implementer `useStepData(stepId)` — `{ lagretData, commit, formData, setFormData }`
5. Implementer `useAvbryt()` og `onSøknadSendt()`
6. Implementer `SøknadRouter` — routing-skall + mellomlagring-init + guards
7. Implementer steg-evaluator i `commit`-flyten (re-evaluer isIncluded, slett ekskluderte steg)
8. Implementer mellomlagring-orkestrering (opak blob, PUT/GET/DELETE)
9. Definer og eksporter `SøknadFrameworkIntlKeys`
10. **Ikke ta med** consistency-systemet (`formValuesToSøknadsdata`, `skjemadata`, `SøknadFormValuesContext`) — dette erstattes av in-memory `formData`

**Etter fase 1:** Kjør `pnpm tsc` og `pnpm lint` i `sif-soknad-app`. Rapporter resultatet og vent på bekreftelse før fase 2 startes.

---

### Fase 2 — Pilot: `apps/aktivitetspenger-soknad/`

1. Bytt avhengighet fra `@sif/soknad` → `@sif/soknad-app`
2. Opprett `AppContext` (søker, barn, kontonummer) + `useAppContext`
3. Skriv om `App.tsx` — AppContext-provider + render `<SøknadRouter>` når data er klar
4. Skriv om `Soknad.tsx` — slank route-liste med `<SøknadRouter>`
5. Migrer hvert steg til `useStepData` i stedet for `useStepSubmit`/`useStepDefaultValues`
6. Slett følgende (boilerplate som ikke lenger trengs):
   - `src/app/setup/hooks/` (alle 8 filer)
   - `src/app/setup/context/`
   - `src/app/setup/wrappers/`
   - `src/InitialDataLoader.tsx`
   - Alle `*Steg.tsx`-filer (tynne wrappers per steg)
7. Legg til rammeverkets i18n-nøkler i `nb.ts`/`nn.ts`

**Etter fase 2:** Kjør `pnpm tsc` og `pnpm lint` i `aktivitetspenger-soknad`, deretter `pnpm tsc` fra repo-rot. Rapporter resultatet og vent på bekreftelse før fase 3 startes.

---

### Fase 3 — Øvrige apper som bruker `@sif/soknad`

> Denne fasen er **ikke del av dette oppdraget**. Start den ikke uten eksplisitt bekreftelse.

- Migrer én app om gangen med samme mønster som fase 2
- Etter hver app: kjør `pnpm tsc` og `pnpm lint`, rapporter og vent på bekreftelse
- Når alle er migrert: deprecer og slett `@sif/soknad`

---

## Ferdig-kriterier per fase

### Fase 1 er ferdig når:
1. `packages/sif-soknad-app/` eksisterer med komplett package.json, tsconfig og eslint-konfig
2. `pnpm tsc` og `pnpm lint` passerer i `sif-soknad-app` uten feil
3. Alle eksporterte typer og hooks er tilgjengelige fra pakken (`useStepData`, `useAvbryt`, `SøknadRouter`, `SøknadStep`, `SøknadFrameworkIntlKeys`, alle typer)
4. `@sif/soknad-app` har **ingen** avhengighet til `@sif/soknad` i package.json
5. **Stopp og be bruker bekrefte** før fase 2 startes

### Fase 2 er ferdig når:
1. `apps/aktivitetspenger-soknad` har byttet avhengighet fra `@sif/soknad` → `@sif/soknad-app`
2. Alle filer i `setup/hooks/`, `setup/context/`, `setup/wrappers/` er slettet
3. `InitialDataLoader.tsx` og alle `*Steg.tsx`-filer er slettet
4. `pnpm tsc` og `pnpm lint` passerer i `aktivitetspenger-soknad` uten feil
5. Øvrige apper kompilerer fortsatt (`pnpm tsc` fra repo-rot)
6. **Stopp og be bruker bekrefte** — fase 3 startes ikke uten eksplisitt godkjenning

---

## Scope

**Inkludert:** Ny pakke `@sif/soknad-app` (fase 1) + pilot på aktivitetspenger-soknad (fase 2)
**Ekskludert:** Migrering av øvrige apper (fase 3, gradvis), sletting av `@sif/soknad` (etter fase 3)
