import { appLogger } from '@sif/apm';
import { ApiError, isApiAxiosError } from '@sif/api';

export const logApiErrorFaro = (hookName: string, error: ApiError): void => {
    const axiosError = isApiAxiosError(error) ? error.originalError : undefined;
    appLogger.logError(`API error in ${hookName}`, {
        type: error.type,
        context: error.context,
        httpStatus: axiosError?.response?.status,
        errorCode: axiosError?.code,
        apiUrl: axiosError?.config?.url,
        correlationId: axiosError?.response?.headers?.['x-correlation-id'],
    });
};
