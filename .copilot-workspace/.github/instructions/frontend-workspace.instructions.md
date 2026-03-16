---
applyTo: '**/*.{ts,tsx,js,jsx}'
---

# Frontend workspace instructions

Use these instructions for frontend work in focused SIF workspaces.

## Scope

- Applies to React and Next.js workspaces opened as focused app/package folders.
- Keep changes scoped to the app or package currently being edited unless cross-workspace changes are explicitly requested.

## UI and forms

- Use Aksel components and existing app patterns.
- Preserve functional behavior when refactoring forms, including validation, error visibility, and accessible feedback.
- Keep labels, descriptions, and error messages explicit and perceivable.

## Validation and checks

- Run checks in the affected workspace first.
- Use available scripts such as `lint:eslint`, `lint:tsc`, `lint:fix`, and `test` instead of assuming `lint` exists.
- Use root scripts only when broader verification is needed.

## Change policy

- Avoid repo-wide config changes to solve a local issue.
- Prefer minimal diffs and avoid unrelated formatting changes.
