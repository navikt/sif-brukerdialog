import { dateToISODate, ISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverAnsattApiData } from '../../types/søknad-api-data/SøknadApiData';
import {
    ArbeidssituasjonAnsattSøknadsdata,
    ArbeidssituasjonAnsattType,
} from '../../types/søknadsdata/ArbeidssituasjonAnsattSøknadsdata';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidsforholdApiDataFromSøknadsdata';
import { getNormalarbeidstidApiDataFromSøknadsdata } from './getNormalarbeidstidApiDataFromSøknadsdata';
import { getFeatureToggles } from '../featureToggleUtils';

export const dateToISODateOrUndefined = (date?: Date): ISODate | undefined => (date ? dateToISODate(date) : undefined);

export const getArbeidsgiverApiDataFromSøknadsdata = (
    arbeidssituasjon: ArbeidssituasjonAnsattSøknadsdata,
    arbeidIPeriode?: ArbeidIPeriodeSøknadsdata,
): ArbeidsgiverAnsattApiData => {
    const { arbeidsgiver } = arbeidssituasjon;
    const { spørOmSluttetISøknadsperiode } = getFeatureToggles();

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
    return {
        erAnsatt:
            arbeidssituasjon.type === ArbeidssituasjonAnsattType.ikkeAnsattUkjentSluttdato ||
            arbeidssituasjon.type === ArbeidssituasjonAnsattType.sluttetISøknadsperiode
                ? false
                : true,
        navn: arbeidsgiver.navn,
        offentligIdent: arbeidsgiver.offentligIdent,
        organisasjonsnummer: arbeidsgiver.organisasjonsnummer,
        ansattFom: dateToISODateOrUndefined(arbeidsgiver.ansattFom),
        ansattTom: dateToISODateOrUndefined(arbeidsgiver.ansattTom),
        sluttetFørSøknadsperiode: spørOmSluttetISøknadsperiode ? undefined : arbeidssituasjon.type ? false : true,
        arbeidsforhold: {
            normalarbeidstid: getNormalarbeidstidApiDataFromSøknadsdata(arbeidssituasjon.normalarbeidstid),
            arbeidIPeriode: arbeidIPeriode ? getArbeidIPeriodeApiDataFromSøknadsdata(arbeidIPeriode) : arbeidIPeriode,
        },
    };
};
