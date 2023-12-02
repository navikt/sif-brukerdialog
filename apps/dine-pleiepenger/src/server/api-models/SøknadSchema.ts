import { z } from 'zod';
import { parseMaybeDateStringToDate } from '../../utils/jsonParseUtils';
import { ArbeidsgiverSchema } from '../../types/Arbeidsgiver';

export enum Søknadsstatus {
    MOTTATT = 'MOTTATT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    FERDIG_BEHANDLET = 'FERDIG_BEHANDLET',
}

export enum Søknadstype {
    PP_ETTERSENDELSE = 'PP_ETTERSENDELSE',
    PP_SYKT_BARN = 'PP_SYKT_BARN',
    PP_SYKT_BARN_ENDRINGSMELDING = 'PP_SYKT_BARN_ENDRINGSMELDING',
}

enum SøknadDokumentFiltype {
    PDF = 'PDF',
}

const SøknadDokumentSchema = z.object({
    journalpostId: z.string(),
    dokumentInfoId: z.string(),
    sakId: z.string(),
    tittel: z.string(),
    filtype: z.nativeEnum(SøknadDokumentFiltype),
    harTilgang: z.boolean(),
    url: z.string(),
});

const PleiepengerSøknadInfoSchema = z.object({
    fraOgMed: z.string(), //z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    tilOgMed: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    mottatt: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    arbeidsgivere: z.array(ArbeidsgiverSchema),
});

const PleiepengerEndringsmeldingInfoSchema = z.object({
    // opprettet: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

const PleiepengerEttersendelseInfo = z.object({
    mottatt: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
});

const SøknadBaseSchema = z.object({
    søknadId: z.string(),
    status: z.nativeEnum(Søknadsstatus),
    journalpostId: z.string(),
    dokumenter: z.array(z.union([SøknadDokumentSchema, z.any()])),
    opprettet: z.preprocess((val) => parseMaybeDateStringToDate(val), z.date()),
    endret: z.union([z.null(), z.string(), z.preprocess((val) => parseMaybeDateStringToDate(val), z.date())]),
    behandlingsdato: z.union([z.null(), z.preprocess((val) => parseMaybeDateStringToDate(val), z.date())]),
});

const PleiepengerSøknadSchema = SøknadBaseSchema.extend({
    søknadstype: z.literal(Søknadstype.PP_SYKT_BARN),
    søknad: PleiepengerSøknadInfoSchema,
});

const EndringsmeldingSchema = SøknadBaseSchema.extend({
    søknadstype: z.literal(Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING),
    søknad: PleiepengerEndringsmeldingInfoSchema,
});

const EttersendelseSchema = SøknadBaseSchema.extend({
    søknadstype: z.literal(Søknadstype.PP_ETTERSENDELSE),
    søknad: PleiepengerEttersendelseInfo,
});

const SøknadSchema = z.discriminatedUnion('søknadstype', [
    PleiepengerSøknadSchema,
    EndringsmeldingSchema,
    EttersendelseSchema,
]);

export type Pleiepengesøknad = z.infer<typeof PleiepengerSøknadSchema>;
export type PleiepengerEttersendelse = z.infer<typeof EttersendelseSchema>;
export type PleiepengerEndringsmelding = z.infer<typeof EndringsmeldingSchema>;

export type Søknad = Pleiepengesøknad | PleiepengerEttersendelse | PleiepengerEndringsmelding;

export const SøknaderSchema = z.array(SøknadSchema);
