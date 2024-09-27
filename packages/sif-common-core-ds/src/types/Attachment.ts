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
    /** id - hentes ut fra URL som mottas fra backend ved opplasting (response.headers.location) */
    id?: string;
    /** Referanse til fil på server - verdi mottas fra server ved opplasting */
    url?: string;
}
