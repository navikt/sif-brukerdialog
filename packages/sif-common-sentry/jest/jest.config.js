module.exports = {
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
        '^.+\\.ts?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test))\\.(jsx?|tsx?)$',
    moduleNameMapper: {
        '\\.(css|jpg|png|svg|less)$': '<rootDir>/node_modules/jest-css-modules',
        'nav-(.*)-style': '<rootDir>/node_modules/jest-css-modules',
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    transformIgnorePatterns: ['node_modules/(?!(nav-frontend-spinner-style)/)'],
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.json',
            babelConfig: {
                plugins: ['@babel/plugin-proposal-object-rest-spread'],
                presets: ['@babel/preset-env', '@babel/preset-react'],
                env: {
                    test: {
                        plugins: ['@babel/plugin-transform-modules-commonjs'],
                    },
                },
            },
        },
    },
    moduleDirectories: ['../node_modules'],
    rootDir: '../src',
};
