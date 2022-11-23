import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getPleietrengendeApiDataFromSøknadsdata } from './getPleietrengendeApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { pleietrengende } = søknadsdata;

    if (!pleietrengende) {
        return undefined;
    }

    return {
        pleietrengende: getPleietrengendeApiDataFromSøknadsdata(pleietrengende),
    };
};
