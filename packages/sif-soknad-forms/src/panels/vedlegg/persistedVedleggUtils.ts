import { PersistedFile, PersistedFileInfo, UploadedFile } from '@sif/rhf';

export interface PersistedVedlegg {
    id: string;
    url: string;
    backendUrl: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
}

const toPersistedFile = ({ lastModified, name, size, type }: PersistedVedlegg): PersistedFile => ({
    isPersistedFile: true,
    name,
    lastModified,
    size,
    type,
});

export const toUploadedFile = (vedlegg: PersistedVedlegg): UploadedFile => ({
    file: toPersistedFile(vedlegg),
    pending: false,
    uploaded: true,
    error: false,
    reasons: [],
    canRetry: false,
    info: { id: vedlegg.id, url: vedlegg.url },
});

export const isUploadedVedlegg = (file: UploadedFile): file is UploadedFile & { info: PersistedFileInfo } =>
    file.uploaded && !file.pending && !file.error && file.info !== undefined;

export const toPersistedVedlegg = (
    file: UploadedFile & { info: PersistedFileInfo },
    backendUrl: string,
): PersistedVedlegg => ({
    id: file.info.id,
    url: file.info.url,
    backendUrl,
    name: file.file.name,
    size: file.file.size,
    type: file.file.type,
    lastModified: file.file.lastModified,
});
