import {
    InvalidParameterViolation,
    InvalidParameterErrorResponse,
    invalidParameterErrorResponseSchema,
} from '@navikt/sif-common-api';
import { AxiosError } from 'axios';

export const isInvalidParameterErrorResponse = (data: AxiosError<any> | any): data is InvalidParameterErrorResponse => {
    try {
        return invalidParameterErrorResponseSchema.parse(data) !== undefined;
    } catch {
        return false;
    }
};

export const getInvalidParametersFromAxiosError = (error: AxiosError<any>): InvalidParameterViolation[] => {
    if (isInvalidParameterErrorResponse(error.response?.data)) {
        return error.response?.data.violations;
    }
    return [];
};
