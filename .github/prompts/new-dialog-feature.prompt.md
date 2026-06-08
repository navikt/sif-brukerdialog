# New dialog feature

Implement a new feature in a dialog app in this monorepo.

## Input

- Target workspace path
- User story and acceptance criteria
- Affected routes/screens

## Required output

- Minimal, scoped code changes in the target workspace
- Reuse existing Aksel-based UI patterns
- Include tests relevant to the changed behavior

## Checklist

- Confirm app type: Next.js or React (Vite)
- Keep scope to one app/package unless explicitly requested
- Use existing domain copy and form patterns
- Handle loading, error, and success states
- Ensure keyboard accessibility and semantic labels
- Run targeted validation first using available workspace scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`, `test`)
- Summarize risks and residual gaps
