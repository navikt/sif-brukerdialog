// import { MellomlagringYtelse } from '@navikt/sif-common-api';
import { MellomlagringYtelse, ytelseMellomlagringUtils } from '@navikt/sif-common-query';
import { SøknadContextState } from '../types/SøknadContextState';

export type Mellomlagring = Omit<SøknadContextState, 'søker'>;

export type MellomlagringMetaData = Pick<SøknadContextState, 'søker' | 'registrerteBarn'> & {
    MELLOMLAGRING_VERSJON: string;
};

export const stateMellomlagring = ytelseMellomlagringUtils<Mellomlagring, MellomlagringMetaData>(
    MellomlagringYtelse.OMSORGSPENGER_UTVIDET_RETT,
);
