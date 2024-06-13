const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});
const { buildCspHeader } = require('@navikt/nav-dekoratoren-moduler/ssr');

const appDirectives = {
    'default-src': ["'self'"],
    'script-src': ["'self'", "'unsafe-eval'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'script-src-elem': ["'self'", "'unsafe-inline'", 'https://uxsignals-frontend.uxsignals.app.iterate.no'],
    'worker-src': ["'self'"],
    'connect-src': [
        "'self'",
        'https://*.nav.no',
        'https://*.uxsignals.com',
        'http://localhost:1234',
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
    experimental: {
        optimizePackageImports: ['@navikt/aksel-icons', '@navikt/ds-react'],
    },
    eslint: {
        dirs: ['src'],
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

module.exports = withBundleAnalyzer(nextConfig);
