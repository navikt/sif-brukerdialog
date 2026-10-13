import { z } from 'zod';

const invalidParameterViolation = z.object({
    invalidValue: z.string(),
    parameterName: z.string(),
    parameterType: z.string(),
    reason: z.string(),
});

export const invalidParameterErrorResponse = z.object({
    violations: z.array(invalidParameterViolation),
    detail: z.string(),
    status: z.number(),
    title: z.string(),
    type: z.string(),
});

export type InvalidParameterErrorResponse = z.infer<typeof invalidParameterErrorResponse>;
export type InvalidParameterViolation = z.infer<typeof invalidParameterViolation>;
