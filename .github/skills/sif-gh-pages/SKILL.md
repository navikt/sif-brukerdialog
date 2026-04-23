---
name: sif-gh-pages
type: action
description: Legg til en v2-app i gh-pages demo-deploy — vite.demo.config.ts, gh-pages-scripts og workflow-steg.
---

# sif-gh-pages

## Bruk når

- En v2-app skal legges til i gh-pages-deployet.
- Demo-buildet mangler eller er ikke koblet til workflow.

## Leveranse

- `apps/<app>/vite.demo.config.ts` — Vite-config for demo-build
- `apps/<app>/mock/enableMocking.ts` — oppdatert med gh-pages MSW-url
- `apps/<app>/package.json` — scripts: `demo:build`, `gh-pages:rebuild`, `gh-pages:clean`, `gh-pages:copy`
- `.github/workflows/build-gh-pages.yml` — build- og kopi-steg

## Sjekkliste

### 1. `vite.demo.config.ts`

```ts
export default defineConfig({
    mode: 'msw',
    // ... plugins (kopier fra vite.dev.config.ts)
    base: '/sif-brukerdialog/<app-navn>/',
    define: {
        __IS_DEMO__: true,
        __IS_GITHUB_PAGES__: true,
        __INJECT_DECORATOR_CLIENT_SIDE__: false,
        __USE_FIXED_MOCKED_DATE__: false,
    },
    build: {
        sourcemap: true,
        outDir: './dist-demo',
        emptyOutDir: true,
    },
});
```

- Bruk `getDevAppSettings()` fra `./mock/devAppSettings` for `html-transform`-pluginen.
- Bruk `<app-navn>` konsekvent i `base` — dette bestemmer URL på gh-pages.

### 2. `mock/enableMocking.ts`

MSW registrerer service worker på feil URL når `base` ikke er `/`. Sett riktig URL eksplisitt:

```ts
export async function enableMocking() {
    if (import.meta.env.MODE !== 'msw') {
        return;
    }
    const { worker } = await import('./msw/browser');
    if (__IS_GITHUB_PAGES__) {
        return worker.start({
            serviceWorker: {
                url: import.meta.env.BASE_URL + 'mockServiceWorker.js',
            },
        });
    }
    return worker.start();
}
```

Ikke bruk `enableMockingBase` fra `@sif/api/mock-utils` her — den krever `ENV === 'development'` og støtter ikke gh-pages-URL.

### 3. `package.json` — scripts

Legg til under `scripts`:

```json
"demo:build": "vite build --config vite.demo.config.ts",
"gh-pages:rebuild": "run-s demo:build gh-pages:clean gh-pages:copy",
"gh-pages:clean": "rm -rf ../../docs/<app-navn>",
"gh-pages:copy": "cp -r ./dist-demo ../../docs/<app-navn>"
```

Legg til `npm-run-all` i `devDependencies` (versjon `4.1.5`) dersom den ikke finnes.

> Apper med `mockServiceWorker.js` i `public/` trenger ikke eget kopi-steg for den filen — Vite håndterer det automatisk under bygg.

### 4. `build-gh-pages.yml`

Legg til to steg rett før `Upload artifact`-steget:

```yaml
- name: Build <app-navn>
  run: yarn gh-pages:rebuild
  working-directory: apps/<app-navn>

- name: Kopier <app-navn> til gh-pages
  run: |
      mkdir -p deployment/<app-navn>
      mv apps/<app-navn>/dist-demo/* deployment/<app-navn>/
```

## Vanlige feil

| Problem                                             | Årsak                                     | Fix                                                                       |
| --------------------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------- |
| MSW klager i konsollen / service worker ikke funnet | Feil URL ved registrering                 | Sett `serviceWorker.url` i `enableMocking.ts`                             |
| Blank side eller 404 på gh-pages                    | `base` i Vite-config stemmer ikke med URL | Sjekk at `base` i `vite.demo.config.ts` = `/sif-brukerdialog/<app-navn>/` |
| `run-s` ikke funnet                                 | `npm-run-all` mangler                     | Legg til i `devDependencies`                                              |
| ScenarioHeader / scenariovelger vises ikke i demo   | `import.meta.env.PROD` er `true` i prod-build — skjuler komponenten selv på gh-pages | Bruk `__IS_GITHUB_PAGES__ \|\| __IS_DEMO__` som guard i stedet for `import.meta.env.PROD` |
