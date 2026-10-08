# AGENTS.md

## Repository Overview

Monorepo for selvbetjeningsdialoger og fellespakker i Sykdom i familien.

## Repository Structure

- Frontend code is in `apps/**`, `apps-intern/**`, and shared packages in `packages/**`.
- Backend services are in `server/**` and `server-ungdomsytelse-veileder/**`.

## Tech Stack

- TypeScript and JavaScript
- React and Next.js apps
- pnpm workspaces
- Turborepo
- Vitest

## Build and Test Commands

```bash
pnpm install --frozen-lockfile
pnpm build
pnpm lint
pnpm test
```

For targeted work, run commands from the affected workspace where possible.

## Working Rules

- Follow existing patterns in each app or package.
- Prefer minimal, focused changes.
- Run relevant workspace tests before broad test runs.
- Reuse existing lint and typecheck scripts.
- Verifiser hvilken funksjon som faktisk kalles før du beskriver en regel- eller atferdsendring. Nesten like funksjonsnavn i samme fil kan skjule at den ene er i bruk og den andre kun brukes til logging.
- Tester skrevet ut fra en antakelse om dagens oppførsel bekrefter antakelsen i stedet for å etterprøve den. Les implementasjonen og kallstedene før du skriver tester som skal låse oppførsel.
- Kommenter beslutninger og regler, ikke mekanikk. En «hvorfor står denne linja her»-kommentar er bare berettiget når linja avviker fra konvensjonen i kodebasen — følger den et etablert mønster, forsvarer kommentaren noe som ikke er under angrep.

## Boundaries

### Always

- Keep changes scoped to the requested area.
- Keep configuration consistent with pnpm and Turbo.

### Ask First

- New dependencies
- Cross-workspace refactors
- Changes to deployment workflows

### Never

- Commit secrets
- Disable tests or lint checks to make CI pass
- Merge pull requests (review and merge er utført av menneske)

<!-- BEGIN:turborepo-agent-rules -->

# This is NOT the Turborepo you know

Turborepo configuration, task behavior, and CLI commands can vary between installed versions and may differ from your training data. Resolve the `turbo` package from this file's directory or relevant workspace; in monorepos, it may not be visible from the repository root. For example, run `node -p "require.resolve('turbo/package.json')"` from a workspace that depends on `turbo`.

Read `docs/README.md` inside that installed package first, then read the relevant pages from its `docs/` directory before changing Turborepo configuration or commands. Heed deprecation notices. These bundled docs match the installed package version and are available without network access.

This block is written and re-added by `turbo` before repository-scoped commands when an AI agent is detected. In the Turborepo source repository, its template is defined in `crates/turborepo-cli/src/cli/agent_guidance.rs`. Removing the managed block while updates are enabled means a later qualifying invocation will add it again. Set `"agentGuidance": false` in the root `turbo.json` or `turbo.jsonc` to opt out; this does not remove an existing block. Keep the block committed with your work to avoid an uncommitted change on the next agent invocation.
<!-- END:turborepo-agent-rules -->
