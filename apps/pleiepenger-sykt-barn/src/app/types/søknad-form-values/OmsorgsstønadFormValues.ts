import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export enum OmsorgsstønadFormField {
    mottarOmsorgsstønad = 'omsorgsstønad.mottarOmsorgsstønad',
    mottarOmsorgsstønadIHelePerioden = 'omsorgsstønad.mottarOmsorgsstønadIHelePerioden',
    starterUndeveis = 'omsorgsstønad.starterUndeveis',
    startdato = 'omsorgsstønad.startdato',
    slutterUnderveis = 'omsorgsstønad.slutterUnderveis',
    sluttdato = 'omsorgsstønad.sluttdato',
    timer = 'omsorgsstønad.timer',
}

export interface OmsorgsstønadFormValues {
    mottarOmsorgsstønad: YesOrNo;
    mottarOmsorgsstønadIHelePerioden?: YesOrNo;
    starterUndeveis?: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis?: YesOrNo;
    sluttdato?: ISODate;
    timer?: string;
}
