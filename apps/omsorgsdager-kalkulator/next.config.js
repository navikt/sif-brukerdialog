/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: process.env.NEXT_PUBLIC_BASE_PATH,
    reactStrictMode: true,
    output: 'standalone',
    i18n: {
        locales: ['nb'],
        defaultLocale: 'nb',
    },
    async redirects() {
        return [
            {
                source: '/beregne',
                destination: '/',
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
