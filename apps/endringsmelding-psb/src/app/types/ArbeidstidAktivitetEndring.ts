import { DateRange } from '@navikt/sif-common-utils/lib';
import { TimerEllerProsent } from '../søknad/steps/arbeidstid/arbeid-i-periode-form/ArbeidIPeriodeFormValues';

export interface ArbeidstidEndringProsent {
    type: TimerEllerProsent.PROSENT;
    prosent: number;
}

export interface ArbeidstidEndringTimer {
    type: TimerEllerProsent.TIMER;
    timer: number;
}

type ArbeidstidEndring = ArbeidstidEndringProsent | ArbeidstidEndringTimer;

export interface ArbeidstidAktivitetEndring {
    arbeidAktivitetId: string;
    gjelderEnkeltuke: boolean;
    periode: DateRange;
    endring: ArbeidstidEndring;
}

export type ArbeidstidAktivitetEndringPeriodeMap = {
    [isoDateRange: string]: ArbeidstidAktivitetEndring;
};
