module.exports = {
    content: ['./packages/*/src/**/*.{tsx,ts}', './apps/*/src/**/*.{tsx,ts}'],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require('@navikt/ds-tailwind')],
};
