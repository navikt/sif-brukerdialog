module.exports = {
    ...require('@sif/config/eslint-next'),

    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
    },

    extends: ['plugin:storybook/recommended'],
};
