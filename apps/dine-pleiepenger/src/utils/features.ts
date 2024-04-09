import { browserEnv } from './env';

/** Sett features ut fra env variabler */
export const Feature = {
    HENT_SAKER: browserEnv.NEXT_PUBLIC_FEATURE_HENT_SAKER === 'on',
    HENT_BEHANDLINGSTID: browserEnv.NEXT_PUBLIC_FEATURE_HENT_BEHANDLINGSTID === 'on',
    HENT_MELLOMLAGRING: browserEnv.NEXT_PUBLIC_FEATURE_HENT_MELLOMLAGRING === 'on',
};
