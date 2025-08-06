import { MellomlagringYtelse, ytelseMellomlagringUtils } from '@navikt/sif-common-query';
import { SøknadContextState } from '../types/SøknadContextState';

export type Mellomlagring = Omit<SøknadContextState, 'søker'>;

export type MellomlagringMetaData = Pick<SøknadContextState, 'søker' | 'registrerteBarn'> & {
    MELLOMLAGRING_VERSJON: string;
};

export const søknadMellomlagring = ytelseMellomlagringUtils<Mellomlagring, MellomlagringMetaData>(
    MellomlagringYtelse.OMSORGSPENGER_UTVIDET_RETT,
);
