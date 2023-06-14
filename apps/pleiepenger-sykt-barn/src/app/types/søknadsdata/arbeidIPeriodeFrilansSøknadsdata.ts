import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { MisterHonorarerFraVervIPerioden } from '../ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeType } from '../arbeidIPeriodeType';

export type ArbeidsukerTimerSøknadsdata = {
    periode: DateRange;
    timer: number;
}[];

interface ArbeidISøknadsperiodeJobberIkkeSøknadsdata {
    gjelderFrilans: true;
    type: ArbeidIPeriodeType.arbeiderIkke;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
}
interface ArbeidISøknadsperiodeJobberVanligSøknadsdata {
    gjelderFrilans: true;
    type: ArbeidIPeriodeType.arbeiderVanlig;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
}
interface ArbeidISøknadsperiodeTimerISnittPerUkeSøknadsdata {
    gjelderFrilans: true;
    type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
    timerISnittPerUke: number;
}

interface ArbeidISøknadsperiodeProsentSøknadsdata {
    gjelderFrilans: true;
    type: ArbeidIPeriodeType.arbeiderProsentAvNormalt;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
    prosentAvNormalt: number;
}

interface ArbeidISøknadsperiodeUlikeUkerTimer {
    gjelderFrilans: true;
    type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
    arbeidsuker: ArbeidsukerTimerSøknadsdata;
}

export type ArbeidIPeriodeFrilansSøknadsdata =
    | ArbeidISøknadsperiodeJobberIkkeSøknadsdata
    | ArbeidISøknadsperiodeJobberVanligSøknadsdata
    | ArbeidISøknadsperiodeTimerISnittPerUkeSøknadsdata
    | ArbeidISøknadsperiodeProsentSøknadsdata
    | ArbeidISøknadsperiodeUlikeUkerTimer;

export const isArbeidIPeriodeFrilansSøknadsdata = (value: any): value is ArbeidIPeriodeFrilansSøknadsdata => {
    return (value as ArbeidIPeriodeFrilansSøknadsdata).gjelderFrilans === true;
};
