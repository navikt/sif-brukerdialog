import { SøknadApiData } from '../../types/SøknadApiData';
import { Søknadsdata } from '../../types/Søknadsdata';
import { getArbeidApiDataFromSøknadsdata } from './getArbeidApiDataFromSøknadsdata';
import { getPleietrengendeApiDataFromSøknadsdata } from './getPleietrengendeApiDataFromSøknadsdata';
import { getOpplæringApiDataFromSøknadsdata } from './getOpplæringApiDataFromSøknadsdata';

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
