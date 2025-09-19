import { resolve } from 'path';

export const createAliasConfig = (baseDir: string = __dirname) => ({
    // Felles/root-nivå alias med @shared prefix
    '@shared/types': resolve(baseDir, './src/types'),
    '@shared/utils': resolve(baseDir, './src/utils'),
    '@shared/i18n': resolve(baseDir, './src/i18n'),
    '@shared/api': resolve(baseDir, './src/api'),
    '@shared/context': resolve(baseDir, './src/context'),
    '@shared/components': resolve(baseDir, './src/components'),
    '@shared/hooks': resolve(baseDir, './src/hooks'),
    '@shared/mock': resolve(baseDir, './mock'),
    '@shared/storybook': resolve(baseDir, './storybook'),

    // Innsyn-app alias
    '@innsyn': resolve(baseDir, './src/apps/innsyn'),
    '@innsyn/atoms': resolve(baseDir, './src/apps/innsyn/atoms'),
    '@innsyn/components': resolve(baseDir, './src/apps/innsyn/components'),
    '@innsyn/modules': resolve(baseDir, './src/apps/innsyn/modules'),
    '@innsyn/pages': resolve(baseDir, './src/apps/innsyn/pages'),
    '@innsyn/hooks': resolve(baseDir, './src/apps/innsyn/hooks'),
    '@innsyn/utils': resolve(baseDir, './src/apps/innsyn/utils'),
    '@innsyn/api': resolve(baseDir, './src/apps/innsyn/api'),
    '@innsyn/forms': resolve(baseDir, './src/apps/innsyn/forms'),
    '@innsyn/oppgaver': resolve(baseDir, './src/apps/innsyn/oppgaver'),

    // Søknad-app alias
    '@søknad': resolve(baseDir, './src/apps/søknad'),
    '@søknad/components': resolve(baseDir, './src/apps/søknad/components'),
    '@søknad/pages': resolve(baseDir, './src/apps/søknad/pages'),
    '@søknad/hooks': resolve(baseDir, './src/apps/søknad/hooks'),
    '@søknad/utils': resolve(baseDir, './src/apps/søknad/utils'),
    '@søknad/api': resolve(baseDir, './src/apps/søknad/api'),
    '@søknad/steg': resolve(baseDir, './src/apps/søknad/steg'),
    '@søknad/context': resolve(baseDir, './src/apps/søknad/context'),
    '@søknad/types': resolve(baseDir, './src/apps/søknad/types'),
});
