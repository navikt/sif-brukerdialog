module.exports = {
    ...require('config/eslint'),
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
        // project: ['./tsconfig.json'],
    },
};
