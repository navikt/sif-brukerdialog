# sif-brukerdialog

Monorepo for søknadsdialoger og felleskode under Sykdom i familien.

## Teknologi

| Kategori | Teknologi                                                                   |
| -------- | --------------------------------------------------------------------------- |
| Språk    | TypeScript, React                                                           |
| Bygg     | Vite (de fleste apper), Next.js (dine-pleiepenger, omsorgsdager-kalkulator) |
| Monorepo | Turborepo, Yarn Workspaces                                                  |
| Styling  | Tailwind CSS, NAV Aksel designsystem                                        |
| Testing  | Vitest, Playwright (e2e)                                                    |
| Server   | Express                                                                     |

## Struktur

```
apps/              # Produksjonsapper (deployes til prod)
apps-intern/       # Interne apper (deployes til intern-prod)
packages/          # Delte pakker brukt av appene
server/            # Felles server for prod-apper
server-ungdomsytelse-veileder/  # Server for intern-app
```

## Kom i gang

```bash
yarn install       # Installer alle avhengigheter
yarn dev           # Start bygg og watch på packages
```

Gå deretter til aktuell app og kjør `yarn dev` der.

## Scripts

| Kommando     | Beskrivelse                           |
| ------------ | ------------------------------------- |
| `yarn build` | Bygger alle apper og pakker           |
| `yarn test`  | Kjører alle tester                    |
| `yarn clean` | Sletter node_modules og build-foldere |
| `yarn lint`  | Kjører linting på alle pakker         |

## Utvikling

### Jobbe med én app

1. Kjør `yarn dev` i rot-mappen (starter watch på packages)
2. Kjør `yarn dev` i app-mappen

### Endringer i packages

Når du endrer kode i `packages/`, vil avhengige apper automatisk oppdateres via Turborepo.

## Deploy

### Automatisk deploy

Ved push til `main` deployes kun apper som er påvirket av endringene. Turborepo analyserer avhengighetstreet og finner ut hvilke apper som må bygges og deployes.

**Eksempel:**

- Endring i `apps/dine-pleiepenger` → kun den appen deployes
- Endring i `packages/sif-common-core-ds` → alle apper som bruker pakken deployes
- Endring i `server/` → alle prod-apper deployes

### Manuell deploy

Du kan trigge deploy manuelt via GitHub Actions → "Deploy apps to prod" → "Run workflow".

### Merge-strategi

Ved merge av PR anbefales **squash merge** eller **merge commit**. Unngå rebase merge da dette kan trigge flere deploy-runs.

## Kode generert av GitHub Copilot

Dette repoet bruker GitHub Copilot til å generere kode.
