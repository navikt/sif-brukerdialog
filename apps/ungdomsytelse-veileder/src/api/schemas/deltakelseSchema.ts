import { z } from 'zod';
import { parseMaybeDateStringToDate } from '@navikt/sif-common/src/utils/jsonParseUtils';

export const deltakelseSchema = z.object({
    id: z.string(),
    deltakerIdent: z.string(),
    fraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    tilOgMed: z.preprocess((val) => (val !== '' ? parseMaybeDateStringToDate(val) : null), z.date().optional()),
});
