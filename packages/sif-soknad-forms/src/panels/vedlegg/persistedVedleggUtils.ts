import { PersistedFileInfo, UploadedFile } from '@sif/rhf';

export interface PersistedVedlegg {
    id: string;
    url: string;
    backendUrl: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
}

const createPersistedFile = ({ lastModified, name, size, type }: PersistedVedlegg): File => {
    const file = new File([], name, { lastModified, type });
    try {
        Object.defineProperty(file, 'size', { value: size });
    } catch {
        // File.size kan være read-only i enkelte miljøer
    }
    return file;
};

export const toUploadedFile = (vedlegg: PersistedVedlegg): UploadedFile => ({
    file: createPersistedFile(vedlegg),
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
