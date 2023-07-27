import { ArbeiderIPeriodenSvar } from '../../local-sif-common-pleiepenger';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';
import { FrilansApiData } from '../../types/søknad-api-data/frilansApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/arbeidIPeriodeSøknadsdata';
import { ArbeidssituasjonFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonFrilansSøknadsdata';

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
            harInntektSomFrilanser: false,
        };
    }
    const { misterInntektSomFrilanser, honorararbeid } = arbeidssituasjon;

    /** Kun honorar */
    if (misterInntektSomFrilanser === false && honorararbeid && honorararbeid.misterHonorar === false) {
        return {
            harInntektSomFrilanser: true,
            honorararbeid: {
                misterHonorar: false,
            },
        };
    }

    if (misterInntektSomFrilanser === true) {
        const { honorararbeid, frilansarbeid, erFortsattFrilanser } = arbeidssituasjon;

        if (honorararbeid?.misterHonorar && !arbeidstidHonorararbeid) {
            throw 'getFrilansApiDataFromSøknadsdata: mister honorar, men arbeidstidHonorararbeid is undefined';
        }

        /** Mottar kun honorar - mister honorar */
        if (honorararbeid && honorararbeid.misterHonorar && !frilansarbeid) {
            if (!arbeidstidHonorararbeid) {
                throw 'getFrilansApiDataFromSøknadsdata: arbeidstidHonorararbeid is undefined';
            }
            return {
                harInntektSomFrilanser: true,
                erFortsattFrilanser,
                honorararbeid: {
                    misterHonorar: true,
                    timerNormalt: `${honorararbeid.normalarbeidstid.timerPerUkeISnitt}`,
                    arbeidIPeriodeSvar: getArbeidIPeriodeSvarFraArbeidISøknadsperiode(arbeidstidHonorararbeid),
                },
            };
        }

        /** Har kun frilansarbeid */
        if (frilansarbeid && !honorararbeid) {
            if (!arbeidstidFrilansarbeid) {
                throw 'getFrilansApiDataFromSøknadsdata: arbeidstidFrilansarbeid is undefined';
            }
            return {
                harInntektSomFrilanser: true,
                erFortsattFrilanser,
                frilansarbeid: {
                    timerNormalt: `${frilansarbeid.normalarbeidstid.timerPerUkeISnitt}`,
                    arbeidIPeriodeSvar: getArbeidIPeriodeSvarFraArbeidISøknadsperiode(arbeidstidFrilansarbeid),
                },
            };
        }
        /** Honorararbeid og frilansarbeid */
        if (frilansarbeid && honorararbeid) {
            if (!arbeidstidFrilansarbeid) {
                throw 'getFrilansApiDataFromSøknadsdata: arbeidstidFrilansarbeid OR arbeidstidHonorararbeid is undefined';
            }
            return {
                harInntektSomFrilanser: true,
                erFortsattFrilanser,
                frilansarbeid: {
                    timerNormalt: `${frilansarbeid.normalarbeidstid.timerPerUkeISnitt}`,
                    arbeidIPeriodeSvar: getArbeidIPeriodeSvarFraArbeidISøknadsperiode(arbeidstidFrilansarbeid),
                },
                honorararbeid:
                    honorararbeid.misterHonorar && arbeidstidHonorararbeid
                        ? {
                              misterHonorar: true,
                              timerNormalt: `${honorararbeid.normalarbeidstid.timerPerUkeISnitt}`,
                              arbeidIPeriodeSvar:
                                  getArbeidIPeriodeSvarFraArbeidISøknadsperiode(arbeidstidHonorararbeid),
                          }
                        : {
                              misterHonorar: false,
                          },
            };
        }
    }

    throw 'getFrilansApiDataFromSøknadsdata: undefined return';
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
