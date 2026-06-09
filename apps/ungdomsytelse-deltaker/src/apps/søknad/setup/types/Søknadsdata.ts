import { YesOrNo } from '@sif/rhf';
import { BaseSøknadsdata } from '@sif/soknad/types';

import { SøknadStepId } from '../config/SøknadStepId';

export type KontonummerSøknadsdata = {
    kontonummerErRiktig: YesOrNo | undefined;
};

export type BarnSøknadsdata = {
    barnStemmer: YesOrNo;
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.KONTONUMMER]?: KontonummerSøknadsdata;
    [SøknadStepId.BARN]?: BarnSøknadsdata;
}
