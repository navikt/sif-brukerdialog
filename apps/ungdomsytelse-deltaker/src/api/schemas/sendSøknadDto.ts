import { z } from 'zod';

export const sendSøknadApiData = z.object({
    deltakelseId: z.string(),
    kontonummerStemmer: z.boolean(),
    barnStemmer: z.boolean(),
    bekrefterAnsvar: z.boolean(),
});

export type SendSøknadApiData = z.infer<typeof sendSøknadApiData>;
