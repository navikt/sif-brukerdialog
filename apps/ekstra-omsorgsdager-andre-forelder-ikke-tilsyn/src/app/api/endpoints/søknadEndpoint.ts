import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import api, { ApiEndpoint } from '../api';

const søknadEndpoint = {
    send: async (apiData: SøknadApiData) => await api.post<any>(ApiEndpoint.send_søknad, apiData),
};

export default søknadEndpoint;
