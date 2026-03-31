---
name: sif-soknad-pages
description: Sett opp Soknad.tsx (routing-skall), VelkommenPage, KvitteringPage og steps/index.ts i en ny søknadsapp som bruker @sif/soknad og @sif/rhf.
---

# sif-soknad-pages Skill

## Formål

Dokumenterer filene som må eksistere før første steg kan rendres i en ny søknadsapp:

- `src/app/Soknad.tsx` — routing-skall, store-init, kvittering-redirect
- `src/app/pages/velkommen/VelkommenPage.tsx` — startside med bekreftelse
- `src/app/pages/kvittering/KvitteringPage.tsx` — kvitteringsside etter innsending
- `src/app/pages/index.ts` — barrel-eksport
- `src/app/steps/index.ts` — barrel-eksport for steg (opprettes tom, fylles etter hvert)

## Når skal skillen brukes

- Du setter opp en ny app etter at `sif-soknad-setup` er fullført.
- Du skal legge til det første steget og trenger routing-skallet på plass.
- Se → [sif-soknad-setup](../sif-soknad-setup/SKILL.md) for setup-laget som må være på plass først.
- Se → [sif-soknad-add-step](../sif-soknad-add-step/SKILL.md) for å legge til steg i routingen etterpå.

## Forutsetning

`sif-soknad-setup` er gjennomført: `useSøknadStore`, `useStepTitles`, `søknadStepConfig`, `SøknadContextProvider` og `SøknadStep` eksisterer.

---

## Mappestruktur

```
src/app/
    Soknad.tsx
    pages/
        index.ts
        kvittering/
            KvitteringPage.tsx
        velkommen/
            VelkommenPage.tsx
    steps/
        index.ts          ← tom ved oppstart, fyll etter hvert som steg legges til
```

---

## Del 1: `src/app/Soknad.tsx`

Routing-skallet. Maler direkte fra implementasjon — tilpass `Props` og `init`-kalling til app.

**Tilpasningspunkter:**

| Linje                  | Tilpass til                                       |
| ---------------------- | ------------------------------------------------- |
| `Props`-interface      | Feltene fra `InitialData` i `useInitialData.ts`   |
| `init({ søker, barn })` | Match feltene i `SøknadState` (f.eks. fjern `barn` hvis ikke relevant) |
| `mellomlagring?.skjemadata` | Bytt til `mellomlagring?.søknadsdata` om appen bruker det feltet |
| Route-elementer        | Legg til én `<Route>` per `SøknadStepId` etter hvert |

```tsx
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

import { RegistrertBarn, Søker } from '@sif/api/k9-prosessering';
import { useEffectOnce } from '@navikt/sif-common-hooks';
import { StepRouteGuard } from '@sif/soknad/navigation';

import { søknadStepConfig } from '@app/setup/config/soknadStepConfig';
import { SøknadStepId } from '@app/setup/config/SoknadStepId';
import { SøknadContextProvider } from '@app/setup/context/soknadContext';
import { useSøknadStore, useStepTitles } from '@app/setup/hooks';

import { KvitteringPage, VelkommenPage } from './pages';
import { SøknadMellomlagring } from './types/Mellomlagring';
// import steg her etter hvert: import { MittSteg } from './steps';

interface Props {
    søker: Søker;
    barn: RegistrertBarn[]; // fjern om appen ikke har barn
    mellomlagring?: SøknadMellomlagring;
}

export const Søknad = ({ søker, barn, mellomlagring }: Props) => {
    const stepTitles = useStepTitles();
    const init = useSøknadStore((s) => s.init);
    const søknadSendt = useSøknadStore((s) => s.søknadSendt);
    const søknadState = useSøknadStore((s) => s.søknadState);
    const currentStepId = useSøknadStore((s) => s.currentStepId);
    const includedSteps = useSøknadStore((s) => s.includedSteps);

    const location = useLocation();
    const navigate = useNavigate();

    useEffectOnce(() => {
        init({ søker, barn }, mellomlagring?.søknadsdata, mellomlagring?.currentStepId);
    });

    useEffect(() => {
        if (søknadSendt && location.pathname !== '/kvittering') {
            navigate('/kvittering', { replace: true });
        } else if (!søknadSendt && location.pathname === '/kvittering') {
            navigate('/', { replace: true });
        }
    }, [søknadSendt, location.pathname, navigate]);

    const currentStepRoute = currentStepId ? søknadStepConfig[currentStepId]?.route : undefined;
    useEffect(() => {
        if (currentStepRoute && location.pathname === '/') {
            navigate(`/soknad/${currentStepRoute}`, { replace: true });
        }
    }, [currentStepRoute, location.pathname, navigate]);

    if (søknadSendt && location.pathname !== '/kvittering') {
        return <KvitteringPage />;
    }

    if (!søknadSendt && location.pathname === '/kvittering') {
        return (
            <SøknadContextProvider stepTitles={stepTitles}>
                <VelkommenPage />
            </SøknadContextProvider>
        );
    }

    return (
        <SøknadContextProvider initialFormValues={mellomlagring?.skjemadata} stepTitles={stepTitles}>
            <Routes>
                <Route path="/" element={<VelkommenPage />} />
                <Route path="/kvittering" element={<KvitteringPage />} />
                <Route
                    path="/soknad"
                    element={
                        <StepRouteGuard
                            steps={includedSteps}
                            currentStepId={currentStepId}
                            isInitialized={!!søknadState}
                        />
                    }>
                    {/* Legg til én Route per steg her */}
                    <Route path={søknadStepConfig[SøknadStepId.OPPSUMMERING].route} element={<div />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </SøknadContextProvider>
    );
};
```

### Viktig: mellomlagring?.skjemadata vs. mellomlagring?.søknadsdata

`SøknadContextProvider` tar `initialFormValues` — dette er RHF-skjemadata (ikke søknadsdata). Feltet heter `skjemadata` i mellomlagringstypen. Ikke forveksle med `mellomlagring?.søknadsdata` som brukes i `init`.

---

## Del 2: `src/app/pages/velkommen/VelkommenPage.tsx`

Innholdet i `guide.content` er app-spesifikt og skrives av utvikler. Strukturen (hooks, `handleStart`, `StartPage`) er lik på tvers av apper.

**Krav til `StartPage`:** Komponenten krever `children` (påkrevd prop). Send `<span />` som plassholder om ingenting annet passer.

```tsx
import { useAppIntl } from '@app/i18n';
import { søknadStepConfig, søknadStepOrder } from '@app/setup/config/soknadStepConfig';
import { useSøknadMellomlagring, useSøknadsflyt, useSøknadStore } from '@app/setup/hooks';
import { BodyLong, VStack } from '@navikt/ds-react';
import { useSøknadFormValues } from '@sif/soknad/consistency';
import { StartPage } from '@sif/soknad-ui/pages';
import { useNavigate } from 'react-router-dom';

export const VelkommenPage = () => {
    const { text } = useAppIntl();
    const navigate = useNavigate();
    const søknadState = useSøknadStore((s) => s.søknadState);
    const { startSøknad } = useSøknadsflyt();
    const { clearSøknadFormValues } = useSøknadFormValues();
    const { opprettMellomlagring, isPending } = useSøknadMellomlagring();

    const handleStart = async (harForståttRettigheterOgPlikter: true) => {
        const førsteStegId = søknadStepOrder[0];
        const førsteSteg = søknadStepConfig[førsteStegId];
        clearSøknadFormValues();
        startSøknad(førsteStegId, harForståttRettigheterOgPlikter);
        await opprettMellomlagring();
        navigate(`/soknad/${førsteSteg.route}`);
    };

    return (
        <StartPage
            onStart={handleStart}
            isPending={isPending}
            guide={{
                navn: søknadState?.søker.fornavn || '',
                content: (
                    <VStack gap="space-8">
                        <BodyLong>
                            {/* App-spesifikt innhold her */}
                        </BodyLong>
                    </VStack>
                ),
            }}
            title={text('application.title')}>
            <span />
        </StartPage>
    );
};
```

---

## Del 3: `src/app/pages/kvittering/KvitteringPage.tsx`

`documentTitle` og `tittel` er app-spesifikke og tilpasses per søknad.

```tsx
import { useAppIntl } from '@app/i18n';
import { Button } from '@navikt/ds-react';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';
import { Kvittering } from '@sif/soknad-ui/components';
import { ApplicationPage } from '@sif/soknad-ui/pages';

export const KvitteringPage = () => {
    const { text } = useAppIntl();
    const path = getRequiredEnv(EnvKey.PUBLIC_PATH);

    const onRestart = () => {
        window.location.replace(path);
    };

    return (
        <ApplicationPage
            documentTitle="[Søknadsnavn] mottatt"
            applicationTitle={text('application.title')}>
            <Kvittering tittel="Vi har mottatt søknaden din om [ytelse]">
                <div>
                    <Button variant="secondary" onClick={onRestart}>
                        Tilbake til forsiden
                    </Button>
                </div>
            </Kvittering>
        </ApplicationPage>
    );
};
```

---

## Del 4: Barrel-filer

### `src/app/pages/index.ts`

```ts
export { KvitteringPage } from './kvittering/KvitteringPage';
export { VelkommenPage } from './velkommen/VelkommenPage';
```

### `src/app/steps/index.ts`

Opprett tom og legg til én eksport per steg etter hvert:

```ts
// Fyll etter hvert som steg implementeres:
// export { MittStegSteg } from './mitt-steg/MittStegSteg';
```

> Når du legger til et steg: 1) Legg til eksport her, 2) Importer i `Soknad.tsx`, 3) Legg til `<Route>` i `/soknad`-gruppen. Se → [sif-soknad-add-step](../sif-soknad-add-step/SKILL.md).

---

## Sjekkliste

- [ ] `src/app/Soknad.tsx` opprettet med riktig `Props` og `init`-kalling
- [ ] `src/app/pages/velkommen/VelkommenPage.tsx` opprettet
- [ ] `src/app/pages/kvittering/KvitteringPage.tsx` opprettet
- [ ] `src/app/pages/index.ts` opprettet
- [ ] `src/app/steps/index.ts` opprettet (tom eller med første steg)
- [ ] `yarn check:types` passerer
