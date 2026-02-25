import { resolve } from 'path';

export const createAliasConfig = (baseDir: string = __dirname) => ({
    // Felles/root-nivå alias med @shared prefix
    '@shared/types': resolve(baseDir, './src/types'),
    '@shared/utils': resolve(baseDir, './src/utils'),
    '@shared/i18n': resolve(baseDir, './src/i18n/index'),
    '@shared/api': resolve(baseDir, './src/api'),
    '@shared/context': resolve(baseDir, './src/context'),
    '@shared/components': resolve(baseDir, './src/components'),
    '@shared/hooks': resolve(baseDir, './src/hooks'),
    '@shared/pages': resolve(baseDir, './src/pages'),
    '@shared/mock': resolve(baseDir, './mock'),
    '@shared/storybook': resolve(baseDir, './storybook'),

    // Søknad-app alias
    '@søknad': resolve(baseDir, './src/søknad'),
    '@søknad/components': resolve(baseDir, './src/søknad/components'),
    '@søknad/pages': resolve(baseDir, './src/søknad/pages'),
    '@søknad/hooks': resolve(baseDir, './src/søknad/hooks'),
    '@søknad/utils': resolve(baseDir, './src/søknad/utils'),
    '@søknad/api': resolve(baseDir, './src/søknad/api'),
    '@søknad/steg': resolve(baseDir, './src/søknad/steg'),
    '@søknad/context': resolve(baseDir, './src/søknad/context'),
    '@søknad/types': resolve(baseDir, './src/søknad/types'),
});
