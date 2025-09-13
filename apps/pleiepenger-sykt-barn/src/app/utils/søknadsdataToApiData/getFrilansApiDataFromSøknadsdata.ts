import { dateToISODate, decimalDurationToISODuration } from '@navikt/sif-common-utils';
import { ArbeidsforholdApiData } from '../../types/søknad-api-data/ArbeidsforholdApiData';
import { FrilansApiData, FrilanserMedArbeidsforholdApiDataPart } from '../../types/søknad-api-data/FrilansApiData';
import { Frilanstype } from '../../types/søknad-form-values/FrilansFormValues';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { ArbeidssituasjonFrilansSøknadsdata } from '../../types/søknadsdata/ArbeidssituasjonFrilansSøknadsdata';
import { NormalarbeidstidSøknadsdata } from '../../types/søknadsdata/NormalarbeidstidSøknadsdata';
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
        const {
            erFortsattFrilanser,
            startdato,
            sluttdato,
            misterHonorar,
            normalarbeidstid,
            startetFørSisteTreHeleMåneder,
        } = arbeidssituasjon;

        return {
            type: arbeidssituasjon.type,
            _misterInntektSomFrilanser: true,
            ...getFrilansFellesInfo(erFortsattFrilanser, startetFørSisteTreHeleMåneder, startdato, sluttdato),
            misterHonorar,
            arbeidsforhold: getFrilansArbeidsforholdApiData(normalarbeidstid, arbeidstid),
        };
    }

    throw 'getFrilansApiDataFromSøknadsdata: undefined return';
};

const getFrilansArbeidsforholdApiData = (
    normalarbeidstid: NormalarbeidstidSøknadsdata,
    arbeidIPeriode: ArbeidIPeriodeSøknadsdata,
): ArbeidsforholdApiData => {
    return {
        normalarbeidstid: {
            timerPerUkeISnitt: decimalDurationToISODuration(normalarbeidstid.timerPerUkeISnitt),
        },
        arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIPeriode),
    };
};

const getFrilansFellesInfo = (
    jobberFortsattSomFrilans: boolean,
    startetFørSisteTreHeleMåneder: boolean,
    startdato: Date,
    sluttdato?: Date,
): Pick<
    FrilanserMedArbeidsforholdApiDataPart,
    'harInntektSomFrilanser' | 'jobberFortsattSomFrilans' | 'startdato' | 'sluttdato' | 'startetFørSisteTreHeleMåneder'
> => {
    if (jobberFortsattSomFrilans) {
        return {
            harInntektSomFrilanser: true,
            jobberFortsattSomFrilans: true,
            startetFørSisteTreHeleMåneder: startetFørSisteTreHeleMåneder,
            startdato: dateToISODate(startdato),
        };
    }
    if (sluttdato) {
        return {
            harInntektSomFrilanser: true,
            jobberFortsattSomFrilans: false,
            startetFørSisteTreHeleMåneder: startetFørSisteTreHeleMåneder,
            startdato: dateToISODate(startdato),
            sluttdato: sluttdato ? dateToISODate(sluttdato) : undefined,
        };
    } else {
        throw 'getFrilansPeriodeInfo: sluttdato is undefined';
    }
};
