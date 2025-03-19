import { k9BrukerdialogApiClient } from '../apiClient';
import { z } from 'zod';

export const fritekstViolationSchema = z.object({
    invalidValue: z.string(),
    parameterName: z.string(),
    parameterType: z.string(),
    reason: z.string(),
});

export const fritekstValideringsfeilResponseSchema = z.object({
    violations: z.array(fritekstViolationSchema),
    detail: z.string(),
    status: z.number(),
    title: z.string(),
    type: z.string(),
});

export type FritekstfeltValideringsfeilResponse = z.infer<typeof fritekstValideringsfeilResponseSchema>;
export type FritekstfeltValideringsfeil = z.infer<typeof fritekstViolationSchema>;

export const validerFritekst = async (value: string): Promise<FritekstfeltValideringsfeilResponse | undefined> => {
    try {
        await k9BrukerdialogApiClient.post(`/valider/fritekstfelt`, { verdi: value });
    } catch (e) {
        if (e.response?.status === 400) {
            const parseResult = fritekstValideringsfeilResponseSchema.safeParse(e.response.data);
            if (parseResult.success) {
                return parseResult.data;
            }
        }
    }
};
