/**
 * __IS_GITHUB_PAGES__ defineres kun i vite.demo.config.ts. I alle andre builds
 * (dev, prod, e2e, vitest) er den ikke definert, så vi må lese den via en
 * typeof-guard for å unngå ReferenceError.
 */
export const isGitHubPages = (): boolean =>
    typeof __IS_GITHUB_PAGES__ !== 'undefined' && __IS_GITHUB_PAGES__;
