import { KontonummerInfo } from '@navikt/k9-brukerdialog-prosessering-api';
import { ArbeidUtland } from '@sif/soknad-forms';

import { SøknadStepId } from './SoknadStepId';

export type KontonummerSøknadsdata = Pick<KontonummerInfo, 'kontonummerErRiktig'>;

export type BostedSøknadsdata = {
    erBosattITrondheim: boolean;
};

export type MedlemskapSøknadsdata = {
    harBoddINorge: boolean;
    harJobbetINorge?: boolean;
    harJobbetUtenforNorge?: boolean;
    bostederUtenforNorge?: ArbeidUtland[];
    arbeidsstederUtenforNorge?: ArbeidUtland[];
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
    [SøknadStepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [SøknadStepId.BARN]?: BarnSøknadsdata;
}
