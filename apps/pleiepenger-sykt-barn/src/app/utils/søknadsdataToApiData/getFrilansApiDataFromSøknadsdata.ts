import { dateToISODate, decimalDurationToISODuration } from '@navikt/sif-common-utils/lib';
import {
    FrilansApiData,
    FrilansApiType,
    FrilanserMedArbeidsforholdApiDataPart,
} from '../../types/søknad-api-data/_FrilansApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/_ArbeidIPeriodeSøknadsdata';
import { ArbeidssituasjonFrilansSøknadsdata } from '../../types/søknadsdata/_ArbeidssituasjonFrilansSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';
import { ArbeidsforholdApiData } from '../../types/søknad-api-data/_ArbeidsforholdApiData';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/_NormalarbeidstidSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = ({
    arbeidssituasjon,
    arbeidstidFrilansarbeid,
    arbeidstidHonorararbeid,
}: {
    arbeidssituasjon: ArbeidssituasjonFrilansSøknadsdata | undefined;
    arbeidstidFrilansarbeid: ArbeidIPeriodeSøknadsdata | undefined;
    arbeidstidHonorararbeid: ArbeidIPeriodeSøknadsdata | undefined;
}): FrilansApiData => {
    if (!arbeidssituasjon) {
        throw 'getFrilansApiDataFromSøknadsdata: arbeidssituasjon is undefined';
    }

    if (arbeidssituasjon.harInntektSomFrilanser === false) {
        return {
            type: FrilansApiType.INGEN_INNTEKT_FROM_FRILANSER,
            harInntektSomFrilanser: false,
        };
    }
    const { misterInntektSomFrilanser, honorararbeid } = arbeidssituasjon;

    /** Kun honorar - mister ikke honorar */
    if (misterInntektSomFrilanser === false && honorararbeid && honorararbeid.misterHonorar === false) {
        return {
            type: FrilansApiType.KUN_HONORARARBEID_MISTER_IKKE_HONORAR,
            harInntektSomFrilanser: true,
            honorararbeid: {
                misterHonorar: false,
            },
        };
    }

    if (misterInntektSomFrilanser === true) {
        const { honorararbeid, frilansarbeid, erFortsattFrilanser, startdato, sluttdato } = arbeidssituasjon;

        if (honorararbeid?.misterHonorar && !arbeidstidHonorararbeid) {
            throw 'getFrilansApiDataFromSøknadsdata: mister honorar, men arbeidstidHonorararbeid is undefined';
        }

        /** Mottar kun honorar - mister honorar */
        if (honorararbeid && honorararbeid.misterHonorar && !frilansarbeid) {
            if (!arbeidstidHonorararbeid) {
                throw 'getFrilansApiDataFromSøknadsdata: arbeidstidHonorararbeid is undefined';
            }
            return {
                type: FrilansApiType.KUN_HONORARARBEID_MISTER_HONORAR,
                ...getFrilansFellesInfo(erFortsattFrilanser, startdato, sluttdato),
                honorararbeid: {
                    misterHonorar: true,
                    arbeidsforhold: getFrilansArbeidsforholdApiData(
                        honorararbeid.normalarbeidstid,
                        arbeidstidHonorararbeid
                    ),
                },
            };
        }

        /** Har kun frilansarbeid */
        if (frilansarbeid && !honorararbeid) {
            if (!arbeidstidFrilansarbeid) {
                throw 'getFrilansApiDataFromSøknadsdata: arbeidstidFrilansarbeid is undefined';
            }
            return {
                type: FrilansApiType.KUN_FRILANSARBEID,
                ...getFrilansFellesInfo(erFortsattFrilanser, startdato, sluttdato),
                frilansarbeid: {
                    arbeidsforhold: getFrilansArbeidsforholdApiData(
                        frilansarbeid.normalarbeidstid,
                        arbeidstidFrilansarbeid
                    ),
                },
            };
        }
        /** Honorararbeid og frilansarbeid */
        if (frilansarbeid && honorararbeid) {
            if (!arbeidstidFrilansarbeid) {
                throw 'getFrilansApiDataFromSøknadsdata: arbeidstidFrilansarbeid OR arbeidstidHonorararbeid is undefined';
            }
            return {
                type: FrilansApiType.FRILANSARBEID_OG_HONORARARBEID,
                ...getFrilansFellesInfo(erFortsattFrilanser, startdato, sluttdato),
                frilansarbeid: {
                    arbeidsforhold: getFrilansArbeidsforholdApiData(
                        frilansarbeid.normalarbeidstid,
                        arbeidstidFrilansarbeid
                    ),
                },
                honorararbeid:
                    honorararbeid.misterHonorar && arbeidstidHonorararbeid
                        ? {
                              misterHonorar: true,
                              arbeidsforhold: getFrilansArbeidsforholdApiData(
                                  honorararbeid.normalarbeidstid,
                                  arbeidstidHonorararbeid
                              ),
                          }
                        : {
                              misterHonorar: false,
                          },
            };
        }
    }

    throw 'getFrilansApiDataFromSøknadsdata: undefined return';
};

const getFrilansArbeidsforholdApiData = (
    normalarbeidstid: NormalarbeidstidSøknadsdata,
    arbeidIPeriode: ArbeidIPeriodeSøknadsdata
): ArbeidsforholdApiData => {
    return {
        normalarbeidstid: {
            timerPerUkeISnitt: decimalDurationToISODuration(normalarbeidstid.timerPerUkeISnitt),
        },
        arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIPeriode),
    };
};

const getFrilansFellesInfo = (
    erFortsattFrilanser: boolean,
    startdato: Date,
    sluttdato?: Date
): FrilanserMedArbeidsforholdApiDataPart => {
    if (erFortsattFrilanser) {
        return {
            harInntektSomFrilanser: true,
            erFortsattFrilanser: true,
            startdato: dateToISODate(startdato),
        };
    }
    if (sluttdato) {
        return {
            harInntektSomFrilanser: true,
            erFortsattFrilanser: false,
            startdato: dateToISODate(startdato),
            sluttdato: sluttdato ? dateToISODate(sluttdato) : undefined,
        };
    } else {
        throw 'getFrilansPeriodeInfo: sluttdato is undefined';
    }
};
