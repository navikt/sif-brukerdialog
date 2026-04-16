---
name: sif-server-proxy-api-config
description: Bruk denne skillen når en utvikler vil verifisere at en app er riktig satt opp med server, reverse proxy, init av API-klienter og env-variabler (PUBLIC_PATH, *_FRONTEND_PATH, *_API_SCOPE, *_API_URL).
---

# sif-server-proxy-api-config

Denne skillen er for end-to-end verifisering av at app, server og miljøkonfigurasjon matcher for API-kall i SIF-appene.

## Formål

Verifisere at API-kall faktisk treffer reverse proxy og ikke faller gjennom til SPA/catch-all (HTML-respons).

Dekker kjeden:

1. Appens API-klient-init
2. Appens env-oppsett
3. Serverens reverse proxy-oppsett
4. Faktisk request-path fra SDK/hook

## Når skal skillen brukes

- API-endepunkter returnerer HTML i stedet for JSON
- `/api/...` eller `/<public_path>/api/...` virker ikke som forventet
- Mistanke om mismatch mellom `initApiClients`, `nais/*.json` og `server/src/utils/reverseProxy.ts`
- Verifisering før deploy av ny app eller nytt path-prefix

## Hurtigtrigger

Bruk skillen umiddelbart ved ord/fraser som:

- `reverse proxy`, `proxy`, `html tilbake`, `returnerer html`, `catch all`
- `initApiClients`, `frontendPath`, `PUBLIC_PATH`
- `K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH`, `*_API_SCOPE`, `*_API_URL`
- `oppslag/soker`, `oppslag/barn`, `api path`, `baseURL`

## Avgrensning

- Fokus: konfigurasjons- og ruteverifisering for app + server + env
- Ikke fokus: UI, formvalidering, domene-/forretningslogikk
- Endringer skal være små og målrettede; unngå refaktorering

> **Relatert skill:** Denne skillen verifiserer at ruter og proxy er riktig konfigurert. For å forstå hvilke hooks som finnes, hvilke API-klienter de krever og hvordan env-variabler kobles til hookene, se [sif-api](../sif-api/SKILL.md).

## Arbeidsmodus

### Fase 1 - Diagnose (lese/verifisere)

Følg denne rekkefølgen:

1. Finn faktisk request-path:
    - Følg kjeden `hook -> api-funksjon -> SDK-klient -> url`
    - Ikke gjett endpoint

2. Verifiser app-init:
    - Sjekk appens `initApiClients.ts`
    - Verifiser `frontendPath` for relevante klienter
    - Foretrekk env-basert path fremfor hardkoding

3. Verifiser app-env:
    - Sjekk `env.schema.ts` har riktig schema (`commonEnvSchema`/ev. flere)
    - Sjekk `nais/dev-gcp.json` og `nais/prod-gcp.json` for:
        - `PUBLIC_PATH`
        - `*_FRONTEND_PATH`
        - `*_API_SCOPE`
        - `*_API_URL`

4. Verifiser server:
    - `server/src/utils/serverConfig.ts` leser env som proxy-definisjoner
    - `server/src/utils/reverseProxy.ts` registrerer `server.use(ingoingUrl, ...)`
    - bekreft at `ingoingUrl` matcher det frontend faktisk kaller

5. Konkluder med konkret mismatch:
    - Hvilken path frontend kaller
    - Hvilken path server proxier
    - Hvor mismatch oppstår

### Fase 2 - Fiks (kun når bruker ber om endring)

Tillatte tiltak:

1. Oppdater `initApiClients.ts` til korrekt path (helst env-styrt)
2. Oppdater appens `nais/*.json` path-variabler ved miljømismatch
3. Ikke endre server globalt uten eksplisitt beskjed

Anbefalt mønster for k9-brukerdialog:

- I app: bruk `getRequiredEnv(EnvKey.K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH)` som `frontendPath`
- I env:
    - dev kan være `/api/brukerdialog`
    - prod kan være `/<public_path>/api/brukerdialog`

## Sjekkliste for "riktig satt opp"

Alle punkter må være sanne:

1. `PUBLIC_PATH` matcher appens base/basename
2. Appens API-klient bruker samme `*_FRONTEND_PATH` som env
3. Serverens `ingoingUrl` (reverse proxy) er identisk med frontend-kallets base path
4. SDK-url (f.eks. `/oppslag/soker`) bygger korrekt full path sammen med base path
5. Request til endpoint returnerer ikke HTML/catch-all

## Vanlige feil

1. Frontend bruker `/api` mens proxy står på `/api/brukerdialog`
2. Hardkodet `frontendPath` i app som avviker fra `nais`-env
3. Dev/prod har ulike path-konvensjoner uten env-basert init
4. Test av feil URL (mangler prefikssegment)

## Forslag til responsformat ved verifisering

1. Funn (høyest alvorlighet først)
2. Konkrete fil-lokasjoner for mismatch
3. Minimal anbefalt fix
4. Hvilke URL-er som skal testes etter fix