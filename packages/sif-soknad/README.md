# sif-soknad

Et lite rammeverk for å bygge stegbaserte søknader i React.\
Pakken håndterer flyt, navigasjon, state og konsistens mellom steg --
mens selve søknadsdomenet ligger i applikasjonen.

## Hva rammeverket gjør

Rammeverket tar ansvar for:

- navigasjon mellom steg
- hvilke steg som er inkludert i søknaden
- routing guards
- lagring av søknadsdata
- konsistens mellom skjema og lagrede data
- grunnleggende sider og komponenter

Applikasjonen tar ansvar for:

- domenemodeller
- validering
- API‑kall
- definisjon av steg

---

# Installasjon

Pakke brukes vanligvis i et monorepo.

```ts
import { createSøknadStore } from 'sif-soknad/store';
```

---

# Hovedkonsepter

## StepConfig

Søknaden defineres gjennom en stegkonfigurasjon.

```ts
const stepConfig = {
    aboutYou: {
        route: '/about-you',
        isCompleted: (data) => Boolean(data.aboutYou),
    },
};
```

Hvert steg kan definere:

felt beskrivelse

---

route URL for steget
isCompleted bestemmer om steget er ferdig
isIncluded bestemmer om steget skal vises
nextStep valgfri dynamisk navigasjon

---

## Store

State for søknaden ligger i en Zustand‑store.

```ts
createSøknadStore({
    initialData,
    stepConfig,
    stepOrder,
});
```

Store inneholder blant annet:

- søknadsdata
- status for steg
- navigasjonsinfo

---

# Context

`SøknadContext` kobler sammen:

- store
- navigasjon
- stegkonfigurasjon

```tsx
<SøknadContext.Provider value={context}>{children}</SøknadContext.Provider>
```

Hooks kan deretter bruke denne contexten.

---

# Navigasjon

Navigasjon håndteres via `useStepNavigation`.

```ts
const { goToNextStep, goToPreviousStep } = useStepNavigation();
```

Routing beskyttes med:

    StepRouteGuard

Dette sikrer at brukeren ikke hopper over steg.

---

# Konsistens mellom skjema og data

Rammeverket kan sjekke at skjemaet og lagrede data fortsatt stemmer.

Dette brukes til å oppdage når:

- brukeren går tilbake og endrer data
- senere steg blir ugyldige

Relevant kode ligger i:

    src/consistency

Hovedfunksjon:

    checkConsistencyForSteps

---

# Viktige mapper

    src/
      components/    UI‑komponenter
      consistency/   konsistens‑sjekker
      context/       SøknadContext
      hooks/         hooks for forms og navigasjon
      navigation/    routing og step guards
      pages/         grunnsider
      store/         Zustand store
      types/         typer
      utils/         hjelpefunksjoner

---

# Typisk flyt

1.  Definer `StepConfig`
2.  Opprett `SøknadStore`
3.  Sett opp `SøknadContext`
4.  Lag sider for hvert steg
5.  Bruk `useStepNavigation` for å navigere

---

# Designprinsipper

Rammeverket forsøker å:

- holde domenelogikk i appen
- holde flytlogikk i rammeverket
- gjøre steg deklarative
- unngå skjult state

---

# Testing

Ren flytlogikk ligger i utils og kan testes isolert.

Eksempler:

- `getIncludedSteps`
- `getPreviousNextStep`
- `checkConsistencyForSteps`

---

# Status

Dette er et internt rammeverk og utvikles løpende.
