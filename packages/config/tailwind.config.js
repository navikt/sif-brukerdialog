module.exports = {
    content: ['./src/**/*.{tsx,ts,css}', '../packages/sif-common-core-ds/src/**/*.{tsx,ts,css}'],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require('@navikt/ds-tailwind')],
};
