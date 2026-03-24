import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { BaseSøknadsdata } from '@sif/soknad/types';
import { BostedUtland } from '@sif/soknad-forms';

import { SøknadStepId } from '../setup/config/SoknadStepId';

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

/**
 * Strukturert data for hvert steg som settes når bruker
 * fyller ut og submitter et gyldig steg i søknaden.
 */
export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.KONTONUMMER]?: KontonummerSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
    [SøknadStepId.BOSTED_UTLAND]?: BostedUtlandSøknadsdata;
    [SøknadStepId.BARN]?: BarnSøknadsdata;
}
