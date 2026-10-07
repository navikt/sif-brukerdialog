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

### Post-prosessering (`scripts/codegen/codegenUtils.js`)

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

### Skjemanavn: fullt kvalifiserte klassenavn (FQN) → korte navn

Backend publiserer skjemanavn med fullt kvalifisert Java-klassenavn (f.eks. `no.nav.k9.søknad.felles.personopplysninger.Utenlandsopphold`). Ellers slår springdoc sammen klasser med samme navn uten å si fra, og vi får feil typer. Vi gjør navnene korte igjen i frontend med `parser.transforms.schemaName` i hey-api, som døper om skjemaet og oppdaterer alle `$ref`.

`createSchemaNameResolver(specPath)` i `codegenUtils.js`:

- Bruker siste ledd i navnet (`…Utenlandsopphold.UtenlandsoppholdPeriodeInfo` → `UtenlandsoppholdPeriodeInfo`). Indre klasser skilles med `.`.
- Kjente kollisjoner løses i den **felles** listen `scripts/codegen/schemaNameOverrides.js` (FQN → kort navn). Listen gjelder alle pakker. Nøklene er FQN, så de treffer bare riktig klasse.
- **Feiler hardt** ved kollisjoner som ikke er løst (sjekkes per spec). Den innebygde kollisjonshåndteringen i hey-api beholder stille FQN for den ene, avhengig av rekkefølgen i specen. Derfor må sjekken gjøres på forhånd.

Oppsett i en config (spec-stien er relativ til pakkeroten, der `openapi-ts` kjøres):

```ts
import { createSchemaNameResolver } from '../../../scripts/codegen/codegenUtils.js';

export const createConfig = (): UserConfig => ({
    input: './specs/innsyn.json',
    parser: {
        transforms: {
            schemaName: createSchemaNameResolver('./specs/innsyn.json'),
        },
    },
    // output, plugins …
});
```

Ved navnevalg i `scripts/codegen/schemaNameOverrides.js` skal varianten som allerede var i bruk, beholde det korte navnet, slik at konsumentkoden fortsatt kompilerer. Den andre får et prefiks (`Felles…`, `Psb…`, `K9…`). Samme klasse kan dukke opp i flere specer (f.eks. `no.nav.k9.søknad.*`), og da får den samme navn overalt.

Referanse: `packages/k9-sak-innsyn-api` (alle tre configs).

#### Innføre i en ny pakke

1. Backend publiserer FQN. Kjør `pnpm codegen:dev` (spec-nedlasting må gjøres av utvikler; den er blokkert i sandkassen).
2. Kartlegg navn og kollisjoner direkte fra `specs/*.json` (gitignored, men lesbar fra disk):
    ```bash
    node -e 'const n=Object.keys(require("./specs/X.json").components?.schemas??{});const g={};n.forEach(x=>{const k=x.split(".").pop();(g[k]??=[]).push(x)});Object.entries(g).filter(([,v])=>v.length>1).forEach(([k,v])=>console.log(k,"=>",v.join(" | ")))'
    ```
3. Sjekk hvilken variant dagens `types.gen.ts` (i git) tilsvarer, ved å sammenligne feltene. Den varianten beholder det korte navnet.
4. Legg inn `parser.transforms.schemaName` i config (for pakker med felles `createOpenApiConfig` i `configs/index.ts`: legg det inn der, med `input`-stien som `specPath`). Nye kollisjoner legges i `scripts/codegen/schemaNameOverrides.js`; sjekk først om klassen allerede står der.
5. Kjør pakkens genereringsscript (`pnpm gen-types:all:fixed` eller `pnpm gen-types:fixed`) → verifiser:
    - ingen `NoNav`/`no.nav` i `*.gen.ts`
    - ingen typenavn fjernet: `comm -23` på eksporterte navn i `HEAD:…/types.gen.ts` mot ny fil
    - `pnpm lint:tsc` i pakken og alle konsumenter (`grep -l '"@navikt/<pakke>"' apps/*/package.json …`)

Status: `parser.transforms.schemaName` er lagt inn i alle codegen-configs. Funksjonen endrer ikke navn uten punktum, så den gjør ingenting før backend publiserer fulle klassenavn. Fulle klassenavn er så langt tatt i bruk i `k9-sak-innsyn-api`. I de andre pakkene gjenstår trinn 1–3 og 5 når backend publiserer fulle klassenavn.

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

- `scripts/codegen/codegenUtils.js` — delt post-prosesseringslogikk og `createSchemaNameResolver` for alle pakker
- `scripts/codegen/schemaNameOverrides.js` — felles overrides for navnekollisjoner (FQN → kort navn)
- `packages/*/scripts/fix-generated-regex.mjs` — kaller `fixAndFormatGeneratedCode` fra `scripts/codegen/codegenUtils.js`
- `packages/*/configs/openapi-ts.config*.ts` eller `packages/*/openapi-ts.config.ts` — codegen-konfig per API/miljø
- `packages/*/scripts/download-spec.mjs` — spec-nedlasting (bruker `CODEGEN_ENV`)
