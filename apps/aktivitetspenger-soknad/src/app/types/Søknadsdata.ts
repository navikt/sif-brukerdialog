import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { BaseSøknadsdata } from '@sif/soknad/types';
import { BostedUtland } from '@sif/soknad-forms';

import { SøknadStepId } from '../setup/config/SøknadStepId';

export type KontonummerSøknadsdata = Pick<KontonummerInfo, 'kontonummerErRiktig'>;

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
