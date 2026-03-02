import { ytelseMellomlagringUtils } from '@navikt/sif-common-query';

import { APP_YTELSE } from '../config/appConfig';
import { Mellomlagring, MellomlagringMetaData } from '../types/Mellomlagring';

export const mellomlagringUtils = ytelseMellomlagringUtils<Mellomlagring, MellomlagringMetaData>(APP_YTELSE);
