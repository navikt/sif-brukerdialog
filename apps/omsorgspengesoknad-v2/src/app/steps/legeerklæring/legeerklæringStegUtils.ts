import { LegeerklæringSøknadsdata, PersistedVedlegg } from '@app/types/Soknadsdata';
import { UploadedFile } from '@sif/rhf';

import { LegeerklæringFormFields, LegeerklæringFormValues } from './types';

const createPersistedFile = ({ lastModified, name, size, type }: PersistedVedlegg): File => {
    const file = new File([], name, { lastModified, type });

    try {
        Object.defineProperty(file, 'size', { value: size });
    } catch {
        // File.size kan være read-only i enkelte miljøer. Da vises filen fortsatt korrekt.
    }

    return file;
};

const toUploadedFile = (vedlegg: PersistedVedlegg): UploadedFile => ({
    file: createPersistedFile(vedlegg),
    pending: false,
    uploaded: true,
    error: false,
    reasons: [],
    canRetry: false,
    info: {
        id: vedlegg.id,
        url: vedlegg.url,
    },
});

const isUploadedVedlegg = (file: UploadedFile): file is UploadedFile & { info: { id: string; url: string } } =>
    file.uploaded && !file.pending && !file.error && file.info !== undefined;

export const toLegeerklæringFormValues = (
    søknadsdata: LegeerklæringSøknadsdata | undefined,
): LegeerklæringFormValues => ({
    [LegeerklæringFormFields.vedlegg]: søknadsdata?.vedlegg.map(toUploadedFile) ?? [],
});

export const toSøknadsdata = (values: LegeerklæringFormValues): LegeerklæringSøknadsdata => ({
    vedlegg: (values[LegeerklæringFormFields.vedlegg] ?? []).filter(isUploadedVedlegg).map((file) => ({
        id: file.info.id,
        url: file.info.url,
        name: file.file.name,
        size: file.file.size,
        type: file.file.type,
        lastModified: file.file.lastModified,
    })),
});

export type { LegeerklæringFormValues };
