import { DateRange } from '@navikt/sif-common-utils/lib';
import { TimerEllerProsent } from './TimerEllerProsent';

export interface ArbeidstidEndringProsent {
    type: TimerEllerProsent.PROSENT;
    prosent: number;
}

export interface ArbeidstidEndringTimer {
    type: TimerEllerProsent.TIMER;
    timer: number;
}

export type ArbeidstidEndring = ArbeidstidEndringProsent | ArbeidstidEndringTimer;

export interface ArbeidstidAktivitetUkeEndring {
    arbeidAktivitetId: string;
    periode: DateRange;
    endring: ArbeidstidEndring;
}

export type ArbeidstidAktivitetUkeEndringMap = {
    [isoDateRange: string]: ArbeidstidAktivitetUkeEndring;
};
