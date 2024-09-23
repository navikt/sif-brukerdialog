import axios, { AxiosRequestConfig } from 'axios';
import { getEnvVariableOrDefault } from '../utils/envUtils';

const defaultFrontendApiPath = 'http://localhost:8089';

export const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const k9BrukerdialogApiClient = axios.create({
    ...axiosConfig,
    baseURL: getEnvVariableOrDefault('FRONTEND_API_PATH_K9_BRUKERDIALOG', defaultFrontendApiPath),
});

// export const sifInnsynApiClient = axios.create({
//     ...axiosConfig,
//     baseURL: getEnvVariableOrDefault('FRONTEND_API_PATH_SIF_INNSYN', defaultFrontendApiPath),
// });

// export const k9SakInnsynApiClient = axios.create({
//     ...axiosConfig,
//     baseURL: getEnvVariableOrDefault('FRONTEND_API_PATH_K9_SAK_INNSYN', defaultFrontendApiPath),
// });
