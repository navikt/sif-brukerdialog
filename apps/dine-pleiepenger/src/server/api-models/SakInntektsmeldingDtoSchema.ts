import z from 'zod';

export const ArbeidsgiverSchema = z.object({
    navn: z.string().optional(),
    arbeidsgiverOrgnr: z.string(),
});

export const SakInntektsmeldingDtoSchema = z.object({
    saksnummer: z.string(),
    journalpostId: z.string(),
    arbeidsgiver: ArbeidsgiverSchema,
    startDatoPermisjon: z.string().optional(),
    mottattDato: z.string(),
    inntektBeløp: z.number(),
    innsendingstidspunkt: z.string(),
    kildesystem: z.string().optional(),
    erstattetAv: z.array(z.string()),
});

export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>;
