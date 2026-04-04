---
name: sif-soknad-vedlegg-step
description: Implementer et vedleggssteg i en v2-app — VedleggPanel, PersistedVedlegg, hydration og MSW-handlere.
---

# sif-soknad-vedlegg-step Skill

## Bruk når

Signalord: `vedlegg`, `last opp`, `filvedlegg`, `VedleggPanel`, `PersistedVedlegg`, `lagreVedlegg`, `slettVedlegg`, `FileUpload`.

## Mål

- Opplasting, sletting og hydration virker
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

```ts
export interface PersistedVedlegg {
    id: string;
    url: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
}

export interface <Prefix>Søknadsdata {
    vedlegg: PersistedVedlegg[];
}
```

Hvis flere steg bruker vedlegg: ha `PersistedVedlegg` felles.

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

```ts
const createPersistedFile = ({ lastModified, name, size, type }: PersistedVedlegg): File => {
    const file = new File([], name, { lastModified, type });
    try {
        Object.defineProperty(file, 'size', { value: size });
    } catch {}
    return file;
};

const toUploadedFile = (vedlegg: PersistedVedlegg): UploadedFile => ({
    file: createPersistedFile(vedlegg),
    pending: false,
    uploaded: true,
    error: false,
    reasons: [],
    canRetry: false,
    info: { id: vedlegg.id, url: vedlegg.url },
});

const isUploadedVedlegg = (file: UploadedFile): file is UploadedFile & { info: { id: string; url: string } } =>
    file.uploaded && !file.pending && !file.error && file.info !== undefined;

export const to<Prefix>FormValues = (søknadsdata: <Prefix>Søknadsdata | undefined): <Prefix>FormValues => ({
    [<Prefix>FormFields.vedlegg]: søknadsdata?.vedlegg.map(toUploadedFile) ?? [],
});

export const toSøknadsdata = (values: <Prefix>FormValues): <Prefix>Søknadsdata => ({
    vedlegg: (values[<Prefix>FormFields.vedlegg] ?? []).filter(isUploadedVedlegg).map((file) => ({
        id: file.info.id,
        url: file.info.url,
        name: file.file.name,
        size: file.file.size,
        type: file.file.type,
        lastModified: file.file.lastModified,
    })),
});
```

## 4. Form-komponent

```tsx
const defaultValues = useStepDefaultValues<<Prefix>FormValues, <Prefix>Søknadsdata>({
    stepId,
    toFormValues: to<Prefix>FormValues,
});

const methods = useSøknadRhfForm<<Prefix>FormValues>(stepId, defaultValues);
const vedlegg: UploadedFile[] = methods.watch(<Prefix>FormFields.vedlegg) ?? [];
const hasPendingUploads = vedlegg.some((file) => file.pending);

<AppForm submitDisabled={hasPendingUploads} ...>
    <SifGuidePanel>...</SifGuidePanel>
    <VedleggPanel<<Prefix>FormValues>
        name={<Prefix>FormFields.vedlegg}
        initialFiles={defaultValues[<Prefix>FormFields.vedlegg]}
        label={text('<prefix>Steg.vedlegg.label')}
        uploadLaterURL={getLenker(intl.locale).ettersend}
        showPictureScanningGuide={true}
    />
</AppForm>
```

Bruk `initialFiles={defaultValues[...]}`. Ikke send `watch(...)` inn i `initialFiles`.

## 5. Wire opp mapping

```ts
case SøknadStepId.<PREFIX>:
    return toSøknadsdata(formValues as <Prefix>FormValues);
```

```ts
const <prefix>Vedlegg = søknadsdata[SøknadStepId.<PREFIX>]?.vedlegg.map((v) => v.id) ?? [];

return {
    ...,
    <prefix>: <prefix>Vedlegg,
};
```

## 6. Oppsummering

Bruk vedlegg fra `state.søknadsdata`, ikke DTO.

```tsx
import { VedleggSummaryList } from '@sif/soknad-ui/components';

<VedleggSummaryList vedlegg={state.søknadsdata[SøknadStepId.LEGEERKLÆRING]?.vedlegg ?? []} />
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
