/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    ArbeidsforholdAvsluttetFørSøknadsperiode,
    DataBruktTilUtledningAnnetData,
} from '../types/søknad-api-data/SøknadApiData';
import { ArbeidsgivereSøknadsdata_depr, Søknadsdata } from '../types/søknadsdata/Søknadsdata';

export const getArbeidsforhorholdAvsluttetFørSøknadsperiode = (
    arbeidsgivere?: ArbeidsgivereSøknadsdata_depr
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

export const getDataBruktTilUtledning = (_søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData => {
    return {};
    // TODO
    // return {
    //     arbeidsforholdAvsluttetFørSøknadsperiode: getArbeidsforhorholdAvsluttetFørSøknadsperiode(
    //         søknadsdata.arbeid?.arbeidsgivere
    //     ),
    // };
};
