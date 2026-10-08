import pluginNext from '@next/eslint-plugin-next';
import commonConfig from '@sif/eslint-config';

export default [
    ...commonConfig,
    {
        plugins: {
            '@next/next': pluginNext,
        },
        rules: {
            ...pluginNext.configs.recommended.rules,
        },
    },
    {
        // Legacy: fjern når appen er migrert til v2
        rules: { '@typescript-eslint/switch-exhaustiveness-check': 'off' },
    },
];
