import { SøknadStepId } from '@app/setup/config/søknadStepConfig';
import { BaseSøknadsdata } from '@sif/soknad/types';

export type KontonummerSøknadsdata = {
    harKontonummer: boolean;
};

export type BostedSøknadsdata = {
    borINorge: boolean;
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
