export interface StorageMetadata {
    updatedTimestamp: string;
}

export interface MellomlagringPSB {
    metadata?: StorageMetadata;
}

export interface MellomlagringEndring {
    metadata?: StorageMetadata;
}

// export const fixSøknadMetadata = (data: MellomlagringSøknadApiResponse): MellomlagringSøknadApiResponse => {
//     if (data.metadata && (data.metadata as any).updatedTimestemp) {
//         data.metadata.updatedTimestamp = (data.metadata as any).updatedTimestemp;
//         delete (data.metadata as any).updatedTimestemp;
//     }
//     return data;
// };
