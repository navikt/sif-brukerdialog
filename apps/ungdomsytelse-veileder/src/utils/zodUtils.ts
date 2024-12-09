import { ZodError, ZodIssue } from 'zod';

const getZodIssueDetails = (issue: ZodIssue): any => {
    switch (issue.code) {
        case 'invalid_union':
            return {
                code: issue.code,
                message: issue.message,
                path: issue.path,
                unionErrors: issue.unionErrors.map((unionError) => ({
                    message: unionError.issues.map(getZodIssueDetails),
                })),
            };
        case 'invalid_literal':
            return {
                code: issue.code,
                message: issue.message,
                path: issue.path,
                received: issue.received,
            };
        default:
            return {
                code: issue.code,
                message: issue.message,
                path: issue.path,
            };
    }
};

export const getZodErrorsInfo = (error: ZodError): any[] => {
    return error.errors.map(getZodIssueDetails);
};
