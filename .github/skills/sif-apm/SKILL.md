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

## Kritisk regel — `app`-nøkkelen MÅ matche NAIS deployment-navn

Grafana henter browser-telemetri under `<namespace>/<app>`. Verdien av `app` i `initApm`-kallet bestemmer hvilken nøkkel telemetrien lagres under.

```ts
// main.tsx
void initApm({ app: MinApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });
```

`MinApp.key` (fra `@navikt/sif-app-register`) **må** matche `app`-feltet i `nais/prod-gcp.json`:

```json
{ "app": "min-app-navn" }
```

Hvis disse ikke er identiske, finnes telemetrien ikke i Grafana.

---

## Slik verifiserer du

1. Finn NAIS app-navn:

    ```bash
    jq -r '.app' apps/<app-mappe>/nais/prod-gcp.json
    ```

2. Finn nøkkelen som sendes til `initApm`:

    ```bash
    grep -r "initApm" apps/<app-mappe>/src/ -A1
    ```

3. Sjekk at `SifAppKeys`-verdien i `packages/sif-app-register/src/index.ts` er identisk med NAIS app-navn.

---

## Legg til telemetri i ny app

1. Legg til `"@sif/apm": "workspace:*"` i appens `package.json`.

2. Legg til `"@navikt/sif-app-register": "workspace:*"` hvis appen ikke allerede har det.

3. Opprett eller gjenbruk en `AppInfo` i `packages/sif-app-register/src/index.ts`. Nøkkelen **må** matche NAIS deployment-navn:

    ```ts
    // packages/sif-app-register/src/index.ts
    export enum SifAppKeys {
        // ...
        MinNyApp = 'min-ny-app', // ← identisk med "app" i nais/prod-gcp.json
    }

    export const MinNyApp: AppInfo = {
        key: SifAppKeys.MinNyApp,
        // ...
    };
    ```

4. Kall `initApm` øverst i `main.tsx`, utenfor React-treet:

    ```ts
    import { initApm } from '@sif/apm';
    import { MinNyApp } from '@navikt/sif-app-register';
    import { getMaybeEnv } from '@navikt/sif-common-env';

    void initApm({ app: MinNyApp.key, namespace: 'dusseldorf', version: getMaybeEnv('APP_VERSION') });
    ```

5. Verifiser: `jq -r '.app' nais/prod-gcp.json` === `MinNyApp.key`.
