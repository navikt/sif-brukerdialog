import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { BaseSøknadsdata } from '@sif/soknad/types';

import { BostedUtland } from '../../dialog-forms/bosted-utland';

export type KontonummerSøknadsdata = {
    kontonummerStemmer: boolean;
};

export type BostedSøknadsdata = {
    borITrondheim: boolean;
};

export type BostedUtlandSøknadsdata = {
    harBoddIUtlandetSiste5år: boolean;
    bosteder: BostedUtland[] | undefined;
};

export type BarnSøknadsdata = {
    informasjonStemmer: boolean;
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.KONTONUMMER]?: KontonummerSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
    [SøknadStepId.BOSTED_UTLAND]?: BostedUtlandSøknadsdata;
    [SøknadStepId.BARN]?: BarnSøknadsdata;
}
