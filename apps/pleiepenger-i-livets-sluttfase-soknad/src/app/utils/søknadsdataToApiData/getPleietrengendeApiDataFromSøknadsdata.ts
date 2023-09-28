import { PleietrengendeApi } from '../../types/søknadApiData/SøknadApiData';
import { OpplysningerOmPleietrengendeSøknadsdata } from '../../types/søknadsdata/OpplysningerOmPleietrengendeSøknadsdata';

export const getPleietrengendeApiDataFromSøknadsdata = (
    opplysningerOmPleietrengendeSøknadsdata: OpplysningerOmPleietrengendeSøknadsdata,
): PleietrengendeApi => {
    switch (opplysningerOmPleietrengendeSøknadsdata.type) {
        case 'pleietrengendeMedFnr':
            return {
                navn: opplysningerOmPleietrengendeSøknadsdata.navn,
                norskIdentitetsnummer: opplysningerOmPleietrengendeSøknadsdata.norskIdentitetsnummer,
            };
        case 'pleietrengendeUtenFnr':
            return {
                navn: opplysningerOmPleietrengendeSøknadsdata.navn,
                årsakManglerIdentitetsnummer: opplysningerOmPleietrengendeSøknadsdata.årsakManglerIdentitetsnummer,
                fødselsdato: opplysningerOmPleietrengendeSøknadsdata.fødselsdato,
            };
    }
};
