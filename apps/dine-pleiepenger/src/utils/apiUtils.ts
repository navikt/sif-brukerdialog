import { AxiosError, HttpStatusCode } from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL_BRUKERDIALOG;
const API_URL_INNSYN = process.env.NEXT_PUBLIC_API_URL_INNSYN;

export const endpoints = {
    søknader: `${API_URL_INNSYN}/soknad`,
    soker: `${API_URL}/oppslag/soker`,
};

export const isForbidden = (error: AxiosError): boolean => {
    return (
        error.response !== undefined &&
        (error.response.status === HttpStatusCode.Forbidden ||
            error.response.status === HttpStatusCode.UnavailableForLegalReasons)
    );
};

export const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;
