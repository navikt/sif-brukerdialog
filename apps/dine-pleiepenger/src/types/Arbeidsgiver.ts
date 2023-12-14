import { z } from 'zod';

export const ArbeidsgiverSchema = z.object({
    erAnsatt: z.boolean(),
    navn: z.string(),
    organisasjonsnummer: z.string(),
    sluttetFørSøknadsperiode: z.union([z.undefined(), z.boolean()]),
});

const OrganisasjonSchema = z.object({
    navn: z.string(),
    skalJobbe: z.string(),
    skalJobbeProsent: z.number(),
    vetIkkeEkstrainfo: z.union([z.string(), z.null(), z.undefined()]),
    jobberNormaltTimer: z.number(),
    organisasjonsnummer: z.string(),
});

export const OrganisasjonerSchema = z.object({
    organisasjoner: z.array(OrganisasjonSchema),
});

export const ArbeidsgivereSchema = z.union([z.array(ArbeidsgiverSchema), OrganisasjonerSchema, z.any()]);

export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>;
export type Arbeidsgivere = z.infer<typeof ArbeidsgivereSchema>;
