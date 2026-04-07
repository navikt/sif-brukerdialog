import { BaseSøknadsdata } from '@sif/soknad/types';
import { PersistedVedlegg } from '@sif/soknad-forms';

import { SøknadStepId } from '../setup/config/soknadStepConfig';

export type BarnSøknadsdata = {
    barnetSøknadenGjelder: string;
};

export type BostedSøknadsdata = {
    borITrondheim: boolean;
};

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
