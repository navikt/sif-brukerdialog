import { SøknadApiData } from '../../types/SøknadApiData';
import { Søknadsdata } from '../../types/Søknadsdata';
import { getArbeidApiDataFromSøknadsdata } from './getArbeidApiDataFromSøknadsdata';
import { getBarnApiDataFromSøknadsdata } from './getBarnApiDataFromSøknadsdata copy';
import { getOpplæringApiDataFromSøknadsdata } from './getOpplæringApiDataFromSøknadsdata';

export const getApiDataFromSøknadsdata = (søknadsdata: Søknadsdata): SøknadApiData | undefined => {
    const { barn, arbeid, opplæring } = søknadsdata;

    if (!barn || !opplæring) {
        return undefined;
    }

    return {
        barn: getBarnApiDataFromSøknadsdata(barn),
        arbeid: arbeid ? getArbeidApiDataFromSøknadsdata(arbeid) : undefined,
        opplæring: getOpplæringApiDataFromSøknadsdata(opplæring),
    };
};
