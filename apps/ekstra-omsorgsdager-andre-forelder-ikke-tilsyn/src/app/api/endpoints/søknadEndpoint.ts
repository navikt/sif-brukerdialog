import { SoknadApiData } from '../../types/SoknadApiData';
import api, { ApiEndpoint } from '../api';

const søknadEndpoint = {
    send: async (apiData: SoknadApiData) => await api.post<any>(ApiEndpoint.send_søknad, apiData),
};

export default søknadEndpoint;
