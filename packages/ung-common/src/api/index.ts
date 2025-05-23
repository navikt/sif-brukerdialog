import { AxiosError, HttpStatusCode } from 'axios';

export * from './errorHandlers';
export * from './k9BrukerdialogProsesseringApiClient';
export * from './parse-utils/parseOppgaverElement';
export * from './ungDeltakelseOpplyserApiClient';

export const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;
