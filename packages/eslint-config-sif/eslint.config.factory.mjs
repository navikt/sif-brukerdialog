const OFF = 0;
const WARNING = 1;
const ERROR = 2;

/**
 * Factory function to create shared ESLint configuration
 * Only requires typescript-eslint as parameter, all other plugins are imported directly
 * This approach minimizes boilerplate while avoiding module resolution issues
 */
export async function createSifConfig(options = {}) {
    const { tseslint } = options;

    // Import all other plugins directly - they don't cause module resolution issues
    const [pluginJs, eslintConfigPrettier, jsxA11y, pluginReact, vitest, globals, reactHooks] = await Promise.all([
        import('@eslint/js'),
        import('eslint-config-prettier'),
        import('eslint-plugin-jsx-a11y'),
        import('eslint-plugin-react'),
        import('eslint-plugin-vitest'),
        import('globals'),
        import('eslint-plugin-react-hooks'),
    ]);

    return [
        {
            files: ['**/*.{js,mjs,js,ts,jsx,tsx}'],
            settings: {
                react: {
                    version: 'detect',
                },
            },
            plugins: {
                vitest: vitest.default,
                'react-hooks': reactHooks.default,
            },
            languageOptions: { globals: globals.default.browser },
        },
        pluginJs.default.configs.recommended,
        ...(tseslint ? tseslint.configs.recommended : []),
        pluginReact.default.configs.flat.recommended,
        jsxA11y.default.flatConfigs.recommended,
        eslintConfigPrettier.default,
        {
            rules: {
                ...vitest.default.configs.recommended.rules,
                'max-len': [ERROR, 300],
                'no-console': WARNING,
                'no-debugger': WARNING,
                'react/prop-types': OFF,
                'jsx-a11y/no-autofocus': OFF,
                'react/react-in-jsx-scope': OFF,
                'react/display-name': OFF,

                // TypeScript rules - only add if tseslint is provided
                ...(tseslint && {
                    // Note: you must disable the base rule as it can report incorrect errors
                    'no-use-before-define': OFF,
                    'no-shadow': OFF,
                    '@typescript-eslint/no-shadow': [ERROR],
                    'no-unused-vars': OFF,
                    '@typescript-eslint/no-unused-vars': [ERROR],
                    'no-duplicate-imports': ERROR,
                    '@typescript-eslint/array-type': [ERROR, { default: 'array-simple' }],
                    '@typescript-eslint/no-use-before-define': [OFF],
                    '@typescript-eslint/no-explicit-any': OFF,
                    '@typescript-eslint/ban-ts-comment': OFF,
                }),

                'react-hooks/rules-of-hooks': 'error',

                'react/function-component-definition': [
                    OFF,
                    {
                        namedComponents: 'arrow-function',
                        unnamedComponents: 'arrow-function',
                    },
                ],

                'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
                'jsx-quotes': ['error', 'prefer-double'],
            },
        },
    ];
}
