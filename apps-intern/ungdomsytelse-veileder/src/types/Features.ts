import { appEnv } from '../utils/appEnv';

export const Features = {
    slettAktivDeltakelse: appEnv.SIF_PUBLIC_FEATURE_SLETT_AKTIV_DELTAKELSE === 'on',
};
