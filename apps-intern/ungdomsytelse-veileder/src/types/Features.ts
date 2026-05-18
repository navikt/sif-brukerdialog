import { appEnv } from '../utils/appEnv';

export const Features = {
    forlengePeriode: appEnv.SIF_PUBLIC_FEATURE_FORLENGE_PERIODE === 'on',
    slettAktivDeltakelse: appEnv.SIF_PUBLIC_FEATURE_SLETT_AKTIV_DELTAKELSE === 'on',
    ignorerBegrensningForlengePeriode: appEnv.SIF_PUBLIC_IGNORER_BEGRENSNING_FORLENGE_PERIODE === 'on',
};
