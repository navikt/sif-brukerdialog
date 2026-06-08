import { DeltBostedSøknadsdata } from '@app/types/Soknadsdata';
import { getVedleggApiUrl } from '@sif/api/k9-prosessering';
import { isUploadedVedlegg, toPersistedVedlegg, toUploadedFile } from '@sif/soknad-forms';

import { DeltBostedFormFields, DeltBostedFormValues } from './types';

export const toDeltBostedFormValues = (søknadsdata: DeltBostedSøknadsdata | undefined): DeltBostedFormValues => ({
    [DeltBostedFormFields.samværsavtale]: søknadsdata?.samværsavtale.map(toUploadedFile) ?? [],
});

export const toSøknadsdata = (values: DeltBostedFormValues): DeltBostedSøknadsdata => ({
    samværsavtale: (values[DeltBostedFormFields.samværsavtale] ?? [])
        .filter(isUploadedVedlegg)
        .map((file) => toPersistedVedlegg(file, getVedleggApiUrl(file.info.id))),
});

export type { DeltBostedFormValues };
