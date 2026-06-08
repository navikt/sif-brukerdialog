---
name: sif-codegen
type: referanse
description: Oversikt over hvordan codegen med @hey-api/openapi-ts er satt opp i monorepoet — pakker, scripts, post-prosessering og klient-initialisering.
---

# sif-codegen

## Bruk når

- Vi snakker om codegen, `@hey-api/openapi-ts`, genererte API-klienter eller `client.gen.ts`.
- Noen spør om hvorfor genererte filer ser ut som de gjør, eller vil endre post-prosesseringen.
- Vi skal legge til støtte for et nytt API (ny pakke med genererte klienter).

## Arkitektur

### Pakker med genererte klienter

Hvert API har sin egen pakke under `packages/`:

| Pakke                                  | API                                                      |
| -------------------------------------- | -------------------------------------------------------- |
| `k9-brukerdialog-prosessering-api`     | Søknadsinnsending (omsorgspenger, pleiepenger, etc.)     |
| `k9-sak-innsyn-api`                    | k9-sak-innsyn API (to separate configs: client + innsyn) |
| `k9-sak-innsyn-k9-sak-api`             | k9-sak API direkte                                       |
| `sif-innsyn-api`                       | sif-innsyn-api                                           |
| `ung-brukerdialog-api`                 | Ungdomsytelse brukerdialog API                           |
| `ung-deltakelse-opplyser-api-deltaker` | Deltaker-API                                             |
| `ung-deltakelse-opplyser-api-veileder` | Veileder-API                                             |

### Codegen-flyt

```
codegen:dev / codegen:prod
  └─ CODEGEN_ENV=dev|prod
      ├─ download-spec.mjs     → henter OpenAPI-spec fra dev/prod og lagrer i specs/
      ├─ openapi-ts            → genererer *.gen.ts fra spec (via openapi-ts.config*.ts)
      └─ fix-generated*.mjs   → kjører fixAndFormatGeneratedCode() fra codegenUtils.js
```

### Post-prosessering (`codegenUtils.js` i root)

`fixAndFormatGeneratedCode()` kjøres etter codegen og transformerer de genererte filene med regex-patterns:

| Pattern                    | Hva det gjør                                                                                                    |
| -------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `removeZodRegex`           | Fjerner `.regex(...)` fra Zod-schemas                                                                           |
| `removeNullUnion`          | Fjerner `\| null` fra `types.gen.ts` (null håndteres av `convertNullToUndefined`-interceptor i `initApiClient`) |
| `removeBaseUrlLiteral`     | Fjerner URL-literal fra `baseURL`-typen i `types.gen.ts`                                                        |
| `replaceClientBaseUrl`     | Erstatter hardkodet `baseURL` i `client.gen.ts` med `'SET_BY_INIT_API_CLIENT'`                                  |
| `fixTsExpectError`         | Bytter `@ts-expect-error` med `@ts-ignore`                                                                      |
| `fixIsoDateTimeAllowLocal` | Utvider `z.iso.datetime()` til å tillate local                                                                  |
| `fixVedleggBlobType`       | Fikser `vedlegg: z.string()` → `z.instanceof(Blob)`                                                             |

Etter regex-fixes kjøres `prettier` + `eslint --fix` på alle genererte filer.

### Generert filstruktur

Per API genereres det en mappe med:

- `client.gen.ts` — eksporterer `client`-instansen, `baseURL` settes til `'SET_BY_INIT_API_CLIENT'`
- `client/client.gen.ts` — lavnivå Axios-adapter (ikke berørt av baseURL-fix)
- `types.gen.ts` — TypeScript-typer og Zod-schemas
- `sdk.gen.ts` — typede SDK-funksjoner (klasse-basert)

### Klient-initialisering i app

`baseURL` i `client.gen.ts` er en placeholder. Den faktiske URL settes av `initApiClient()` ved oppstart:

```ts
// f.eks. i apps/min-app/src/api/initApiClients.ts
import { initApiClient } from '@navikt/k9-sak-innsyn-k9-sak-api/utils/initApiClient';
import { client } from '@navikt/k9-sak-innsyn-k9-sak-api';

export const initApiClients = () => {
    initApiClient(client, env.FRONTEND_PATH, env.LOGIN_URL);
};
```

`initApiClient` setter `baseURL`, `withCredentials`, headers, og legger på 401-interceptor.

> **Relatert skill:** Hvordan de genererte klientene faktisk brukes i en app (hooks, `initApiClients`, env-oppsett) er beskrevet i [sif-api](../sif-api/SKILL.md).

## Viktige filer

- `codegenUtils.js` (root) — delt post-prosesseringslogikk for alle pakker
- `packages/*/scripts/fix-generated-regex.mjs` — kaller `fixAndFormatGeneratedCode` fra root
- `packages/*/configs/openapi-ts.config*.ts` — codegen-konfig per API/miljø
- `packages/*/scripts/download-spec.mjs` — spec-nedlasting (bruker `CODEGEN_ENV`)
