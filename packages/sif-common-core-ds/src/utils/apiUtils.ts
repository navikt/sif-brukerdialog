import { AxiosError, AxiosRequestConfig } from 'axios';
import HttpStatus, { StatusCodes } from 'http-status-codes';

export const isForbidden = ({ response }: AxiosError) =>
    response !== undefined &&
    (response.status === HttpStatus.FORBIDDEN || response.status === StatusCodes.UNAVAILABLE_FOR_LEGAL_REASONS);

export const isUnauthorized = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatus.UNAUTHORIZED;

export const isBadRequest = (error: AxiosError): boolean =>
    error !== undefined && error.response !== undefined && error.response.status === HttpStatus.BAD_REQUEST;

export const isUserLoggedOut = (error: AxiosError): boolean => isUnauthorized(error);

export const getStartedSøknadRequestParam = (date?: Date): string | undefined => {
    return date ? `startetSøknad=${date.toISOString()}` : undefined;
};

export const generateCorrlationId = () => `CallId_${new Date().getTime()}_${Math.floor(Math.random() * 1000000000)}`;

export const getCorrelationIdHeader = () => ({
    correlation_id: generateCorrlationId(),
});

export const addCorrelationIdToAxionsConfig = (config: AxiosRequestConfig): AxiosRequestConfig => {
    return {
        ...config,
        headers: {
            ...config.headers,
            ...getCorrelationIdHeader(),
        },
    };
};

const apiUtils = {
    isForbidden,
    isUnauthorized,
    isUserLoggedOut,
    getStartedSøknadRequestParam,
    generateCorrlationId,
    getCorrelationIdHeader,
    addCorrelationIdToAxionsConfig,
};

export default apiUtils;
