import { browserEnv } from './env';

export const Feature = {
    HENT_SAKER: browserEnv.NEXT_PUBLIC_FEATURE_HENT_SAKER === 'on',
    HENT_BEHANDLINGSTID: browserEnv.NEXT_PUBLIC_FEATURE_HENT_BEHANDLINGSTID === 'on',
};
