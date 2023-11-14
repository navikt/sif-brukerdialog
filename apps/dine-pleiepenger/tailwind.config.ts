module.exports = {
    content: ['pages/**/*.{tsx,ts}', 'components/**/*.{tsx,ts}'],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require('@navikt/ds-tailwind')],
};
