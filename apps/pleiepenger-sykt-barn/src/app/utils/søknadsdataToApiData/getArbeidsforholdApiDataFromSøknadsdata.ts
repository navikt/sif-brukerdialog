import { dateToISODate, decimalDurationToISODuration } from '@navikt/sif-common-utils';
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
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import { RedusertArbeidstidType } from '../../types/RedusertArbeidstidType';

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
    }
};

export const getRedusertArbeidApiData = (
    arbeid: ArbeidIPeriodeRedusertArbeidSøknadsdata
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
                timerPerUke: `${arbeid.timerISnittPerUke}`,
            };
        case RedusertArbeidstidType.ulikeUkerTimer:
            return {
                type: RedusertArbeidstidType.ulikeUkerTimer,
                arbeidsuker: getArbeidsukerTimerApiData(arbeid.arbeidsuker),
            };
    }
};

// export const getArbeidsforholdApiDataFromSøknadsdata = (
//     arbeidsforhold: ArbeidsforholdSøknadsdata
// ): ArbeidsforholdApiData => {
//     const { normalarbeidstid, arbeidISøknadsperiode } = arbeidsforhold;
//     return {
//         normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(normalarbeidstid),
//         arbeidIPeriode: arbeidISøknadsperiode
//             ? getArbeidIPeriodeApiDataFromSøknadsdata(arbeidISøknadsperiode as ArbeidIPeriodeSøknadsdata)
//             : undefined,
//     };
// };

// export const getArbeidsforholdFrilansApiDataFromSøknadsdata = (
//     arbeidsforhold: ArbeidsforholdSøknadsdata
// ): ArbeidsforholdFrilansApiData => {
//     const { normalarbeidstid, arbeidISøknadsperiode } = arbeidsforhold;
//     return {
//         normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(normalarbeidstid),
//         arbeidIPeriode: arbeidISøknadsperiode
//             ? getArbeidIPeriodeApiDataFromSøknadsdata(arbeidISøknadsperiode)
//             : undefined,
//     };
// };
