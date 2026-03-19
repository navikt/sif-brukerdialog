---
name: sif-common-query
description: Bruk denne skillen når en utvikler trenger å hente informasjon fra ett av API-ene i appen via @navikt/sif-common-query (f.eks. kontonummer, søker, barn, arbeidsgivere, mellomlagring).
---

# sif-common-query Skill

Denne skillen dekker kun valg av hook, nødvendig API-klient og påkrevd env-oppsett for `@navikt/sif-common-query`. I første respons skal agenten kun gi generell veiledning og et minimalt brukseksempel. Verifisering mot repo eller appfiler skjer bare når brukeren eksplisitt ber om det.

## Formål

Veiledning for å hente data i sif-brukerdialog-apper via `@navikt/sif-common-query`. Dekker hele kjeden: velge riktig hook, sette opp env-variabler og initialisere API-klienter.

## Når skal skillen brukes

- En utvikler legger til en ny datakilde i en eksisterende app.
- En utvikler feilsøker hvorfor et API-kall ikke fungerer (manglende env eller klient-init).
- En utvikler trenger å forstå sammenhengen mellom hook, API-klient og env-oppsett.

## Hurtigtrigger

Bruk denne skillen umiddelbart hvis oppgaven nevner ett eller flere av disse signalene:

- API-henting i frontend: `trenger data`, `hente informasjon om`, `hente fra api`, `api-kall`, `fetch`, `query`, `preutfyll fra api`, `last inn data`.
- Query/hook-integrasjon: `@navikt/sif-common-query`, `useQuery`, `queryKey`, `queryFn`, `useSøker`, `useRegistrerteBarn`, `useKontonummer`, `useYtelseMellomlagring`.
- API-klient/oppsett: `env.schema.ts`, `initApiClients`, `*_API_URL`, `*_API_SCOPE`, `*_FRONTEND_PATH`, API-klient-init.

Merk: Rene domeneord alene (f.eks. `barn`, `søker`) er ikke nok trigger uten tydelig API-hentekontekst.

## Avgrensning

- Fokus: `@navikt/sif-common-query` hooks, API-klient-initialisering, env-oppsett.
- Ikke inkludert: Server-side reverse proxy-konfigurasjon, UI-komponenter utover `ApiErrorAlert`.
- Query-adferd som direkte påvirker bruk av hookene (f.eks. caching, retry) er innenfor scope. Generell TanStack Query-bruk utover dette er det ikke.

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

---

## Tilgjengelige hooks

| Hook                                                                   | Returnerer                        | Typisk caching (per dagens impl.)  |
| ---------------------------------------------------------------------- | --------------------------------- | ---------------------------------- |
| `useSøker(enabled?)`                                                   | `Søker`                           | staleTime: Infinity                |
| `useRegistrerteBarn(enabled?)`                                         | `RegistrertBarn[]`                | staleTime: Infinity                |
| `useArbeidsgivere(enabled?)`                                           | Arbeidsgivere                     | —                                  |
| `useKontonummer(enabled?)`                                             | `KontonummerDto \| null`          | staleTime: 20 min                  |
| `useValiderFritekst(enabled?)`                                         | Valideringsresultat               | —                                  |
| `useLagreVedlegg()`                                                    | Mutation for opplasting           | Invaliderer vedlegg-cache          |
| `useSlettVedlegg()`                                                    | Mutation for sletting             | Fjerner fra cache                  |
| `useYtelseMellomlagring<State, MetaData>(ytelse, metadata?, options?)` | `State \| null` + `lagre`/`slett` | staleTime: Infinity, gcTime: 5 min |

---

## Hook → API-klient → Env-mapping

Hver hook avhenger av en spesifikk API-klient som må være initialisert, og tilhørende env-variabler må være satt.

### k9-brukerdialog-prosessering-api

**Hooks:** `useSøker`, `useRegistrerteBarn`, `useYtelseMellomlagring`, `useLagreVedlegg`, `useSlettVedlegg`, `useArbeidsgivere`, `useValiderFritekst`

| Element       | Verdi                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Pakke         | `@navikt/k9-brukerdialog-prosessering-api`                                                                                     |
| Init-funksjon | `initK9BrukerdialogProsesseringApiClients({ frontendPath, loginURL })`                                                         |
| Env-schema    | `commonEnvSchema` (fra `@navikt/sif-common-env`) — inkludert automatisk                                                        |
| Env-variabler | `K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH`, `K9_BRUKERDIALOG_PROSESSERING_API_SCOPE`, `K9_BRUKERDIALOG_PROSESSERING_API_URL` |

### ung-deltakelse-opplyser-api-deltaker

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

### 2. Sjekk env-oppsett

Verifiser at appens `env.schema.ts` (typisk på app-root) har riktig env-schema extended:

```typescript
// env.schema.ts
import { commonEnvSchema, ungDeltakelseOpplyserEnvSchema } from '@navikt/sif-common-env';

export const appEnvSchema = z
    .object({
        /* app-spesifikke env-keys */
    })
    .extend(commonEnvSchema.shape) // k9-brukerdialog-prosessering
    .extend(ungDeltakelseOpplyserEnvSchema.shape); // kun hvis useKontonummer trengs
```

Mønsteret er alltid tre env-variabler per API: `*_FRONTEND_PATH`, `*_API_SCOPE`, `*_API_URL`.

### 3. Sjekk API-klient-initialisering

Verifiser at appens `src/app/api/initApiClients.ts` (eller tilsvarende) kaller riktig init-funksjon:

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
- Lagre-operasjonen prøver oppdatering først, faller tilbake til opprettelse ved 404.

### Bruksmønster

```typescript
import { useYtelseMellomlagring, MellomlagringYtelse } from '@navikt/sif-common-query';

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
- `packages/sif-common-env/src/schemas.ts` — tilgjengelige env-schemas og EnvKey enum
