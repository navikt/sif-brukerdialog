export interface PersistedFileInfo {
    id: string;
    url: string;
}

export interface UploadedFile {
    file: File;
    pending: boolean;
    uploaded: boolean;
    error: boolean;
    reasons: string[];
    canRetry: boolean;
    info?: PersistedFileInfo;
}
