import { BLOB, DATA, getCSP, NONE, SELF, UNSAFE_INLINE } from 'csp-header';

export type CspHeader = { name: string; value: string };

const CDN = 'https://cdn.nav.no';

// Ingen dekoratør her, så policyen må dekke alt appen laster: bundle og sporing.js fra CDN, Faro og Umami på *.nav.no
const directives = {
    'default-src': [SELF],
    'script-src': [SELF, CDN],
    // index.html har en inline <style> for @layer-rekkefølgen
    'style-src': [SELF, CDN, UNSAFE_INLINE],
    'img-src': [SELF, CDN, DATA, BLOB],
    'font-src': [SELF, CDN, DATA],
    'connect-src': [SELF, 'https://*.nav.no'],
    'object-src': [NONE],
    'base-uri': [SELF],
    'form-action': [SELF],
    'frame-ancestors': [SELF],
};

/** CSP_MODE=report-only|enforce. Uten verdi settes ingen CSP-header. */
export const getCspHeader = (): CspHeader | undefined => {
    const mode = process.env.CSP_MODE;
    if (mode !== 'report-only' && mode !== 'enforce') {
        return undefined;
    }
    return {
        name: mode === 'enforce' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only',
        value: getCSP({ directives }),
    };
};
