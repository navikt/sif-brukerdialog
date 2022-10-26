import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import { Søknadsdata } from '../../types/søknadsdata/Søknadsdata';
import { getArbeidApiDataFromSøknadsdata } from './getArbeidApiDataFromSøknadsdata';
import { getOpplæringApiDataFromSøknadsdata } from './getOpplæringApiDataFromSøknadsdata';
import { getPleietrengendeApiDataFromSøknadsdata } from './getPleietrengendeApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { pleietrengende, arbeid, opplæring } = søknadsdata;

    if (!pleietrengende || !opplæring) {
        return undefined;
    }

    return {
        pleietrengende: getPleietrengendeApiDataFromSøknadsdata(pleietrengende),
        arbeid: arbeid ? getArbeidApiDataFromSøknadsdata(arbeid) : undefined,
        opplæring: getOpplæringApiDataFromSøknadsdata(opplæring),
    };
};
