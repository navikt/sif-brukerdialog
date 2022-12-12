import { ApiEndpoint } from '../types/ApiEndpoint';
import { SoknadApiData } from '../types/SoknadApiData';
import api from './api';

export const sendSoknad = (data: SoknadApiData) => api.post(ApiEndpoint.SEND_DOKUMENTER, data);
