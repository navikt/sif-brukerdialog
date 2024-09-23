import axios, { AxiosRequestConfig } from 'axios';
import { getEnvVariableOrDefault } from '../utils/envUtils';

const defaultFrontendApiPath = 'http://localhost:8089';

export const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const k9BrukerdialogApiClient = axios.create({
    ...axiosConfig,
    baseURL: getEnvVariableOrDefault('BRUKERDIALOG_PROSESSERING_FRONTEND_PATH', defaultFrontendApiPath),
});
