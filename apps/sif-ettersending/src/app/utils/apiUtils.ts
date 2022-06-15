import axios from 'axios';
import { ResourceType } from '../types/ResourceType';
import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

export const multipartConfig = { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true };

export const sendMultipartPostRequest = (url: string, formData: FormData) => axios.post(url, formData, multipartConfig);

export const getApiUrl = (resourceType: ResourceType) =>
    `${getEnvironmentVariable('FRONTEND_API_PATH')}/${resourceType}`;
