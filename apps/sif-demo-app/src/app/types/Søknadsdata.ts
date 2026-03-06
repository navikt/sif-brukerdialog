import { SøknadStepId } from '../config/søknadStepConfig';

export type BarnSøknadsdata = {
    stemmerInfoOmBarn: boolean;
};

export type BostedSøknadsdata = {
    borITrondheim: boolean;
};

export type KontaktSøknadsdata = {
    epost: string;
};

export interface Søknadsdata {
    [SøknadStepId.BARN]?: BarnSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
}
