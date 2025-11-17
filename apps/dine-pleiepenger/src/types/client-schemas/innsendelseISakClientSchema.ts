import { innsyn } from '@navikt/k9-sak-innsyn-api';
import z from 'zod';

import { Ettersendelsestype } from '../EttersendelseType';
import { Innsendelsestype } from '../Innsendelsestype';
import { dokumentClientSchema } from './dokumentClientSchema';
import { zDateFromDateTimeString } from './zDateFromString';

/**
 * Generert skjema stemmer ikke med respons (feil i swagger skjema)
 * definerer eget med kun de dataene vi bruker
 * */
const ytelseISakSchema = z.object({
    type: z.enum(['PLEIEPENGER_SYKT_BARN']),
    arbeidstid: z.object({
        arbeidstakerList: z.array(
            z.object({
                organisasjonsnummer: z.string(),
            }),
        ),
    }),
});

/** Baseskjema for innsendelse som vi bruker i løsningen */
const innsendelseISak = innsyn.zInnsendelserISakDto.extend({
    mottattTidspunkt: zDateFromDateTimeString,
    dokumenter: z.array(dokumentClientSchema),
    innsendelsestype: z.enum(Innsendelsestype),
    k9FormatInnsendelse: innsyn.zInnsending.extend({
        søknadId: z.string(), // Optional i skjema, overstyrer
        mottattDato: zDateFromDateTimeString,
        ytelse: ytelseISakSchema,
    }),
});

export const søknadISakSchema = innsendelseISak.extend({
    innsendelsestype: z.literal(Innsendelsestype.SØKNAD),
});

const endringsmeldingISakSchema = innsendelseISak.extend({
    innsendelsestype: z.literal(Innsendelsestype.ENDRINGSMELDING),
});

const ettersendelseISakSchema = innsendelseISak.extend({
    innsendelsestype: z.literal(Innsendelsestype.ETTERSENDELSE),
    /** Annet format, overstyr for ettersendelse */
    k9FormatInnsendelse: z.object({
        type: z.enum(Ettersendelsestype).nullable().optional(),
    }),
});

export const innsendelseISakClientSchema = z.discriminatedUnion('innsendelsestype', [
    søknadISakSchema,
    endringsmeldingISakSchema,
    ettersendelseISakSchema,
]);
