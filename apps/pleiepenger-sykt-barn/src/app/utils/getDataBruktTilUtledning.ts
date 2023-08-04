import {
    ArbeidsforholdAvsluttetFørSøknadsperiode,
    DataBruktTilUtledningAnnetData,
} from '../types/søknad-api-data/_SøknadApiData';
import { ArbeidssituasjonAnsattSøknadsdata } from '../types/søknadsdata/_ArbeidssituasjonAnsattSøknadsdata';
import { Søknadsdata } from '../types/søknadsdata/_Søknadsdata';

export const getArbeidsforhorholdAvsluttetFørSøknadsperiode = (
    ansattSøknadsdata?: ArbeidssituasjonAnsattSøknadsdata[]
): ArbeidsforholdAvsluttetFørSøknadsperiode[] | undefined => {
    if (!ansattSøknadsdata || ansattSøknadsdata.length === 0) {
        return undefined;
    }
    return ansattSøknadsdata
        .filter((ansatt) => {
            return ansatt.type === 'sluttetFørSøknadsperiode';
        })
        .map((ansatt) => {
            return {
                erAnsatt: false,
                sluttetFørSøknadsdato: true,
                orgnr: ansatt.arbeidsgiver.id,
            };
        });
};

export const getDataBruktTilUtledning = (søknadsdata: Søknadsdata): DataBruktTilUtledningAnnetData => {
    return {
        arbeidsforholdAvsluttetFørSøknadsperiode: getArbeidsforhorholdAvsluttetFørSøknadsperiode(
            søknadsdata.arbeidssituasjon?.arbeidsgivere
        ),
    };
};
