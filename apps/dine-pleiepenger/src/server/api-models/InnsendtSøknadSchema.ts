import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { ArbeidsgivereSchema } from './ArbeidsgivereSchema';

export enum InnsendtSøknadsstatus {
    MOTTATT = 'MOTTATT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    FERDIG_BEHANDLET = 'FERDIG_BEHANDLET',
}

export enum InnsendtSøknadstype {
    PP_ETTERSENDELSE = 'PP_ETTERSENDELSE',
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    PP_SYKT_BARN_ENDRINGSMELDING = 'PP_SYKT_BARN_ENDRINGSMELDING',
    UKJENT = 'UKJENT',
}

enum InnsendtSøknadDokumentFiltype {
    PDF = 'PDF',
}

const InnsendtSøknadDokumentSchema = z.object({
    journalpostId: z.string(),
    dokumentInfoId: z.string(),
    sakId: z.string(),
    tittel: z.string(),
    filtype: z.nativeEnum(InnsendtSøknadDokumentFiltype),
    harTilgang: z.boolean(),
    url: z.string(),
});

const PleiepengerSøknadInfoSchema = z.object({
    arbeidsgivere: ArbeidsgivereSchema,
});

const InnsendtSøknadBaseSchema = z.object({
    søknadId: z.string(),
    status: z.nativeEnum(InnsendtSøknadsstatus),
    journalpostId: z.string(),
    dokumenter: z.array(z.union([InnsendtSøknadDokumentSchema, z.any()])),
    opprettet: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    endret: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()).or(z.undefined()),
    behandlingsdato: z.union([z.null(), z.preprocess((val) => parseMaybeDateStringToDate(val), z.date())]),
});

const PleiepengerSøknadSchema = InnsendtSøknadBaseSchema.extend({
    søknadstype: z.literal(InnsendtSøknadstype.PP_SYKT_BARN),
    søknad: PleiepengerSøknadInfoSchema,
});

const EndringsmeldingSchema = InnsendtSøknadBaseSchema.extend({
    søknadstype: z.literal(InnsendtSøknadstype.PP_SYKT_BARN_ENDRINGSMELDING),
});

const EttersendelseSchema = InnsendtSøknadBaseSchema.extend({
    søknadstype: z.literal(InnsendtSøknadstype.PP_ETTERSENDELSE),
});

export const InnsendtSøknadSchema = z.discriminatedUnion('søknadstype', [
    PleiepengerSøknadSchema,
    EndringsmeldingSchema,
    EttersendelseSchema,
]);

export type InnsendtPleiepengesøknad = z.infer<typeof PleiepengerSøknadSchema>;
export type InnsendtPleiepengerEttersendelse = z.infer<typeof EttersendelseSchema>;
export type InnsendtPleiepengerEndringsmelding = z.infer<typeof EndringsmeldingSchema>;

export type InnsendtSøknad =
    | InnsendtPleiepengesøknad
    | InnsendtPleiepengerEttersendelse
    | InnsendtPleiepengerEndringsmelding;

export const InnsendtSøknaderSchema = z.array(InnsendtSøknadSchema);
