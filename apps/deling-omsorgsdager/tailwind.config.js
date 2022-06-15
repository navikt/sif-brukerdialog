module.exports = {
    content: ['src/**/*.{tsx,ts}', '../../sif-common-packages/sif-common-core-ds/**/*.{tsx, ts}'],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require('@navikt/ds-tailwind')],
};
