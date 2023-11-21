export interface StorageMetadata {
    updatedTimestamp: string;
}

export interface MellomlagringPSB {
    metadata?: StorageMetadata;
}

export interface MellomlagringEndring {
    metadata?: StorageMetadata;
}

export interface Mellomlagring {
    søknad: MellomlagringPSB;
    endring: MellomlagringEndring;
}
