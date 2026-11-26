---
name: sif-apm
type: referanse
description: Bruk denne skillen for å sette opp, feilsøke eller verifisere browser-telemetri via @sif/apm (initApm / @nais/apm / Faro) i sif-apper.
---

# sif-apm

## Bruk når

- En app mangler data i Grafana ("No browser telemetry data found").
- En ny app skal sende browser-telemetri.
- Nøkkelen i `initApm` skal verifiseres mot NAIS-konfigurasjonen.

## Hurtigtrigger

- `initApm`, `@sif/apm`, `@nais/apm`, telemetri, Faro, Grafana
- "ingen telemetri", "no browser telemetry data found"

---

## Normalregel: `app`-nøkkelen matcher NAIS deployment-navn

Grafana henter browser-telemetri under `<namespace>/<app>`. Verdien av `app` i `initApm`-kallet bestemmer hvilken nøkkel telemetrien lagres under. I en normal deployment skal den matche det aktuelle NAIS-navnet.

```ts
// main.tsx
import { initApm } from '@sif/apm';
import { PleiepengerSyktBarnApp } from '@sif/app-register';
import { getMaybeEnv } from '@sif/env';

void initApm({ app: PleiepengerSyktBarnApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });
```

`PleiepengerSyktBarnApp.key` (fra `@sif/app-register`) skal normalt matche `app`-feltet i `nais/prod-gcp.json`:

```json
{ "app": "pleiepengesoknad" }
```

Hvis verdiene ikke er identiske, havner telemetrien ikke under deployment-navnet du forventer i Grafana.

### Midlertidig v1/v2-overgang

Under en kontrollert overgang kan v1 og v2 deployes under forskjellige NAIS-navn mens de beholder samme produktnøkkel i analytics og app-status. Dette er et midlertidig, dokumentert unntak fra en direkte nøkkelkobling i `@sif/app-register`.

Ikke endre produktnøkkelen eller NAIS-navnet bare for å få verdiene til å se like ut. Ved overgangen der v2 erstatter v1, verifiser dev- og prod-navn på nytt og koble `initApm` til v2-ens endelige deployment-navn. Fjern den midlertidige avgrensningen som del av cutover.

---

## Slik verifiserer du

1. Finn NAIS app-navn:

    ```bash
    jq -r '.app' apps/<app-mappe>/nais/prod-gcp.json
    ```

2. Finn nøkkelen som sendes til `initApm` og sjekk eventuelle miljøvalg:

    ```bash
    grep -r "initApm" apps/<app-mappe>/src/ -A1
    ```

3. Sjekk vanligvis at `SifAppKeys`-verdien i `packages/core/sif-app-register/src/index.ts` er identisk med NAIS app-navn. Ved v1/v2-overgang må en eventuell avvikende verdi være eksplisitt dokumentert frem til cutover.

---

## Legg til telemetri i ny app

1. Legg til `"@sif/apm": "workspace:*"` i appens `package.json`.

2. Legg til `"@sif/app-register": "workspace:*"` hvis appen ikke allerede har det.

3. Opprett en ny `AppInfo` i `packages/core/sif-app-register/src/index.ts`. Nøkkelen **må** matche NAIS deployment-navn:

    ```ts
    // packages/core/sif-app-register/src/index.ts
    export enum SifAppKeys {
        // ...
        MinSoknadApp = 'min-soknad', // ← identisk med "app" i nais/prod-gcp.json
    }

    export const MinSoknadApp: AppInfo = {
        key: SifAppKeys.MinSoknadApp,
        navn: 'Min søknad',
        tittel: { nb: 'Søknad om ...', nn: 'Søknad om ...' },
    };
    ```

4. Kall `initApm` øverst i `main.tsx`, utenfor React-treet:

    ```ts
    import { initApm } from '@sif/apm';
    import { MinSoknadApp } from '@sif/app-register';
    import { getMaybeEnv } from '@sif/env';

    void initApm({ app: MinSoknadApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });
    ```

5. Verifiser: `jq -r '.app' apps/<app-mappe>/nais/prod-gcp.json` skal være identisk med `MinSoknadApp.key`.
