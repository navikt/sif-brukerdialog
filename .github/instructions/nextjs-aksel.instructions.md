---
applyTo: 'apps/dine-pleiepenger/**,apps/omsorgsdager-kalkulator/**'
---

# Next.js + Aksel instructions

Use these instructions for Next.js apps in this monorepo.

## Scope

- Applies to `apps/dine-pleiepenger` and `apps/omsorgsdager-kalkulator`.
- Keep changes scoped to one app unless cross-app changes are explicitly requested.

## UI and design system

- Use Aksel components and tokens (`@navikt/ds-react`, Aksel spacing tokens).
- Do not introduce alternative UI libraries or custom design token systems.
- Prefer existing layout patterns already used in the target app.
- Never use Tailwind padding/margin (`p-`, `m-`, `px-`, `py-`) with Aksel components. Use Aksel spacing-tokens (`space-4`, `space-6`, etc.).
- Do not use the `Alert` component.
- Use `SifInfoCard` for info- og warning-meldinger.
- Use `InlineMessage` when the old solution used inline alerting.
- Use `LocalAlert` with `status="error"` for error-meldinger.

## Next.js patterns

- Follow the app's current routing and rendering patterns.
- Keep server/client boundaries explicit when changing page-level code.
- Avoid introducing new architectural patterns unless requested.

## Validation

- Run targeted checks in the affected app first.
- In the workspace, use available scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`, `test`) instead of assuming `lint` exists.
- Use root scripts only for broader verification:
    - `yarn lint`
    - `yarn test`

## Accessibility

- Use semantic headings and labels.
- Ensure keyboard navigation and visible focus states.
- Do not rely on color alone for meaning.
