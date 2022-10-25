import { PleietrengendeApiData } from '../../types/SøknadApiData';
import { PleietrengendeSøknadsdata } from '../../types/Søknadsdata';

export const getPleietrengendeApiDataFromSøknadsdata = ({
    fødselsnummer,
}: PleietrengendeSøknadsdata): PleietrengendeApiData => {
    return {
        fødselsnummer,
    };
};
