import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr/index.js';
import { BLOB, DATA, NONE, SELF } from 'csp-header';
import config from './serverConfig.js';

export type CspHeader = { name: string; value: string };

// Slås sammen med dekoratørens direktiver, som allerede dekker *.nav.no (cdn, telemetri, umami), Skyra og UX Signals
const appDirectives = {
    'default-src': [SELF],
    'script-src': [SELF],
    'script-src-elem': [SELF],
    'style-src': [SELF],
    'style-src-elem': [SELF],
    'img-src': [SELF, DATA, BLOB],
    'font-src': [SELF],
    'connect-src': [SELF, 'https://*.api.sanity.io'],
    'object-src': [NONE],
    'base-uri': [SELF],
};

/** CSP_MODE=report-only|enforce. Uten verdi settes ingen CSP-header. */
export const getCspHeader = async (): Promise<CspHeader | undefined> => {
    const mode = process.env.CSP_MODE;
    if (mode !== 'report-only' && mode !== 'enforce') {
        return undefined;
    }
    const value = await buildCspHeader(appDirectives, { env: config.app.env });
    return {
        name: mode === 'enforce' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only',
        value,
    };
};
