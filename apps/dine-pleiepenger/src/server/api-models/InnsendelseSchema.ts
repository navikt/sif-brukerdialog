import { z } from 'zod';
import { k9FormatSøknadSchema } from './k9FormatSøknadSchema';
import { DokumentSchema } from './DokumenetSchema';
import { Innsendelsestype } from './Innsendelsestype';
import { OrganisasjonSchema } from './OrganisasjonSchema';
import { K9FormatEttersendelseSchema } from './K9FormatEttersendelseSchema';

const PleiepengerSøknadSchema = z.object({
    søknadId: z.string(),
    dokumenter: z.array(DokumentSchema),
    innsendelsestype: z.literal(Innsendelsestype.SØKNAD),
    k9FormatInnsendelse: k9FormatSøknadSchema,
    arbeidsgivere: z.array(OrganisasjonSchema).optional(),
});

const EndringsmeldingSchema = z.object({
    søknadId: z.string(),
    dokumenter: z.array(DokumentSchema),
    innsendelsestype: z.literal(Innsendelsestype.ENDRINGSMELDING),
    k9FormatInnsendelse: k9FormatSøknadSchema,
});

const EttersendelseSchema = z.object({
    søknadId: z.string(),
    dokumenter: z.array(DokumentSchema),
    innsendelsestype: z.literal(Innsendelsestype.ETTERSENDELSE),
    k9FormatInnsendelse: K9FormatEttersendelseSchema,
});

export type Pleiepengesøknad = z.infer<typeof PleiepengerSøknadSchema>;
export type PleiepengerEndringsmelding = z.infer<typeof EndringsmeldingSchema>;
export type PleiepengerEttersendelse = z.infer<typeof EttersendelseSchema>;

export type Innsendelse = Pleiepengesøknad | PleiepengerEndringsmelding | PleiepengerEttersendelse;

export const InnsendelseSchema = z.union([PleiepengerSøknadSchema, EndringsmeldingSchema, EttersendelseSchema]);
export const InnsendelserSchema = z.array(InnsendelseSchema);
