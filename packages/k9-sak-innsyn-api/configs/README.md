# OpenAPI Configuration Files

This directory contains all OpenAPI TypeScript configuration files for generating API clients.

## Configuration Files

Each configuration file corresponds to a specific API endpoint:

- `openapi-ts.config-innsyn.ts` - K9 Sak Innsyn API
- `openapi-ts.config-k9-sak.ts` - K9 Sak API
- `openapi-ts.config.ts` - Legacy configuration (full API)

## Usage

Generate types for all APIs:

```bash
yarn gen-types:all:fixed
```

Generate types for a specific API:

```bash
yarn gen-types:innsyn
yarn gen-types:k9-sak
yarn gen-types:legacy
```

All configurations follow the same pattern using:

- `@hey-api/client-axios` for HTTP client
- `zod` for runtime validation
- TypeScript enums
- SDK with class-based approach
- Automatic prettier formatting and ESLint linting
