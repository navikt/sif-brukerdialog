module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require('@navikt/ds-tailwind')],
};
