/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/omsorgspenger/kalkulator-antall-omsorgsdager',
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
