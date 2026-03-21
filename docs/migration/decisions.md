# Migration Decisions

Korte beslutninger som skal hjelpe neste migrering.

## Hvordan skrive en beslutning

- `Beslutning`: Hva vi valgte
- `Hvorfor`: Kort begrunnelse
- `Gjenbruk i neste app`: Hva neste migrering skal gjore likt
- `Etappe` (valgfri): `sif-soknad` | `stegskjema` | `datahenting`

## Decisions

### D-001 Fokusert workspace i monorepo

- Beslutning: Vi bruker samme monorepo-checkout, men med et fokusert VS Code workspace for pilotapp + demoapp + relevante pakker.
- Hvorfor: Gir smalere kontekst for agent og utvikler uten a miste riktig dependency-graf.
- Gjenbruk i neste app: Start med eget fokus-workspace, ikke egen repo-klone.
- Etappe: sif-soknad

### D-002 Dokumentasjonsniva

- Beslutning: Felles prinsipper ligger i `docs/migration`, mens app-spesifikke notater ligger i appens egen `docs`-mappe.
- Hvorfor: Reduserer stoy i fellesdokumentasjon og forenkler senere generalisering.
- Gjenbruk i neste app: Skriv lopende notater lokalt, flytt kun verifiserte monster til felles beslutninger.
- Etappe: sif-soknad

### D-003 Adapter-forst for legacy-avhengigheter

- Beslutning: Vi bruker adaptere i appen for legacy-avhengigheter forst, og bytter til `sif-soknad`/`sif-rhf` trinnvis.
- Hvorfor: Reduserer risiko, holder endringer lokale i pilotappen og minimerer paavirkning pa ikke-migrerte apper.
- Gjenbruk i neste app: Start med en liten adapterflate i appen, erstatt implementasjon bak adapter etter hvert.
- Etappe: datahenting

### D-004 Etappevis migrering uten fast rekkefolge

- Beslutning: Vi migrerer i etapper (`sif-soknad`, `stegskjema`, `datahenting`), men velger rekkefolge per app.
- Hvorfor: Apper har ulik kompleksitet, ulik avhengighetsflate og ulike risikoer.
- Gjenbruk i neste app: Velg start-etappe basert pa lavest risiko og hoyest laeringsverdi i den aktuelle appen.

### D-005 Standard oppstart for ny app (demo-baseline)

- Beslutning: Ny app starter med demo-baseline fra `apps/sif-demo-app` frem til og med `src/main.tsx` som renderer `<App />`, inkludert grunnoppsett for Sentry, Storybook, Vitest/Playwright-relatert setup og MSW.
- Hvorfor: Gir rask, forutsigbar bootstrap med kjent tooling og mindre beslutningskostnad tidlig i migreringen.
- Gjenbruk i neste app: Copy-first av baselinefiler, og kun minimale app-spesifikke justeringer i `package.json`, `vite.config.ts`, `vite.dev.config.ts` og `index.html`.
- Etappe: sif-soknad

### D-006 Verifisering etter bootstrap

- Beslutning: Etter bootstrap kjores fast valideringsrekkefolge i app-workspace: `yarn check:types`, `yarn lint:eslint`, `yarn build`, `yarn dev`, `yarn storybook`.
- Hvorfor: Fanger tidlig feil i config og runtime-forutsetninger for den nye appen, for man begynner feature-migrering.
- Gjenbruk i neste app: Forvent at `yarn test` kan feile med "No test files found" i bootstrapfasen; legg til tester senere i appfasen.
- Etappe: sif-soknad
