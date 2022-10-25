import { OpplæringApiData } from '../../types/SøknadApiData';
import { OpplæringSøknadsdata } from '../../types/Søknadsdata';

export const getOpplæringApiDataFromSøknadsdata = ({ beskrivelse }: OpplæringSøknadsdata): OpplæringApiData => {
    return {
        beskrivelse,
    };
};
