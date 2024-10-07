import { AxiosRequestConfig } from 'axios';
import { getEnvVariableOrDefault } from '@navikt/sif-common-core-ds/src/utils/envUtils';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: getEnvVariableOrDefault('K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH', 'http://localhost:8089'),
};
