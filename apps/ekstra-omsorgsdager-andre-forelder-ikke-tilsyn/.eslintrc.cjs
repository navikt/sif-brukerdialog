module.exports = {
    ...require('config/eslint'),

    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ['!.storybook'],

    extends: ['plugin:storybook/recommended'],
};
