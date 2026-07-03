# @sif/soknad-app

Rammeverk for søknadsapper i sif-brukerdialog. Håndterer søknadsflyt, mellomlagring, steg-navigasjon og konsistenssjekk — slik at selve appen kun trenger å inneholde skjema, tekster og innsendingslogikk.

Referanseapp: [`apps/aktivitetspenger-soknad`](../../apps/aktivitetspenger-soknad)

---

## Komponenttre

```
<SøknadAppProvider>           Faro, Sentry, QueryClient, Analytics, ErrorBoundary
  <SøknadRouter>              Zustand-store, mellomlagring-init, kontekst for alle hooks
    <SøknadStepFormProvider> In-session skjemaverdier per steg (konsistenssjekk + live getters)
      <SøknadAppContext>       Store + config eksponert til alle hooks
        {children}             Appens <Routes> — velkomst, steg, kvittering
```

`SøknadRouter` venter på mellomlagring-henting før den viser `children` (unngår blinking). Dersom gyldig mellomlagring finnes, navigeres bruker automatisk til gjenopptakingspunktet.

---

## Nøkkelbegreper

### `resumeStepId`

Gjenopptakingspunktet i Zustand-storen — steget brukeren skal landes på ved reload. Det er **ikke** nødvendigvis steget brukeren ser på akkurat nå (React Router styrer navigasjon uavhengig).

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

`useStepData` returnerer lag 1 hvis satt, ellers lag 2 — begge eksponert som `draftFormValues`.

### Navigasjonsansvar

Navigasjon er fordelt etter hvem som eier beslutningen:

| Beslutning | Eier |
|------------|------|
| Resume fra mellomlagring ved mount | `SøknadRouter` |
| Start søknad → første steg | `useStartSøknad` |
| Neste steg etter submit | `useStepData.commit` |
| Forrige steg / hopp til steg | `useStepNavigation` |
| Klikk i progress-stepper | `SøknadStep` |
| Avbryt → forsiden | `SøknadStep` |
| Fortsett senere | `SøknadStep` |
| Kvittering etter innsending | `useSøknadSendt` |
| URL-guard / redirect | `StepRouteGuard` |

---

## Oppskrift: et typisk steg

```tsx
// MyStep.tsx
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
                    <FormLayout.Questions>
                        {/* skjemafelter her */}
                    </FormLayout.Questions>
                </FormLayout.Content>
            </SøknadStepForm>
        </SøknadStep>
    );
};
```

**`SøknadStep`** setter opp progress-stepper, avbryt/fortsett-senere og konsistenssjekk.  
**`SøknadStepForm`** håndterer forrige-knapp og deaktiverer submit ved konsistensinkonsistens.  
Layout (`FormLayout.Content/Questions`) er appens ansvar — wrap children etter behov.

---

## Oppsummering — hente søknadsdata

Bruk `useSøknadsdata<T>()` for å hente all committet søknadsdata:

```tsx
const søknadsdata = useSøknadsdata<Søknadsdata>();
```

---

## Konsistenssjekk (browser back/forward)

Dersom bruker endrer et tidligere steg via back-knappen uten å submitte, vises `InconsistentFormValuesMessage` øverst i neste steg og submit deaktiveres.

Aktiveres ved å sette `formValuesToSøknadsdata` på `SøknadRouter`:

```tsx
// Lag en hook siden konverteringen typisk trenger app-kontekst
const formValuesToSøknadsdata = useFormValuesToSøknadsdata();

<SøknadRouter formValuesToSøknadsdata={formValuesToSøknadsdata} ...>
```

Uten denne prop-en er konsistenssjekken stille deaktivert.

---

## Mellomlagring

Rammeverket lagrer automatisk etter hvert `commit()`. For manuell lagring (f.eks. etter at bruker legger til et listeelement):

```tsx
const { lagre } = useMellomlagring();
await lagre();
```

---

## Etter innsending

```tsx
const { onSøknadSendt } = useSøknadSendt();

// Kall etter vellykket POST:
await onSøknadSendt();
// → sletter mellomlagring, logger analytics, navigerer til /kvittering
// → SøknadRouter viser kvitteringElement basert på Zustand-state (ikke rute-basert)
```

Pass `kvitteringElement` til `SøknadRouter` for å vise kvitteringssiden.
