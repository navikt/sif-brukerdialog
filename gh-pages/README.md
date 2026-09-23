# gh-pages-forside

Forsiden som ligger på roten av <https://navikt.github.io/sif-brukerdialog/> og lenker til demoene
og storybookene som publiseres fra monorepoet.

## Kjør lokalt

```bash
pnpm --filter @navikt/sif-gh-pages-forside dev      # http://localhost:5180/sif-brukerdialog/
pnpm --filter @navikt/sif-gh-pages-forside build
pnpm --filter @navikt/sif-gh-pages-forside preview
```

Lenkene på siden er relative (`./storybook/`), så de peker riktig både lokalt og på GitHub Pages.
Lokalt vil de gi 404 fordi demoene ikke er bygget inn i samme `dist`.

## Legg til en ny side

1. Legg til build- og kopieringssteg i `.github/workflows/build-gh-pages.yml` (før stegene som
   bygger forsiden).
2. Legg til en oppføring i `src/sider.ts`. `path` må matche mappenavnet under `deployment/`.

Tekstene ligger direkte i `src/sider.ts` og kan redigeres fritt — ingen i18n.
