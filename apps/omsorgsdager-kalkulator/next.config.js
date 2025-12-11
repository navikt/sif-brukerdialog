const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
    basePath: '/omsorgspenger/kalkulator-antall-omsorgsdager',
    reactStrictMode: true,
    output: 'standalone',
    outputFileTracingRoot: path.join(__dirname, '../..'),
    outputFileTracingIncludes: {
        '/*': [
            '../../node_modules/async-function/**/*',
            '../../node_modules/async-generator-function/**/*',
            '../../node_modules/generator-function/**/*',
        ],
    },
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
