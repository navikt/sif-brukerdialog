import { YesOrNo } from '@navikt/sif-common-core-ds/lib/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils/lib/types';

export interface StønadGodtgjørelseFormData {
    mottarStønadGodtgjørelse: YesOrNo;
    mottarStønadGodtgjørelseIHelePerioden?: YesOrNo;
    starterUndeveis?: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis?: YesOrNo;
    sluttdato?: ISODate;
}

export enum StønadGodtgjørelseFormField {
    mottarStønadGodtgjørelse = 'stønadGodtgjørelse.mottarStønadGodtgjørelse',
    mottarStønadGodtgjørelseIHelePerioden = 'stønadGodtgjørelse.mottarStønadGodtgjørelseIHelePerioden',
    starterUndeveis = 'stønadGodtgjørelse.starterUndeveis',
    startdato = 'stønadGodtgjørelse.startdato',
    slutterUnderveis = 'stønadGodtgjørelse.slutterUnderveis',
    sluttdato = 'stønadGodtgjørelse.sluttdato',
}
