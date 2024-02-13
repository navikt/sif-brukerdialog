import { z } from 'zod';
import { K9FormatSøknadSchema } from './K9FormatSøknadSchema';
import { InnsendtSøknadstype } from './InnsendtSøknadSchema';
import { DokumentSchema } from './DokumenetSchema';

const SøknadBaseSchema = z.object({
    dokumenter: z.array(DokumentSchema),
});

const PleiepengerSøknadSchema = SøknadBaseSchema.extend({
    søknadstype: z.nativeEnum(InnsendtSøknadstype).or(z.undefined()),
    k9FormatSøknad: K9FormatSøknadSchema,
    arbeidsgivere: z
        .object({
            organisasjoner: z.array(
                z.object({
                    organisasjonsnummer: z.string(),
                    navn: z.string(),
                }),
            ),
        })
        .optional(),
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
