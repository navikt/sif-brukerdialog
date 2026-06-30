import { appEnv } from '../utils/appEnv';

export const Features = {
    slettSluttdato: appEnv.SIF_PUBLIC_FEATURE_SLETT_SLUTTDATO === 'on',
    forlengePeriode: appEnv.SIF_PUBLIC_FEATURE_FORLENGE_PERIODE === 'on',
    slettAktivDeltakelse: appEnv.SIF_PUBLIC_FEATURE_SLETT_AKTIV_DELTAKELSE === 'on',
    tillatTidligInnmelding: appEnv.SIF_PUBLIC_TILLAT_TIDLIG_INNMELDING === 'on',
};
