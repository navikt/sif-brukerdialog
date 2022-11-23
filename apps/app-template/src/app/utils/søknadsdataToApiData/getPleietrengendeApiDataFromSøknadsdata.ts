import { PleietrengendeApiData } from '../../types/søknadApiData/SøknadApiData';
import { PleietrengendeSøknadsdata } from '../../types/søknadsdata/Søknadsdata';

export const getPleietrengendeApiDataFromSøknadsdata = ({
    navn,
    alder,
}: PleietrengendeSøknadsdata): PleietrengendeApiData => {
    return {
        navn,
        alder,
    };
};
