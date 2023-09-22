module.exports = {
    ...require('config/eslint'),

    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
    },

    extends: ['plugin:storybook/recommended']
};
