import { AxiosRequestConfig } from 'axios';
import { getEnvVariableOrDefault } from '@navikt/sif-common-core-ds/lib/utils/envUtils';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: getEnvVariableOrDefault('FRONTEND_API_PATH', 'http://localhost:8089'),
};
