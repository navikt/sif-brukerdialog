import { z } from 'zod';
import { K9FormatSøknadSchema } from './K9FormatSøknadSchema';

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

const SøknadBaseSchema = z.object({
    søknadId: z.string(),
    status: z.nativeEnum(Søknadsstatus),
    dokumenter: z.array(z.union([SøknadDokumentSchema, z.any()])),
});

const PleiepengerSøknadSchema = SøknadBaseSchema.extend({
    søknadstype: z.literal(Søknadstype.PP_SYKT_BARN),
    k9FormatSøknad: K9FormatSøknadSchema,
    arbeidsgivere: z.object({
        organisasjoner: z.array(
            z.object({
                organisasjonsnummer: z.string(),
                navn: z.string(),
            }),
        ),
    }),
});

const EndringsmeldingSchema = SøknadBaseSchema.extend({
    søknadstype: z.literal(Søknadstype.PP_SYKT_BARN_ENDRINGSMELDING),
});

export const SøknadSchema = PleiepengerSøknadSchema;

export type Pleiepengesøknad = z.infer<typeof PleiepengerSøknadSchema>;
export type PleiepengerEndringsmelding = z.infer<typeof EndringsmeldingSchema>;

export type InnsendtSøknad = Pleiepengesøknad | PleiepengerEndringsmelding;

export const SøknaderSchema = z.array(SøknadSchema);
