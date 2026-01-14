import { Vedlegg } from '@navikt/sif-common-core-ds/src/types/Vedlegg';

import { VedleggType } from '../../søknad/steps/legeerklæring/LegeerklæringForm';

export interface LegeerklæringSøknadsdata {
    vedlegg: Vedlegg[];
    skalEttersendeVedlegg: boolean;
    vedleggSomSkalEttersendes?: VedleggType[]; // Types of attachments to be sent later,
}
