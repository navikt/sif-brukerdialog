export interface PersistedFileInfo {
    id: string;
    url: string;
}

export interface PersistedFile {
    isPersistedFile: true;
    name: string;
    lastModified: number;
    size: number;
    type: string;
}

export const isPersistedFile = (file: File | PersistedFile): file is PersistedFile =>
    (file as PersistedFile).isPersistedFile === true;

export const mapFileToPersistedFile = (file: File | PersistedFile): PersistedFile => ({
    isPersistedFile: true,
    name: file.name,
    lastModified: file.lastModified,
    size: file.size,
    type: file.type,
});

export interface UploadedFile {
    file: File | PersistedFile;
    pending: boolean;
    uploaded: boolean;
    error: boolean;
    reasons: string[];
    canRetry: boolean;
    info?: PersistedFileInfo;
}
