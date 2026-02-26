import { resolve } from 'path';

export const createAliasConfig = (baseDir: string = __dirname) => ({
    // Felles/root-nivå alias med @app prefix
    '@app/types': resolve(baseDir, './src/types'),
    '@app/utils': resolve(baseDir, './src/utils'),
    '@app/i18n': resolve(baseDir, './src/i18n/index'),
    '@app/components': resolve(baseDir, './src/components'),
    '@app/hooks': resolve(baseDir, './src/hooks'),
    '@app/storybook': resolve(baseDir, './storybook'),

    // Søknad-app alias
    '@søknad': resolve(baseDir, './src/søknad'),
    '@søknad/components': resolve(baseDir, './src/søknad/components'),
    '@søknad/types': resolve(baseDir, './src/søknad/types'),
});
