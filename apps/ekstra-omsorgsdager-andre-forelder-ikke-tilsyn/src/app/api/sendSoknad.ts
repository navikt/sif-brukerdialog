import { SoknadApiData } from '../types/SoknadApiData';
import api, { ApiEndpoint } from './api';
import { getApiUrl } from '../utils/apiUtils';

export const sendSoknad = (data: SoknadApiData) => api.post(getApiUrl(ApiEndpoint.sendSoknad), data);
