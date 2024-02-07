import { z } from 'zod';

export type Ytelse = z.infer<typeof YtelseSchema>;

export const YtelseSchema = z.object({
    // barn: z.object({
    //     norskIdentitetsnummer: z.string(),
    //     fødselsdato: z.union([z.string(), z.null()]),
    // }),
    type: z.enum(['PLEIEPENGER_SYKT_BARN']),
    // "søknadsperiode": ["2022-12-01/2023-01-31", "2023-02-14/2023-08-16"],
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
