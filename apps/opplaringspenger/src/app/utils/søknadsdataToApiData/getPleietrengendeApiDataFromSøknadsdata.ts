import { PleietrengendeApiData } from '../../types/søknadApiData/SøknadApiData';
import { PleietrengendeSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getPleietrengendeApiDataFromSøknadsdata = ({
    fødselsnummer,
}: PleietrengendeSøknadsdata): PleietrengendeApiData => {
    return {
        fødselsnummer,
    };
};
