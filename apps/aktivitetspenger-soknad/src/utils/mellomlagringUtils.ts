import { MellomlagringYtelse, ytelseMellomlagringUtils } from '@navikt/sif-common-query';

import { Mellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';

export const mellomlagringUtils = ytelseMellomlagringUtils<Mellomlagring, MellomlagringMetaData>(
    MellomlagringYtelse.AKTIVITETSPENGER,
);
