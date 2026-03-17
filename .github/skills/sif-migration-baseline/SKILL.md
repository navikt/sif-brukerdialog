# SIF Migration Baseline Skill

## Purpose

Provide a lightweight runbook for migrating a dialog app to the new setup using `sif-soknad` and `sif-rhf`.

## When to use

- You are migrating one app to a new v2 setup.
- You need focused execution without broad monorepo refactors.
- You need to capture reusable migration knowledge while implementing.

## Scope

- Primary target: current pilot app and directly related packages.
- Use a focused workspace view, but stay in the same monorepo checkout.
- Do not refactor unrelated apps unless explicitly requested.

## Working method

1. Keep implementation changes in the pilot app first.
2. Record app-specific findings in the app migration notes.
3. Promote confirmed patterns to `docs/migration`.
4. Update this skill only with stable, reusable guidance.

## Dependency strategy

- Prefer using existing shared packages as-is in early steps.
- Prefer adapters in the app over copying shared code.
- Replace with `sif-soknad`/`sif-rhf` incrementally when the path is clear.
- Copy code only when there is explicit ownership and a cleanup plan.

## Validation

- Run workspace-local scripts first (for example `lint:eslint`, `lint:tsc`, `test`).
- Run broader root checks only when needed (`yarn lint`, `yarn test`).

## Done criteria

- Pilot app compiles and passes relevant workspace checks.
- Main migration decisions are captured in `docs/migration/decisions.md`.
- Reusable lessons are promoted from app notes to shared docs.
