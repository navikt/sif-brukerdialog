import axios, { AxiosRequestConfig } from 'axios';
import { appEnv } from '../types/appEnv';

const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const ungDeltakelseOpplyserApiClient = axios.create({
    ...axiosConfig,
    baseURL: appEnv.UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH,
});
