import {
    InvalidParameterViolation,
    InvalidParameterErrorResponse,
    invalidParameterErrorResponse,
} from '@navikt/sif-common-api';
import { AxiosError } from 'axios';

export const isInvalidParameterErrorResponse = (data: AxiosError<any> | any): data is InvalidParameterErrorResponse => {
    try {
        return invalidParameterErrorResponse.parse(data) !== undefined;
    } catch {
        return false;
    }
};

export const getInvalidParametersFromAxiosError = (error: AxiosError<any>): InvalidParameterViolation[] => {
    if (isInvalidParameterErrorResponse(error.response?.data)) {
        return error.response?.data.violations.map((violation) => violation);
    }
    return [];
};
