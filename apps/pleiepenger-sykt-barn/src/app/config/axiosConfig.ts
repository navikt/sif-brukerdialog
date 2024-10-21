import { AxiosRequestConfig } from 'axios';
import { appEnv } from '../env/appEnv';

const axiosConfigCommon: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const axiosConfigPsb: AxiosRequestConfig = {
    ...axiosConfigCommon,
    baseURL: appEnv.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH,
};
