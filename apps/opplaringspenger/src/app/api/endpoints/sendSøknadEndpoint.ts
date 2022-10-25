import { SøknadApiData } from '../../types/SøknadApiData';
import api, { ApiEndpointPsb } from '../api';

const sendSøknadEndpoint = {
    send: async (apiData: SøknadApiData) => await api.psb.post<any>(ApiEndpointPsb.send_søknad, apiData),
};

export default sendSøknadEndpoint;
