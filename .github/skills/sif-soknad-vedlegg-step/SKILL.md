---
name: sif-soknad-vedlegg-step
type: action
description: Implementer et vedleggssteg i en v2-app — VedleggPanel, PersistedVedlegg, hydration, sjekk av manglende vedlegg og MSW-handlere.
---

# sif-soknad-vedlegg-step

## Bruk når

- Bruker skal legge til filvedlegg (opplasting/sletting) i et steg.
- Bruker nevner `vedlegg`, `last opp`, `filvedlegg`, `VedleggPanel`, `PersistedVedlegg`.
- Bruker skal sjekke at vedlegg fra mellomlagring fortsatt finnes i backend (`useManglendeVedlegg`, `manglendeVedleggIder`), også i v1-apper.

## Leveranse

- Opplasting, sletting og hydration virker
- Mellomlagring oppdateres når vedlegg lastes opp eller slettes
- Submit sperres ved pending uploads
- DTO får vedleggenes backend-URL-er
- Oppsummering kan vise vedlegg som lenker
- Vedlegg som mangler i backend markeres i steg og oppsummering, og innsending sperres

## Endre disse filene

- `src/app/steps/<steg>/types.ts`
- `src/app/steps/<steg>/<prefix>StegUtils.ts`
- `src/app/steps/<steg>/<Prefix>Form.tsx`
- `src/app/types/Soknadsdata.ts`
- `src/app/utils/formValuesToSoknadsdata.ts`
- `src/app/utils/soknadsdataToSoknadDTO.ts`
- `mock/msw/handlers.ts`
- `src/app/steps/oppsummering/OppsummeringSteg.tsx`

## 1. Lagre vedlegg i søknadsdata

`PersistedVedlegg` er en delt type fra `@sif/soknad-forms`. Ikke definer den lokalt.

```ts
import { PersistedVedlegg } from '@sif/soknad-forms';

export interface <Prefix>Søknadsdata {
    vedlegg: PersistedVedlegg[];
}
```

`PersistedVedlegg` inneholder `id`, `url` (frontend-URL for visning), `backendUrl` (full API-URL for innsending), `name`, `size`, `type` og `lastModified`.

## 2. Bruk `UploadedFile[]` i formen

```ts
export interface <Prefix>FormValues extends StepFormValues {
    vedlegg: UploadedFile[];
}
```

## 3. Hydration og mapping

Bruk delte hjelpere fra `@sif/soknad-forms`. Ikke dupliser disse lokalt.

```ts
import { <Prefix>Søknadsdata } from '@app/types/Soknadsdata';
import { getVedleggApiUrl } from '@sif/api/k9-brukerdialog-prosessering';
import { isUploadedVedlegg, toPersistedVedlegg, toUploadedFile } from '@sif/soknad-forms';

import { <Prefix>FormValues } from './types';

export const to<Prefix>FormValues = (
    søknadsdata: <Prefix>Søknadsdata | undefined,
): <Prefix>FormValues => ({
    vedlegg: søknadsdata?.vedlegg.map(toUploadedFile) ?? [],
});

export const toSøknadsdata = (values: <Prefix>FormValues): <Prefix>Søknadsdata => ({
    vedlegg: (values.vedlegg ?? [])
        .filter(isUploadedVedlegg)
        .map((file) => toPersistedVedlegg(file, getVedleggApiUrl(file.info.id))),
});
```

Hjelperne gjør følgende:

- `toUploadedFile(vedlegg)` — hydrerer et `PersistedVedlegg` til `UploadedFile` (for react-hook-form)
- `isUploadedVedlegg(file)` — type guard som filtrerer bort feil/pending filer
- `toPersistedVedlegg(file, backendUrl)` — mapper tilbake til `PersistedVedlegg` med file-metadata og `backendUrl`

## 4. Form-komponent

```tsx
import { useAppIntl } from '@app/i18n';
import { getLenker } from '@app/lenker';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { <Prefix>Søknadsdata } from '@app/types/Soknadsdata';
import { UploadedFile } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useMellomlagring, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { VedleggPanel } from '@sif/soknad-forms';
import { useForm } from 'react-hook-form';

import { to<Prefix>FormValues, to<Prefix>Søknadsdata } from './<prefix>StegUtils';
import { <Prefix>FormValues } from './types';

const stepId = SøknadStepId.<STEP_ID>;

export const <Prefix>Form = () => {
    const { text } = useAppIntl();
    const lenker = getLenker();

    const { lagretData, commit, draftFormValues } = useStepData<<Prefix>Søknadsdata, <Prefix>FormValues>(stepId);
    const initialVedlegg = (draftFormValues ?? to<Prefix>FormValues(lagretData)).vedlegg;
    const methods = useForm<<Prefix>FormValues>({ defaultValues: draftFormValues ?? to<Prefix>FormValues(lagretData) });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const { lagre } = useMellomlagring();
    const vedlegg: UploadedFile[] = methods.watch('vedlegg') ?? [];
    const hasPendingUploads = vedlegg.some((file) => file.pending);

    const onSubmit = (data: <Prefix>FormValues) => commit(to<Prefix>Søknadsdata(data));

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                submitDisabled={hasPendingUploads}>
                <VedleggPanel<<Prefix>FormValues>
                    name="vedlegg"
                    initialFiles={initialVedlegg}
                    onVedleggEndret={() => lagre()}
                    label={text('<prefix>Steg.vedlegg.label')}
                    uploadLaterURL={lenker.omsorgspengerEttersending}
                    showPictureScanningGuide={true}
                />
            </SøknadStepForm>
        </SøknadStep>
    );
};
```

- Bruk `lagre()` fra `useMellomlagring()` i `onVedleggEndret` — lagrer alle live formverdier inkl. vedlegg.
- `initialFiles` skal være den initielle listen, ikke `watch(...)`-verdien.
- `uploadLaterURL` hentes fra delt lenkekilde via `getLenker()`.

## 5. Wire opp mapping

### formValuesToSoknadsdata

```ts
case SøknadStepId.<PREFIX>:
    return toSøknadsdata(formValues as <Prefix>FormValues);
```

### soknadsdataToSoknadDTO

Vedlegg sendes som backend-URLer (full API-URL), ikke bare IDer. `backendUrl` er allerede satt på `PersistedVedlegg` av `toPersistedVedlegg` i steg-utils.

```ts
const <prefix>Vedlegg = søknadsdata[SøknadStepId.<PREFIX>]?.vedlegg.map((v) => v.backendUrl) ?? [];

return {
    ...,
    <prefix>: <prefix>Vedlegg,
};
```

## 6. Oppsummering

Bruk vedlegg fra `state.søknadsdata`, ikke DTO.

```tsx
import { VedleggSummaryList } from '@sif/soknad-ui/components';

<VedleggSummaryList vedlegg={state.søknadsdata[SøknadStepId.LEGEERKLÆRING]?.vedlegg ?? []} />;
```

DTO inneholder bare backend-URL-er. Oppsummering trenger `name`, `url` og `size`.

## 7. MSW

```ts
let vedleggCounter = 0;
const vedleggStore = new Map<string, { name: string; type: string; content: ArrayBuffer }>();

const getVedleggUrl = (vedleggId: string) => `${K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH}/vedlegg/${vedleggId}`;

http.post(`**/vedlegg`, async ({ request }) => {
    const formData = await request.formData();
    const vedlegg = formData.get('vedlegg');
    if (!(vedlegg instanceof File)) {
        return HttpResponse.json({ message: 'Mangler vedlegg i request' }, { status: 400 });
    }

    vedleggCounter += 1;
    const vedleggId = `mock-vedlegg-${vedleggCounter}`;
    vedleggStore.set(vedleggId, {
        name: vedlegg.name,
        type: vedlegg.type,
        content: await vedlegg.arrayBuffer(),
    });

    return new HttpResponse(null, {
        headers: {
            Location: getVedleggUrl(vedleggId),
            'access-control-expose-headers': 'Location',
        },
    });
});

http.get(`**/vedlegg/:vedleggId`, ({ params }) => {
    const file = vedleggStore.get(String(params.vedleggId));
    if (!file) return HttpResponse.json({ message: 'Vedlegg ikke funnet' }, { status: 404 });
    return new HttpResponse(file.content, {
        headers: {
            'Content-Type': file.type || 'application/octet-stream',
            'Content-Disposition': `inline; filename="${encodeURIComponent(file.name)}"`,
        },
    });
});

http.delete(`**/vedlegg/:vedleggId`, ({ params }) => {
    vedleggStore.delete(String(params.vedleggId));
    return HttpResponse.json({});
});
```

Legg vedlegg-handlerne før catch-all-handlere.

## 8. Sjekk at vedlegg finnes i backend

Vedlegg i mellomlagringen kan være slettet i backend. Bruker må da laste dem opp på nytt. Sjekken bruker `POST /vedlegg/eksisterer` (maks 20 ID-er per kall, som er nok i praksis).

- **Steg:** sjekk bare vedleggene som fantes da steget ble åpnet (`defaultValues`/`initialFiles`), ikke `watch(...)`. Send resultatet til `manglendeVedleggIder` på opplastingskomponenten.
- **Oppsummering:** sjekk vedleggene som faktisk sendes inn. Send resultatet til `manglendeVedleggIder` på `VedleggSummaryList`. Sperr submit mens sjekken pågår og når noe mangler. Vis en egen feilmelding over innsendingsknappen når det bare er manglende vedlegg som stopper innsendingen.
- **Feiler selve sjekken:** ikke blokker bruker. Regn ingen vedlegg som manglende.

|              | v2 (`@sif/*`)                                                                         | v1 (`@navikt/sif-common-*`)                                                                                                            |
| ------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Hook         | `useManglendeVedlegg(ider)` fra `@sif/api/k9-brukerdialog-prosessering` (React Query) | `useManglendeVedlegg(ider)` fra `@navikt/sif-common-core-ds` (uten React Query), returnerer `{ manglendeVedleggIder, sjekkerVedlegg }` |
| ID-er        | `f.info?.id` / `PersistedVedlegg.id`                                                  | `getVedleggIder(vedlegg)` fra `@navikt/sif-common-core-ds`                                                                             |
| Steg         | `VedleggPanel`                                                                        | `FormikFileUpload`                                                                                                                     |
| Oppsummering | `VedleggSummaryList` fra `@sif/soknad-ui/components`                                  | `VedleggSummaryList` fra `@navikt/sif-common-core-ds`                                                                                  |

Referanser: `apps/omsorgspengesoknad-v2` (v2) og `apps/pleiepenger-sykt-barn` (v1).

MSW-handler (legg til et scenario med `finnes: false` for å teste feilvisningen):

```ts
http.post('**/vedlegg/eksisterer', async ({ request }) => {
    const { vedleggIder } = (await request.json()) as { vedleggIder: string[] };
    return HttpResponse.json(vedleggIder.map((vedleggId) => ({ vedleggId, finnes: true })));
});
```

## Feilsøking

- Ingen request i nettverkspanelet: sjekk om generert `zLagreVedleggData` bruker `z.string()` i stedet for `z.instanceof(Blob)`.
- Request sendes som JSON: sjekk at verken `initApiClient` eller kallet setter `Content-Type: application/json`. Den genererte `lagreVedlegg` setter `Content-Type: null`, slik at Axios velger `multipart/form-data`.
- Tidsavbrudd kan ikke prøves på nytt, eller 400 gir generell feilmelding: sjekk at `lagreVedlegg` kaster den opprinnelige Axios-feilen og ikke en `ApiError`.
- Lenken i oppsummeringen virker ikke i dev/mock: sjekk `Location`-header og `GET /vedlegg/:id`.

## Minimumstester

```ts
it('mapper bare opplastede filer til søknadsdata', () => { ... });
it('ekskluderer filer med feil fra søknadsdata', () => { ... });
it('hydrerer lagrede vedlegg til UploadedFile-format', () => { ... });
```
