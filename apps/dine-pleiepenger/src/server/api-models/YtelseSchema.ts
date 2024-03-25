import { z } from 'zod';

export type Ytelse = z.infer<typeof YtelseSchema>;

export const YtelseSchema = z.object({
    type: z.enum(['PLEIEPENGER_SYKT_BARN']),
    søknadsperiode: z.array(z.string()),
    arbeidstid: z.object({
        arbeidstakerList: z.array(
            z.object({
                arbeidstidInfo: z.object({
                    perioder: z.record(
                        z.object({
                            faktiskArbeidTimerPerDag: z.string(),
                            jobberNormaltTimerPerDag: z.string(),
                        }),
                    ),
                }),
                organisasjonsnummer: z.string(),
            }),
        ),
    }),
});
