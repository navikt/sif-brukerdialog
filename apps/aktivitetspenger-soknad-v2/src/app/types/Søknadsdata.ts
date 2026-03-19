import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { BaseSøknadsdata } from '@sif/soknad/types';

export type KontonummerSøknadsdata = {
    kontonummerStemmer: boolean;
};

export type BostedSøknadsdata = {
    borITrondheim: boolean;
};

export type MedlemskapSøknadsdata = {
    harBoddIUtlandetSiste5år: boolean;
};

export type BarnSøknadsdata = {
    harBarn: boolean;
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.KONTONUMMER]?: KontonummerSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
    [SøknadStepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [SøknadStepId.BARN]?: BarnSøknadsdata;
}
