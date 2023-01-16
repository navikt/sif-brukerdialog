import { decimalDurationToDuration, Duration, durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidstidEndring } from '../types/ArbeidstidAktivitetEndring';
import { ArbeidsukeTimer } from '../types/K9Sak';
import { TimerEllerProsent } from '../types/TimerEllerProsent';

export const beregnEndretArbeidstid = (endring: ArbeidstidEndring, normaltid: Duration): Duration => {
    const tid = durationToDecimalDuration(normaltid);
    const nyTid = endring.type === TimerEllerProsent.PROSENT ? (tid / 100) * endring.prosent : endring.timer;
    return decimalDurationToDuration(nyTid);
};

export const beregnEndretFaktiskArbeidstidPerDag = (
    normalArbeidstidIPeriode: Duration,
    endring: ArbeidstidEndring,
    antallDager: number
): Duration => {
    if (endring.type === TimerEllerProsent.TIMER) {
        return beregnSnittTimerPerDag(decimalDurationToDuration(endring.timer), antallDager);
    }
    const redusertTimerIPeriode = (durationToDecimalDuration(normalArbeidstidIPeriode) / 100) * endring.prosent;
    return beregnSnittTimerPerDag(decimalDurationToDuration(redusertTimerIPeriode), antallDager);
};

export const beregnSnittTimerPerDag = (timerIPeriode: Duration, antallDager: number): Duration => {
    const desimaltidPerDag = avrundDesimaltid(durationToDecimalDuration(timerIPeriode) / antallDager);
    return decimalDurationToDuration(desimaltidPerDag);
};

export const avrundDesimaltid = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const summerTimerPerDag = (timerPerDag: Duration, antallDager: number): Duration => {
    return decimalDurationToDuration(durationToDecimalDuration(timerPerDag) * antallDager);
};

export const getTimerPerDagOgUkeFraDag = (timerPerDag: Duration, antallDager: number): ArbeidsukeTimer => {
    return {
        dag: timerPerDag,
        uke: summerTimerPerDag(timerPerDag, antallDager),
    };
};

export const getTimerPerDagOgUkeFraUke = (timerPerUke: Duration, antallDager: number): ArbeidsukeTimer => {
    return {
        dag: beregnSnittTimerPerDag(timerPerUke, antallDager),
        uke: timerPerUke,
    };
};
