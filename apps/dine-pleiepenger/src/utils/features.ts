import { browserEnv } from './env';

export const Feature = {
    HENT_SVARFRIST: browserEnv.NEXT_PUBLIC_FEATURE_SVARFRIST === 'on',
    HENT_BEHANDLINGSTID: browserEnv.NEXT_PUBLIC_FEATURE_BEHANDLINGSTID === 'on',
};
