import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['src/**/*.{tsx,ts}', '../../packages/sif-common-core-ds/**/*.{tsx, ts}'],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [require('@navikt/ds-tailwind')],
};

export default config;
