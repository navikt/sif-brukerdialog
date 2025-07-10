import { zProblemDetail } from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';

const invalidParameterViolation = z.object({
    invalidValue: z.string(),
    parameterName: z.string(),
    parameterType: z.string(),
    reason: z.string(),
});

export const invalidParameterProblemDetail = zProblemDetail.extend({
    violations: z.array(invalidParameterViolation),
});

export type InvalidParameterProblemDetail = z.infer<typeof invalidParameterProblemDetail>;
export type InvalidParameterViolation = z.infer<typeof invalidParameterViolation>;
