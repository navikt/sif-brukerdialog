import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export enum StønadGodtgjørelseFormField {
    mottarOmsorgsstønad = 'omsorgsstønad.mottarOmsorgsstønad',
    mottarStønadGodtgjørelseIHelePerioden = 'omsorgsstønad.mottarStønadGodtgjørelseIHelePerioden',
    starterUndeveis = 'omsorgsstønad.starterUndeveis',
    startdato = 'omsorgsstønad.startdato',
    slutterUnderveis = 'omsorgsstønad.slutterUnderveis',
    sluttdato = 'omsorgsstønad.sluttdato',
}

export interface StønadGodtgjørelseFormValues {
    mottarOmsorgsstønad: YesOrNo;
    mottarStønadGodtgjørelseIHelePerioden?: YesOrNo;
    starterUndeveis?: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis?: YesOrNo;
    sluttdato?: ISODate;
}
