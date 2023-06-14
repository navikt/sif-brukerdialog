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

/**
 * Denne typen er ikke optimal i og med vi slår sammen
 * de som mottar og honorar som én verdi. Så kombinasjonen
 * av det som ligger i ArbeidIPeriodeFrilansApiData må sees på i sammenheng med honorar-
 * feltene i FrilansApiData.
 *
 * Dette bør skrives om på et tidspunkt, men vil kreve endringer både i backend og frontend.
 */

export type ArbeidIPeriodeFrilansApiData =
    | ArbeidIPeriodeApiDataJobberIkke
    | ArbeidIPeriodeApiDataJobberSomVanlig
    | ArbeidIPeriodeApiDataTimerPerUke
    | ArbeidIPeriodeApiDataUlikeUkerTimer
    | ArbeidIPeriodeApiDataProsent;
