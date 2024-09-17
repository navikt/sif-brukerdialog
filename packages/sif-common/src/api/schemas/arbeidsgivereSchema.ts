import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';

export const arbeidsgiverOrganisasjonSchema = z.object({
    organisasjonsnummer: z.string(),
    navn: z.string(),
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

export const arbeidsgiverPrivatSchema = z.object({
    offentligIdent: z.string(),
    navn: z.string(),
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

export const arbeidsgiverFrilansoppdragSchema = z.object({
    type: z.string(),
    organisasjonsnummer: z.string().nullable(),
    offentligIdent: z.string().nullable(),
    navn: z.string(),
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

export const arbeidsgivereResponseSchema = z.object({
    organisasjoner: z.array(arbeidsgiverOrganisasjonSchema),
    privatarbeidsgiver: z.array(arbeidsgiverPrivatSchema),
    frilansoppdrag: z.array(arbeidsgiverFrilansoppdragSchema),
});
