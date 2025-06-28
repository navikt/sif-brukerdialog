import { AxiosError, HttpStatusCode } from 'axios';

export * from './errorHandlers';
export * from './k9BrukerdialogProsesseringApiClient';

export const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;

export const commonRequestHeader = {
    'Content-type': 'application/json; charset=utf-8',
    'X-Brukerdialog-Git-Sha': 'overskrives-av-server',
} as any;
