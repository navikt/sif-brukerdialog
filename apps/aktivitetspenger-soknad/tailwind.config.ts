import dsTailwind from '@navikt/ds-tailwind';
import type { Config } from 'tailwindcss';

export default {
    presets: [dsTailwind],
    content: ['./src/**', './storybook/**'],
} satisfies Config;
