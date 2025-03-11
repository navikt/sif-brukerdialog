import { k9BrukerdialogApiClient } from '../apiClient';
import { z } from 'zod';

const violationSchema = z.object({
    invalidValue: z.string(),
    parameterName: z.string(),
    parameterType: z.string(),
    reason: z.string(),
});

const valideringsfeilSchema = z.object({
    violations: z.array(violationSchema),
    detail: z.string(),
    status: z.number(),
    title: z.string(),
    type: z.string(),
});

export type FritekstfeltValideringsfeil = z.infer<typeof valideringsfeilSchema>;

export const validerFritekst = async (value: string): Promise<FritekstfeltValideringsfeil | undefined> => {
    try {
        await k9BrukerdialogApiClient.post(`/valider/fritekstfelt`, { verdi: value });
    } catch (e) {
        if (e.response?.status === 400) {
            const parseResult = valideringsfeilSchema.safeParse(e.response.data);
            if (parseResult.success) {
                return parseResult.data;
            }
        }
    }
};
