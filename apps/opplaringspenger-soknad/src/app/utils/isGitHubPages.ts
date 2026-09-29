/**
 * Sann kun i demo-buildet som deployes til GitHub Pages.
 * `typeof`-sjekken er nødvendig fordi `__IS_GITHUB_PAGES__` kun defineres
 * i vite.demo.config.ts, ikke i de øvrige buildene.
 */
export const isGitHubPages = (): boolean => typeof __IS_GITHUB_PAGES__ !== 'undefined' && __IS_GITHUB_PAGES__;
