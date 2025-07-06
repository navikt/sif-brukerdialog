const OFF = 0;
const WARNING = 1;
const ERROR = 2;

/**
 * Shared ESLint configuration for SIF projects
 * This exports configuration objects that can be used by consuming projects
 */

export const sharedSettings = {
    react: {
        version: 'detect',
    },
};

export const sharedPluginConfig = (plugins) => ({
    vitest: plugins.vitest,
    'react-hooks': plugins.reactHooks,
});

export const sharedRules = {
    ...vitest.configs.recommended.rules,
    'max-len': [ERROR, 300],
    'no-console': WARNING,
    'no-debugger': WARNING,
    'react/prop-types': OFF,
    'jsx-a11y/no-autofocus': OFF,
    'react/react-in-jsx-scope': OFF,
    'react/display-name': OFF,

    // Note: you must disable the base rule as it can report incorrect errors
    'no-use-before-define': OFF,
    'no-shadow': OFF,
    '@typescript-eslint/no-shadow': [ERROR],
    'no-unused-vars': OFF,
    '@typescript-eslint/no-unused-vars': [ERROR],
    'no-duplicate-imports': ERROR,
    '@typescript-eslint/array-type': [ERROR, { default: 'array-simple' }],
    'react-hooks/rules-of-hooks': 'error',

    'react/function-component-definition': [
        OFF,
        {
            namedComponents: 'arrow-function',
            unnamedComponents: 'arrow-function',
        },
    ],
    '@typescript-eslint/no-use-before-define': [OFF],

    // TODO (TOR) Ignorert inntil videre grunnet kost/nytte
    '@typescript-eslint/no-explicit-any': OFF,
    '@typescript-eslint/ban-ts-comment': OFF,

    'react/jsx-curly-brace-presence': ['error', { props: 'never', children: 'never' }],
    'jsx-quotes': ['error', 'prefer-double'],
};

export const constants = {
    OFF,
    WARNING,
    ERROR,
};

/**
 * Creates a complete ESLint config array
 * This function should be called by consuming projects with their locally imported plugins
 */
export function createSifConfig(localPlugins, localGlobals) {
    return [
        {
            files: ['**/*.{js,mjs,js,ts,jsx,tsx}'],
            settings: sharedSettings,
            plugins: sharedPluginConfig(localPlugins),
            languageOptions: { globals: localGlobals },
        },
        localPlugins.pluginJs.configs.recommended,
        ...localPlugins.tseslint.configs.recommended,
        localPlugins.pluginReact.configs.flat.recommended,
        localPlugins.jsxA11y.flatConfigs.recommended,
        localPlugins.eslintConfigPrettier,
        {
            rules: sharedRules,
        },
    ];
}
