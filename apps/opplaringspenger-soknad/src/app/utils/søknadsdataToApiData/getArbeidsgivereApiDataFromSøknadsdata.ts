import { DateRange } from '@navikt/sif-common-formik-ds';
import { dateToISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidIPeriodeSøknadsdata } from '../../types/søknadsdata/ArbeidIPeriodeSøknadsdata';
import { ArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidsgivereSøknadsdata';
import { ArbeidstidArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidstidArbeidsgivereSøknadsdata';
import { getArbeidIPeriodeApiDataFromSøknadsdata } from './getArbeidIPeriodeApiDataFromSøknadsdata';

export const getArbeidsgivereApiDataFromSøknadsdata = (
    søknadsperiode: DateRange,
    valgteDatoer: Date[],
    // skalJobbeIPerioden: boolean,
    arbeidsgivere?: ArbeidsgivereSøknadsdata,
    arbeidstidArbeidsgivere?: ArbeidstidArbeidsgivereSøknadsdata,
): ArbeidsgiverApiData[] | undefined => {
    if (!arbeidsgivere) {
        // Api sjekker at feltet kan ikke være null
        return [];
    }
    const arbeidsgiverApiData: ArbeidsgiverApiData[] = [];

    Object.entries(arbeidsgivere).map(([key, value]) => {
        const arbeidsgiverInfo: Omit<ArbeidsgiverApiData, 'erAnsatt' | 'sluttetFørSøknadsperiode' | 'arbeidsforhold'> =
            {
                type: value.arbeidsgiver.type,
                navn: value.arbeidsgiver.navn,
                organisasjonsnummer: value.arbeidsgiver.organisasjonsnummer,
                offentligIdent: value.arbeidsgiver.offentligIdent,
                ansattFom: value.arbeidsgiver.ansattFom ? dateToISODate(value.arbeidsgiver.ansattFom) : undefined,
                ansattTom: value.arbeidsgiver.ansattTom ? dateToISODate(value.arbeidsgiver.ansattTom) : undefined,
            };
        const arbeidIPeriodeSøknadsdata: ArbeidIPeriodeSøknadsdata | undefined =
            arbeidstidArbeidsgivere && Object.prototype.hasOwnProperty.call(arbeidstidArbeidsgivere, key)
                ? arbeidstidArbeidsgivere[key].arbeidIPeriode
                : undefined;

        if (arbeidIPeriodeSøknadsdata && (value.type === 'pågående' || value.type === 'sluttetISøknadsperiode')) {
            const arbeidIPeriode = getArbeidIPeriodeApiDataFromSøknadsdata(
                arbeidIPeriodeSøknadsdata,
                søknadsperiode,
                value.jobberNormaltTimer,
                valgteDatoer,
            );
            arbeidsgiverApiData.push({
                ...arbeidsgiverInfo,
                erAnsatt: value.type === 'pågående',
                sluttetFørSøknadsperiode: false,
                arbeidsforhold: { jobberNormaltTimer: value.jobberNormaltTimer, arbeidIPeriode },
            });
        }

        if (value.type === 'sluttetFørSøknadsperiode') {
            arbeidsgiverApiData.push({
                ...arbeidsgiverInfo,
                erAnsatt: false,
                sluttetFørSøknadsperiode: true,
            });
        }
    });

    return arbeidsgiverApiData;
};
