import { dateToISODate, decimalDurationToISODuration } from '@navikt/sif-common-utils';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../types/RedusertArbeidstidType';
import {
    ArbeidIPeriodeApiData,
    ArbeidRedusertIPeriodeApiData,
    ArbeidsukeTimerApiData,
} from '../../types/søknad-api-data/SøknadApiData';
import {
    ArbeidIPeriodeRedusertArbeidSøknadsdata,
    ArbeidIPeriodeSøknadsdata,
    ArbeidsukeTimerSøknadsdata,
} from '../../types/søknadsdata/Søknadsdata';

export const getArbeidsukerTimerApiData = (arbeidsuker: ArbeidsukeTimerSøknadsdata[]): ArbeidsukeTimerApiData[] => {
    return arbeidsuker.map(({ periode: { from, to }, timer }) => {
        return <ArbeidsukeTimerApiData>{
            periode: {
                fraOgMed: dateToISODate(from),
                tilOgMed: dateToISODate(to),
            },
            timer: decimalDurationToISODuration(timer),
        };
    });
};

export const getArbeidIPeriodeApiDataFromSøknadsdata = (arbeid: ArbeidIPeriodeSøknadsdata): ArbeidIPeriodeApiData => {
    switch (arbeid.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            return {
                type: ArbeidIPeriodeType.arbeiderIkke,
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            return {
                type: ArbeidIPeriodeType.arbeiderVanlig,
            };

        case ArbeidIPeriodeType.arbeiderRedusert:
            return {
                type: ArbeidIPeriodeType.arbeiderRedusert,
                redusertArbeid: getRedusertArbeidApiData(arbeid.redusertArbeid),
            };
        case ArbeidIPeriodeType.ikkeBesvart:
            return {
                type: ArbeidIPeriodeType.ikkeBesvart,
            };
    }
};

export const getRedusertArbeidApiData = (
    arbeid: ArbeidIPeriodeRedusertArbeidSøknadsdata,
): ArbeidRedusertIPeriodeApiData => {
    switch (arbeid.type) {
        case RedusertArbeidstidType.prosentAvNormalt:
            return {
                type: RedusertArbeidstidType.prosentAvNormalt,
                prosentAvNormalt: arbeid.prosentAvNormalt,
            };
        case RedusertArbeidstidType.timerISnittPerUke:
            return {
                type: RedusertArbeidstidType.timerISnittPerUke,
                timerPerUke: decimalDurationToISODuration(arbeid.timerISnittPerUke),
            };
        case RedusertArbeidstidType.ulikeUkerTimer:
            return {
                type: RedusertArbeidstidType.ulikeUkerTimer,
                arbeidsuker: getArbeidsukerTimerApiData(arbeid.arbeidsuker),
            };
    }
};
