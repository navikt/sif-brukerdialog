/** Informasjon om mellomlagret vedlegg */
export interface PersistedFile {
    isPersistedFile: boolean;
    name: string;
    lastModified: number;
    size: number;
    type: string;
}

export interface Attachment {
    file: File | PersistedFile;
    pending: boolean;
    uploaded: boolean;
    info?: {
        id: string;
        url: string;
    };
}
