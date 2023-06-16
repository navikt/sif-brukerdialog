import {
    ArbeidsforholdAvsluttetFørSøknadsperiode,
    DataBruktTilUtledningAnnetData,
} from '../types/søknad-api-data/SøknadApiData';
import { ArbeidsgivereSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export const getArbeidsforhorholdAvsluttetFørSøknadsperiode = (
    arbeidsgivere?: ArbeidsgivereSøknadsdata
): ArbeidsforholdAvsluttetFørSøknadsperiode[] | undefined => {
    if (!arbeidsgivere) {
        return undefined;
    }

    const arbeidsforhold: ArbeidsforholdAvsluttetFørSøknadsperiode[] = Array.from(arbeidsgivere.keys())
        .filter((key) => {
            const ansatt = arbeidsgivere.get(key);
            return ansatt && ansatt.type === 'sluttetFørSøknadsperiode';
        })
        .map((key) => {
            return {
                erAnsatt: false,
                sluttetFørSøknadsdato: true,
                orgnr: key,
            };
        });

    return arbeidsforhold.length === 0 ? undefined : arbeidsforhold;
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData => {
    return {
        arbeidsforholdAvsluttetFørSøknadsperiode: getArbeidsforhorholdAvsluttetFørSøknadsperiode(
            søknadsdata.arbeid?.arbeidsgivere
        ),
    };
};
