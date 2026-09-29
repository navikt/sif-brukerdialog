/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

/** Bygget hostes på GitHub Pages: HashRouter, BASE_URL-navigasjon, SIF-lenke. Impliserer normalt __IS_DEMO__. */
declare const __IS_GITHUB_PAGES__: boolean;
/** Demo-UI og mock-scenarioer (f.eks. ScenarioHeader, DemoInfoAlert, .demoMode). Kun true på GitHub Pages og lokalt i dev – aldri i prod, e2e eller test. */
declare const __IS_DEMO__: boolean;
declare const __VIS_DEMO_BRUKERE__: boolean;
