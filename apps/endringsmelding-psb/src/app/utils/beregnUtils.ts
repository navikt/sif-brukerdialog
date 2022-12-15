import { decimalDurationToDuration, Duration, durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidstidEndring } from '../types/ArbeidstidAktivitetEndring';
import { TimerEllerProsent } from '../types/TimerEllerProsent';

export const beregnEndretArbeidstid = (endring: ArbeidstidEndring, normaltid: Duration): Duration => {
    const tid = durationToDecimalDuration(normaltid);
    const nyTid = endring.type === TimerEllerProsent.PROSENT ? (tid / 100) * endring.prosent : endring.timer;
    return decimalDurationToDuration(nyTid);
};
