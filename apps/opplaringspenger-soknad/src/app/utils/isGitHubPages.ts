/**
 * Sann kun i demo-buildet som deployes til GitHub Pages.
 * `typeof`-sjekken gjør funksjonen robust i kontekster der define-en mangler.
 */
export const isGitHubPages = (): boolean => typeof __IS_GITHUB_PAGES__ !== 'undefined' && __IS_GITHUB_PAGES__;
