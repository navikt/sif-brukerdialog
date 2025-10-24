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
];
