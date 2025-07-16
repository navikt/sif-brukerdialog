// import { MellomlagringYtelse } from '@navikt/sif-common-api';
import { MellomlagringYtelse } from '@navikt/sif-common-query/src/types/_MellomlagringYtelse';
import { SøknadContextState } from '../types/SøknadContextState';
import { ytelseMellomlagringUtils } from '@navikt/sif-common-query';

export type Mellomlagring = Omit<SøknadContextState, 'søker'>;

export type MellomlagringMetaData = Pick<SøknadContextState, 'søker' | 'registrerteBarn'> & {
    MELLOMLAGRING_VERSJON: string;
};

export const stateMellomlagring = ytelseMellomlagringUtils<Mellomlagring, MellomlagringMetaData>(
    MellomlagringYtelse.OMSORGSPENGER_UTVIDET_RETT,
);
