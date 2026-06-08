import { LegeerklæringSøknadsdata } from '@app/types/Soknadsdata';
import { getVedleggApiUrl } from '@sif/api/k9-prosessering';
import { isUploadedVedlegg, toPersistedVedlegg, toUploadedFile } from '@sif/soknad-forms';

import { LegeerklæringFormFields, LegeerklæringFormValues } from './types';

export const toLegeerklæringFormValues = (
    søknadsdata: LegeerklæringSøknadsdata | undefined,
): LegeerklæringFormValues => ({
    [LegeerklæringFormFields.vedlegg]: søknadsdata?.vedlegg.map(toUploadedFile) ?? [],
});

export const toSøknadsdata = (values: LegeerklæringFormValues): LegeerklæringSøknadsdata => ({
    vedlegg: (values[LegeerklæringFormFields.vedlegg] ?? [])
        .filter(isUploadedVedlegg)
        .map((file) => toPersistedVedlegg(file, getVedleggApiUrl(file.info.id))),
});

export type { LegeerklæringFormValues };
