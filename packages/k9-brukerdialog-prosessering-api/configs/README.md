# OpenAPI Configuration Files

This directory contains all OpenAPI TypeScript configuration files for generating API clients.

## Configuration Files

Each configuration file corresponds to a specific API endpoint:

- `openapi-ts.config-omsorgspenger.ts` - Omsorgspenger (kronisk sykt barn)
- `openapi-ts.config-ungdomsytelse.ts` - Ungdomsytelse
- `openapi-ts.config-ettersendelse.ts` - Ettersendelse
- `openapi-ts.config-omsorgspenger-aleneomsorg.ts` - Omsorgspenger aleneomsorg
- `openapi-ts.config-omsorgspenger-midlertidig-alene.ts` - Omsorgspenger midlertidig alene
- `openapi-ts.config-omsorgspengerutbetaling-arbeidstaker.ts` - Omsorgspengerutbetaling arbeidstaker
- `openapi-ts.config-omsorgspengerutbetaling-snf.ts` - Omsorgspengerutbetaling SNF
- `openapi-ts.config-opplaeringspenger.ts` - Opplæringspenger
- `openapi-ts.config-pleiepenger-livets-sluttfase.ts` - Pleiepenger livets sluttfase
- `openapi-ts.config-pleiepenger-sykt-barn-endringsmelding.ts` - Pleiepenger sykt barn endringsmelding
- `openapi-ts.config-pleiepenger-sykt-barn-soknad.ts` - Pleiepenger sykt barn søknad
- `openapi-ts.config.ts` - Legacy configuration (full API)

## Usage

Generate types for all APIs:

```bash
yarn gen-types:all:fixed
```

Generate types for a specific API:

```bash
yarn gen-types:omsorgspenger
yarn gen-types:ungdomsytelse
# etc.
```

All configurations follow the same pattern using:

- `@hey-api/client-axios` for HTTP client
- `zod` for runtime validation
- TypeScript enums
- SDK with class-based approach
- Automatic prettier formatting and ESLint linting
