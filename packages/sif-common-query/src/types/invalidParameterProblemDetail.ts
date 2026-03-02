import { zProblemDetail } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

const invalidParameterViolationSchema = z.object({
    invalidValue: z.string(),
    parameterName: z.string(),
    parameterType: z.string(),
    reason: z.string(),
});

export const invalidParameterProblemDetailSchema = zProblemDetail.extend({
    violations: z.array(invalidParameterViolationSchema),
});

export type InvalidParameterProblemDetail = z.infer<typeof invalidParameterProblemDetailSchema>;
export type InvalidParameterViolation = z.infer<typeof invalidParameterViolationSchema>;
