import { z } from 'zod';
import { K9FormatSøknadSchema } from './K9FormatSøknadSchema';
import { InnsendtSøknadsstatus, InnsendtSøknadstype } from './InnsendtSøknadSchema';

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
    status: z.nativeEnum(InnsendtSøknadsstatus),
    dokumenter: z.array(z.union([SøknadDokumentSchema, z.any()])),
});

const PleiepengerSøknadSchema = SøknadBaseSchema.extend({
    søknadstype: z.nativeEnum(InnsendtSøknadstype),
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
    søknadstype: z.literal(InnsendtSøknadstype.PP_SYKT_BARN_ENDRINGSMELDING),
    k9FormatSøknad: K9FormatSøknadSchema,
});

export const SøknadSchema = z.union([PleiepengerSøknadSchema, EndringsmeldingSchema]);

export type Pleiepengesøknad = z.infer<typeof PleiepengerSøknadSchema>;
export type PleiepengerEndringsmelding = z.infer<typeof EndringsmeldingSchema>;

export type Søknad = Pleiepengesøknad | PleiepengerEndringsmelding;

export const SøknaderSchema = z.array(SøknadSchema);
