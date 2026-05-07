import { appEnv } from '../utils/appEnv';

export const Features = {
    utvidePeriode: appEnv.SIF_PUBLIC_FEATURE_UTVIDE_PERIODE === 'on',
    slettAktivDeltakelse: appEnv.SIF_PUBLIC_FEATURE_SLETT_AKTIV_DELTAKELSE === 'on',
};
