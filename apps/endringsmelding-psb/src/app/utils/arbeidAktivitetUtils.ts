import { decimalDurationToDuration, Duration, durationToDecimalDuration } from '@navikt/sif-common-utils/lib';
import { ArbeidstidEndring } from '../types/ArbeidstidAktivitetEndring';
import { ArbeidAktivitet, ArbeidAktivitetType } from '../types/Sak';
import { TimerEllerProsent } from '../types/TimerEllerProsent';

export const getArbeidAktivitetNavn = (arbeidAktivitet: ArbeidAktivitet): string => {
    switch (arbeidAktivitet.type) {
        case ArbeidAktivitetType.arbeidstaker:
            return arbeidAktivitet.arbeidsgiver.navn;
        case ArbeidAktivitetType.frilanser:
            return 'Frilanser';
        case ArbeidAktivitetType.selvstendigNæringsdrivende:
            return 'Selvstendig næringsdrivende';
    }
};

export const beregnEndretArbeidstidEnkeltdag = (endring: ArbeidstidEndring, normaltid: Duration): Duration => {
    const tid = durationToDecimalDuration(normaltid);
    const nyTid = endring.type === TimerEllerProsent.PROSENT ? (tid / 100) * endring.prosent : endring.timer;
    return decimalDurationToDuration(nyTid);
};
