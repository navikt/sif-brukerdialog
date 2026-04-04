import { BaseSøknadsdata } from '@sif/soknad/types';

import { SøknadStepId } from '../setup/config/soknadStepConfig';

export type BarnSøknadsdata = {
    barnetSøknadenGjelder: string;
};

export type BostedSøknadsdata = {
    borITrondheim: boolean;
};

export interface PersistedVedlegg {
    id: string;
    url: string;
    name: string;
    size: number;
    type: string;
    lastModified: number;
}

export type VedleggSøknadsdata = {
    vedlegg: PersistedVedlegg[];
};

export type KontaktSøknadsdata = {
    epost: string;
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.BARN]?: BarnSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
    [SøknadStepId.VEDLEGG]?: VedleggSøknadsdata;
}
