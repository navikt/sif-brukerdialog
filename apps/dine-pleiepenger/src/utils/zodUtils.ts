import { ZodError } from 'zod';

const getZodIssueDetails = (issue: ZodError<any>['issues'][number]): any => {
    switch (issue.code) {
        case 'invalid_union':
            return {
                code: issue.code,
                message: issue.message,
                path: issue.path,
                unionErrors: Array.isArray((issue as any).unionErrors)
                    ? (issue as any).unionErrors.map((unionError: any) =>
                          Array.isArray(unionError.issues) ? unionError.issues.map(getZodIssueDetails) : [],
                      )
                    : [],
            };
        default:
            return {
                code: issue.code,
                message: issue.message,
                path: issue.path,
            };
    }
};

export const getZodErrorsInfo = (error: ZodError<any>): any[] => {
    return error.issues.map(getZodIssueDetails);
};
