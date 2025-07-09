import { MellomlagringYtelse } from '@navikt/sif-common-api';
import { SøknadContextState } from '../types/SøknadContextState';
import { createYtelseMellomlagringUtils } from '@navikt/sif-common-query';

export type Mellomlagring = Omit<SøknadContextState, 'søker'>;

export type MellomlagringMetaData = Pick<SøknadContextState, 'søker' | 'registrerteBarn' | 'gyldigeVedtak'> & {
    MELLOMLAGRING_VERSJON: string;
};

export const søknadMellomlagring = createYtelseMellomlagringUtils<Mellomlagring, MellomlagringMetaData>(
    MellomlagringYtelse.OMSORGSPENGER_UTVIDET_RETT,
);
