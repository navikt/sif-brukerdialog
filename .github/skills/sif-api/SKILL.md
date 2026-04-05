---
name: sif-api
description: Bruk denne skillen når en utvikler trenger å hente informasjon fra ett av API-ene i appen via @sif/api (f.eks. kontonummer, søker, barn, arbeidsgivere, mellomlagring).
---

# sif-api Skill

Denne skillen dekker kun valg av hook, nødvendig API-klient og påkrevd env-oppsett for `@sif/api`. I første respons skal agenten kun gi generell veiledning og et minimalt brukseksempel. Verifisering mot repo eller appfiler skjer bare når brukeren eksplisitt ber om det.

## Formål

Veiledning for å hente data i sif-brukerdialog-apper via `@sif/api`. Dekker hele kjeden: velge riktig hook, sette opp env-variabler og initialisere API-klienter.

## Når skal skillen brukes

- En utvikler legger til en ny datakilde i en eksisterende app.
- En utvikler feilsøker hvorfor et API-kall ikke fungerer (manglende env eller klient-init).
- En utvikler trenger å forstå sammenhengen mellom hook, API-klient og env-oppsett.

## Hurtigtrigger

Bruk denne skillen umiddelbart hvis oppgaven nevner ett eller flere av disse signalene:

- API-henting i frontend: `trenger data`, `hente informasjon om`, `hente fra api`, `api-kall`, `fetch`, `query`, `preutfyll fra api`, `last inn data`.
- Query/hook-integrasjon: `@sif/api`, `useQuery`, `queryKey`, `queryFn`, `useSøker`, `useRegistrerteBarn`, `useKontonummer`, `useYtelseMellomlagring`.
- API-klient/oppsett: `env.schema.ts`, `initApiClients`, `*_API_URL`, `*_API_SCOPE`, `*_FRONTEND_PATH`, API-klient-init.

Merk: Rene domeneord alene (f.eks. `barn`, `søker`) er ikke nok trigger uten tydelig API-hentekontekst.

## Avgrensning

- Fokus: `@sif/api` hooks, API-klient-initialisering, env-oppsett.
- Ikke inkludert: Server-side reverse proxy-konfigurasjon, UI-komponenter utover `ApiErrorAlert`.
- Query-adferd som direkte påvirker bruk av hookene (f.eks. caching, retry) er innenfor scope. Generell TanStack Query-bruk utover dette er det ikke.

> **Relatert skill:** Hvis API-kall returnerer HTML eller ikke treffer backend, er problemet sannsynligvis i proxy/path-konfigurasjon. Bruk [sif-server-proxy-api-config](../sif-server-proxy-api-config/SKILL.md) for å verifisere at `initApiClients`, nais-env og serverens reverse proxy matcher.

## Arbeidsmodus for agent

Denne skillen eier kun pipelinen: hook, API-klient og env-oppsett. Hva appen gjør med dataene (preutfylling, visning, validering) er app-spesifikt og utenfor scope.

**Agenten skal ikke bruke verktøy, inspisere workspace eller foreslå kodeendringer før brukeren eksplisitt ber om det.**

### Fase 1 — Generell veiledning (første respons)

Første respons skal kun gi generell veiledning basert på det brukeren har oppgitt. Ingen antakelser om repo-struktur utover det brukeren selv har fortalt.

Agenten skal, i denne rekkefølgen:

1. Identifisere riktig hook og hva den returnerer.
2. Identifisere nødvendig API-klient og hvordan den initialiseres.
3. Identifisere påkrevde env-variabler.
4. Gi et minimalt brukseksempel, f.eks. `const kontonummer = useKontonummer()`.

Regler for fase 1:

- Ikke utforsk repoet eller les appfiler.
- Ikke nevn konkrete filer i appen med mindre brukeren selv har oppgitt dem.
- Ikke start implementering eller kodeendringer.
- Ikke ta stilling til hvordan dataene skal brukes i appen — det er utenfor skillens scope.
- Hvis informasjon mangler, list opp antakelser eller spørsmål eksplisitt.

### Fase 2 — Verifisere oppsett

Aktiveres kun når brukeren eksplisitt ber om det (f.eks. «sjekk appen», «verifiser», «se i repoet»).

I denne fasen verifiserer agenten standardfilene dersom de finnes — typisk `env.schema.ts` og `initApiClients.ts` — og rapporterer hva som er på plass og hva som mangler. I denne fasen skal skillen kun rapportere status, ikke gjøre kodeendringer.

Ved verifisering av API-ruter (for eksempel ved MSW-oppsett):

- Endepunkt skal ikke gjettes.
- Agenten skal følge kjeden `hook -> api-funksjon -> SDK-klient -> url` for å finne faktisk path.
- Før ny MSW-handler foreslås eller legges til, skal faktisk request-path verifiseres i generert klientkode (for eksempel `sdk.gen.ts`).

---

## Tilgjengelige hooks

### `@sif/api/k9-prosessering` (k9-brukerdialog-prosessering-api)

| Hook                                                                   | Returnerer                                  | Typisk caching (per dagens impl.)  |
| ---------------------------------------------------------------------- | ------------------------------------------- | ---------------------------------- |
| `useSøker(enabled?)`                                                   | `Søker`                                     | staleTime: Infinity                |
| `useRegistrerteBarn(enabled?)`                                         | `RegistrertBarn[]`                          | staleTime: Infinity                |
| `useArbeidsgivere(enabled?)`                                           | Arbeidsgivere                               | —                                  |
| `useValiderFritekst(enabled?)`                                         | Valideringsresultat                         | —                                  |
| `useLagreVedlegg()`                                                    | Mutation for opplasting                     | Invaliderer vedlegg-cache          |
| `useSlettVedlegg()`                                                    | Mutation for sletting                       | Fjerner fra cache                  |
| `useYtelseMellomlagring<State, MetaData>(ytelse, metadata?, options?)` | `State \| null` + `opprett`/`lagre`/`slett` | staleTime: Infinity, gcTime: 5 min |
| `useRapporterInntekt()`                                                | Mutation for inntektsrapportering           | —                                  |
| `useSendOppgavebekreftelse()`                                          | Mutation for oppgavebekreftelse             | —                                  |

### Vedlegg-utilities (ikke hooks)

`@sif/api/k9-prosessering` eksporterer også rene funksjoner for vedlegg:

| Funksjon                                          | Returnerer     | Bruk                                                       |
| ------------------------------------------------- | -------------- | ---------------------------------------------------------- |
| `lagreVedlegg(file)`                              | Response       | Laster opp vedlegg (brukes i VedleggPanel)                 |
| `slettVedlegg(id)`                                | Response       | Sletter vedlegg (brukes i VedleggPanel)                    |
| `hentVedlegg(id)`                                 | Vedleggsdata   | Henter vedlegg                                             |
| `getVedleggFrontendUrl(id)`                       | `string`       | Frontend-proxy-URL for visning i nettleseren               |
| `getVedleggApiUrl(id)`                            | `string`       | Full backend-API-URL for innsending i DTO                  |
| `getVedleggIdFromResponseHeaderLocation(url)`     | `string`       | Ekstraher vedlegg-ID fra Location-header etter opplasting  |

`getVedleggFrontendUrl` bruker `K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH`, mens `getVedleggApiUrl` bruker `K9_BRUKERDIALOG_PROSESSERING_API_URL`.

### `@sif/api/ung-brukerdialog` (ung-brukerdialog-api)

| Hook                  | Returnerer  | Typisk caching |
| --------------------- | ----------- | -------------- |
| `useOppgaver(ytelse)` | `Oppgave[]` | —              |

### `@sif/api/ung-deltaker` (ung-deltakelse-opplyser-api-deltaker)

| Hook                       | Returnerer               | Typisk caching    |
| -------------------------- | ------------------------ | ----------------- |
| `useKontonummer(enabled?)` | `KontonummerDto \| null` | staleTime: 20 min |

---

## Hook → API-klient → Env-mapping

Hver hook avhenger av en spesifikk API-klient som må være initialisert, og tilhørende env-variabler må være satt.

### `@sif/api/k9-prosessering` — k9-brukerdialog-prosessering-api

**Hooks:** `useSøker`, `useRegistrerteBarn`, `useYtelseMellomlagring`, `useLagreVedlegg`, `useSlettVedlegg`, `useArbeidsgivere`, `useValiderFritekst`, `useRapporterInntekt`, `useSendOppgavebekreftelse`

| Element       | Verdi                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Pakke         | `@navikt/k9-brukerdialog-prosessering-api`                                                                                     |
| Init-funksjon | `initK9BrukerdialogProsesseringApiClients({ frontendPath, loginURL })`                                                         |
| Env-schema    | `commonEnvSchema` (fra `@navikt/sif-common-env`) — inkludert automatisk                                                        |
| Env-variabler | `K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH`, `K9_BRUKERDIALOG_PROSESSERING_API_SCOPE`, `K9_BRUKERDIALOG_PROSESSERING_API_URL` |

### `@sif/api/ung-brukerdialog` — ung-brukerdialog-api

**Hooks:** `useOppgaver`

| Element       | Verdi                                                                                          |
| ------------- | ---------------------------------------------------------------------------------------------- |
| Pakke         | `@navikt/ung-brukerdialog-api`                                                                 |
| Init-funksjon | `initUngBrukerdialogApiClient({ onUnAuthorized })`                                             |
| Env-variabler | `UNG_BRUKERDIALOG_API_FRONTEND_PATH`, `UNG_BRUKERDIALOG_API_SCOPE`, `UNG_BRUKERDIALOG_API_URL` |

### `@sif/api/ung-deltaker` — ung-deltakelse-opplyser-api-deltaker

**Hooks:** `useKontonummer`

| Element       | Verdi                                                                                                           |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| Pakke         | `@navikt/ung-deltakelse-opplyser-api-deltaker`                                                                  |
| Init-funksjon | `initUngDeltakelseOpplyserApiDeltakerClient({ onUnAuthorized })`                                                |
| Env-schema    | `ungDeltakelseOpplyserEnvSchema` (fra `@navikt/sif-common-env`)                                                 |
| Env-variabler | `UNG_DELTAKELSE_OPPLYSER_FRONTEND_PATH`, `UNG_DELTAKELSE_OPPLYSER_API_SCOPE`, `UNG_DELTAKELSE_OPPLYSER_API_URL` |

---

## Sjekkliste: Ta i bruk en hook (fase 2)

Denne sjekklisten brukes kun i fase 2, når brukeren eksplisitt ber om verifisering.

### 1. Finn hooken

Se tabellen over. Identifiser hvilken API-klient hooken avhenger av.

For endpoint-verifisering: følg alltid `hook -> api-funksjon -> SDK-klient -> url`.

### 2. Sjekk env-oppsett

Verifiser at appens `env.schema.ts` (typisk på app-root) har riktig env-schema extended:

```typescript
// env.schema.ts
import { commonEnvSchema, ungBrukerdialogApiEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';

export const appEnvSchema = z
    .object({
        /* app-spesifikke env-keys */
    })
    .extend(commonEnvSchema.shape) // k9-brukerdialog-prosessering
    .extend(ungBrukerdialogApiEnvSchema.shape) // kun hvis useOppgaver trengs
    .extend(ungDeltakelseOpplyserEnvSchema.shape); // kun hvis useKontonummer trengs
```

Mønsteret er alltid tre env-variabler per API: `*_FRONTEND_PATH`, `*_API_SCOPE`, `*_API_URL`.

### 3. Sjekk API-klient-initialisering

Verifiser at appens `src/app/api/initApiClients.ts` (eller tilsvarende) kaller riktig init-funksjon:

```typescript
// initApiClients.ts
import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { initUngBrukerdialogApiClient } from '@navikt/ung-brukerdialog-api';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';
import { EnvKey, getRequiredEnv } from '@navikt/sif-common-env';

export const initApiClients = () => {
    initK9BrukerdialogProsesseringApiClients({
        frontendPath: getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH),
        loginURL: '#',
    });
    // Kun hvis useOppgaver trengs:
    initUngBrukerdialogApiClient({
        onUnAuthorized: () => globalThis.location.reload(),
    });
    // Kun hvis useKontonummer trengs:
    initUngDeltakelseOpplyserApiDeltakerClient({
        onUnAuthorized: () => globalThis.location.reload(),
    });
};
```

### 4. Bruk hooken

Importer alltid fra det relevante domenet. Importér `ApiErrorAlert` fra rotnivå (`@sif/api`).

```typescript
import { useSøker, useRegistrerteBarn } from '@sif/api/k9-prosessering';
import { useOppgaver } from '@sif/api/ung-brukerdialog';
import { useKontonummer } from '@sif/api/ung-deltaker';
import { ApiErrorAlert } from '@sif/api';

const søker = useSøker();
const barn = useRegistrerteBarn();

if (søker.isLoading || barn.isLoading) return <Loader />;
if (søker.isError) return <ApiErrorAlert error={søker.error} />;
```

---

## Personvern — aldri logg aktørId eller fødselsnummer

**AktørId og fødselsnummer (fnr) er personidentifiserende og skal aldri skrives til logger, feilmeldinger eller konsoll.**

Eksempel på feil bruk:

```typescript
// FEIL — aktørId havner i logg/feilmelding
throw handleApiError(e, `hentSisteGyldigeVedtak-${aktørId}`);
```

Riktig praksis: bruk kun funksjonsnavn eller nøytral kontekst i feilmeldinger:

```typescript
// RIKTIG
throw handleApiError(e, 'hentSisteGyldigeVedtak');
```

Gjelder alle API-funksjoner i `packages/sif-api/src/api/**` og ethvert annet sted der disse verdiene er tilgjengelige.

---

## Feilhåndtering (ApiError)

Alle hooks kaster `ApiError` ved feil. Typen har tre varianter: `ValidationError` (Zod-parsing feiler), `NetworkError` (HTTP-feil) og `UnknownError`. Hvert feilobjekt inneholder `type`, `context` (hvilken API-funksjon som feilet), `message` og `originalError`.

Nyttige hjelpefunksjoner:

- `isApiAxiosError(error)` — type guard for `NetworkError` med tilgang til `originalError.response?.status`
- `ApiErrorAlert` — komponent som viser feil direkte i UI

---

## Mellomlagring (spesialtilfelle)

Denne seksjonen er kun relevant når oppgaven faktisk gjelder mellomlagring. `useYtelseMellomlagring` har et annet bruksmønster enn de enkle hookene.

### Konsept

- Lagrer søknadsdata midlertidig i backend med metadata-hash-validering.
- Hvis metadata (søker, barn, versjon) endres, slettes gammel mellomlagring automatisk.
- Hooken eksponerer to separate lagre-operasjoner: `opprett` (POST, brukes første gang søknaden startes) og `lagre` (PUT, brukes ved alle påfølgende lagringer).

### Bruksmønster

```typescript
import { useYtelseMellomlagring, MellomlagringYtelse } from '@sif/api/k9-prosessering';

const metadata = useMemo(
    () => ({
        MELLOMLAGRING_VERSJON: '0.0.1',
        søker: søker.data,
        barn: registrerteBarn.data,
    }),
    [søker.data, registrerteBarn.data],
);

const mellomlagring = useYtelseMellomlagring<SøknadState, MellomlagringMetaData>(
    MellomlagringYtelse.AKTIVITETSPENGER,
    metadata,
);

// Lese: mellomlagring.data
// Opprette (POST, ved søknadsstart): await mellomlagring.opprett(state)
// Lagre (PUT, ved navigering): await mellomlagring.lagre(state)
// Slette: await mellomlagring.slett()
```

### MellomlagringYtelse

Enum med alle støttede ytelser. Appen definerer sin ytelse som konstant:

```typescript
import { MellomlagringYtelse } from '@sif/api/k9-prosessering';
export const APP_YTELSE = MellomlagringYtelse.AKTIVITETSPENGER;
```

---

## Referansefiler

- `packages/sif-api/src/` — pakkens kildekode
- `packages/sif-common-env/src/schemas.ts` — tilgjengelige env-schemas og EnvKey enum
