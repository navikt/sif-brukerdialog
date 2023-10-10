/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: "/omsorgspenger/kalkulator-antall-omsorgsdager",
    basePath: '',
    reactStrictMode: true,
    output: 'standalone',
    i18n: {
        locales: ['nb'],
        defaultLocale: 'nb',
    },
};

module.exports = nextConfig;
