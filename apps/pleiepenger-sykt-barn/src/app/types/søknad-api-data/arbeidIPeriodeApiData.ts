import { ISODate, ISODuration } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeType } from '../arbeidIPeriodeType';

export type ArbeidsukeTimerApiData = {
    periode: {
        fraOgMed: ISODate;
        tilOgMed: ISODate;
    };
    timer: ISODuration;
};

export interface ArbeidIPeriodeApiDataJobberIkke {
    type: ArbeidIPeriodeType.arbeiderIkke;
    arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær;
}

export interface ArbeidIPeriodeApiDataJobberVanlig {
    type: ArbeidIPeriodeType.arbeiderVanlig;
    arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig;
}

export interface ArbeidIPeriodeApiDataProsent {
    type: ArbeidIPeriodeType.arbeiderProsentAvNormalt;
    arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert;
    prosentAvNormalt: number;
}

export interface ArbeidIPeriodeApiDataTimerPerUke {
    type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke;
    arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert;
    timerPerUke: ISODuration;
}

export interface ArbeidIPeriodeApiDataUlikeUkerTimer {
    type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer;
    arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert;
    arbeidsuker: ArbeidsukeTimerApiData[];
}

export type ArbeidIPeriodeApiData =
    | ArbeidIPeriodeApiDataJobberIkke
    | ArbeidIPeriodeApiDataJobberVanlig
    | ArbeidIPeriodeApiDataProsent
    | ArbeidIPeriodeApiDataTimerPerUke
    | ArbeidIPeriodeApiDataUlikeUkerTimer;
