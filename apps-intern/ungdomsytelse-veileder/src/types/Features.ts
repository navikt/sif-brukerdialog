import { appEnv } from '../utils/appEnv';

export const Features = {
    endreKvote: appEnv.SIF_PUBLIC_FEATURE_ENDRE_KVOTE === 'on',
    slettAktivDeltakelse: appEnv.SIF_PUBLIC_FEATURE_SLETT_AKTIV_DELTAKELSE === 'on',
};
