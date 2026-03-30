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
    - API-henting i app: `hente fra api`, `api-kall`, `fetch`, `react query`, `tanstack query`, `preutfyll fra api`, `last inn data`.
    - Hooks og query: `@sif/api`, `useQuery`, `queryKey`, `queryFn`, `useKontonummer`, `useSøker`, `useRegistrerteBarn`, `useYtelseMellomlagring`, `ApiErrorAlert`.
    - Oppsett: `env.schema.ts`, `initApiClients`, API-klient-init, `*_API_URL`, `*_API_SCOPE`, `*_FRONTEND_PATH`.
- `sif-soknad-setup`:
    - Oppsett av `src/app/setup`, `soknadContext`, `soknadStepConfig`, `useStepSubmit`, `useStepDefaultValues`.
- `sif-soknad-add-step`:
    - Legge til steg: `nytt steg`, `legg til steg`, `ny side i søknaden`, `opprett steg`, `førstesteg`, `neste steg`, `eget steg`, `egen side`.
    - Steg-filer: `StegUtils`, `FormFields`, `FormValues`, `SøknadStep`, `stepOrder`, `stepConfig`.
- `sif-soknad-modify-step`:
    - Endre eksisterende steg: `legg til spørsmål`, `nytt felt`, `ny checkbox`, `ny radiogruppe`, `utvid steg`, `følgespørsmål`, `betinget visning`, `vis bare hvis`.
    - Komponenter: `CheckboxGroup`, `RadioGroup`, `TextField`, `Datepicker`, `Select`, `createSifFormComponents`, `getListValidator`.
- `monorepo-frontend`:
    - Generell frontend-arbeid i `apps/**` eller `packages/**`, workspace-scoping, lint/test-kjoring.
- `aksel-spacing`:
    - Layout/spacing med Aksel-komponenter (`Box`, `VStack`, `HStack`, `HGrid`) og spacing-tokens.
- `sif-formik-to-rhf`:
    - Migrer skjema: `formik til rhf`, `konverter skjema`, `bytt ut formik`, `migrer form`, `erstatt formik`, `sif-common-formik-ds`.
    - Formik-konsepter: `FormikWrapper`, `getTypedFormComponents`, `getIntlFormErrorHandler`, `renderForm`.
- `sif-migration-baseline`:
    - Migrering/bootstrapping av app til v2-oppsett.
- `sif-initial-data-loader`:
    - Initial data-flyt: `useInitialData`, `InitialDataLoader`, `InitialData`, loading/error/success, required queries, optional queries, mellomlagringsvalidering.
    - Ny datakilde i initial-data: `legg til hook`, `ny datakilde`, `blokkerer loading`, `fallback-verdi`.
- `sif-server-proxy-api-config`:
    - Feilsøking av API-path/proxy: `reverse proxy`, `proxy`, `returnerer html`, `html tilbake`, `catch-all`, `api path`.
    - Konfigkobling: `initApiClients`, `frontendPath`, `PUBLIC_PATH`, `*_FRONTEND_PATH`, `*_API_SCOPE`, `*_API_URL`.
    - Verifisering av app mot server: `server`, `ingress`, `oppslag/soker`, `oppslag/barn`, `baseURL`.
- `sif-playwright`:
    - E2E-oppsett: `playwright`, `e2e`, `end-to-end`, `playwright.config`, `test:e2e`, `dev:e2e`.
    - Struktur: `vite.e2e.config`, `playwright/tests`, `scenario i playwright`, `browserrouter i test`.
    - Første tester: `smoke test`, `første e2e test`.
- `sif-playwright-a11y`:
    - Accessibility: `a11y`, `uu`, `universell utforming`, `axe`, `@axe-core/playwright`, `testAccessibility`.
    - Oppsett: `a11y i playwright`, `uu-test i e2e`.

## Prioritering ved overlapp

- Hvis oppgaven handler om i18n, tekster, nb/nn eller oversettelse, prioriter `sif-intl`.
- Hvis oppgaven handler om datahenting + env/API-klient-oppsett, prioriter `sif-api`.
- Rene domeneord alene (f.eks. `barn`, `søker`) skal ikke trigge `sif-api` uten tydelig API-hentekontekst.
- Hvis oppgaven handler om setup-arkitektur i app, prioriter `sif-soknad-setup`.
- Bruk flere skills ved behov, men hold endringer scoped til aktuell workspace.
- Hvis oppgaven handler om å legge til nye felter/spørsmål i et eksisterende steg, prioriter `sif-soknad-modify-step`. Hvis det er et helt nytt steg, prioriter `sif-soknad-add-step`.
- Hvis oppgaven handler om å bytte formik med rhf i et eksisterende skjema (uten nye felter), prioriter `sif-formik-to-rhf`.
- Hvis oppgaven handler om initial data-henting (kombinere hooks, loading/error-state før søknaden starter), prioriter `sif-initial-data-loader` over `sif-api`.
- Hvis oppgaven handler om Playwright/e2e-oppsett i app, prioriter `sif-playwright`.
- Hvis oppgaven handler om accessibility/axe i Playwright-tester, prioriter `sif-playwright-a11y`.
