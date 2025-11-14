import { browserEnv } from './env';

/** Sett features ut fra env variabler */
export const Feature = {
    FARO: browserEnv.NEXT_PUBLIC_FEATURE_FARO === 'on',
    HENT_APPSTATUS: browserEnv.NEXT_PUBLIC_FEATURE_APPSTATUS === 'on',
};
