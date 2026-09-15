# @sif/soknad-app

Rammeverk for søknadsapper i sif-brukerdialog. Pakken eier den delen av en søknad som er lik på tvers av ytelser — stegflyt, navigasjon, mellomlagring, gjenopptaking og kvittering — slik at appen kun trenger å inneholde skjema, tekster og innsendingslogikk.

Referanseapp: [`apps/aktivitetspenger-soknad`](../../apps/aktivitetspenger-soknad)

## Innhold

- [Hva rammeverket gjør](#hva-rammeverket-gjør)
- [Hva appen selv eier](#hva-appen-selv-eier)
- [Kom i gang](#kom-i-gang)
- [API](#api)
- [Konsepter](#konsepter)
- [Oppskrifter](#oppskrifter)
- [Utvikling](#utvikling)

## Hva rammeverket gjør

| Ansvar | Beskrivelse |
|--------|-------------|
| Stegflyt | Rekkefølge, hvilke steg som er inkludert, hvilke som er ferdige |
| Navigasjon | Neste/forrige steg, hopp til steg, redirect ved ugyldig URL |
| Mellomlagring | Lagrer automatisk etter hvert steg, henter og validerer ved oppstart |
| Gjenopptaking | Sender bruker tilbake til riktig steg etter reload eller ny sesjon |
| Skjemaverdier | Tar vare på ulagrede verdier ved browser back/forward og reload |
| Konsistenssjekk | Varsler når et tidligere steg er endret uten å være lagret |
| Kvittering | Eier `/kvittering`-ruten og rydder opp etter innsending |
| App-oppsett | `SøknadAppProvider` med react-query, i18n, analytics, appstatus og error boundary |

## Hva appen selv eier

Skjemafelter og validering, domenetyper og konvertering mellom skjemaverdier og søknadsdata, tekster (i18n), layout inne i hvert steg, datahenting før søknaden starter, og selve innsendingskallet til API.

## Kom i gang

### 1. App-rot

`SøknadAppProvider` setter opp fellesinfrastrukturen. En React Router-router må ligge mellom provideren og `SøknadRouter` — `SøknadRouter` bruker `useNavigate`/`useLocation`.

```tsx
// App.tsx
export const App = () => (
    <SøknadAppProvider
        applicationKey={MinSoknadApp.key}
        useAnalytics={env.SIF_PUBLIC_USE_ANALYTICS === 'true'}
        intlConfig={{ intlMessages: applicationIntlMessages, useLanguageSelector: true }}>
        <BrowserRouter basename={env.PUBLIC_PATH}>
            <Søknad />
        </BrowserRouter>
    </SøknadAppProvider>
);
```

### 2. Steg-konfigurasjon

```ts
// setup/soknadStepConfig.ts
export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.BOSTED]: {
        route: 'bosted',
        isCompleted: (s) => s[SøknadStepId.BOSTED] !== undefined,
    },
    [SøknadStepId.BARN]: {
        route: 'barn',
        isCompleted: (s) => s[SøknadStepId.BARN] !== undefined,
        isIncluded: (s) => harBarn(s),
    },
    [SøknadStepId.OPPSUMMERING]: { route: 'oppsummering' },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.BOSTED,
    SøknadStepId.BARN,
    SøknadStepId.OPPSUMMERING,
];
```

### 3. Router og ruter

`SøknadStepGuard` plasseres som element på layout-ruten som wrapper steg-rutene. Den venter på at storen er initialisert og redirecter bort fra steg brukeren ikke skal være på.

```tsx
// Soknad.tsx
export const Søknad = () => (
    <SøknadRouter
        config={søknadStepConfig}
        stepOrder={søknadStepOrder}
        ytelse={APP_YTELSE}
        versjon={MELLOMLAGRING_VERSJON}
        applicationTitle={text('application.title')}
        formValuesToSøknadsdata={formValuesToSøknadsdata}
        kvitteringElement={<Kvittering />}
        loadingElement={<LoadingPage applicationTitle={text('application.title')} />}>
        <Routes>
            <Route path="/" element={<Velkommen />} />
            <Route path="/soknad" element={<SøknadStepGuard basePath="/soknad" />}>
                <Route path={søknadStepConfig[SøknadStepId.BOSTED].route} element={<BostedForm />} />
                <Route path={søknadStepConfig[SøknadStepId.BARN].route} element={<BarnForm />} />
                <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<OppsummeringSteg />} />
                <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </SøknadRouter>
);
```

Merk: `/kvittering` registreres **ikke** av appen. Ruten eies av `SøknadRouter` og kan ikke åpnes via direkte URL.

### 4. Påkrevde i18n-nøkler

Rammeverket henter tekster fra appens `IntlProvider`. Bruk typen `SøknadFrameworkIntlKeys` i appens `nb.ts`/`nn.ts` for å få compile-time-feil ved manglende nøkler:

```ts
const nb: SøknadFrameworkIntlKeys & MineEgneNøkler = { ... };
```

Nøklene er `soknad.steg.neste`, `soknad.steg.forrige`, `soknad.steg.send`, `soknad.avbryt.tittel|bekreft|avbryt` og `soknad.fortsettSenere.tittel|bekreft|avbryt`.

I tillegg må appen definere en tittel per steg etter konvensjonen `step.${stepId}.title`. Denne brukes både i progress-stepperen og som dokumenttittel, og er ikke med i typen fordi steg-ID-ene er app-spesifikke.

## API

### Komponenter

| Komponent | Formål |
|-----------|--------|
| `SøknadAppProvider` | App-rot: error boundary, react-query, analytics, UxSignals, i18n og appstatus (Sanity) |
| `SøknadRouter` | Hoved-inngang: store, mellomlagring, gjenopptaking, kvitteringsrute |
| `SøknadStepGuard` | Routing-guard på layout-ruten for steg |
| `SøknadStep` | Wrapper for ett steg: tittel, progress-stepper, avbryt, fortsett senere, konsistenssjekk |
| `SøknadStepForm` | RHF-skjema for ett steg: submit-/forrige-knapp, deaktivering ved inkonsistens |
| `SøknadVelkommenPage` | Startside med guide og «start søknad»-knapp (bruker `useStartSøknad` internt) |
| `AppIntlProvider` | i18n med språkvelger mot dekoratøren. Settes normalt opp via `SøknadAppProvider` |
| `SifQueryClientProvider` | react-query med feillogging via `@sif/apm` |
| `AppErrorBoundary` | Feilgrense rundt appen |
| `AnalyticsProvider` | Innblikk-logging |
| `InconsistentFormValuesMessage` | Varsel ved ulagrede endringer i tidligere steg (rendres av `SøknadStep`) |
| `SøknadStepFormProvider` | In-session skjemaverdier. Rendres av `SøknadRouter` — eksportert for tester/Storybook |

### `SøknadRouter`-props

| Prop | Påkrevd | Beskrivelse |
|------|---------|-------------|
| `config` | ✅ | `Record<stepId, StepDefinition>` |
| `stepOrder` | ✅ | Rekkefølgen av steg-ID-er |
| `ytelse` | ✅ | Ytelse-identifikator for mellomlagrings-API-et |
| `versjon` | ✅ | Mellomlagringsversjon. **Bump ved brytende endringer i søknadsdata** — lagret data med annen versjon forkastes |
| `applicationTitle` | ✅ | Vises i hvert steg |
| `kvitteringElement` | ✅ | Vises på `/kvittering` etter innsending |
| `basePath` | | Basepath for steg. Default `/soknad`. Må matche `<Route path>` og `SøknadStepGuard` |
| `validateMellomlagring` | | Egen validering av lagret blob. Returner `null` for å forkaste |
| `resumeLaterUrl` | | URL ved «fortsett senere». Default Nav Min side |
| `loadingElement` | | Vises mens mellomlagring hentes |
| `formValuesToSøknadsdata` | | Aktiverer konsistenssjekk. Uten denne er sjekken stille deaktivert |

### Hooks

| Hook | Returnerer |
|------|-----------|
| `useStepData<TCommitted, TDraft>(stepId)` | `{ lagretData, draftFormValues, commit }` — hoved-hooken i et steg |
| `useSaveSøknadFormValues(stepId, getValues)` | Lagrer ulagrede verdier ved unmount (browser back/forward) |
| `useSøknadsdata<T>()` | All committet søknadsdata — brukes i oppsummering |
| `useStartSøknad()` | `{ startSøknad }` — initierer søknad og går til første steg |
| `useStepNavigation()` | `{ canGoPrevious, navigateToPreviousStep, navigateToStep }` |
| `useMellomlagring()` | `{ lagre }` — manuell lagring midt i et steg |
| `useSøknadSendt()` | `{ onSøknadSendt }` — kalles etter vellykket innsending |
| `useAvbryt()` | `{ avbryt }` — sletter mellomlagring og går til forsiden |
| `useCheckConsistency(stepId)` | `stepId` for første inkonsistente steg, ellers `undefined`. Kjøres av `SøknadStep` |
| `useAnalyticsInstance()` | Innblikk-logging |

### Typer og konstanter

`StepDefinition`, `IncludedStep`, `StepFormValues`, `MellomlagringBlob`, `SøknadRouterProps`, `SøknadStepProps`, `SøknadFrameworkIntlKeys`, `AppIntlConfig`, `SanityConfig`, `ApplikasjonHendelse`, `CustomAnalyticsEvents`, `KVITTERING_PATH`.

`SøknadAppContext`, `useSøknadAppContext` og `createSøknadAppStore` er eksportert for avansert bruk — typisk Storybook-dekoratører og tester som trenger kontekst uten en full `SøknadRouter`.

## Konsepter

### Komponenttre

```
<SøknadAppProvider>            ErrorBoundary, react-query, analytics, UxSignals, i18n, appstatus
  <BrowserRouter>              Appens ansvar — kreves av SøknadRouter
    <SøknadRouter>             Zustand-store, mellomlagring-init, eier /kvittering
      <SøknadStepFormProvider> In-session skjemaverdier per steg (konsistenssjekk + live getters)
        <SøknadAppContext>     Store + config eksponert til alle hooks
          {children}           Appens <Routes> — velkomst og steg
```

`SøknadRouter` venter på mellomlagring-hentingen før den viser `children`, slik at velkomstsiden ikke blinker før en eventuell resume-navigering.

### `resumeStepId`

Gjenopptakingspunktet i storen — steget brukeren skal landes på ved reload. Det er **ikke** nødvendigvis steget brukeren ser på akkurat nå, siden React Router styrer navigasjon uavhengig.

- Settes til `stepOrder[0]` ved `startSøknad()`
- Avanseres til neste steg etter hver `commit()`
- `undefined` etter siste commit (ingen flere steg)

### Draft-verdier — tre lag

Midlertidige skjemaverdier (ikke submittet) finnes på tre steder med ulik levetid:

| Lag | Hvor | Levetid | Formål |
|-----|------|---------|--------|
| 1 | `SøknadStepFormContext` (`draftFormValues` state) | Innenfor sesjonen | Back/forward-navigasjon + konsistenssjekk |
| 2 | Zustand `persistedFormValues` | Mellom sesjoner | Reload-gjenoppretting (leses fra blob) |
| 3 | `liveGettersRef` (ref) | Mens steg er montert | Manuell lagring via `useMellomlagring` |

`useStepData` returnerer lag 1 hvis satt, ellers lag 2 — begge eksponert som `draftFormValues`. Committet domenedata (`lagretData`) er fallback for `defaultValues`.

### Navigasjonsansvar

| Beslutning | Eier |
|------------|------|
| Resume fra mellomlagring ved mount | `SøknadRouter` |
| Start søknad → første steg | `useStartSøknad` |
| Neste steg etter submit | `useStepData.commit` |
| Forrige steg / hopp til steg | `useStepNavigation` |
| Klikk i progress-stepper | `SøknadStep` |
| Avbryt → forsiden | `SøknadStep` / `useAvbryt` |
| Fortsett senere | `SøknadStep` |
| Kvittering etter innsending | `SøknadRouter` (synker URL mot `søknadSendt`) |
| URL-guard / redirect | `SøknadStepGuard` |

### Konsistenssjekk (browser back/forward)

Dersom bruker endrer et tidligere steg via back-knappen uten å submitte, vises `InconsistentFormValuesMessage` øverst i neste steg og submit deaktiveres.

Sjekken er opt-in og aktiveres ved å sette `formValuesToSøknadsdata` på `SøknadRouter`:

```tsx
// Lag en hook siden konverteringen typisk trenger app-kontekst
const formValuesToSøknadsdata = useFormValuesToSøknadsdata();

<SøknadRouter formValuesToSøknadsdata={formValuesToSøknadsdata} ...>
```

## Oppskrifter

### Et typisk steg

```tsx
const stepId = SøknadStepId.MY_STEP;

export const MyStep = () => {
    const { lagretData, draftFormValues, commit } = useStepData<MySøknadsdata, MyFormValues>(stepId);

    const methods = useForm<MyFormValues>({
        // draftFormValues prioriteres (back/forward + reload), lagretData som fallback
        defaultValues: draftFormValues ?? toMyFormValues(lagretData),
    });

    // Lagrer verdier ved unmount (browser back/forward)
    useSaveSøknadFormValues(stepId, methods.getValues);

    const onSubmit = (data: MyFormValues) => commit(toMySøknadsdata(data));

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={false}>
                <FormLayout.Content>
                    <FormLayout.Questions>{/* skjemafelter her */}</FormLayout.Questions>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
```

`SøknadStep` setter opp progress-stepper, avbryt/fortsett-senere og konsistenssjekk. `SøknadStepForm` håndterer forrige-knapp og deaktiverer submit ved inkonsistens. Layout (`FormLayout.Content/Questions`) er appens ansvar — wrap children etter behov.

### Oppsummeringssteg

Hent all committet data med `useSøknadsdata`, og marker skjemaet som siste steg:

```tsx
const søknadsdata = useSøknadsdata<Søknadsdata>();

<SøknadStepForm stepId={stepId} methods={methods} onSubmit={onSubmit} isPending={isPending} isFinalSubmit>
    <FormLayout.Summary>{/* oppsummering + bekreftelsescheckbox */}</FormLayout.Summary>
</SøknadStepForm>;
```

`submitLabel` og `submitDisabled` kan settes ved behov.

### Manuell mellomlagring

Rammeverket lagrer automatisk etter hvert `commit()`. For lagring midt i et steg — for eksempel når bruker legger til et listeelement:

```tsx
const { lagre } = useMellomlagring();
await lagre();
```

### Etter innsending

```tsx
const { onSøknadSendt } = useSøknadSendt();

// Kall etter vellykket POST:
await onSøknadSendt();
// → sletter mellomlagring, logger analytics, setter søknadSendt = true
// → SøknadRouter synker URL til /kvittering og viser kvitteringElement
```

## Utvikling

```bash
pnpm --filter @sif/soknad-app test
pnpm --filter @sif/soknad-app lint:tsc
pnpm --filter @sif/soknad-app lint:eslint
```

Se også skillen `sif-soknad-app` for arkitekturbakgrunn og beslutningslogg, og `sif-soknad-add-step` / `sif-soknad-modify-step` for steg-arbeid i app.
