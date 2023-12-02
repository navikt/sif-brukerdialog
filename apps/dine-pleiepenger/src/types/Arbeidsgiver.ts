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
    vetIkkeEkstrainfo: z.union([z.string(), z.null()]),
    jobberNormaltTimer: z.number(),
    organisasjonsnummer: z.string(),
});

export const Organisasjoner = z.object({
    organisasjoner: z.array(OrganisasjonSchema),
});

export const ArbeidsgivereSchema = z.union([z.array(ArbeidsgiverSchema), Organisasjoner]);

export type Arbeidsgiver = z.infer<typeof ArbeidsgiverSchema>;
export type Arbeidsgivere = z.infer<typeof ArbeidsgivereSchema>;
