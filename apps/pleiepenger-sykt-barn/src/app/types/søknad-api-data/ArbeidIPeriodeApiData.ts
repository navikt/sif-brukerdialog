import { ISODate, ISODuration } from '@navikt/sif-common-utils';
import { ArbeidIPeriodeType } from '../ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../RedusertArbeidstidType';

export type ArbeidsukeTimerApiData = {
    periode: {
        fraOgMed: ISODate;
        tilOgMed: ISODate;
    };
    timer: ISODuration;
};

interface ArbeiderRedusertBase {
    type: RedusertArbeidstidType;
}
interface ArbeiderRedusertProsentAvNormalt extends ArbeiderRedusertBase {
    type: RedusertArbeidstidType.prosentAvNormalt;
    prosentAvNormalt: number;
}
interface ArbeiderRedusertTimerISnittPerUke extends ArbeiderRedusertBase {
    type: RedusertArbeidstidType.timerISnittPerUke;
    timerPerUke: ISODuration;
}

interface ArbeiderReduserUlikeUkerTimer extends ArbeiderRedusertBase {
    type: RedusertArbeidstidType.ulikeUkerTimer;
    arbeidsuker: ArbeidsukeTimerApiData[];
}

export type ArbeidRedusertIPeriodeApiData =
    | ArbeiderRedusertTimerISnittPerUke
    | ArbeiderRedusertProsentAvNormalt
    | ArbeiderReduserUlikeUkerTimer;

export interface ArbeidIPeriodeApiDataIkkeBesvart {
    type: ArbeidIPeriodeType.ikkeBesvart;
}
export interface ArbeidIPeriodeApiDataJobberIkke {
    type: ArbeidIPeriodeType.arbeiderIkke;
}

export interface ArbeidIPeriodeApiDataJobberIkke {
    type: ArbeidIPeriodeType.arbeiderIkke;
}

export interface ArbeidIPeriodeApiDataJobberVanlig {
    type: ArbeidIPeriodeType.arbeiderVanlig;
}

export interface ArbeidIPeriodeApiDataRedusert {
    type: ArbeidIPeriodeType.arbeiderRedusert;
    redusertArbeid: ArbeidRedusertIPeriodeApiData;
}

export type ArbeidIPeriodeApiData =
    | ArbeidIPeriodeApiDataIkkeBesvart
    | ArbeidIPeriodeApiDataJobberIkke
    | ArbeidIPeriodeApiDataJobberVanlig
    | ArbeidIPeriodeApiDataRedusert;
