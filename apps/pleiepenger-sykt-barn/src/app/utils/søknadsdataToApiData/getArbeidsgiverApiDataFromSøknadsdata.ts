import { dateToISODate, ISODate } from '@navikt/sif-common-utils/lib';
import { ArbeidsgiverApiData } from '../../types/søknad-api-data/SøknadApiData';
import { ArbeidAnsattSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidsforholdApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';

export const dateToISODateOrUndefined = (date?: Date): ISODate | undefined => (date ? dateToISODate(date) : undefined);

export const getArbeidsgiverApiDataFromSøknadsdata = (
    ansattSøknadsdata: ArbeidAnsattSøknadsdata
): ArbeidsgiverApiData => {
    const { arbeidsgiver } = ansattSøknadsdata;

    if (ansattSøknadsdata.erAnsattISøknadsperiode) {
        const { arbeidsgiver, arbeidsforhold } = ansattSøknadsdata;
        return {
            erAnsatt: ansattSøknadsdata.type === 'sluttetISøknadsperiode' ? false : true,
            type: arbeidsgiver.type,
            navn: arbeidsgiver.navn,
            offentligIdent: arbeidsgiver.offentligIdent,
            organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
            ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
            ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
            sluttetFørSøknadsperiode: false,
            arbeidsforhold: getArbeidsforholdApiDataFromSøknadsdata(arbeidsforhold),
        };
    }
    return {
        erAnsatt: false,
        type: arbeidsgiver.type,
        navn: arbeidsgiver.navn,
        offentligIdent: arbeidsgiver.offentligIdent,
        organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
        ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
        ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
        sluttetFørSøknadsperiode: true,
    };
};
