/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/dine-pleiepenger',
    reactStrictMode: true,
    output: 'standalone',
    i18n: {
        locales: ['nb'],
        defaultLocale: 'nb',
    },
};

module.exports = nextConfig;
