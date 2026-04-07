---
applyTo: 'apps/ekstra-omsorgsdager-andre-forelder-ikke-tilsyn/**,apps/endringsmelding-pleiepenger/**,apps/ungdomsytelse-deltaker/**,apps/omsorgspengerutbetaling-soknad/**,apps/omsorgsdager-aleneomsorg-dialog/**,apps/opplaringspenger-soknad/**,apps/sif-ettersending/**,apps/pleiepenger-i-livets-sluttfase-soknad/**,apps/omsorgspengesoknad/**,apps/omsorgspengerutbetaling-arbeidstaker-soknad/**,apps/pleiepenger-sykt-barn/**,apps-intern/**'
---

# React + Aksel instructions

Use these instructions for non-Next React apps in this monorepo.

## Scope

- Applies to Vite-based apps and internal React apps.
- Keep changes scoped to one app unless cross-app changes are explicitly requested.

## UI and design system

- Use Aksel as the UI foundation.
- Reuse existing components and patterns from the target app before creating new ones.
- Keep styling aligned with Aksel tokens and established app conventions.
- Never use Tailwind padding/margin (`p-`, `m-`, `px-`, `py-`) with Aksel components. Use Aksel spacing-tokens (`space-4`, `space-6`, etc.).
- Do not use the `Alert` component.
- Use `SifInfoMessage` for info- og warning-meldinger.
- Use `InlineMessage` when the old solution used inline alerting.
- Use `LocalAlert` with `status="error"` for error-meldinger.

## Forms and dialogs

- Prioritize robust validation and clear user feedback.
- Keep error handling and step navigation consistent with existing dialog flow.
- Preserve copy and content patterns used by the app team.

## Validation

- Run targeted checks in the affected app first.
- In the workspace, use available scripts (for example `lint:eslint`, `lint:tsc`, `lint:fix`, `test`) instead of assuming `lint` exists.
- Use root scripts only for broader verification:
    - `yarn lint`
    - `yarn test`

## Accessibility

- Use semantic structure and accessible labels.
- Ensure components are keyboard operable.
- Ensure status and error information is announced and visible.
