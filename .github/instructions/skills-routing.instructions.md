---
applyTo: '**'
---

# Skill Routing

## Obligatorisk arbeidsflyt

**STOPP** — Før du bruker verktøy, søker i kodebasen eller foreslår kode:

1. Skann brukerens melding mot signalordene under.
2. Hvis ett eller flere signalord matcher, les tilhørende `SKILL.md` FØR alt annet.
3. Følg skillens arbeidsmodus (f.eks. fase 1 → fase 2).
4. Oppgi i svaret hvilke skills som er brukt.

Bryt aldri denne rekkefølgen. Ingen verktøykall eller kodebase-søk skal skje før skill-matching er utført.

## Signalord til skill

- `sif-intl`:
    - Implementering: `i18n`, `intl`, `nb.ts`, `nn.ts`, `oversettelse`, `tekster`, `nynorsk`, `bokmål`, `legg til tekst`, `ny tekst`.
    - Hooks og komponenter: `AppText`, `useAppIntl`, `AppIntlShape`, `useSifSoknadUiIntl`, `SifSoknadUiText`, `typedIntlHelper`, `applicationIntlMessages`.
    - Sjekk: `parametersjekk`, `meningssjekk`, `{param}`, `plural`, `ICU`.
- `sif-api`:
    - API-henting i app: `hente fra api`, `api-kall`, `fetch`, `query`, `preutfyll fra api`, `last inn data`.
    - Hooks og query: `@sif/api`, `useQuery`, `queryKey`, `queryFn`, `useKontonummer`, `useSøker`, `useRegistrerteBarn`, `useYtelseMellomlagring`, `ApiErrorAlert`.
    - Oppsett: `env.schema.ts`, `initApiClients`, API-klient-init, `*_API_URL`, `*_API_SCOPE`, `*_FRONTEND_PATH`.
- `sif-soknad-setup`:
    - Oppsett av `src/app/setup`, `soknadContext`, `soknadStepConfig`, `useStepSubmit`, `useStepDefaultValues`.
- `monorepo-frontend`:
    - Generell frontend-arbeid i `apps/**` eller `packages/**`, workspace-scoping, lint/test-kjoring.
- `aksel-spacing`:
    - Layout/spacing med Aksel-komponenter (`Box`, `VStack`, `HStack`, `HGrid`) og spacing-tokens.
- `sif-migration-baseline`:
    - Migrering/bootstrapping av app til v2-oppsett.
- `sif-server-proxy-api-config`:
    - Feilsøking av API-path/proxy: `reverse proxy`, `proxy`, `returnerer html`, `html tilbake`, `catch-all`, `api path`.
    - Konfigkobling: `initApiClients`, `frontendPath`, `PUBLIC_PATH`, `*_FRONTEND_PATH`, `*_API_SCOPE`, `*_API_URL`.
    - Verifisering av app mot server: `server`, `ingress`, `oppslag/soker`, `oppslag/barn`, `baseURL`.

## Prioritering ved overlapp

- Hvis oppgaven handler om i18n, tekster, nb/nn eller oversettelse, prioriter `sif-intl`.
- Hvis oppgaven handler om datahenting + env/API-klient-oppsett, prioriter `@sif/api`.
- Rene domeneord alene (f.eks. `barn`, `søker`) skal ikke trigge `@sif/api` uten tydelig API-hentekontekst.
- Hvis oppgaven handler om setup-arkitektur i app, prioriter `sif-soknad-setup`.
- Bruk flere skills ved behov, men hold endringer scoped til aktuell workspace.
