import { z } from 'zod';

import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export const arbeidsgiverOrganisasjonSchema = z.object({
    organisasjonsnummer: z.string(),
    navn: z.string(),
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date().optional().nullable()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date().optional().nullable()),
});

export const arbeidsgiverPrivatSchema = z.object({
    offentligIdent: z.string(),
    navn: z.string(),
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date().optional().nullable()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date().optional().nullable()),
});

export const arbeidsgiverFrilansoppdragSchema = z.object({
    type: z.string(),
    organisasjonsnummer: z.string().nullable(),
    offentligIdent: z.string().optional().nullable(),
    navn: z.string().optional().nullable(),
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date().optional().nullable()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date().optional().nullable()),
});

export const arbeidsgivereResponseSchema = z.object({
    organisasjoner: z.array(arbeidsgiverOrganisasjonSchema),
    privateArbeidsgivere: z.array(arbeidsgiverPrivatSchema).optional(),
    frilansoppdrag: z.array(arbeidsgiverFrilansoppdragSchema).optional(),
});
