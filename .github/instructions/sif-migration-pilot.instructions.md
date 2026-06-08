---
applyTo: 'apps/omsorgspengesoknad-v2/**,apps/omsorgspengesoknad/**,apps/sif-demo-app/**,packages/sif-soknad/**,packages/sif-rhf/**,docs/migration/**,.github/skills/sif-migration-baseline/**'
---

# SIF migration pilot instructions

Use these instructions for the `omsorgspengesoknad-v2` migration pilot.

## Scope

- Keep implementation focus on `apps/omsorgspengesoknad-v2`.
- Use `apps/omsorgspengesoknad` as reference when needed.
- Use `apps/sif-demo-app` as baseline reference.
- Touch shared packages only when required for the pilot.

## Working rules

- Prefer small, app-local changes before shared refactors.
- Prefer adapter patterns in the app over broad cross-workspace rewrites.
- Do not refactor unrelated apps as part of pilot tasks.
- Capture stable lessons in `docs/migration`.
- Keep pilot-specific notes in `apps/omsorgspengesoknad-v2/docs/migration-notes.md`.

## Validation

- Run workspace-local checks first using available scripts (for example `lint:eslint`, `lint:tsc`, `test`).
- Run root-level checks only when broader verification is needed.
