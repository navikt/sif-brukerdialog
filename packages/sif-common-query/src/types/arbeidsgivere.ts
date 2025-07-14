import {
    zArbeidsgivereDto,
    zOrganisasjonDto,
    zPrivatArbeidsgiverDto,
    zFrilansoppdragDto,
} from '@navikt/k9-brukerdialog-prosessering-api';
import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../utils/dateUtils';

// Schema som konverterer string-dato til Date
const organisasjonSchema = zOrganisasjonDto.extend({
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

const privatArbeidsgiverSchema = zPrivatArbeidsgiverDto.extend({
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

const frilansoppdragSchema = zFrilansoppdragDto.extend({
    ansattFom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
    ansattTom: z.preprocess(parseMaybeDateStringToDate, z.date()).or(z.undefined()).or(z.null()),
});

export const arbeidsgivereSchema = zArbeidsgivereDto.extend({
    organisasjoner: z.array(organisasjonSchema),
    privateArbeidsgivere: z.array(privatArbeidsgiverSchema).optional(),
    frilansoppdrag: z.array(frilansoppdragSchema).optional(),
});

// Eksportere typer med nye navn
export type ArbeidsgiverOrganisasjon = z.infer<typeof organisasjonSchema>;
export type ArbeidsgiverPrivatperson = z.infer<typeof privatArbeidsgiverSchema>;
export type ArbeidsgiverFrilansoppdrag = z.infer<typeof frilansoppdragSchema>;
export type Arbeidsgivere = z.infer<typeof arbeidsgivereSchema>;
