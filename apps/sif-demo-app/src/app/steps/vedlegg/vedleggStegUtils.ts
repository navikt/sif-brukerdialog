import { VedleggSøknadsdata } from '@app/types/Soknadsdata';
import { getVedleggApiUrl } from '@sif/api/k9-prosessering';
import { isUploadedVedlegg, toPersistedVedlegg, toUploadedFile } from '@sif/soknad-forms';

import { VedleggFormFields, VedleggFormValues } from './types';

export const toVedleggFormValues = (søknadsdata: VedleggSøknadsdata | undefined): VedleggFormValues => ({
    [VedleggFormFields.vedlegg]: søknadsdata?.vedlegg.map(toUploadedFile) ?? [],
});

export const toVedleggSøknadsdata = (values: VedleggFormValues): VedleggSøknadsdata => ({
    vedlegg: (values[VedleggFormFields.vedlegg] ?? [])
        .filter(isUploadedVedlegg)
        .map((file) => toPersistedVedlegg(file, getVedleggApiUrl(file.info.id))),
});
