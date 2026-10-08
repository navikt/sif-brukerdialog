import type { omsorgspenger } from '@navikt/k9-brukerdialog-prosessering-api';

export type BarnSammeAdresse = omsorgspenger.OmsorgspengerKroniskSyktBarnSøknad['sammeAdresse'];

export const BarnSammeAdresse = {
    JA: 'JA',
    JA_DELT_BOSTED: 'JA_DELT_BOSTED',
    NEI: 'NEI',
} as const satisfies Record<BarnSammeAdresse, BarnSammeAdresse>;
