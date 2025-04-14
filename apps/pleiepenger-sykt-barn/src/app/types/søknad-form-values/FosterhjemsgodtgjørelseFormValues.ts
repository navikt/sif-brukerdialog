import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';
import { TimerEllerProsent } from '../TimerEllerProsent';

export enum FosterhjemsgodtgjørelseFormField {
    mottarFosterhjemsgodtgjørelse = 'fosterhjemsgodtgjørelse.mottarFosterhjemsgodtgjørelse',
    erFrikjøptFraJobb = 'fosterhjemsgodtgjørelse.erFrikjøptFraJobb',
    frikjøptArbeidsgiverNavn = 'fosterhjemsgodtgjørelse.frikjøptArbeidsgiverNavn',
    frikjøptTimerEllerProsent = 'fosterhjemsgodtgjørelse.frikjøptTimerEllerProsent',
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
    frikjøptArbeidsgiverNavn?: string[];
    frikjøptTimerEllerProsent?: TimerEllerProsent;
    frikjøptTimer?: string;
    frikjøptProsent?: string;
    mottarFosterhjemsgodtgjørelseIHelePerioden?: YesOrNo;
    starterUndeveis?: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis?: YesOrNo;
    sluttdato?: ISODate;
}
