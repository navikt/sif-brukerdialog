import { zOrganisasjon } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';
import { z } from 'zod';

import { zOptionalDateFromISODateString } from './zDateFromString';

const innsendtSøknadArbeidsgivereSchema = z.union([
    z.array(
        z.object({
            erAnsatt: z.boolean(),
            navn: z.string(),
            organisasjonsnummer: z.string(),
            sluttetFørSøknadsperiode: z.preprocess((val) => (val === null ? undefined : val), z.boolean().optional()),
        }),
    ),
    z.object({
        organisasjoner: z.array(zOrganisasjon),
    }),
]);

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

const innsendtSøknadDokumentSchema = z.object({
    journalpostId: z.string(),
    dokumentInfoId: z.string(),
    sakId: z.string(),
    tittel: z.string(),
    filtype: z.enum(InnsendtSøknadDokumentFiltype),
    harTilgang: z.boolean(),
    url: z.string(),
});

const pleiepengerSøknadInfoSchema = z.object({
    arbeidsgivere: innsendtSøknadArbeidsgivereSchema,
    fraOgMed: zOptionalDateFromISODateString,
    tilOgMed: zOptionalDateFromISODateString,
});

const innsendtSøknadBaseSchema = z.object({
    søknadId: z.string(),
    status: z.enum(InnsendtSøknadsstatus),
    journalpostId: z.string(),
    dokumenter: z.array(z.union([innsendtSøknadDokumentSchema, z.any()])),
    opprettet: zOptionalDateFromISODateString,
    endret: zOptionalDateFromISODateString,
    behandlingsdato: zOptionalDateFromISODateString,
});

const pleiepengerSøknadSchema = innsendtSøknadBaseSchema.extend({
    søknadstype: z.literal(InnsendtSøknadstype.PP_SYKT_BARN),
    søknad: pleiepengerSøknadInfoSchema,
});

const endringsmeldingSchema = innsendtSøknadBaseSchema.extend({
    søknadstype: z.literal(InnsendtSøknadstype.PP_SYKT_BARN_ENDRINGSMELDING),
});

const ettersendelseSchema = innsendtSøknadBaseSchema.extend({
    søknadstype: z.literal(InnsendtSøknadstype.PP_ETTERSENDELSE),
});

export const innsendtSøknadSchema = z.discriminatedUnion('søknadstype', [
    pleiepengerSøknadSchema,
    endringsmeldingSchema,
    ettersendelseSchema,
]);

export type InnsendtPleiepengesøknad = z.infer<typeof pleiepengerSøknadSchema>;
export type InnsendtPleiepengerEttersendelse = z.infer<typeof ettersendelseSchema>;
export type InnsendtPleiepengerEndringsmelding = z.infer<typeof endringsmeldingSchema>;

export type InnsendtSøknad =
    | InnsendtPleiepengesøknad
    | InnsendtPleiepengerEttersendelse
    | InnsendtPleiepengerEndringsmelding;

export const innsendteSøknaderSchema = z.array(innsendtSøknadSchema);
