import {
    zArbeidsgivereDto,
    zOrganisasjonDto,
    zPrivatArbeidsgiverDto,
    zFrilansoppdragDto,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../utils/dateUtils';

// Schemas with proper date parsing for arbeidsgivere
export const organisasjonDtoSchema = zOrganisasjonDto.extend({
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

export const privatArbeidsgiverDtoSchema = zPrivatArbeidsgiverDto.extend({
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

export const frilansoppdragDtoSchema = zFrilansoppdragDto.extend({
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

export const arbeidsgivereDtoSchema = zArbeidsgivereDto.extend({
    organisasjoner: z.array(organisasjonDtoSchema),
    privateArbeidsgivere: z.array(privatArbeidsgiverDtoSchema).optional(),
    frilansoppdrag: z.array(frilansoppdragDtoSchema).optional(),
});

export const hentArbeidsgivereResponseSchema = arbeidsgivereDtoSchema;

// Types with parsed dates
export type Organisasjon = z.infer<typeof organisasjonDtoSchema>;
export type PrivatArbeidsgiver = z.infer<typeof privatArbeidsgiverDtoSchema>;
export type Frilansoppdrag = z.infer<typeof frilansoppdragDtoSchema>;
export type Arbeidsgivere = z.infer<typeof arbeidsgivereDtoSchema>;
