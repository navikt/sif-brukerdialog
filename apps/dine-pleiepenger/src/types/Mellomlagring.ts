export interface StorageMetadata {
    updatedTimestamp: Date;
}

export interface MellomlagringPSB {
    metadata?: StorageMetadata;
}

export interface MellomlagringEndring {
    metadata?: StorageMetadata;
}

export interface Mellomlagringer {
    søknad?: MellomlagringPSB;
    endring?: MellomlagringEndring;
}
