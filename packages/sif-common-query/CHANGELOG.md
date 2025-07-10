# Changelog

## 0.1.1

### Patch Changes

- Refactor generering av typer
- Updated dependencies
    - @navikt/k9-brukerdialog-prosessering-api@0.0.13
    - @navikt/k9-sak-innsyn-k9-sak-api@0.0.2

All notable changes to this project will be documented in this file.

## [0.1.0] - 2025-07-07

### Added

- Initial release of `@navikt/sif-common-query`
- `useSøker()` hook for fetching user information with TanStack Query
- Optimal caching strategy for static data (søker)
- TypeScript support with generated types from `@navikt/k9-brukerdialog-prosessering-api`
- Zod validation for runtime type safety
- Query keys for consistent cache management
