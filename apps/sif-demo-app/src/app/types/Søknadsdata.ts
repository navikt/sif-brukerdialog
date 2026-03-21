import { BaseSøknadsdata } from '@sif/soknad/types';

import { SøknadStepId } from '../setup/config/søknadStepConfig';

export type BarnSøknadsdata = {
    stemmerInfoOmBarn: boolean;
};

export type BostedSøknadsdata = {
    borITrondheim: boolean;
};

export type KontaktSøknadsdata = {
    epost: string;
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.BARN]?: BarnSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
}
