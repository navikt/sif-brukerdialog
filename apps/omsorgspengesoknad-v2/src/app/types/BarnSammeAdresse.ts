import { OmsorgspengerKroniskSyktBarnSøknad } from '@navikt/k9-brukerdialog-prosessering-api';

export type BarnSammeAdresse = OmsorgspengerKroniskSyktBarnSøknad['sammeAdresse'];

export const BarnSammeAdresse = {
    JA: 'JA' as BarnSammeAdresse,
    JA_DELT_BOSTED: 'JA_DELT_BOSTED' as BarnSammeAdresse,
    NEI: 'NEI' as BarnSammeAdresse,
} as const;
