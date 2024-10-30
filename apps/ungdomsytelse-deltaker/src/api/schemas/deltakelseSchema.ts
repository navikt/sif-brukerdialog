import { z } from 'zod';
import { parseMaybeDateStringToDate } from '@navikt/sif-common-api/src/utils/jsonParseUtils';

export const deltakelseSchema = z.object({
    id: z.string(),
    deltakerIdent: z.string(),
    fraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    tilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date().optional()),
    harSøkt: z.boolean().nullable().optional(),
});

export const deltakelseSøktForSchema = z.object({
    id: z.string(),
    deltakerIdent: z.string(),
    fraOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    tilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    harSøkt: z.boolean().nullable().optional(),
});
