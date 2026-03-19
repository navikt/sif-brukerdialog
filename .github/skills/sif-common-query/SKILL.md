---
name: sif-common-query
description: Hjelper utviklere med å hente data via @navikt/sif-common-query — fra riktig hook, via env-oppsett til API-klient-initialisering.
---

# sif-common-query Skill

## Purpose

Guide for å hente data i sif-brukerdialog-apper via `@navikt/sif-common-query`. Dekker hele kjeden: velge riktig hook, sette opp env-variabler og initialisere API-klienter.

## When to use

- En utvikler trenger å hente data (søker, barn, kontonummer, arbeidsgivere, mellomlagring, vedlegg, fritekst-validering).
- En utvikler legger til en ny datakilde i en eksisterende app.
- En utvikler feilsøker hvorfor et API-kall ikke fungerer (manglende env eller klient-init).

## Scope

- Fokus: `@navikt/sif-common-query` hooks, API-klient-initialisering, env-oppsett.
- Ikke inkludert: Server-side reverse proxy-konfigurasjon, TanStack Query generelt, UI-komponenter utover `ApiErrorAlert`.

---

## Tilgjengelige hooks

| Hook | Returnerer | Caching |
|---|---|---|
| `useSøker(enabled?)` | `Søker` | staleTime: Infinity |
| `useRegistrerteBarn(enabled?)` | `RegistrertBarn[]` | staleTime: Infinity |
| `useArbeidsgivere(enabled?)` | Arbeidsgivere | — |
| `useKontonummer(enabled?)` | `KontonummerDto \| null` | staleTime: 20 min |
| `useValiderFritekst(enabled?)` | Valideringsresultat | — |
| `useLagreVedlegg()` | Mutation for opplasting | Invaliderer vedlegg-cache |
| `useSlettVedlegg()` | Mutation for sletting | Fjerner fra cache |
| `useYtelseMellomlagring<State, MetaData>(ytelse, metadata?, options?)` | `State \| null` + `lagre`/`slett` | staleTime: Infinity, gcTime: 5 min |

---

## Hook → API-klient → Env-mapping

Hver hook avhenger av en spesifikk API-klient som må være initialisert, og tilhørende env-variabler må være satt.

### k9-brukerdialog-prosessering-api

**Hooks:** `useSøker`, `useRegistrerteBarn`, `useYtelseMellomlagring`, `useLagreVedlegg`, `useSlettVedlegg`, `useArbeidsgivere`, `useValiderFritekst`

| Element | Verdi |
|---|---|
| Pakke | `@navikt/k9-brukerdialog-prosessering-api` |
| Init-funksjon | `initK9BrukerdialogProsesseringApiClients({ frontendPath, loginURL })` |
| Env-schema | `commonEnvSchema` (fra `@navikt/sif-common-env`) — inkludert automatisk |
| Env-variabler | `K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH`, `K9_BRUKERDIALOG_PROSESSERING_API_SCOPE`, `K9_BRUKERDIALOG_PROSESSERING_API_URL` |

### ung-deltakelse-opplyser-api-deltaker

**Hooks:** `useKontonummer`

| Element | Verdi |
|---|---|
| Pakke | `@navikt/ung-deltakelse-opplyser-api-deltaker` |
| Init-funksjon | `initUngDeltakelseOpplyserApiDeltakerClient({ onUnAuthorized })` |
| Env-schema | `ungDeltakelseOpplyserEnvSchema` (fra `@navikt/sif-common-env`) |
| Env-variabler | `UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH`, `UNG_DELTAKELSE_OPPLYSER_API_SCOPE`, `UNG_DELTAKELSE_OPPLYSER_API_URL` |

---

## Sjekkliste: Ta i bruk en hook

### 1. Finn hooken

Se tabellen over. Identifiser hvilken API-klient hooken avhenger av.

### 2. Sjekk env-oppsett

Åpne appens `env.schema.ts` (ligger på app-root). Verifiser at riktig env-schema er extended:

```typescript
// env.schema.ts
import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';

export const appEnvSchema = z
    .object({ /* app-spesifikke env-keys */ })
    .extend(commonEnvSchema.shape)                    // k9-brukerdialog-prosessering
    .extend(ungDeltakelseOpplyserEnvSchema.shape);    // kun hvis useKontonummer trengs
```

Mønsteret er alltid tre env-variabler per API: `*_FRONTEND_PATH`, `*_API_SCOPE`, `*_API_URL`.

### 3. Sjekk API-klient-initialisering

Åpne appens `src/app/api/initApiClients.ts`. Verifiser at riktig init-funksjon kalles:

```typescript
// initApiClients.ts
import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: '/aktivitetspenger-soknad/api',
        loginURL: '#',
    });
    // Kun hvis useKontonummer trengs:
    initUngDeltakelseOpplyserApiDeltakerClient({
        onUnAuthorized: () => globalThis.location.reload(),
    });
};
```

### 4. Bruk hooken

```typescript
import { useSøker, useRegistrerteBarn } from '@navikt/sif-common-query';

const søker = useSøker();
const barn = useRegistrerteBarn();

if (søker.isLoading || barn.isLoading) return <Loader />;
if (søker.isError) return <ApiErrorAlert error={søker.error} />;
```

---

## ApiError

Alle hooks kaster `ApiError` ved feil. Denne typen abstraherer underliggende feilkilder.

### Typer

| `ApiErrorType` | Når | `originalError` |
|---|---|---|
| `ValidationError` | Zod-parsing feiler (respons matcher ikke schema) | `ZodError` |
| `NetworkError` | HTTP-feil (401, 500, nettverksfeil) | `AxiosError` |
| `UnknownError` | Alt annet | `Error` |

### Felter

- `type` — `ApiErrorType` enum
- `context` — hvilken API-funksjon som feilet (f.eks. `'hentSøker'`)
- `message` — lesbar feilmelding
- `originalError` — underliggende feilobjekt

### Hjelpefunksjoner

- `isApiAxiosError(error)` — type guard for `NetworkError` med tilgang til `originalError.response?.status`
- `ApiErrorAlert` — komponent som viser feil direkte i UI

---

## Mellomlagring (spesialcase)

`useYtelseMellomlagring` har et annet bruksmønster enn de enkle hookene.

### Konsept

- Lagrer søknadsdata midlertidig i backend med metadata-hash-validering.
- Hvis metadata (søker, barn, versjon) endres, slettes gammel mellomlagring automatisk.
- Lagre-operasjonen prøver oppdatering først, faller tilbake til opprettelse ved 404.

### Bruksmønster

```typescript
import { useYtelseMellomlagring, MellomlagringYtelse } from '@navikt/sif-common-query';

const metadata = useMemo(() => ({
    MELLOMLAGRING_VERSJON: '0.0.1',
    søker: søker.data,
    barn: registrerteBarn.data,
}), [søker.data, registrerteBarn.data]);

const mellomlagring = useYtelseMellomlagring<SøknadState, MellomlagringMetaData>(
    MellomlagringYtelse.AKTIVITETSPENGER,
    metadata,
);

// Lese: mellomlagring.data
// Lagre: await mellomlagring.lagre(state)
// Slette: await mellomlagring.slett()
```

### MellomlagringYtelse

Enum med alle støttede ytelser. Appen definerer sin ytelse som konstant:

```typescript
import { MellomlagringYtelse } from '@navikt/sif-common-query';
export const APP_YTELSE = MellomlagringYtelse.AKTIVITETSPENGER;
```

---

## Referansefiler

- `packages/sif-common-query/src/` — pakkens kildekode
- `packages/sif-common-env/src/schemas.ts` — alle tilgjengelige env-schemas og EnvKey enum
