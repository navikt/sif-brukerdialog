import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';

export enum FosterhjemsgodtgjørelseFormField {
    mottarFosterhjemsgodtgjørelse = 'fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse',
    erFrikjøptFraJobb = 'fosterhjemsgodtgjørelse.erFrikjøptFraJobb',
    frikjøptTimer = 'fosterhjemsgodtgjørelse.frikjøptTimer',
    frikjøptProsent = 'fosterhjemsgodtgjørelse.frikjøptProsent',
    mottarFosterhjemsgodtgjørelseIHelePerioden = 'fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelseIHelePerioden',
    starterUndeveis = 'fosterhjemsgodtgjørelse.starterUndeveis',
    startdato = 'fosterhjemsgodtgjørelse.startdato',
    slutterUnderveis = 'fosterhjemsgodtgjørelse.slutterUnderveis',
    sluttdato = 'fosterhjemsgodtgjørelse.sluttdato',
}

export interface FosterhjemsgodtgjørelseFormValues {
    mottarFosterhjemsgodtgjørelse: YesOrNo;
    erFrikjøptFraJobb?: YesOrNo;
    frikjøptTimer?: number;
    frikjøptProsent?: number;
    mottarFosterhjemsgodtgjørelseIHelePerioden?: YesOrNo;
    starterUndeveis?: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis?: YesOrNo;
    sluttdato?: ISODate;
}
