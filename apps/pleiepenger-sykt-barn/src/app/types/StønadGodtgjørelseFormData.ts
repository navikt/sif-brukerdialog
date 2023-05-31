import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils/lib/types';

export interface StønadGodtgjørelseFormData {
    mottarStønadGodtgjørelse: YesOrNo;
    mottarStønadGodtgjørelseIHelePeroden?: YesOrNo;
    starterUndeveis?: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis?: YesOrNo;
    sluttdato?: ISODate;
}

export enum StønadGodtgjørelseFormField {
    mottarStønadGodtgjørelse = 'stønadGodtgjørelse.mottarStønadGodtgjørelse',
    mottarStønadGodtgjørelseIHelePeroden = 'stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePeroden',
    starterUndeveis = 'stønadGodtgjørelse.starterUndeveis',
    startdato = 'stønadGodtgjørelse.startdato',
    slutterUnderveis = 'stønadGodtgjørelse.slutterUnderveis',
    sluttdato = 'stønadGodtgjørelse.sluttdato',
}
