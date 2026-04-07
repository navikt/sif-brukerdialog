---
applyTo: '**'
---

# Skill Routing

## Arbeidsflyt

Før verktøykall eller kodebase-søk: skann brukerens melding mot signalordene under. Hvis ett eller flere matcher, les tilhørende `SKILL.md` som første skritt. Følg skillens arbeidsmodus og prioriteringsregler.

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
    - Routing shell og pages: `Soknad.tsx`, `VelkommenPage`, `KvitteringPage`, `steps/index.ts`, `pages/index.ts`, `routing-skall`, `sett opp sider`, `legg til routing`.
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
- `sif-soknad-oppsummering`:
    - Oppsett av oppsummeringssteg: `oppsummering`, `OppsummeringSteg`, `sett opp oppsummering`, `ny oppsummering`, `oppsummeringsside`.
    - Innhold: `FormSummary`, `OmSøkerOppsummering`, `OmBarnetOppsummering`, `VedleggOppsummering`, bekreftelsescheckbox.
    - Innsendingsfeil: `innsendingsfeil`, `InnsendingFeiletAlert`, `invalidParameters`, `getInvalidParametersFromApiError`, `feil ved innsending`.
- `sif-soknad-vedlegg-step`:
    - Legge til filvedlegg i et steg: `vedlegg`, `last opp`, `filvedlegg`, `VedleggPanel`, `PersistedVedlegg`, `lagreVedlegg`, `slettVedlegg`, `FileUpload`.
    - Vedlegg-hjelpere: `toPersistedVedlegg`, `isUploadedVedlegg`, `toUploadedFile`, `getVedleggApiUrl`, `getVedleggFrontendUrl`, `backendUrl`.

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
- Hvis oppgaven handler om å sette opp `Soknad.tsx`, `VelkommenPage`, `KvitteringPage` eller `steps/index.ts`, prioriter `sif-soknad-setup`.
- Hvis oppgaven handler om å sette opp eller fylle inn innhold i `OppsummeringSteg`, prioriter `sif-soknad-oppsummering`.
- Hvis oppgaven handler om filvedlegg i et steg (`VedleggPanel`, `PersistedVedlegg`, opplasting), prioriter `sif-soknad-vedlegg-step`.
