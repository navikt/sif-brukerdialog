import { dateToISODate, ISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverAnsattApiData } from '../../types/søknad-api-data/SøknadApiData';
import {
    ArbeidssituasjonAnsattSøknadsdata,
    ArbeidssituasjonAnsattType,
} from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';
import { getNormalarbeidstidApiDataFromSøknadsdata } from './getNormalarbeidstidApiDataFromSøknadsdata';
import { ArbeidIPeriodeType } from '../../types/ArbeidIPeriodeType';

export const dateToISODateOrUndefined = (date?: Date): ISODate | undefined => (date ? dateToISODate(date) : undefined);

export const getArbeidsgiverApiDataFromSøknadsdata = (
    arbeidssituasjon: ArbeidssituasjonAnsattSøknadsdata,
    arbeidIPeriode?: ArbeidIPeriodeSøknadsdata,
): ArbeidsgiverAnsattApiData => {
    const { arbeidsgiver } = arbeidssituasjon;

    if (arbeidssituasjon.type === ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode) {
        return {
            erAnsatt: false,
            navn: arbeidsgiver.navn,
            offentligIdent: arbeidsgiver.offentligIdent,
            organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
            ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
            ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
            sluttetFørSøknadsperiode: true,
        };
    }

    if (arbeidssituasjon.type === ArbeidssituasjonAnsattType.ikkeAnsattUkjentSluttdato) {
        return {
            erAnsatt: false,
            navn: arbeidsgiver.navn,
            offentligIdent: arbeidsgiver.offentligIdent,
            organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
            ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
            ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
            arbeidsforhold: {
                normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(arbeidssituasjon.normalarbeidstid),
                arbeidIPeriode: { type: ArbeidIPeriodeType.ikkeBesvart },
            },
        };
    }

    if (!arbeidIPeriode) {
        throw new Error('ArbeidIPeriode mangler');
    }

    return {
        erAnsatt: arbeidssituasjon.type === ArbeidssituasjonAnsattType.sluttetISøknadsperiode ? false : true,
        navn: arbeidsgiver.navn,
        offentligIdent: arbeidsgiver.offentligIdent,
        organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
        ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
        ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
        sluttetFørSøknadsperiode: false,
        arbeidsforhold: {
            normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(arbeidssituasjon.normalarbeidstid),
            arbeidIPeriode: getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIPeriode),
        },
    };
};
