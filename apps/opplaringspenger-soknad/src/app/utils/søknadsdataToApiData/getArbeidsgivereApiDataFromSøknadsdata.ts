import { dateToISODate } from '@navikt/sif-common-utils';
import { ArbeidsgiverApiData } from '../../types/søknadApiData/SøknadApiData';
import { ArbeidsgivereSøknadsdata } from '../../types/søknadsdata/ArbeidsgivereSøknadsdata';

export const getArbeidsgivereApiDataFromSøknadsdata = (
    arbeidsgivere?: ArbeidsgivereSøknadsdata,
): ArbeidsgiverApiData[] | undefined => {
    if (!arbeidsgivere) {
        // Api sjekker at feltet kan ikke være null
        return [];
    }
    const arbeidsgiverApiData: ArbeidsgiverApiData[] = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(arbeidsgivere).map(([_, value]) => {
        const arbeidsgiverInfo: Omit<ArbeidsgiverApiData, 'erAnsatt' | 'sluttetFørSøknadsperiode' | 'arbeidsforhold'> =
            {
                type: value.arbeidsgiver.type,
                navn: value.arbeidsgiver.navn,
                organisasjonsnummer: value.arbeidsgiver.organisasjonsnummer,
                offentligIdent: value.arbeidsgiver.offentligIdent,
                ansattFom: value.arbeidsgiver.ansattFom ? dateToISODate(value.arbeidsgiver.ansattFom) : undefined,
                ansattTom: value.arbeidsgiver.ansattTom ? dateToISODate(value.arbeidsgiver.ansattTom) : undefined,
            };

        if (value.type === 'pågående' || value.type === 'sluttetISøknadsperiode') {
            arbeidsgiverApiData.push({
                ...arbeidsgiverInfo,
                erAnsatt: value.type === 'pågående',
                sluttetFørSøknadsperiode: false,
                arbeidsforhold: { jobberNormaltTimer: value.jobberNormaltTimer },
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
