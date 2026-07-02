---
name: sif-soknad-vedlegg-step
type: action
description: Implementer et vedleggssteg i en v2-app — VedleggPanel, PersistedVedlegg, hydration og MSW-handlere.
---

# sif-soknad-vedlegg-step

## Bruk når

- Bruker skal legge til filvedlegg (opplasting/sletting) i et steg.
- Bruker nevner `vedlegg`, `last opp`, `filvedlegg`, `VedleggPanel`, `PersistedVedlegg`.

## Leveranse

- Opplasting, sletting og hydration virker
- Mellomlagring oppdateres når vedlegg lastes opp eller slettes
- Submit sperres ved pending uploads
- DTO får vedleggs-IDer
- Oppsummering kan vise vedlegg som lenker

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
export enum <Prefix>FormFields {
    vedlegg = 'vedlegg',
}

export interface <Prefix>FormValues extends StepFormValues {
    [<Prefix>FormFields.vedlegg]: UploadedFile[];
}
```

## 3. Hydration og mapping

Bruk delte hjelpere fra `@sif/soknad-forms`. Ikke dupliser disse lokalt.

```ts
import { <Prefix>Søknadsdata } from '@app/types/Soknadsdata';
import { getVedleggApiUrl } from '@sif/api/k9-prosessering';
import { isUploadedVedlegg, toPersistedVedlegg, toUploadedFile } from '@sif/soknad-forms';

import { <Prefix>FormFields, <Prefix>FormValues } from './types';

export const to<Prefix>FormValues = (
    søknadsdata: <Prefix>Søknadsdata | undefined,
): <Prefix>FormValues => ({
    [<Prefix>FormFields.vedlegg]: søknadsdata?.vedlegg.map(toUploadedFile) ?? [],
});

export const toSøknadsdata = (values: <Prefix>FormValues): <Prefix>Søknadsdata => ({
    vedlegg: (values[<Prefix>FormFields.vedlegg] ?? [])
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
import { useLenker } from '@app/lenker';
import { SøknadStepId } from '@app/types/SoknadStepId';
import { <Prefix>Søknadsdata } from '@app/types/Soknadsdata';
import { UploadedFile } from '@sif/rhf';
import { SøknadStep, SøknadStepForm, useMellomlagring, useSaveSøknadFormValues, useStepData } from '@sif/soknad-app';
import { VedleggPanel } from '@sif/soknad-forms';
import { useForm } from 'react-hook-form';

import { to<Prefix>FormValues, to<Prefix>Søknadsdata } from './<prefix>StegUtils';
import { <Prefix>FormFields, <Prefix>FormValues } from './types';

const stepId = SøknadStepId.<STEP_ID>;

export const <Prefix>Form = () => {
    const { text } = useAppIntl();
    const lenker = useLenker();

    const { lagretData, commit, draftFormValues } = useStepData<<Prefix>Søknadsdata, <Prefix>FormValues>(stepId);
    const initialVedlegg = (draftFormValues ?? to<Prefix>FormValues(lagretData))[<Prefix>FormFields.vedlegg];
    const methods = useForm<<Prefix>FormValues>({ defaultValues: draftFormValues ?? to<Prefix>FormValues(lagretData) });
    useSaveSøknadFormValues(stepId, methods.getValues);

    const { lagre } = useMellomlagring();
    const vedlegg: UploadedFile[] = methods.watch(<Prefix>FormFields.vedlegg) ?? [];
    const hasPendingUploads = vedlegg.some((file) => file.pending);

    const onSubmit = (data: <Prefix>FormValues) => commit(to<Prefix>Søknadsdata(data));

    return (
        <SøknadStep stepId={stepId}>
            <SøknadStepForm
                stepId={stepId}
                methods={methods}
                onSubmit={onSubmit}
                isPending={false}
                submitDisabled={hasPendingUploads}>
                <VedleggPanel<<Prefix>FormValues>
                    name={<Prefix>FormFields.vedlegg}
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
- `uploadLaterURL` hentes fra delt lenkekilde via `useLenker()`.

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

DTO har normalt bare ID-er. Oppsummering trenger `name`, `url` og `size`.

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

## Feilsøking

- Ingen request i nettverkspanelet: sjekk om generert `zLagreVedleggData` bruker `z.string()` i stedet for `z.instanceof(Blob)`.
- Request sendes som JSON: sjekk at API-klienten ikke setter global `Content-type: application/json`.
- Lenken i oppsummeringen virker ikke i dev/mock: sjekk `Location`-header og `GET /vedlegg/:id`.

## Minimumstester

```ts
it('mapper bare opplastede filer til søknadsdata', () => { ... });
it('ekskluderer filer med feil fra søknadsdata', () => { ... });
it('hydrerer lagrede vedlegg til UploadedFile-format', () => { ... });
```
