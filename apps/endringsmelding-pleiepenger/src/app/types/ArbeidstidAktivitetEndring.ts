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

export interface ArbeidstidAktivitetEndring {
    arbeidAktivitetId: string;
    perioder: DateRange[];
    endring: ArbeidstidEndring;
}

export type ArbeidstidAktivitetEndringMap = {
    [isoDateRange: string]: ArbeidstidAktivitetEndring;
};
