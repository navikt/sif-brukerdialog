---
name: sif-initial-data-loader
type: referanse
description: Mønster for å kombinere flere API-hooks til én asynkron laster (useInitialData + InitialDataLoader) i sif-soknad-apper.
---

# sif-initial-data-loader

## Bruk når

- Du oppretter en ny søknadsapp og trenger å bootstrappe initial data (søker, barn, mellomlagring, kontonummer).
- Du legger til en ny datakilde i initial-dataflyten (ny hook i `useInitialData`).
- Du feilsøker hvorfor appen er stuck i loading eller viser feilside.

## Leveranse

- `src/useInitialData.ts` — samler bootstrap-queries med loading/error/success-kontrakt
- Kobling til `App.tsx` via `SøknadDataWrapper`-mønsteret

## Kildereferanse

- `apps/aktivitetspenger-soknad/src/useInitialData.ts`

## Anbefalt plassering

`useInitialData.ts` legges i `src/` (rot for appen), ikke i `src/app/`. Dette er et entrypoint-nivå-concern — det kjøres før `AppContext` og `Soknad` initialiseres.

> **Merk:** Mellomlagring håndteres av `SøknadRouter` fra `@sif/soknad-app`. `useInitialData` skal IKKE hente mellomlagring.

---

## Arkitektur

```
src/
    App.tsx                    ← SøknadAppProvider + SøknadDataWrapper
    useInitialData.ts          ← bootstrap-queries
    app/
        context/AppContext.tsx ← app-spesifikk datakontekst
        Soknad.tsx             ← SøknadRouter (håndterer mellomlagring selv)
```

`SøknadDataWrapper` i `App.tsx` kaller `useInitialData()` og switcher på status:
- `loading` → `<LoadingPage />`
- `error` → `<ErrorPage />`
- `success` → `<AppContextProvider value={data}><Søknad /></AppContextProvider>`

`Søknad` mottar ikke lenger props — data leveres via `AppContext`.

---

## Del 1: `useInitialData`

### Ansvar

- Kaller alle nødvendige `@sif/api`-hooks.
- Kombinerer loading/error-tilstander til én `InitialDataResult`.
- Returnerer typet `data`-objekt ved suksess.

**Ikke** hente mellomlagring her — det håndteres av `SøknadRouter`.

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

```typescript
export const useInitialData = (): InitialDataResult => {
    const søker = useSøker();
    const registrerteBarn = useRegistrerteBarn();
    const kontonummer = useKontonummer(); // optional

    const requiredQueries = [søker, registrerteBarn];

    if (requiredQueries.some((q) => q.isLoading) || kontonummer.isLoading) {
        return { status: 'loading' };
    }

    const errors = requiredQueries.filter((q) => q.isError).map((q) => q.error);
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
        },
    };
};
```

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