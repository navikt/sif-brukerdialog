module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jsx-a11y/recommended',
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: {
        '@typescript-eslint/explicit-function-return-type': 0,
        '@typescript-eslint/explicit-module-boundary-types': 0,
        '@typescript-eslint/ban-ts-ignore': 'off',
        '@typescript-eslint/no-var-requires': 0,
        '@typescript-eslint/no-explicit-any': 0,
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/react-in-jsx-scope': 0,
        'react/jsx-uses-react': 0,
        'react/prop-types': 0,
        'no-console': 'error',
    },
    plugins: ['jsx-a11y', 'react-hooks'],
    settings: {
        react: {
            version: 'detect',
        },
    },
    ignorePatterns: ['node_modules', 'dist', 'lib', '.turbo'],
};
