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
            invalid_parameters?: string[];
            violations?: Violation[];
        };
    };
}

export type InvalidParameter = string;

export const isInvalidParameterErrorResponse = (error: any): error is InvalidParameterErrorResponse => {
    const data = error?.response?.data;
    if (!data) {
        return false;
    }
    if (data.invalid_parameters && data.invalid_parameters.length > 0) {
        return true;
    }
    if (data.violations && data.violations.length > 0) {
        return true;
    }
    return false;
};

export const getInvalidParameters = (error: InvalidParameterErrorResponse): string[] | undefined => {
    if (isInvalidParameterErrorResponse(error)) {
        const invalidParameters: string[] = [];
        const { invalid_parameters, violations } = error.response.data;
        if (invalid_parameters && invalid_parameters.length > 0) {
            invalidParameters.push(...invalid_parameters);
        }
        if (violations && violations.length > 0) {
            invalidParameters.push(...violations.map((v) => v.parameterName));
        }
        return invalidParameters;
    }
    return undefined;
};
