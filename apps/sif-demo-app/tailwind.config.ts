import dsTailwind from '@navikt/ds-tailwind';
import { Config } from 'tailwindcss';

export default {
    presets: [dsTailwind],
    content: ['./src/**'],
} satisfies Config;
