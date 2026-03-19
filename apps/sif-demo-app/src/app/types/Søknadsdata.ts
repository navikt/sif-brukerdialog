import { SøknadStepId } from '@app/setup/søknad/søknadStepConfig';
import { BaseSøknadsdata } from '@sif/soknad/types';

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
