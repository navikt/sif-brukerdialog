# @sif/api

API-funksjoner, typer og TanStack Query-hooks for v2-apper i SIF.

## Bruk

Importer hooks fra domenet de tilhører. `ApiErrorAlert`, feilhjelpere og `commonRequestHeaders` importeres fra rotnivå.

```tsx
import { ApiErrorAlert } from '@sif/api';
import { useSøker } from '@sif/api/k9-prosessering';

function MinKomponent() {
    const søker = useSøker();

    if (søker.isPending) return <Loader />;
    if (søker.isError) return <ApiErrorAlert error={søker.error} />;

    return <div>Hei {søker.data.fornavn}!</div>;
}
```

| Importsti                    | API                                    |
| ---------------------------- | -------------------------------------- |
| `@sif/api/k9-prosessering`   | `k9-brukerdialog-prosessering-api`     |
| `@sif/api/ung-brukerdialog`  | `ung-brukerdialog-api`                 |
| `@sif/api/ung-deltaker`      | `ung-deltakelse-opplyser-api-deltaker` |
| `@sif/api/k9-sak-innsyn-api` | `k9-sak-innsyn-api`                    |

Hooks og hvilke env-variabler de krever, står i `sif-api`-skillen (`.github/skills/sif-api/SKILL.md`).

## Forutsetninger

- Appen må kalle init-funksjonen til hver genererte API-pakke den bruker, for eksempel `initK9BrukerdialogProsesseringApiClients`, før første kall. Init-funksjonene bruker `initApiClient` fra `@sif/api-client`.
- Appen må ha en `QueryClientProvider` fra `@tanstack/react-query`.

## Feilhåndtering

API-funksjonene kaster `ApiError` med `type`, `context`, `message` og `originalError`. Unntaket er `lagreVedlegg`, som kaster den opprinnelige Axios-feilen fordi `useFileUploader` trenger `code` og `status`.

## Utvikling

```bash
pnpm lint:eslint
pnpm lint:tsc
pnpm test
```
