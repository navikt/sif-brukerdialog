import { DurationWeekdays } from '@navikt/sif-common-utils';
import { ArbeiderIPeriodenSvar } from '../../types';

interface ArbeidstidPeriodeDataBase {
    fom: Date;
    tom: Date;
}

interface ArbeidstidPeriodeHeltFravær extends ArbeidstidPeriodeDataBase {
    arbeiderHvordan: ArbeiderIPeriodenSvar.heltFravær;
}
interface ArbeidstidPeriodeRedusert extends ArbeidstidPeriodeDataBase {
    arbeiderHvordan: ArbeiderIPeriodenSvar.redusert;
    tidFasteDager: DurationWeekdays;
}
interface ArbeidstidPeriodeSomVanlig extends ArbeidstidPeriodeDataBase {
    arbeiderHvordan: ArbeiderIPeriodenSvar.somVanlig;
}

export type ArbeidstidPeriodeData =
    | ArbeidstidPeriodeHeltFravær
    | ArbeidstidPeriodeRedusert
    | ArbeidstidPeriodeSomVanlig;
