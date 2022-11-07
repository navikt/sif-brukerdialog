import { ApiEndpointPsb } from '.';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import api from '../api';

export const sendSøknadEndpoint = {
    send: (data: SøknadApiData) => api.psb.post(ApiEndpointPsb.sendSøknad, data),
};
