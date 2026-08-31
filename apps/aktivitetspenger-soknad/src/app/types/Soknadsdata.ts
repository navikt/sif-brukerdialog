import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { BostedUtland } from '@sif/soknad-forms';

import { SøknadStepId } from './SoknadStepId';

export type KontonummerSøknadsdata = Pick<KontonummerInfo, 'kontonummerErRiktig'>;

export type BostedSøknadsdata = {
    erBosattITrondheim: boolean;
};

export type BostedUtlandSøknadsdata = {
    harBoddINorge: boolean;
    bosteder: BostedUtland[] | undefined;
};

export type BarnSøknadsdata = {
    informasjonStemmer: boolean;
};

/**
 * Strukturert data for hvert steg som settes når bruker
 * fyller ut og submitter et gyldig steg i søknaden.
 */
export interface Søknadsdata {
    harForståttRettigheterOgPlikter?: boolean;
    [SøknadStepId.KONTONUMMER]?: KontonummerSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
    [SøknadStepId.BOSTED_UTLAND]?: BostedUtlandSøknadsdata;
    [SøknadStepId.BARN]?: BarnSøknadsdata;
}
