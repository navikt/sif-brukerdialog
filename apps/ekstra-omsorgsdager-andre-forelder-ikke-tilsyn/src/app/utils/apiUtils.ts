import { ApiEndpoint } from '../api/api';
import axios from 'axios';
import { getEnvironmentVariable } from '@navikt/sif-common-core/lib/utils/envUtils';

export const multipartConfig = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: false };

export const sendMultipartPostRequest = (url: string, formData: FormData) => axios.post(url, formData, multipartConfig);

export const getApiUrl = (apiEndpoint: ApiEndpoint) => `${getEnvironmentVariable('FRONTEND_API_PATH')}/${apiEndpoint}`;
