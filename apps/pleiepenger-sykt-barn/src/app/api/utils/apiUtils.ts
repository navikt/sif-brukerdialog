import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/lib/utils/envUtils';
import { getGitShaRequestHeader } from '@navikt/sif-common-core-ds/lib/utils/gitShaHeaderUtils';
import axios from 'axios';
import { axiosConfigPsb } from '../../config/axiosConfig';
import { ResourceType } from '../../types/_ResourceType';

export const multipartConfig = { ...axiosConfigPsb, headers: { 'Content-Type': 'multipart/form-data' } };
export const axiosJsonConfig = {
    ...axiosConfigPsb,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
    ...getGitShaRequestHeader(),
};

export const sendMultipartPostRequest = (url: string, formData: FormData) => {
    return axios.post(url, formData, multipartConfig);
};

export const getApiUrlByResourceType = (resourceType: ResourceType) => {
    return `${getEnvironmentVariable('FRONTEND_API_PATH')}/${resourceType}`;
};

export const apiUtils = {
    getApiUrlByResourceType,
    sendMultipartPostRequest,
};
