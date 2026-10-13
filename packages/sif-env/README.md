# @sif/env

Felles lesing av offentlig runtime-konfigurasjon i SIF-søknadsdialoger. Konfigurasjonen leses i nettleseren fra `script#nav:appSettings`, eller fra `window.appSettings` når scriptet mangler.

Verdiene blir tilgjengelige i HTML og er derfor offentlige. De må aldri inneholde secrets, passord, tokens eller annen sensitiv informasjon.

Appen definerer og validerer sitt eget Zod-skjema før konfigurasjonen skrives til HTML:

```ts
import { baseEnvSchema, getBaseEnv, getRequiredEnv } from '@sif/env';
import * as z from 'zod';

const appEnvSchema = baseEnvSchema.extend({
    API_URL: z.string().url(),
});

type AppEnv = z.infer<typeof appEnvSchema>;

export const getAppEnv = (): AppEnv =>
    appEnvSchema.parse({
        ...getBaseEnv(),
        API_URL: getRequiredEnv('API_URL'),
    });
```
