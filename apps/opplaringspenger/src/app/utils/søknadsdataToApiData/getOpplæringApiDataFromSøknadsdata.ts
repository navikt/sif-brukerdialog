import { OpplæringApiData } from '../../types/søknadApiData/SøknadApiData';
import { OpplæringSøknadsdata } from '../../types/søknadsdata/OpplæringSøknadsdata';

export const getOpplæringApiDataFromSøknadsdata = ({ beskrivelse }: OpplæringSøknadsdata): OpplæringApiData => {
    return {
        beskrivelse,
    };
};
