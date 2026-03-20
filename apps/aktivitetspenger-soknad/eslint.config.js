// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import commonConfig from '@sif/eslint-config';
import storybook from 'eslint-plugin-storybook';

export default [
    ...commonConfig,
    {
        languageOptions: {
            parserOptions: {
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    ...storybook.configs['flat/recommended'],
];
