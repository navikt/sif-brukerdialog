import { PersistedVedlegg, VedleggSøknadsdata } from '@app/types/Soknadsdata';
import { UploadedFile } from '@sif/rhf';

import { VedleggFormFields, VedleggFormValues } from './types';

const createPersistedFile = ({ lastModified, name, size, type }: PersistedVedlegg): File => {
    const file = new File([], name, { lastModified, type });

    try {
        Object.defineProperty(file, 'size', { value: size });
    } catch {
        // File.size kan være read-only i enkelte miljøer.
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

export const toVedleggFormValues = (søknadsdata: VedleggSøknadsdata | undefined): VedleggFormValues => ({
    [VedleggFormFields.vedlegg]: søknadsdata?.vedlegg.map(toUploadedFile) ?? [],
});

export const toVedleggSøknadsdata = (values: VedleggFormValues): VedleggSøknadsdata => ({
    vedlegg: (values[VedleggFormFields.vedlegg] ?? []).filter(isUploadedVedlegg).map((file) => ({
        id: file.info.id,
        url: file.info.url,
        name: file.file.name,
        size: file.file.size,
        type: file.file.type,
        lastModified: file.file.lastModified,
    })),
});