import { ISODuration } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeType } from '../arbeidIPeriodeType';
import { ArbeidsukeTimerApiData } from './arbeidIPeriodeApiData';

export interface ArbeidIPeriodeApiDataJobberIkke {
    type: ArbeidIPeriodeType.arbeiderIkke;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
}

export interface ArbeidIPeriodeApiDataJobberSomVanlig {
    type: ArbeidIPeriodeType.arbeiderVanlig;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
}

export interface ArbeidIPeriodeApiDataTimerPerUke {
    type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    timerPerUke: ISODuration;
}

export interface ArbeidIPeriodeApiDataUlikeUkerTimer {
    type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    arbeidsuker: ArbeidsukeTimerApiData[];
}
export interface ArbeidIPeriodeApiDataProsent {
    type: ArbeidIPeriodeType.arbeiderProsentAvNormalt;
    arbeiderIPerioden?: ArbeiderIPeriodenSvar;
    prosentAvNormalt: number;
}
export type ArbeidIPeriodeFrilansApiData =
    | ArbeidIPeriodeApiDataJobberIkke
    | ArbeidIPeriodeApiDataJobberSomVanlig
    | ArbeidIPeriodeApiDataTimerPerUke
    | ArbeidIPeriodeApiDataUlikeUkerTimer
    | ArbeidIPeriodeApiDataProsent;
