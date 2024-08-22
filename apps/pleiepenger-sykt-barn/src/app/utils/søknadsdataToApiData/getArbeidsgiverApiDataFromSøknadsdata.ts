import { dateToISODate, ISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverAnsattApiData } from '../../types/søknad-api-data/SøknadApiData';
import {
    ArbeidssituasjonAnsattSøknadsdata,
    ArbeidssituasjonAnsattType,
} from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';
import { getNormalarbeidstidApiDataFromSøknadsdata } from './getNormalarbeidstidApiDataFromSøknadsdata';

export const dateToISODateOrUndefined = (date?: Date): ISODate | undefined => (date ? dateToISODate(date) : undefined);

export const getArbeidsgiverApiDataFromSøknadsdata = (
    arbeidssituasjon: ArbeidssituasjonAnsattSøknadsdata,
    arbeidIPeriode?: ArbeidIPeriodeSøknadsdata,
): ArbeidsgiverAnsattApiData => {
    const { arbeidsgiver } = arbeidssituasjon;

    if (arbeidssituasjon.type !== ArbeidssituasjonAnsattType.sluttetFørSøknadsperiode) {
        return {
            erAnsatt: arbeidssituasjon.type === 'sluttetISøknadsperiode' ? false : true,
            navn: arbeidsgiver.navn,
            offentligIdent: arbeidsgiver.offentligIdent,
            organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
            ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
            ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
            sluttetFørSøknadsperiode: false,
            arbeidsforhold: {
                normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(arbeidssituasjon.normalarbeidstid),
                arbeidIPeriode: arbeidIPeriode
                    ? getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIPeriode)
                    : arbeidIPeriode,
            },
        };
    }
    return {
        erAnsatt: false,
        navn: arbeidsgiver.navn,
        offentligIdent: arbeidsgiver.offentligIdent,
        organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
        ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
        ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
        sluttetFørSøknadsperiode: true,
    };
};
