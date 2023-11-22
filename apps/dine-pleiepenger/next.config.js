/* eslint-disable @typescript-eslint/no-var-requires */

const isE2E = process.env.NEXT_PUBLIC_IS_E2E === 'true';

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr');

const appDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'script-src-elem': ["'self'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'worker-src': ["'self'"],
    'connect-src': ["'self'", 'https://*.nav.no', 'https://*.uxsignals.com', 'http://localhost:1234'],
};

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
    output: !isE2E ? 'standalone' : undefined,
    reactStrictMode: true,
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    pageExtensions: ['page.tsx', 'api.ts'],
    transpilePackages: ['tailwind-merge'],
    assetPrefix: '/dine-pleiepenger',
    experimental: {
        optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react'],
    },
    typescript: {
        ignoreBuildErrors: isE2E,
    },
    eslint: {
        dirs: ['src'],
        ignoreDuringBuilds: true,
    },

    envs: {
        NEXT_PUBLIC_BASE_PATH: '/dine-pleiepenger',
        NEXT_PUBLIC_MIN_SIDE_PATH: '/minside',
        NEXT_PUBLIC_RUNTIME_ENVIRONMENT: 'dev',
        NEXT_PUBLIC_API_URL_INNSYN: 'http://sif-innsyn-api',
        NEXT_PUBLIC_API_URL_BRUKERDIALOG: 'http://k9-brukerdialog-api',
        NEXT_PUBLIC_IS_E2E: 'false',
        NODE_ENV: 'development',
        ANALYZE: 'false',
        NPM_CONFIG_CACHE: '/tmp',
    },

    async headers() {
        if (isE2E) return [];

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

module.exports = withBundleAnalyzer(nextConfig);
