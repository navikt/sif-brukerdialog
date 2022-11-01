import { ApiEndpointPsb } from '.';
import { SøknadApiData } from '../../types/søknadApiData/SøknadApiData';
import api from '../api';

export const sendEndringsmeldingEndpoint = {
    send: (data: SøknadApiData) => api.psb.post(ApiEndpointPsb.sendEndringsmelding, data),
};
