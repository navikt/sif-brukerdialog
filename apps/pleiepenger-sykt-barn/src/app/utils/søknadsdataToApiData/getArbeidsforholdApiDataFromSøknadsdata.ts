import { dateToISODate, decimalDurationToISODuration } from '@navikt/sif-common-utils';
import { ArbeidIPeriodeFrilansApiData } from '../../types/søknad-api-data/arbeidIPeriodeFrilansApiData';
import { ArbeidIPeriodeFrilansSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeFrilansSøknadsdata';
import { ArbeidIPeriodeType } from '../../types/arbeidIPeriodeType';
import {
    ArbeidIPeriodeApiData,
    ArbeidsforholdApiData,
    ArbeidsukeTimerApiData,
} from '../../types/søknad-api-data/SøknadApiData';
import {
    ArbeidIPeriodeSøknadsdata,
    ArbeidsforholdSøknadsdata,
    ArbeidsukerTimerSøknadsdata,
} from '../../types/søknadsdata/Søknadsdata';
import { getNormalarbeidstidApiDataFromSøknadsdata } from './getNormalarbeidstidApiDataFromSøknadsdata';
import { ArbeidsforholdFrilansApiData } from '../../types/søknad-api-data/arbeidsforholdFrilansApiData';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';

export const getArbeidsukerTimerApiData = (arbeidsuker: ArbeidsukerTimerSøknadsdata): ArbeidsukeTimerApiData[] => {
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
                arbeiderIPerioden: ArbeiderIPeriodenSvar.heltFravær,
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            return {
                type: ArbeidIPeriodeType.arbeiderVanlig,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.somVanlig,
            };

        case ArbeidIPeriodeType.arbeiderProsentAvNormalt:
            return {
                type: ArbeidIPeriodeType.arbeiderProsentAvNormalt,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                prosentAvNormalt: arbeid.prosentAvNormalt,
            };
        case ArbeidIPeriodeType.arbeiderTimerISnittPerUke:
            return {
                type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                timerPerUke: decimalDurationToISODuration(arbeid.timerISnittPerUke),
            };
        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            return {
                type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
                arbeiderIPerioden: ArbeiderIPeriodenSvar.redusert,
                arbeidsuker: getArbeidsukerTimerApiData(arbeid.arbeidsuker),
            };
    }
};

export const getArbeidsforholdApiDataFromSøknadsdata = (
    arbeidsforhold: ArbeidsforholdSøknadsdata
): ArbeidsforholdApiData => {
    const { normalarbeidstid, arbeidISøknadsperiode } = arbeidsforhold;
    return {
        normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(normalarbeidstid),
        arbeidIPeriode: arbeidISøknadsperiode
            ? getArbeidIPeriodeApiDataFromSøknadsdata(arbeidISøknadsperiode as ArbeidIPeriodeSøknadsdata)
            : undefined,
    };
};

export const getArbeidIPeriodeFrilansApiDataFromSøknadsdata = (
    arbeid: ArbeidIPeriodeFrilansSøknadsdata
): ArbeidIPeriodeFrilansApiData => {
    switch (arbeid.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            return {
                type: ArbeidIPeriodeType.arbeiderIkke,
                arbeiderIPerioden: arbeid.arbeiderIPerioden,
            };
        case ArbeidIPeriodeType.arbeiderVanlig:
            return {
                type: ArbeidIPeriodeType.arbeiderVanlig,
                arbeiderIPerioden: arbeid.arbeiderIPerioden,
            };

        case ArbeidIPeriodeType.arbeiderTimerISnittPerUke:
            return {
                type: ArbeidIPeriodeType.arbeiderTimerISnittPerUke,
                arbeiderIPerioden: arbeid.arbeiderIPerioden,
                timerPerUke: decimalDurationToISODuration(arbeid.timerISnittPerUke),
            };
        case ArbeidIPeriodeType.arbeiderUlikeUkerTimer:
            return {
                type: ArbeidIPeriodeType.arbeiderUlikeUkerTimer,
                arbeiderIPerioden: arbeid.arbeiderIPerioden,
                arbeidsuker: getArbeidsukerTimerApiData(arbeid.arbeidsuker),
            };
        case ArbeidIPeriodeType.arbeiderProsentAvNormalt:
            return {
                type: ArbeidIPeriodeType.arbeiderProsentAvNormalt,
                arbeiderIPerioden: arbeid.arbeiderIPerioden,
                prosentAvNormalt: arbeid.prosentAvNormalt,
            };
    }
};

export const getArbeidsforholdFrilansApiDataFromSøknadsdata = (
    arbeidsforhold: ArbeidsforholdSøknadsdata
): ArbeidsforholdFrilansApiData => {
    const { normalarbeidstid, arbeidISøknadsperiode } = arbeidsforhold;
    return {
        normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(normalarbeidstid),
        arbeidIPeriode: arbeidISøknadsperiode
            ? getArbeidIPeriodeFrilansApiDataFromSøknadsdata(arbeidISøknadsperiode as ArbeidIPeriodeFrilansSøknadsdata)
            : undefined,
    };
};
