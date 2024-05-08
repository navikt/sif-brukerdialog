import { z } from 'zod';
import { K9FormatSøknadSchema } from './K9FormatSøknadSchema';
import { DokumentSchema } from './DokumenetSchema';
import { Søknadstype } from './Søknadstype';
import { OrganisasjonSchema } from './OrganisasjonSchema';
import { K9FormatEttersendelseSchema } from './K9FormatEttersendelseSchema';

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

const EttersendelseSchema = SøknadBaseSchema.extend({
    ettersendelse: K9FormatEttersendelseSchema,
});

export type Pleiepengesøknad = z.infer<typeof PleiepengerSøknadSchema>;
export type PleiepengerEndringsmelding = z.infer<typeof EndringsmeldingSchema>;
export type PleiepengerEttersendelse = z.infer<typeof EttersendelseSchema>;

export type Søknad = Pleiepengesøknad | PleiepengerEndringsmelding | PleiepengerEttersendelse;

export const SøknadSchema = z.union([PleiepengerSøknadSchema, EndringsmeldingSchema, EttersendelseSchema]);
export const SøknaderSchema = z.array(SøknadSchema);
