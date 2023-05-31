import axios from 'axios';
import { axiosConfigPsb } from '../../config/axiosConfig';
import { ResourceType, ResourceTypeInnsyn } from '../../types/ResourceType';
import { getEnvironmentVariable } from '../../utils/envUtils';

export const multipartConfig = { ...axiosConfigPsb, headers: { 'Content-Type': 'multipart/form-data' } };
export const axiosJsonConfig = { ...axiosConfigPsb, headers: { 'Content-type': 'application/json; charset=utf-8' } };

export const sendMultipartPostRequest = (url: string, formData: FormData) => {
    return axios.post(url, formData, multipartConfig);
};

export const getApiUrlByResourceType = (resourceType: ResourceType) => {
    return `${getEnvironmentVariable('FRONTEND_API_PATH')}/${resourceType}`;
};

export const getInnsynApiUrlByResourceType = (resourceType: ResourceTypeInnsyn) => {
    return `${getEnvironmentVariable('FRONTEND_INNSYN_API_PATH')}/${resourceType}`;
};

export const apiUtils = {
    getApiUrlByResourceType,
    sendMultipartPostRequest,
};
