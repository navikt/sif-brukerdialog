// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';
import * as path from 'path';

// headers() evalueres ved bygg. `next build` setter NODE_ENV=production, `next dev` setter development.
const isDevServer = process.env.NODE_ENV === 'development';

const appDirectives = {
    'default-src': ["'self'"],
    'script-src': [
        "'self'",
        ...(isDevServer ? ["'unsafe-eval'"] : []),
        "'unsafe-inline'",
        'https://uxsignals-frontend.uxsignals.app.iterate.no',
    ],
    'script-src-elem': ["'self'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'worker-src': ["'self'"],
    'connect-src': [
        "'self'",
        'https://*.nav.no',
        'https://*.uxsignals.com',
        'https://*.api.sanity.io',
        ...(isDevServer ? ['http://localhost:1234', 'http://localhost:12347'] : []),
    ],
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: 'standalone',
    reactStrictMode: false,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    pageExtensions: ['page.tsx', 'api.ts'],
    transpilePackages: ['tailwind-merge'],
    serverExternalPackages: ['jsdom'],
    outputFileTracingRoot: path.resolve(__dirname, '../..'),
    outputFileTracingIncludes: {
        '/*': [
            '../../node_modules/async-function/**/*',
            '../../node_modules/async-generator-function/**/*',
            '../../node_modules/generator-function/**/*',
            '../../node_modules/.pnpm/meriyah@*/node_modules/meriyah/**/*',
        ],
    },

    experimental: {
        optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react'],
    },

    redirects: async () => [
        { source: '/', destination: process.env.NEXT_PUBLIC_BASE_PATH, permanent: false, basePath: false },
        {
            source: '/dine-pleiepenger',
            destination: '/',
            permanent: false,
        },
    ],

    async headers() {
        const environment = process.env.NEXT_PUBLIC_RUNTIME_ENVIRONMENT === 'production' ? 'prod' : 'dev';
        const cspValue = await buildCspHeader(appDirectives, { env: environment });

        // buildCspHeader faller tilbake til en åpen policy hvis dekoratøren ikke svarer. Den ville blitt låst inn i imaget.
        if (!isDevServer && cspValue.startsWith('default-src * ')) {
            throw new Error('Kunne ikke hente CSP fra dekoratøren. Stopper bygget for å unngå åpen CSP.');
        }

        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspValue,
                    },
                ],
            },
        ];
    },
    productionBrowserSourceMaps: true,
};

export default nextConfig;
