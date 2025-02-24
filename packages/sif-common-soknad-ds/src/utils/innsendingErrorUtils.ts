import { AxiosError } from 'axios';

interface Violation {
    invalidValue: string;
    parameterName: string;
    parameterType: string;
    reason: string;
}

interface InvalidParameterErrorResponse {
    response: {
        data: {
            type: string;
            title: string;
            status: number;
            detail: string;
            violations?: Violation[];
        };
    };
}

const isInvalidParameterErrorResponse = (error?: any): error is InvalidParameterErrorResponse => {
    return error?.response?.data?.violations !== undefined;
};

export const getInvalidParametersFromInnsendingError = (error: AxiosError<any>) => {
    if (isInvalidParameterErrorResponse(error)) {
        return error.response.data.violations.map((violation) => violation.parameterName);
    }
};
