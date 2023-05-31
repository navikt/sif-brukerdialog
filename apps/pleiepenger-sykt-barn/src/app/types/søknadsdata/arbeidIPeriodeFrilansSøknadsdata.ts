import { DateRange } from '@navikt/sif-common-formik-ds/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { MisterHonorarerFraVervIPerioden } from '../ArbeidIPeriodeFormValues';
import { ArbeidIPeriodeType } from '../arbeidIPeriodeType';

export type ArbeidsukerTimerSøknadsdata = {
    periode: DateRange;
    timer: number;
}[];

interface ArbeidISøknadsperiodeJobberIkkeSøknadsdata {
    type: ArbeidIPeriodeType.arbeiderIkke;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
}
interface ArbeidISøknadsperiodeJobberVanligSøknadsdata {
    type: ArbeidIPeriodeType.arbeiderVanlig;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
}
interface ArbeidISøknadsperiodeTimerISnittPerUkeSøknadsdata {
    type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
    timerISnittPerUke: number;
}

interface ArbeidISøknadsperiodeUlikeUkerTimer {
    type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    misterHonorarerFraVervIPerioden?: MisterHonorarerFraVervIPerioden;
    arbeidsuker: ArbeidsukerTimerSøknadsdata;
}

export type ArbeidIPeriodeFrilansSøknadsdata =
    | ArbeidISøknadsperiodeJobberIkkeSøknadsdata
    | ArbeidISøknadsperiodeJobberVanligSøknadsdata
    | ArbeidISøknadsperiodeTimerISnittPerUkeSøknadsdata
    | ArbeidISøknadsperiodeUlikeUkerTimer;
