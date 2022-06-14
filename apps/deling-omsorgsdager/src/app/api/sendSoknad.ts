import { SoknadApiData } from '../types/SoknadApiData';
import { getApiEndpointForSøknadstype } from '../utils/apiUtils';
import api from './api';

export const sendSoknad = (data: SoknadApiData) => api.post(getApiEndpointForSøknadstype(data.type), data);
