import { dateToISODate } from '@navikt/sif-common-utils/lib';
import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import {
    FrilansApiData,
    FrilansApiDataFrilansarbeidOgHonorararbeid,
    FrilansApiDataKunFrilansarbeid,
    FrilansApiDataKunHonorararbeid,
    FrilansarbeidApiData,
    FrilanserPeriodeApiData,
    HonorararbeidApiData,
} from '../../types/søknad-api-data/frilansApiData';
import {
    ArbeidsforholdHonorararbeid,
    FrilanserMisterInntekt,
    FrilanserSøknadsdata,
} from '../../types/søknadsdata/arbeidFrilansSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';
import ArbeidstidHonorararbeid from '../../søknad/arbeidstid-step/components/ArbeidstidHonorararbeid';
import { ArbeidsforholdSøknadsdata } from '../../types/søknadsdata/arbeidsforholdSøknadsdata';
import { ArbeidsforholdApiData } from '../../types/søknad-api-data/arbeidsforholdApiData';

export const getFrilansApiDataFromSøknadsdata = (frilanser: FrilanserSøknadsdata | undefined): FrilansApiData => {
    if (!frilanser) {
        throw 'getFrilansApiDataFromSøknadsdata: frilanser is undefined';
    }
    if (!frilanser.harInntektSomFrilanser) {
        return {
            harInntektSomFrilanser: false,
        };
    }

    /** Kun honorar - mister ikke honorar */
    if (!frilanser.misterInntektSomFrilanserIPeriode) {
        const apiData: FrilansApiDataKunHonorararbeid = {
            harInntektSomFrilanser: true,
            honorararbeid: {
                misterHonorar: false,
            },
        };
        return apiData;
    }

    if (frilanser.misterInntektSomFrilanserIPeriode && frilanser.arbeidsforhold) {
        const { arbeidsforholdHonorararbeid, arbeidsforholdFrilansarbeid, arbeidsforhold } = frilanser;

        /** Kun honorar - mister honorar */
        if (
            arbeidsforholdHonorararbeid &&
            arbeidsforholdHonorararbeid.misterHonorar &&
            arbeidsforholdHonorararbeid.arbeidISøknadsperiode &&
            !arbeidsforholdFrilansarbeid
        ) {
            const apiData: FrilansApiDataKunHonorararbeid = {
                harInntektSomFrilanser: true,
                ...getFrilanserPeriodeApiData(frilanser),
                honorararbeid: getHonorararbeidApiData(arbeidsforholdHonorararbeid),
                arbeidsforhold: getArbeidsforholdApiData(arbeidsforhold),
            };
            return apiData;
        }
        /** Kun frilansarbeid */
        if (
            arbeidsforholdFrilansarbeid &&
            arbeidsforholdFrilansarbeid.arbeidISøknadsperiode &&
            !ArbeidstidHonorararbeid
        ) {
            const apiData: FrilansApiDataKunFrilansarbeid = {
                harInntektSomFrilanser: true,
                ...getFrilanserPeriodeApiData(frilanser),
                frilansarbeid: getFrilansarbeidApiData(arbeidsforholdFrilansarbeid),
                arbeidsforhold: getArbeidsforholdApiData(arbeidsforhold),
            };
            return apiData;
        }
        /** Frilansarbeid og honorararbeid */
        if (
            arbeidsforhold.arbeidISøknadsperiode &&
            arbeidsforholdHonorararbeid &&
            arbeidsforholdHonorararbeid.misterHonorar &&
            arbeidsforholdHonorararbeid.arbeidISøknadsperiode &&
            arbeidsforholdFrilansarbeid &&
            arbeidsforholdFrilansarbeid.arbeidISøknadsperiode
        ) {
            const apiData: FrilansApiDataFrilansarbeidOgHonorararbeid = {
                harInntektSomFrilanser: true,
                ...getFrilanserPeriodeApiData(frilanser),
                honorararbeid: getHonorararbeidApiData(arbeidsforholdHonorararbeid),
                frilansarbeid: getFrilansarbeidApiData(arbeidsforholdFrilansarbeid),
                arbeidsforhold: getArbeidsforholdApiData(arbeidsforhold),
            };
            return apiData;
        }
    }

    throw 'getFrilansApiDataFromSøknadsdata: undefined return';
};

const getArbeidsforholdApiData = (arbeidsforhold: ArbeidsforholdSøknadsdata): ArbeidsforholdApiData => {
    return {
        normalarbeidstid: {
            timerPerUkeISnitt: `${arbeidsforhold.normalarbeidstid.timerPerUkeISnitt}`,
        },
        arbeidIPeriode: arbeidsforhold.arbeidISøknadsperiode
            ? getArbeidIPeriodeApiDataFromSøknadsdata(arbeidsforhold.arbeidISøknadsperiode)
            : undefined,
    };
};

const getFrilanserPeriodeApiData = (frilanser: FrilanserMisterInntekt): FrilanserPeriodeApiData => {
    return {
        erFortsattFrilanser: frilanser.erFortsattFrilanser,
        startdato: dateToISODate(frilanser.startdato),
        sluttdato:
            frilanser.erFortsattFrilanser && frilanser.sluttdato ? dateToISODate(frilanser.sluttdato) : undefined,
    };
};

const getHonorararbeidApiData = (arbeidsforhold: ArbeidsforholdHonorararbeid): HonorararbeidApiData => {
    if (arbeidsforhold.misterHonorar === false) {
        return {
            misterHonorar: false,
        };
    }
    if (arbeidsforhold.arbeidISøknadsperiode === undefined) {
        throw 'getHonorararbeidApiData: arbeidISøknadsperiode er undefined';
    }
    return {
        misterHonorar: true,
        arbeidIPeriodeSvar: getArbeidIPeriodeSvarFraArbeidISøknadsperiode(arbeidsforhold.arbeidISøknadsperiode),
        timerNormalt: `${arbeidsforhold.normalarbeidstid.timerPerUkeISnitt}`,
    };
};
const getFrilansarbeidApiData = (arbeidsforhold: ArbeidsforholdSøknadsdata): FrilansarbeidApiData => {
    if (arbeidsforhold.arbeidISøknadsperiode === undefined) {
        throw 'getHonorararbeidApiData: arbeidISøknadsperiode er undefined';
    }
    return {
        arbeidIPeriodeSvar: getArbeidIPeriodeSvarFraArbeidISøknadsperiode(arbeidsforhold.arbeidISøknadsperiode),
        timerNormalt: `${arbeidsforhold.normalarbeidstid.timerPerUkeISnitt}`,
    };
};

const getArbeidIPeriodeSvarFraArbeidISøknadsperiode = (arbeid: ArbeidIPeriodeSøknadsdata): ArbeiderIPeriodenSvar => {
    switch (arbeid.type) {
        case ArbeidIPeriodeType.arbeiderIkke:
            return ArbeiderIPeriodenSvar.heltFravær;
        case ArbeidIPeriodeType.arbeiderRedusert:
            return ArbeiderIPeriodenSvar.redusert;
        case ArbeidIPeriodeType.arbeiderVanlig:
            return ArbeiderIPeriodenSvar.somVanlig;
    }
};
