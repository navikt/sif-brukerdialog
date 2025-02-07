import { k9SakApiClient, parseMaybeDateStringToDate } from '@navikt/sif-common-api';
import getSentryLoggerForApp from '@navikt/sif-common-sentry';
import { z } from 'zod';
import { institusjoner } from '../data/institusjoner';

export const institusjonSchema = z.object({
    uuid: z.string().optional(),
    navn: z.string(),
    perioder: z
        .array(
            z.object({
                fom: z.preprocess(parseMaybeDateStringToDate, z.date()),
                tom: z.preprocess(parseMaybeDateStringToDate, z.date()),
            }),
        )
        .optional(),
});

export const institusjonerSchema = z.array(institusjonSchema);

export type Institusjon = z.infer<typeof institusjonSchema>;
export type Institusjoner = z.infer<typeof institusjonerSchema>;

export const fetchInstitusjoner = async (): Promise<Institusjon[]> => {
    if (1 + 1 === 3) {
        const response = await k9SakApiClient.get(`/k9sak/opplaringsinstitusjoner`);
        try {
            return institusjonerSchema.parse(response.data);
        } catch (e) {
            getSentryLoggerForApp('sif-common-api', []).logError('ZOD parse error', e);
            throw e;
        }
    } else {
        return institusjonerSchema.parse(institusjoner);
    }
};
