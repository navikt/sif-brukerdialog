import dsTailwind from '@navikt/ds-tailwind';
import type { Config } from 'tailwindcss';

const config: Config = {
    content: ['src/**/*.{tsx,ts}', '../../packages/sif-common-core-ds/**/*.{tsx, ts}'],
    theme: {
        extend: {},
    },
    plugins: [],
    presets: [dsTailwind],
};

export default config;
