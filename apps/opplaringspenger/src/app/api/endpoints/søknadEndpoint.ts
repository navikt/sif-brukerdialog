import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import api, { ApiEndpointPsb } from '../api';

const søknadEndpoint = {
    send: async (apiData: SøknadApiData) => await api.psb.post<any>(ApiEndpointPsb.send_søknad, apiData),
};

export default søknadEndpoint;
