# @sif/api-client

Felles oppsett av genererte Axios-klienter (`@hey-api/client-axios`) i SIF.

Pakken brukes av API-pakkene under `packages/api/*`. Apper skal normalt kalle init-funksjonen til API-pakken, ikke denne pakken direkte.

## `initApiClient(client, options)`

- Setter `baseURL` til `window.location.origin + frontendPath`.
- Setter `X-Brukerdialog-Git-Sha` som standardheader. `Content-Type` styres av hver genererte operasjon.
- Legger `X-Correlation-ID` på hver request.
- Gjør `null` om til `undefined` i JSON-responser. `Blob` og andre objekter som ikke er vanlige objekter, blir ikke endret.
- Ved 401 kalles `onUnauthorized`, og deretter sendes brukeren til `loginURL`.

| Valg                     | Standard      | Bruk                                       |
| ------------------------ | ------------- | ------------------------------------------ |
| `isUnauthorized`         | Status er 401 | Egen regel for når økten regnes som utløpt |
| `redirectOnUnauthorized` | `true`        | `false` gir bare `onUnauthorized`          |
| `headers`                | —             | Ekstra standardheadere                     |

## `commonRequestHeaders`

Headere for operasjoner der den genererte typen krever `X-Brukerdialog-Git-Sha`. Inneholder også `Content-Type: application/json`, så den skal ikke brukes ved opplasting av filer. Serveren overskriver SHA-verdien.

## Utvikling

```bash
pnpm lint:eslint
pnpm lint:tsc
pnpm test
```
