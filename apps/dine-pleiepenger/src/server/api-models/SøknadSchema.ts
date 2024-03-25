import { z } from 'zod';
import { K9FormatSøknadSchema } from './K9FormatSøknadSchema';
import { DokumentSchema } from './DokumenetSchema';
import { Søknadstype } from './Søknadstype';
import { OrganisasjonSchema } from './OrganisasjonSchema';

const SøknadBaseSchema = z.object({
    dokumenter: z.array(DokumentSchema),
    søknadstype: z.nativeEnum(Søknadstype),
});

const PleiepengerSøknadSchema = SøknadBaseSchema.extend({
    k9FormatSøknad: K9FormatSøknadSchema,
    arbeidsgivere: z.array(OrganisasjonSchema).optional(),
});

const EndringsmeldingSchema = SøknadBaseSchema.extend({
    k9FormatSøknad: K9FormatSøknadSchema,
});

export const SøknadSchema = z.union([PleiepengerSøknadSchema, EndringsmeldingSchema]);

export type Pleiepengesøknad = z.infer<typeof PleiepengerSøknadSchema>;
export type PleiepengerEndringsmelding = z.infer<typeof EndringsmeldingSchema>;

export type Søknad = Pleiepengesøknad | PleiepengerEndringsmelding;

export const SøknaderSchema = z.array(SøknadSchema);
