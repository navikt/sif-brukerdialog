name: sif-initial-data-loader
description: Mønster for å kombinere flere API-hooks til én asynkron laster (useInitialData + InitialDataLoader) i sif-soknad-apper.
---

# sif-initial-data-loader

## Formål

Beskriver mønsteret for å hente all nødvendig data før søknaden starter, kombinere flere React Query-hooks til én enkelt loading/error/success-tilstand, og rendre riktig side avhengig av resultatet.

## Når skal skillen brukes

- Du oppretter en ny søknadsapp og trenger å bootstrappe initial data (søker, barn, mellomlagring, kontonummer).
- Du legger til en ny datakilde i initial-dataflyten (ny hook i `useInitialData`).
- Du feilsøker hvorfor appen er stuck i loading eller viser feilside.

## Kildereferanse

- `apps/aktivitetspenger-soknad/src/app/initial-data/useInitialData.ts`
- `apps/aktivitetspenger-soknad/src/app/initial-data/InitialDataLoader.tsx`

## Anbefalt plassering

Legg initial-data-flyten under `src/app/initial-data/`.

- `useInitialData.ts` hører hjemme der fordi den samler appens bootstrap-queries og definerer `loading`/`error`/`success`-kontrakten.
- `InitialDataLoader.tsx` hører hjemme samme sted fordi den er render-laget for den samme flyten.
- `src/app/setup/` brukes til providers, boundaries, query client og annen teknisk infrastruktur.
- `src/` brukes til entrypoints og helt overordnede filer.

---

## Arkitektur

```
src/
    App.tsx                         ← providers + initApiClients
    app/
        initial-data/
            InitialDataLoader.tsx       ← kaller useInitialData(), switcher på status
            useInitialData.ts
        ├── <LoadingPage />       ← status === 'loading'
        ├── <ErrorPage />         ← status === 'error'
        └── <Søknad {...data} />  ← status === 'success'
```

`InitialDataLoader` er en ren presentasjonskomponent. All logikk ligger i `useInitialData`.

---

## Del 1: `useInitialData`

### Ansvar

- Kaller alle nødvendige `@sif/api`-hooks.
- Kombinerer loading/error-tilstander til én `InitialDataResult`.
- Validerer mellomlagring mot gjeldende steg-config.
- Returnerer typet `data`-objekt ved suksess.

### Returtype-mønster

```typescript
interface InitialData {
    søker: Søker;
    barn: RegistrertBarn[];
    // legg til ytelse-spesifikke felt her
}

type InitialDataResult =
    | { status: 'loading' }
    | { status: 'error'; errors: unknown[] }
    | { status: 'success'; data: InitialData };
```

### Loading-logikk

- **Required queries** (f.eks. `søker`, `registrerteBarn`): Appen er i loading-tilstand til alle er ferdig.
- **Optional queries** (f.eks. `kontonummer`): Venter på `isLoading`, men returnerer `fallback`-verdi ved manglende data.
- **Mellomlagring**: Hentes kun etter at `metadata` er klart (avhengig av søker + barn). Bruker `useMemo` for å styre når metadata er tilgjengelig.

```typescript
export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const kontonummer = useKontonummer();

    const metadata = useMemo<MellomlagringMetaData | undefined>(() => {
        if (!søker.isFetched || !registrerteBarn.isFetched || !søker.data || !registrerteBarn.data) {
            return undefined;
        }
        return { MELLOMLAGRING_VERSJON, søker: søker.data, barn: registrerteBarn.data };
    }, [søker.isFetched, registrerteBarn.isFetched, søker.data, registrerteBarn.data]);

    const mellomlagring = useYtelseMellomlagring<SøknadMellomlagring, MellomlagringMetaData>(APP_YTELSE, metadata);

    const requiredQueries = [søker, registrerteBarn];

    if (requiredQueries.some((q) => q.isLoading) || kontonummer.isLoading || (metadata && mellomlagring.isLoading)) {
        return { status: 'loading' };
    }

    const errors = [...requiredQueries, mellomlagring].filter((q) => q.isError).map((q) => q.error);
    if (errors.length > 0) {
        return { status: 'error', errors };
    }

    if (!søker.data || !registrerteBarn.data) {
        return { status: 'error', errors: [new Error('Nødvendig data mangler')] };
    }

    return {
        status: 'success',
        data: {
            søker: søker.data,
            barn: registrerteBarn.data,
            kontonummer: kontonummer.data ?? kontonummerFallback,
            mellomlagring: getValidertMellomlagring(mellomlagring.data),
        },
    };
};
```

### Mellomlagringsvalidering

Mellomlagret `currentStepId` må verifiseres mot gjeldende `søknadStepConfig`. Hvis steget ikke finnes lenger (etter en deploy), settes `currentStepId` til `undefined` for å unngå at brukeren havner på et ugyldig steg.

```typescript
const getValidertMellomlagring = (data: SøknadMellomlagring | null | undefined): SøknadMellomlagring | undefined => {
    if (!data) return undefined;
    const currentStepId = data.currentStepId && søknadStepConfig[data.currentStepId] ? data.currentStepId : undefined;
    return { ...data, currentStepId };
};
```

---

## Del 2: `InitialDataLoader`

### Ansvar

Presentasjonskomponent som rendrer riktig side basert på `useInitialData`-resultatet.

```typescript
export const InitialDataLoader = () => {
    const result = useInitialData();
    const { text } = useAppIntl();

    switch (result.status) {
        case 'loading':
            return <LoadingPage applicationTitle={text('application.title')} />;
        case 'error':
            if (import.meta.env.MODE === 'development') {
                console.error(
                    result.errors.map((e) => (e as Error).message).join(', ') || 'Ukjent feil ved innlasting',
                );
            }
            return <ErrorPage applicationTitle={text('application.title')} />;
        case 'success':
            return <Søknad {...result.data} />;
    }
};
```

- `LoadingPage` og `ErrorPage` importeres fra `@sif/soknad-ui`.
- `applicationTitle` hentes via `useAppIntl` med i18n-nøkkelen `'application.title'`.
- Feillogging i dev-mode: bruk `import.meta.env.MODE === 'development'` som guard.

---

## Del 3: Kobling til `Soknad.tsx`

`<Søknad />` mottar `InitialData` som props. Disse brukes til å initialisere `SøknadStore` (mellomlagring) og levere data ned til steg som trenger dem (f.eks. `barn` til barnesteg).

Props-typen til `<Søknad />` skal matche `InitialData`-interfacet i `useInitialData.ts`.

---

## Sjekkliste: legg til ny datakilde

1. Finn riktig hook i `@sif/api` — se [sif-api](../sif-api/SKILL.md) for full hook-tabell og klient-init.
2. Legg hooken til i `useInitialData`.
3. Avgjør: er datakilden **required** (blokkerer loading) eller **optional** (har fallback)?
    - Required: legg til i `requiredQueries`-arrayen.
    - Optional: sjekk `isLoading` separat, bruk fallback-verdi i `data`-objektet.
4. Legg til feltet i `InitialData`-interfacet.
5. Send feltet videre som prop til `<Søknad />`.

---

## Vanlige feil

| Feil                              | Diagnose                                                                                                              |
| --------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| Appen er stuck i loading          | En hook er aldri ferdig (`isFetched` forblir false). Sjekk at API-klient er initialisert og env-variabler er satt.    |
| Mellomlagring ignoreres           | `metadata` er ikke klart når `useYtelseMellomlagring` kalles. Sjekk `useMemo`-avhengighetene.                         |
| Feilside vises selv om API svarer | En query i `requiredQueries` eller `mellomlagring` har `isError: true`. Logg `errors` i dev-mode for å finne hvilken. |
| Ugyldig steg ved retur til søknad | `getValidertMellomlagring` filtrerer ikke riktig — sjekk at `søknadStepConfig` er importert korrekt.                  |
