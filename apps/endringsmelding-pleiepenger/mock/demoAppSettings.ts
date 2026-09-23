import { getDevAppSettings } from './devAppSettings.ts';

const PUBLIC_PATH = '/sif-brukerdialog/endringsmelding-pleiepenger';

/** App settings brukt i demo-buildet som deployes til GitHub Pages */
export const getDemoAppSettings = () => ({
    ...getDevAppSettings(),
    PUBLIC_PATH,
    SIF_PUBLIC_DOMAIN_URL: 'https://navikt.github.io',
    SIF_PUBLIC_DEKORATOR_URL: '#',
    SIF_PUBLIC_LOGIN_URL: '#',
    SIF_PUBLIC_INNSYN_URL: '#',
    SIF_PUBLIC_MINSIDE_URL: '#',
    SIF_PUBLIC_USE_ANALYTICS: 'false',
    K9_BRUKERDIALOG_PROSESSERING_FRONTEND_PATH: `${PUBLIC_PATH}/api/k9-brukerdialog`,
    SIF_INNSYN_FRONTEND_PATH: `${PUBLIC_PATH}/api/sif-innsyn`,
});
