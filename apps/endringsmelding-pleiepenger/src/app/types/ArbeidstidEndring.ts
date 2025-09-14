import { ISODateRange } from '@navikt/sif-common-utils';

import { TimerEllerProsent } from './TimerEllerProsent';

interface ArbeidstidEndringProsent {
    type: TimerEllerProsent.PROSENT;
    prosent: number;
}

interface ArbeidstidEndringTimer {
    type: TimerEllerProsent.TIMER;
    timer: number;
}

export type ArbeidstidEndring = ArbeidstidEndringProsent | ArbeidstidEndringTimer;

export type ArbeidstidEndringMap = {
    [uke: ISODateRange]: ArbeidstidEndring;
};
