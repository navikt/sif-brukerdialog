import { getMaybeEnv } from '@navikt/sif-common-env';
import axios, { AxiosRequestConfig } from 'axios';

const axiosConfig: AxiosRequestConfig = {
    withCredentials: false,
    headers: { 'Content-type': 'application/json; charset=utf-8' },
};

export const ungDeltakelseOpplyserApiClient = axios.create({
    ...axiosConfig,
    baseURL: getMaybeEnv('UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH'),
});
