import { AxiosError } from 'axios';
import HttpStatus, { StatusCodes } from 'http-status-codes';

export const isForbidden = ({ response }: AxiosError) =>
    response !== undefined &&
    (response.status === HttpStatus.FORBIDDEN || response.status === StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS);

export const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatus.UNAUTHORIZED;

export const isUserLoggedOut = (error: AxiosError): boolean => isUnauthorized(error);

export const getStartedSøknadRequestParam = (date?: Date): string | undefined => {
    return date ? `startetSøknad=${date.toISOString()}` : undefined;
};

const apiUtils = {
    isForbidden,
    isUnauthorized,
    isUserLoggedOut,
    getStartedSøknadRequestParam,
};

export default apiUtils;
