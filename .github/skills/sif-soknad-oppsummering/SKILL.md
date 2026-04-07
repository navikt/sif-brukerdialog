---
name: sif-soknad-oppsummering
description: Sett opp OppsummeringSteg i en v2-app — DTO-basert oppsummering med FormSummary, bekreftelsescheckbox og i18n-nøkler.
---

# sif-soknad-oppsummering Skill

## Formål

Fyll inn innhold i et eksisterende `OppsummeringSteg.tsx` i en v2-app. Etter at skillen er fulgt skal:

- Alle domeneseksjoner vises med `FormSummary`
- Tekstene samsvare med v1-versjonen av samme søknad
- Bekreftelsescheckbox fungere og innsending skje korrekt
- i18n-nøkler i `nb.ts` dekke alle labels

## Når skal skillen brukes

Signalord: `oppsummering`, `OppsummeringSteg`, `sett opp oppsummering`, `ny oppsummering`, `oppsummeringsside`

## Avgrensning

- Primært `OppsummeringSteg.tsx` og tilhørende `i18n/nb.ts`
- Oppretter også `useSendSøknad.ts` og `soknadsdataToSøknadDTO.ts` hvis de ikke finnes fra før
- Ikke endre andre steg eller søknadsdata-typer
- For vedlegg: bruk komponenter fra `@sif/soknad-ui`, ikke fra gamle pakker (`@navikt/sif-common-core-ds` o.l.)

---

## Arbeidsmodus

### Steg 1 — Les disse filene (kun disse)

1. `src/app/steps/oppsummering/OppsummeringSteg.tsx` — eksisterende skall
2. `src/app/steps/oppsummering/i18n/nb.ts` — eksisterende i18n-nøkler
3. `src/app/utils/soknadsdataToSoknadDTO.ts` — forstå DTO-strukturen (opprett om den ikke finnes)
4. `src/app/types/SoknadApiData.ts` — DTO-typen
5. `src/app/hooks/useSendSoknad.ts` — innsendingshook (opprett om den ikke finnes)
6. Tilsvarende oppsummeringsfiler i v1-appen — for tekster og rekkefølge på seksjoner

**Les ikke** andre steg, setup-filer eller packages utover dette.

---

## Støttefiler som må finnes

Disse to filene er forutsetninger for `OppsummeringSteg`. Opprett dem om de ikke finnes fra før.

### `src/app/hooks/useSendSoknad.ts`

```ts
import { ApiError } from '@sif/api';
import { useMutation } from '@tanstack/react-query';

import { sendSøknad } from '../api/sendSoknad';
import { SøknadApiData } from '../types/SoknadApiData';

export const useSendSøknad = () => {
    return useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
    });
};
```

### `src/app/utils/soknadsdataToSoknadDTO.ts`

Mapper `Søknadsdata` + `Søker` + `språk` til `SøknadApiData` (minus `harBekreftetOpplysninger` som legges til ved innsending).

```ts
import { Søker } from '@sif/api/k9-prosessering';

import { SøknadStepId } from '../setup/config/SoknadStepId';
import { SøknadApiData } from '../types/SoknadApiData';
import { Søknadsdata } from '../types/Soknadsdata';

interface Params {
    søker: Søker;
    søknadsdata: Søknadsdata;
    språk: string;
}

export const søknadsdataToSøknadDTO = ({
    søker,
    søknadsdata,
    språk,
}: Params): Omit<SøknadApiData, 'harBekreftetOpplysninger'> | undefined => {
    const mittSteg = søknadsdata[SøknadStepId.MITT_STEG];
    if (!mittSteg) return undefined; // returner undefined om obligatoriske steg mangler

    // Vedlegg sendes som backend-URL-array (full API-URL, ikke bare ID):
    const vedlegg = søknadsdata[SøknadStepId.VEDLEGG]?.vedlegg.map((v) => v.backendUrl) ?? [];

    return {
        språk,
        søkerNorskIdent: søker.fødselsnummer,
        // ... map domenefeltene til API-kontrakten
        vedlegg,
    };
};
```

Viktige detaljer:
- Returner `undefined` om obligatoriske steg mangler i søknadsdata
- Vedlegg mappes til backend-URL-array: `.map(v => v.backendUrl)` — DTO-kontrakten forventer `string[]` med fulle API-URLer
- `backendUrl` er allerede satt på `PersistedVedlegg` av `toPersistedVedlegg` i steg-utils
- `harBekreftetOpplysninger` legges til separat i `OppsummeringSteg` ved innsending (ikke her)
- Optional steg (f.eks. DELT_BOSTED): bruk `?? undefined` eller `?? []` avhengig av API-feltet

### Steg 2 — Kartlegg DTO-felter

Les DTO-typen fra `SoknadApiData.ts` og `soknadsdataToSoknadDTO.ts`. Identifiser:

- Hvilke felter som alltid vises
- Hvilke felter som er optional (`?`) og skal vises betinget
- Hvilke felter som er boolean og skal vises som Ja/Nei
- Hvilke felter som er enum/union-type og trenger tekst-mapping

### Steg 3 — Hent tekstene fra v1

Finn oppsummeringstekstene i v1-appen (typisk `oppsummeringMessages.ts` eller tilsvarende). Bruk de **samme norske tekstene**, men med nye nøkkelprefikser i v2 (f.eks. `oppsummeringSteg.*` i stedet for `steg.oppsummering.*`).

---

## Struktur

Alt i én fil. Hoved-eksporten håndterer form og submit; domeneseksjonene er interne komponenter:

```
OppsummeringSteg          ← hoved-eksport, form + submit-logikk
Om<Seksjon>Oppsummering   ← intern komponent per domeneseksjon
<Enum>Tekst               ← intern komponent for enum → tekst (se under)
```

---

## Prinsipper

### Enum → tekst: bruk komponent, ikke `text()`-funksjon

En funksjon som returnerer en `AppMessageKeys`-streng vil gi TypeScript-feil fordi switch-en ikke er exhaustiv for kompilatoren. Bruk i stedet en lokal komponent med `<AppText>`:

```tsx
const RelasjonTilBarnetTekst = ({ relasjon }: { relasjon: SøkersRelasjonTilBarnet }) => {
    switch (relasjon) {
        case SøkersRelasjonTilBarnet.MOR:
            return <AppText id="omBarnetSteg.relasjon.mor" />;
        case SøkersRelasjonTilBarnet.FAR:
            return <AppText id="omBarnetSteg.relasjon.far" />;
        // ... osv.
    }
};
```

### Vedlegg

Vis vedlegg som lenkeliste, ikke bare antall. Bruk `VedleggSummaryList` fra `@sif/soknad-ui/components` og les vedleggene fra `state.søknadsdata`, ikke fra DTO. Importer `PersistedVedlegg` fra `@sif/soknad-forms` for type-annotering.

Når gammel løsning brukte `Alert inline`, bruk `InlineMessage` fra Aksel.

```tsx
import { VedleggSummaryList } from '@sif/soknad-ui/components';

const legeerklæring = state.søknadsdata[SøknadStepId.LEGEERKLÆRING]?.vedlegg ?? [];

{
    legeerklæring.length === 0 ? (
        <InlineMessage status="warning">
            <AppText id="oppsummeringSteg.vedlegg.ingenLastetOpp" />
        </InlineMessage>
    ) : (
        <VedleggSummaryList vedlegg={legeerklæring} />
    );
}
```

DTO-feltene inneholder backend-URLer (strenger). Lenkelista trenger `name`, `url` og gjerne `size`, og må derfor bruke `PersistedVedlegg[]` fra søknadsdata. `PersistedVedlegg` importeres fra `@sif/soknad-forms`.

### Feil-tilstand

Hvis DTO ikke kan bygges (`dto === undefined`), vis `LocalAlert status="error"` og disable submit:

```tsx
submitDisabled={!dto}
```

```tsx
{
    !dto && <LocalAlert status="error">...</LocalAlert>;
}
{
    dto && (
        <>
            <OmSøkerOppsummering søker={state.søker} />
            {/* domeneseksjoner */}
        </>
    );
}
```

### i18n-nøkler

Nøkkelprefikset for oppsummeringssteget er `oppsummeringSteg.*`. Alltid inkluder:

- `oppsummeringSteg.bekrefterOpplysninger.label`
- `oppsummeringSteg.feil.tittel` + `oppsummeringSteg.feil.innhold`
- `oppsummeringForm.validation.bekrefterOpplysninger.notChecked`

### Innsendingsfeil

Håndter feil fra `useSendSøknad` ved innsending. `mutateAsync` kaster `ApiError` — bruk `getInvalidParametersFromApiError` fra `@sif/api` for å sjekke om feilen inneholder ugyldige parametre.

Mønster:

1. Hent `error` fra `useSendSøknad()` (via `useMutation`)
2. Bruk `getInvalidParametersFromApiError(error)` for å ekstrahere eventuelle `InvalidParameterViolation[]`
3. Vis domenespesifikk feilmelding i en `LocalAlert status="error"` (med `LocalAlert.Header`/`LocalAlert.Content`) hvis `invalidParameters` finnes
4. Vis generell `ErrorSummary` med `error.message` ellers

```tsx
import { getInvalidParametersFromApiError } from '@sif/api';

const { isPending, mutateAsync, error: sendSøknadError } = useSendSøknad();
const invalidParameters = getInvalidParametersFromApiError(sendSøknadError);

const onSubmit = async () => {
    try {
        await mutateAsync({ ...dto, harBekreftetOpplysninger });
        await slettMellomlagring();
        clearSøknadFormValues();
        setSøknadSendt();
    } catch {
        return; // Feilen håndteres via sendSøknadError-state
    }
};

// I JSX:
{sendSøknadError && invalidParameters && (
    <InnsendingFeiletAlert invalidParameters={invalidParameters} />
)}
{sendSøknadError && !invalidParameters && (
    <ErrorSummary ref={errorSummaryRef}>
        <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
    </ErrorSummary>
)}
```

i18n-nøkler for innsendingsfeil (prefiks `oppsummeringSteg.innsendingFeilet.*`):
- `oppsummeringSteg.innsendingFeilet.tittel`
- Domenespesifikke feilmeldinger per `parameterName`
- Generelle fallback-tekster

---

## Verifisering mot v1

Etter at oppsummeringen er satt opp, sjekk at innhold og rekkefølge på seksjoner er identisk med v1:

- [ ] Alle seksjoner fra v1 er representert
- [ ] Betingede felt vises/skjules likt som i v1
- [ ] Tekster (labels, overskrifter) er ordrett like v1
- [ ] Bekreftelses-tekst er identisk med v1
- [ ] Feil-tilstand (`!dto`) vises korrekt
