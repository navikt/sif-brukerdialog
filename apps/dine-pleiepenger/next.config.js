/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/dine-pleiepenger',
    reactStrictMode: true,
    output: 'standalone',
    i18n: {
        locales: ['nb'],
        defaultLocale: 'nb',
    },
    headers: async () => [
        {
            source: '/(.*)',
            headers: [
                { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
                { key: 'X-XSS-Protection', value: '1; mode=block' },
                { key: 'X-Content-Type-Options', value: 'nosniff' },
                { key: 'Referrer-Policy', value: 'no-referrer' },
                { key: 'Feature-Policy', value: "geolocation 'none'; microphone 'none'; camera 'none'" },
            ],
        },
    ],
};

module.exports = nextConfig;
