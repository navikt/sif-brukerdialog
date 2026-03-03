import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { Søknadsdata } from './Søknadsdata';

/** App-specific mellomlagring type */
export interface Mellomlagring {
    søknadsdata: Søknadsdata;
    currentStegId: string | null;
}

/** App-specific metadata for hash validation */
export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
