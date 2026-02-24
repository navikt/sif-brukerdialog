// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//     enabled: process.env.ANALYZE === 'true',
// });
import { buildCspHeader } from '@navikt/nav-dekoratoren-moduler/ssr';
import { withSentryConfig } from '@sentry/nextjs';
import * as path from 'path';

const appDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'script-src-elem': ["'self'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'worker-src': ["'self'"],
    'connect-src': [
        "'self'",
        'https://*.nav.no',
        'https://*.uxsignals.com',
        'https://sentry.gc.nav.no',
        'http://localhost:1234',
        'http://localhost:12347',
        'http://*.api.sanity.io',
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

export default withSentryConfig(nextConfig, {
    org: process.env.SENTRY_ORG || 'nav',
    project: process.env.SENTRY_PROJECT || 'sif-innsyn',
    authToken: process.env.SENTRY_AUTH_TOKEN,
    silent: !process.env.CI,
    sourcemaps: {
        deleteSourcemapsAfterUpload: true,
    },
    hideSourceMaps: true,
    bundleSizeOptimizations: {
        excludeDebugStatements: true,
    },
});
