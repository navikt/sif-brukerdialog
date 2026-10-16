# @sif/mock-utils

Verktøy for mock-oppsett og mock-tilstand i v2-apper i SIF. Pakken inneholder ikke testdata. Testdata ligger i `@sif/api/mock-data`.

## Innhold

- `enableMocking` starter MSW-workeren når `ENV` er `development` og modus er `msw` eller `playwright`.
- `createStore` holder mock-tilstand som MSW-handlere, Playwright-ruter og demo-scenarioer deler. Den bruker `createLocalStorageStore` i nettleseren og `createMemoryStore` ellers.

## Bruk

```ts
import { createStore } from '@sif/mock-utils';
```

## Utvikling

```bash
pnpm lint:eslint
pnpm lint:tsc
pnpm test
```
