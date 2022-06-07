module.exports = {
    ...require('config/eslintrc'),
    parserOptions: {
        root: true,
        tsconfigRootDir: __dirname,
        project: ['/tsconfig.json'],
    },
};
