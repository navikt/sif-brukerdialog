import { AxiosError } from 'axios';
import { invalidParameterProblemDetailSchema, InvalidParameterViolation } from '../types/invalidParameterProblemDetail';

export const getInvalidParameterViolations = (error: AxiosError<any>): InvalidParameterViolation[] => {
    const result = invalidParameterProblemDetailSchema.safeParse(error.response?.data);
    return result.success && result.data.violations ? result.data.violations : [];
};
