# sif-brukerdialog

Monorepo for selvbetjeningsdialoger og fellespakker i Sykdom i familien.

## Struktur

| Mappe                            | Innhold                                                               |
| -------------------------------- | --------------------------------------------------------------------- |
| `apps/`                          | Brukerrettede søknadsapper (React/Next.js)                            |
| `apps-intern/`                   | Interne verktøy og veilederflater                                     |
| `packages/`                      | Delte pakker og biblioteker                                           |
| `server/`                        | Backend-server (proxying og autentisering) for de fleste apper        |
| `server-ungdomsytelse-veileder/` | Backend-server (proxying og autentisering) for ungdomsytelse veileder |

## Kom i gang

```bash
pnpm install
```

Gå deretter inn i en app-mappe og start dev-serveren:

```bash
cd apps/<app-navn>
pnpm dev
```

De fleste apper og pakker med grensesnitt har også Storybook:

```bash
pnpm storybook
```

## Testing

| Verktøy    | Bruksområde                        | Kommando                    |
| ---------- | ---------------------------------- | --------------------------- |
| Vitest     | Enhetstester og integrasjonstester | `pnpm test`                 |
| Playwright | E2E- og GUI-tester                 | `pnpm pw:run` (i app-mappe) |

## Scripts

### Bygg og kvalitet

| Kommando                     | Beskrivelse                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `pnpm build`                 | Bygg alle applikasjoner                                      |
| `pnpm build --concurrency=2` | Bygg med redusert parallellitet (anbefalt for Next.js-apper) |
| `pnpm test`                  | Kjør alle tester i apps og packages                          |
| `pnpm lint`                  | Kjør alle lint-sjekker                                       |

### Vedlikehold

| Kommando            | Beskrivelse                                                                   |
| ------------------- | ----------------------------------------------------------------------------- |
| `pnpm clean`        | Fjern build-output via Turbo                                                  |
| `pnpm clean-all`    | Fjern build-output og alle `node_modules`                                     |
| `pnpm up -irL`      | Interaktiv oppdatering av pakker                                              |
| `pnpm format`       | Formater alle `.ts`, `.tsx` og `.md`-filer                                    |
| `pnpm codegen:dev`  | Generer TypeScript-klienter fra OpenAPI-specs (mot dev-miljø, i pakke-mappe)  |
| `pnpm codegen:prod` | Generer TypeScript-klienter fra OpenAPI-specs (mot prod-miljø, i pakke-mappe) |

## Versjonering og publisering av pakker

Interne pakker i `packages/` versjoneres med [`@changesets/cli`](https://www.npmjs.com/package/@changesets/cli). Applikasjoner versjoneres ikke så lenge det føles naturlig ved større endringer.

Arbeidsflyt ved endringer i en pakke:

```bash
pnpm changeset          # beskriv endringen
pnpm changeset version  # bump versjoner og oppdater avhengigheter
```

## Deploy

### Produksjon

Applikasjoner deployes automatisk til prod ved push til `main` dersom det er endringer under applikasjonens path. Dette styres av GitHub Actions-workflows per app.

### Dev

Deploy til dev skjer **ikke** automatisk ved merge til `main`. Det kjøres manuelt via GitHub Actions — enten enkeltvis ("Deploy app to dev") eller for flere apper samtidig via de øvrige dispatch-workflowene.

## GitHub Copilot

Repoet har et sett med Copilot-skills under [`.github/skills/`](.github/skills/) som gir Copilot domenekunnskap om vanlige oppgaver — som å legge til steg i en søknad, sette opp i18n, migrere skjemaer fra Formik til RHF og mer. Se [`.github/skills/README.md`](.github/skills/README.md) for oversikt.
