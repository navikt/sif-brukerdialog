import { z } from 'zod';

export const OrganisasjonSchema = z.object({
    navn: z.string(),
    skalJobbe: z.boolean(),
    skalJobbeProsent: z.number(),
    vetIkkeEkstrainfo: z.union([z.string(), z.null(), z.undefined()]),
    jobberNormaltTimer: z.number(),
    organisasjonsnummer: z.string(),
});
