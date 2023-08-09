/* eslint-disable @typescript-eslint/no-unused-vars */
import { FrilansApiData, FrilanserMedArbeidsforholdApiDataPart } from '../../types/søknad-api-data/FrilansApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { ArbeidssituasjonFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonFrilansSøknadsdata';
import { Frilanstype } from '../../types/FrilansFormData';
import { dateToISODate, decimalDurationToISODuration } from '@navikt/sif-common-utils/lib';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/NormalarbeidstidSøknadsdata';
import { ArbeidsforholdApiData } from '../../types/søknad-api-data/ArbeidsforholdApiData';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';

export const getFrilansApiDataFromSøknadsdata = ({
    arbeidssituasjon,
    arbeidstid,
}: {
    arbeidssituasjon: ArbeidssituasjonFrilansSøknadsdata | undefined;
    arbeidstid: ArbeidIPeriodeSøknadsdata | undefined;
}): FrilansApiData => {
    if (!arbeidssituasjon) {
        throw 'getFrilansApiDataFromSøknadsdata: arbeidssituasjon is undefined';
    }

    if (arbeidssituasjon.harInntektSomFrilanser === false) {
        return {
            harInntektSomFrilanser: false,
        };
    }
    const { misterInntektSomFrilanser, type } = arbeidssituasjon;

    /** Kun honorar - mister ikke honorar */
    if (misterInntektSomFrilanser === false && type === Frilanstype.HONORAR) {
        return {
            type: Frilanstype.HONORAR,
            harInntektSomFrilanser: true,
            _misterInntektSomFrilanser: false,
            misterHonorar: false,
        };
    }

    /** Har inntekt og har registrert arbeidstid */
    if (misterInntektSomFrilanser === true && arbeidstid) {
        const { type, erFortsattFrilanser, startdato, sluttdato, misterHonorar, normalarbeidstid } = arbeidssituasjon;

        return {
            type,
            _misterInntektSomFrilanser: true,
            ...getFrilansFellesInfo(erFortsattFrilanser, startdato, sluttdato),
            misterHonorar,
            arbeidsforhold: getFrilansArbeidsforholdApiData(normalarbeidstid, arbeidstid),
        };
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
): Pick<
    FrilanserMedArbeidsforholdApiDataPart,
    'harInntektSomFrilanser' | 'erFortsattFrilanser' | 'startdato' | 'sluttdato'
> => {
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
