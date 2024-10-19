import { AxiosRequestConfig } from 'axios';
import { commonEnv } from '@navikt/sif-common-env';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: commonEnv.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
};
