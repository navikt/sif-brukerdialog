export enum SøkersRelasjonTilBarnet {
    'MOR' = 'mor',
    'FAR' = 'far',
    'ADOPTIVFORELDER' = 'adoptivforelder',
    'FOSTERFORELDER' = 'fosterforelder',
}

export type SøkersRelasjonTilBarnetKeys = keyof typeof SøkersRelasjonTilBarnet;
