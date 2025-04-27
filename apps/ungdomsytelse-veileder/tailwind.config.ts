import dsTailwind from '@navikt/ds-tailwind/darkside-tw3';
import type { Config } from 'tailwindcss';

export default {
    presets: [dsTailwind],
    content: ['./src/**', './storybook/**'],
} satisfies Config;
