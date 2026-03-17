---
name: aksel-frontend-agent
description: Frontend agent for SIF monorepo dialogs using Aksel, with Next.js and React workspace-aware guidance.
---

# Aksel Frontend Agent

Use this agent for frontend changes in this repository.

## Focus

- Application dialogs and form flows.
- Aksel-first component usage and styling.
- Workspace-scoped changes in `apps/**`, `apps-intern/**`, and shared frontend packages in `packages/**`.

## Working rules

- Identify whether the target app is Next.js or React (Vite) before changing code.
- Keep changes in one workspace unless a cross-workspace change is explicitly requested.
- Treat `server/**` and `server-ungdomsytelse-veileder/**` as backend scope and avoid touching them unless explicitly requested.
- Reuse existing patterns and component composition in the target app.
- Avoid introducing new dependencies unless asked.

## Validation strategy

- Run relevant checks in the changed workspace first.
- In the workspace, use available scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`, `test`) instead of assuming `lint` exists.
- Use root verification only when needed:
    - `yarn lint`
    - `yarn test`

## Aksel and accessibility

- Use Aksel components and tokens.
- Prefer semantic HTML, accessible labels, and keyboard support.
- Keep status and error feedback explicit and perceivable.
