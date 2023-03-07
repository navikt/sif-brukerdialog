module.exports = {
    ...require('../../packages/config/eslint'),
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
    },
};
