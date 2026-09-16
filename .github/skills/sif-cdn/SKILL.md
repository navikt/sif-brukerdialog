---
name: sif-cdn
type: action
description: Sett opp og feilsøk CDN-hosting av Vite-assets og sourcemaps i SIF-appene.
---

# sif-cdn

## Bruk når

- En Vite-app skal laste JavaScript og CSS fra `cdn.nav.no`.
- CDN-assets gir 404 eller sourcemaps ikke deobfuskeres i Nais APM.
- En deploy-workflow skal laste opp `dist` til CDN.

## Oversikt

Appens HTML kommer fortsatt fra BFF-en i poden. Vite bygger HTML med CDN-URL-er for statiske assets, slik at nettleseren laster JavaScript, CSS og sourcemaps fra CDN.

```text
Browser -> appens ingress -> HTML fra pod
Browser -> cdn.nav.no -> JS, CSS og .map-filer
Nais telemetry collector -> cdn.nav.no -> .map-filer
```

## Viktige skiller

| Verdi | Ansvar | Ikke bruk den til |
| --- | --- | --- |
| Vite `base` | URL til buildede assets og `import.meta.env.BASE_URL` | Appnavigasjon, API-path eller serverruting |
| `PUBLIC_PATH` | Appens ingress, React Router-basename og navigasjon tilbake til appen | Asset-URL-er |

Bruk alltid `getAppEnv().PUBLIC_PATH` når kode navigerer til appens rot. `import.meta.env.BASE_URL` blir CDN-adressen i produksjonsbygget.

## Vite-oppsett

Hold lokal utvikling på appens eksisterende sti, og bruk CDN for produksjonsbygg:

```ts
export default defineConfig(({ mode }) => ({
    base:
        mode === 'production'
            ? 'https://cdn.nav.no/dusseldorf/<app-navn>/dist/'
            : '/<appens-eksisterende-public-path>/',
    build: {
        sourcemap: true,
    },
}));
```

Ikke send `--base` i `package.json`-scriptet; det overstyrer `vite.config.ts`.

```json
{
    "scripts": {
        "build": "vite build"
    }
}
```

`sourcemap: true` er nødvendig. Det produserer separate `.map`-filer ved siden av hver `.js`-fil og lar Nais APM deobfuskere stack traces.

## Workflow-oppsett

Bygg appen før CDN-opplasting. Last opp `dist` slik at actionen beholder `dist` som første segment under appens CDN-prefiks:

```yaml
- name: Upload assets to CDN
  uses: nais/deploy/actions/cdn-upload/v2@<commit-sha>
  with:
    team: dusseldorf
    source: apps/<app-navn>/dist
    destination: /<app-navn>
    project_id: ${{ vars.NAIS_MANAGEMENT_PROJECT_ID }}
    identity_provider: ${{ secrets.NAIS_WORKLOAD_IDENTITY_PROVIDER }}
```

For `apps-intern` brukes `source: apps-intern/<app-navn>/dist`.

Med oppsettet over blir en bundle tilgjengelig på:

```text
https://cdn.nav.no/dusseldorf/<app-navn>/dist/assets/<fil>.js
https://cdn.nav.no/dusseldorf/<app-navn>/dist/assets/<fil>.js.map
```

`destination: /<app-navn>/dist` er feil for denne `source`-verdien; det gir en dobbelt `dist/dist`-sti.

## Verifisering etter deploy

1. Åpne appen og kontroller i nettverksfanen at JS og CSS hentes fra `https://cdn.nav.no/dusseldorf/<app-navn>/dist/`.
2. Åpne en konkret asset-URL og dens `.map`-variant. Begge skal returnere innhold, ikke `NoSuchKey`.
3. Utløs en kontrollert frontend-feil og kontroller at Nais APM eller Grafana viser opprinnelige filnavn og linjenummer.

## Vanlige feil

| Symptom | Årsak | Løsning |
| --- | --- | --- |
| `NoSuchKey` på `.../dist/assets/...` | CDN-upload havnet på `.../dist/dist/assets/...` | Bruk `destination: /<app-navn>` for `source: .../dist` |
| Appen laster fortsatt assets fra poden | Produksjonsbygget får ikke CDN-base | Fjern CLI-flagget `--base`; kontroller at bygget bruker `mode === 'production'` |
| «Tilbake til forsiden» åpner CDN | `BASE_URL` brukes som approt | Bruk `getAppEnv().PUBLIC_PATH` |
| Minifiserte stack traces i APM | Manglende eller utilgjengelige `.map`-filer | Sett `sourcemap: true` og last opp hele `dist` |
| Workflow avviser `use-cdn` | Kaller peker på workflow-versjon uten inputen | Bruk lokal reusable workflow i samme commit eller deploy inputen først |
