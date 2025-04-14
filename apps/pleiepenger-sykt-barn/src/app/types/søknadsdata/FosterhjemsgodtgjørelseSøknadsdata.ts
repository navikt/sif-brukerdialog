import { YesOrNo } from '@navikt/sif-common-core-ds/src/types/YesOrNo';
import { ISODate } from '@navikt/sif-common-utils';
import { TimerEllerProsent } from '../TimerEllerProsent';

export interface MottarIkkeFosterhjemsgodtgjørelse {
    type: 'mottarIkke';
    mottarFosterhjemsgodtgjørelse: YesOrNo.NO;
}

export interface FosterhjemsgodtgjørelseIkkeFrikjøpt {
    type: 'mottarMenIkkeFrikjøpt';
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.NO;
}

export interface MottarFosterhjemsgodtgjørelseIHelePeroden {
    type: 'mottarIHelePeroden';
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.YES;
    frikjøptArbeidsgiverNavn: string[];
    frikjøptTimerEllerProsent: TimerEllerProsent;
    frikjøptTimer?: number;
    frikjøptProsent?: number;
    mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.YES;
}

export interface MottarFosterhjemsgodtgjørelseIDelerAvPeroden {
    type: 'mottarIDelerAvPeroden';
    mottarFosterhjemsgodtgjørelse: YesOrNo.YES;
    erFrikjøptFraJobb: YesOrNo.YES;
    frikjøptArbeidsgiverNavn: string[];
    frikjøptTimerEllerProsent: TimerEllerProsent;
    frikjøptTimer?: number;
    frikjøptProsent?: number;
    mottarFosterhjemsgodtgjørelseIHelePerioden: YesOrNo.NO;
    starterUndeveis: YesOrNo;
    startdato?: ISODate;
    slutterUnderveis: YesOrNo;
    sluttdato?: ISODate;
}

export type FosterhjemsgodtgjørelseSøknadsdata =
    | MottarFosterhjemsgodtgjørelseIHelePeroden
    | FosterhjemsgodtgjørelseIkkeFrikjøpt
    | MottarIkkeFosterhjemsgodtgjørelse
    | MottarFosterhjemsgodtgjørelseIDelerAvPeroden;
