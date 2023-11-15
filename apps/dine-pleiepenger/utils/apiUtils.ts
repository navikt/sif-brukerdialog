import { AxiosError, HttpStatusCode } from 'axios';

export const isForbidden = (error: AxiosError): boolean => {
    return (
        error.response !== undefined &&
        (error.response.status === HttpStatusCode.Forbidden ||
            error.response.status === HttpStatusCode.UnavailableForLegalReasons)
    );
};

export const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatusCode.Unauthorized;
