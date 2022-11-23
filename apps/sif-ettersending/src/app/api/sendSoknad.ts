import { ApiEndpoint } from '../types/ApiEndpoint';
import api from './api';
import { SoknadApiData } from '../types/SoknadApiData';

export const sendSoknad = (data: SoknadApiData) => api.post(ApiEndpoint.SEND_DOKUMENTER, data);
