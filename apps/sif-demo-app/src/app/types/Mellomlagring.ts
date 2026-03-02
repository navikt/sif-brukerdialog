import { RegistrertBarn, Søker } from '@navikt/sif-common-query';

import { Søknadsdata } from './Søknadsdata';

export interface Mellomlagring {
    søknadsdata: Søknadsdata;
    currentStegId: string | null;
}

export interface MellomlagringMetaData {
    MELLOMLAGRING_VERSJON: string;
    søker: Søker;
    barn: RegistrertBarn[];
}
