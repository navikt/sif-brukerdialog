export type Env = 'dev' | 'prod';

export const getEnvBaseUrl = (env: Env): string => {
    // I påvente av at prod ikke er tilgjengelig enda returneres alltid dev her
    return env === 'dev' ? 'intern.dev.nav.no' : 'intern.dev.nav.no';
};
