import HttpStatus from 'http-status-codes';

interface InvalidParameterErrorResponse {
    response: {
        data: {
            type: string;
            title: string;
            status: number;
            detail: string;
            invalid_parameters: string[];
        };
    };
}

export type InvalidParameter = string;

export const isInvalidParameterErrorResponse = (error: any): error is InvalidParameterErrorResponse => {
    return (
        error !== undefined &&
        error.response !== undefined &&
        error.response.status === HttpStatus.BAD_REQUEST &&
        (error as any).response &&
        (error as any).response.data &&
        (error as any).response.data.invalid_parameters &&
        (error as any).response.data.invalid_parameters.length > 0
    );
};
