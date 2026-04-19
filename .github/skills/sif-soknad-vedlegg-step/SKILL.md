---
name: sif-soknad-vedlegg-step
description: Implementer et vedleggssteg i en v2-app — VedleggPanel, PersistedVedlegg, hydration og MSW-handlere.
---

# sif-soknad-vedlegg-step

## Bruk når

## Mål

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

const defaultValues = useStepDefaultValues<<Prefix>FormValues, <Prefix>Søknadsdata>({
    stepId,
    toFormValues: to<Prefix>FormValues,
});

const { lagreSøknadSteg } = useSøknadMellomlagring();
const methods = useSøknadRhfForm<<Prefix>FormValues>(stepId, defaultValues);
const vedlegg: UploadedFile[] = methods.watch(<Prefix>FormFields.vedlegg) ?? [];
const hasPendingUploads = vedlegg.some((file) => file.pending);
const lenker = useLenker();

<AppForm submitDisabled={hasPendingUploads} ...>
    <SifGuidePanel>...</SifGuidePanel>
    <VedleggPanel<<Prefix>FormValues>
        name={<Prefix>FormFields.vedlegg}
        initialFiles={defaultValues[<Prefix>FormFields.vedlegg]}
        onVedleggEndret={() => lagreSøknadSteg(stepId, methods.getValues())}
        label={text('<prefix>Steg.vedlegg.label')}
        uploadLaterURL={lenker.omsorgspengerEttersending}
        showPictureScanningGuide={true}
    />
</AppForm>
```

Eksterne lenker som `uploadLaterURL` skal hentes fra den delte lenkekilden i monorepoet. I appen bør de normalt brukes via en lokal adapter som `useLenker()` eller `getLenke()`. Hvis steget trenger en ny ekstern lenke, legg den til i `@sif/soknad-ui/lenker` i stedet for å definere den i appen.

Foretrekk selvforklarende, domenespesifikke nøkkelnavn i den delte lenkekilden, for eksempel `omsorgspengerEttersending` og `navMinSide`, fremfor generiske navn uten prefix.

Bruk `initialFiles={defaultValues[...]}`. Ikke send `watch(...)` inn i `initialFiles`.

Vedleggssteg skal alltid mellomlagre når vedleggslisten er ferdig oppdatert etter opplasting eller sletting.

- Bruk `onVedleggEndret` fra `VedleggPanel`. Panelet håndterer init-guard og pending-filter internt — callbacken fyrer bare når vedleggslisten faktisk har endret seg og ingen filer er pending.
- Kall `lagreSøknadSteg(stepId, methods.getValues())`, ikke `lagreSøknad()`, siden vedleggsendringen ellers ikke nødvendigvis finnes i `søknadsdata` i store ennå.

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
