import { decimalDurationToDuration, Duration, durationToDecimalDuration } from '@navikt/sif-common-utils';
import { ArbeidstidEndring, TimerEllerProsent } from '@types';

export const beregnEndretArbeidstidForUke = (
    endring: ArbeidstidEndring,
    normaltidPerUke: Duration,
    antallDagerSøktFor: number,
): Duration => {
    return getTimerPerUkeFraTimerPerDag(
        beregnEndretFaktiskArbeidstidPerDag(normaltidPerUke, endring, antallDagerSøktFor),
        antallDagerSøktFor,
    );
};

export const beregnEndretFaktiskArbeidstidPerDag = (
    normalArbeidstidIPeriode: Duration,
    endring: ArbeidstidEndring,
    antallDager: number,
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

export const getTimerPerUkeFraTimerPerDag = (tidPerDag: Duration, antallDagerSøktFor: number): Duration => {
    return summerTimerPerDag(tidPerDag, antallDagerSøktFor);
};

/**
 * Kontrollerer at antall timer ikke er mer en mulig innenfor antall dager
 * @param duration
 * @param antallDager
 * @returns
 */
export const erTimerGyldigInnenforAntallDager = (duration: Duration, antallDager: number): boolean => {
    return durationToDecimalDuration(duration) <= antallDager * 24;
};
