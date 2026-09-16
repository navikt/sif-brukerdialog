import { appLogger } from '@sif/apm';
import { ApiError, isApiAxiosError } from '@sif/api';

export const logApiErrorFaro = (hookName: string, error: ApiError): void => {
    const axiosError = isApiAxiosError(error) ? error.originalError : undefined;
    appLogger.logException(new Error(`API error in ${hookName}`), {
        type: error.type,
        context: error.context,
        httpStatus: axiosError?.response?.status,
        errorCode: axiosError?.code,
        correlationId: axiosError?.response?.headers?.['x-correlation-id'],
    });
};
