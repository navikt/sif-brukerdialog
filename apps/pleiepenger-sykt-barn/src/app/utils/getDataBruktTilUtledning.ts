import {
    ArbeidsforholdAvsluttetFørSøknadsperiode,
    DataBruktTilUtledningAnnetData,
} from '../types/søknad-api-data/SøknadApiData';
import { ArbeidsgivereSøknadsdata, Søknadsdata } from '../types/søknadsdata/Søknadsdata';

const getArbeidsforhorholdAvsluttetFørSøknadsperiode = (
    arbeidsgivere?: ArbeidsgivereSøknadsdata
): ArbeidsforholdAvsluttetFørSøknadsperiode[] | undefined => {
    if (!arbeidsgivere) {
        return undefined;
    }
    return Object.keys(arbeidsgivere)
        .filter((key) => arbeidsgivere[key].ansattISøknadsperiode === false)
        .map((key) => {
            return {
                erAnsatt: false,
                sluttetFørSøknadsdato: true,
                orgnr: key,
            };
        });
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData => {
    return {
        arbeidsforholdAvsluttetFørSøknadsperiode: getArbeidsforhorholdAvsluttetFørSøknadsperiode(
            søknadsdata.arbeid?.arbeidsgivere
        ),
    };
};
