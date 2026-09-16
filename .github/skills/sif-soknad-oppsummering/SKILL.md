---
name: sif-soknad-oppsummering
type: action
description: Sett opp OppsummeringSteg i en v2-app — DTO-basert oppsummering med FormSummary, bekreftelsescheckbox og i18n-nøkler.
---

# sif-soknad-oppsummering

## Bruk når

Signalord: `oppsummering`, `OppsummeringSteg`, `sett opp oppsummering`, `ny oppsummering`, `oppsummeringsside`

## Leveranse

- Utfylt `OppsummeringSteg.tsx` med alle domeneseksjoner via `FormLayout.Summary`
- Tekster som samsvarer med v1-versjonen av samme søknad
- Fungerende bekreftelsescheckbox og innsending
- i18n-nøkler i `nb.ts` som dekker alle labels
- `useSendSøknad.ts` og `soknadsdataToSøknadDTO.ts` hvis de ikke finnes fra før

## Avgrensning

- Primært `OppsummeringSteg.tsx` og tilhørende `i18n/nb.ts`
- Oppretter også `useSendSøknad.ts` og `soknadsdataToSøknadDTO.ts` hvis de ikke finnes fra før
- Ikke endre andre steg eller søknadsdata-typer
- For vedlegg: bruk komponenter fra `@sif/soknad-ui`, ikke fra gamle pakker (`@navikt/sif-common-core-ds` o.l.)
- For i18n-konvensjoner → bruk `sif-intl`.
- For lagring, opplasting og mapping av vedlegg → bruk `sif-soknad-vedlegg-step`.

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

Hooken eier POST, opprydding og feillogging, og eksponerer domenenavn utad — ikke mutasjonsobjektet. `onSøknadSendt` fra `@sif/soknad-app` **må** ligge som `onSuccess` i mutasjonsoppsettet. Se `sif-soknad-app`-skillen for hvorfor.

```ts
import { sendSøknad } from '@app/api/sendSoknad';
import { SøknadApiData } from '@app/types/SoknadApiData';
import { ApiError, ApiErrorType, isApiAxiosError } from '@sif/api';
import { appLogger } from '@sif/apm';
import { useAnalyticsInstance, useSøknadSendt } from '@sif/soknad-app';
import { useMutation } from '@tanstack/react-query';

export const useSendSøknad = () => {
    const { logSkjemaFeilet } = useAnalyticsInstance();
    const { onSøknadSendt } = useSøknadSendt();

    const { mutate, isPending, error } = useMutation<void, ApiError, SøknadApiData>({
        mutationFn: (data) => sendSøknad(data),
        // Holder isPending til søknaden er markert som sendt. Se useSøknadSendt.
        onSuccess: onSøknadSendt,
        onError: (e) => {
            logSkjemaFeilet();
            if (e.type === ApiErrorType.ZodValidationError) {
                appLogger.logError(`sendSøknad: request-validering feilet for felt: ${e.message}`);
            } else if (isApiAxiosError(e)) {
                appLogger.logApiError(e.originalError, 'sendSøknad');
            } else {
                appLogger.logError(`sendSøknad: innsending feilet (${e.type})`);
            }
        },
    });

    return { sendSøknad: mutate, isPending, sendSøknadError: error };
};
```

**Ikke** kall `slettMellomlagring()` eller `setSøknadSendt()` manuelt i oppsummeringssteget — `onSøknadSendt` gjør begge deler, og `SøknadRouter` navigerer selv til `/kvittering`. **Ikke** bruk `mutateAsync`: uten `try/catch` re-kaster RHF `handleSubmit`, og `SifForm` fanger ikke — det gir unhandled rejection ved hver feilede innsending.

### `src/app/utils/soknadsdataToSoknadDTO.ts`

Mapper `Søknadsdata` + `Søker` + `språk` til `SøknadApiData` (minus `harBekreftetOpplysninger` som legges til ved innsending).

```ts
import { Søker } from '@sif/api/k9-prosessering';

import { SøknadStepId } from '../types/SoknadStepId';
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

Vis vedlegg som lenkeliste, ikke bare antall. Bruk `VedleggSummaryList` fra `@sif/soknad-ui/components` og les vedleggene fra `søknadsdata`, ikke fra DTO. Importer `PersistedVedlegg` fra `@sif/soknad-forms` for type-annotering.

Når gammel løsning brukte `Alert inline`, bruk `InlineMessage` fra Aksel.

```tsx
import { VedleggSummaryList } from '@sif/soknad-ui/components';

const legeerklæring = søknadsdata[SøknadStepId.LEGEERKLÆRING]?.vedlegg ?? [];

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

Hvis DTO ikke kan bygges (`dto === undefined`), vis `InfoCard data-color="warning"` og disable submit. Oppsummeringssteget er siste steg, så `isFinalSubmit` skal settes:

```tsx
<SøknadStepForm
    stepId={stepId}
    methods={methods}
    onSubmit={onSubmit}
    isPending={isPending}
    isFinalSubmit={true}
    submitDisabled={!dto}>
```

```tsx
{
    !dto && (
        <InfoCard data-color="warning">
            <InfoCard.Header>
                <InfoCard.Title>
                    <AppText id="oppsummeringSteg.feil.tittel" />
                </InfoCard.Title>
            </InfoCard.Header>
            <InfoCard.Content>
                <AppText id="oppsummeringSteg.feil.innhold" />
            </InfoCard.Content>
        </InfoCard>
    );
}
{
    dto && <FormLayout.Summary>{/* domeneseksjoner */}</FormLayout.Summary>;
}
```

`FormLayout.Summary` importeres fra `@sif/soknad-ui`.

### Hente søknadsdata og kontekst

Søknadsdata hentes med `useSøknadsdata<T>()` — ikke via `useSøknadAppContext`-storen direkte:

```tsx
import { useSøknadsdata } from '@sif/soknad-app';
const søknadsdata = useSøknadsdata<Søknadsdata>();
```

App-spesifikk data (søker, barn, kontoInfo) hentes via `useAppContext()` fra `@app/context/AppContext`. `useSøknadSendt` kalles ikke i steget — den brukes inne i `useSendSøknad`.

### i18n-nøkler

Nøkkelprefikset for oppsummeringssteget er `oppsummeringSteg.*`. Alltid inkluder:

- `oppsummeringSteg.bekrefterOpplysninger.label`
- `oppsummeringSteg.feil.tittel` + `oppsummeringSteg.feil.innhold`
- `oppsummeringForm.validation.bekrefterOpplysninger.notChecked`

### Innsendingsfeil

Feil fra `useSendSøknad` blir liggende i mutasjonens `error`-state (`sendSøknadError`) og rendres av steget. Bruk `getInvalidParametersFromApiError` fra `@sif/api` for å sjekke om feilen inneholder ugyldige parametre.

Mønster:

1. Hent `sendSøknadError` fra `useSendSøknad()`
2. Bruk `getInvalidParametersFromApiError(sendSøknadError)` for å ekstrahere eventuelle `InvalidParameterViolation[]`
3. Vis domenespesifikk feilmelding via `InnsendingFeiletAlert` hvis `invalidParameters` finnes
4. Vis generell `ErrorSummary` med `error.message` ellers

```tsx
import { getInvalidParametersFromApiError } from '@sif/api';

const { sendSøknad, isPending, sendSøknadError } = useSendSøknad();
const invalidParameters = getInvalidParametersFromApiError(sendSøknadError);

const onSubmit = () => {
    if (dto === undefined) {
        return;
    }
    sendSøknad({ ...dto, harBekreftetOpplysninger });
};

// I JSX:
{
    sendSøknadError && invalidParameters && <InnsendingFeiletAlert invalidParameters={invalidParameters} />;
}
{
    sendSøknadError && !invalidParameters && (
        <ErrorSummary ref={errorSummaryRef}>
            <ErrorSummaryItem>{sendSøknadError.message}</ErrorSummaryItem>
        </ErrorSummary>
    );
}
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
