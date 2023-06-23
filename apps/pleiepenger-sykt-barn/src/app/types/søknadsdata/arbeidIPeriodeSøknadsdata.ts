import { DateRange } from '@navikt/sif-common-utils/lib';
import { ArbeidIPeriodeType } from '../ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../RedusertArbeidstidType';

export type ArbeidsukeTimerSøknadsdata = {
    periode: DateRange;
    timer: number;
};

export type ArbeidsukerTimerSøknadsdata = ArbeidsukeTimerSøknadsdata[];

interface ArbeiderRedusertBase {
    type: RedusertArbeidstidType;
}
interface ArbeiderRedusertProsentAvNormalt extends ArbeiderRedusertBase {
    type: RedusertArbeidstidType.prosentAvNormalt;
    prosentAvNormalt: number;
}
interface ArbeiderRedusertTimerISnittPerUke extends ArbeiderRedusertBase {
    type: RedusertArbeidstidType.timerISnittPerUke;
    timerPerUke: Duration;
}

interface ArbeiderReduserUlikeUkerTimer extends ArbeiderRedusertBase {
    type: RedusertArbeidstidType.ulikeUkerTimer;
    arbeidsuker: ArbeidsukeTimerSøknadsdata[];
}

type ArbeidIPeriodeRedusertSøknadsdata =
    | ArbeiderRedusertTimerISnittPerUke
    | ArbeiderRedusertProsentAvNormalt
    | ArbeiderReduserUlikeUkerTimer;

export interface ArbeidIPeriodeSøknadsdataJobberIkke {
    type: ArbeidIPeriodeType.arbeiderIkke;
}

export interface ArbeidIPeriodeSøknadsdataJobberVanlig {
    type: ArbeidIPeriodeType.arbeiderVanlig;
}

export interface ArbeidIPeriodeSøknadsdataRedusert {
    type: ArbeidIPeriodeType.arbeiderRedusert;
    redusertArbeid: ArbeidIPeriodeRedusertSøknadsdata;
}

export type ArbeidIPeriodeSøknadsdata =
    | ArbeidIPeriodeSøknadsdataJobberIkke
    | ArbeidIPeriodeSøknadsdataJobberVanlig
    | ArbeidIPeriodeSøknadsdataRedusert;
