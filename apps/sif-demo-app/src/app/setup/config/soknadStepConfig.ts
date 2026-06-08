import { StepConfig } from '@sif/soknad/types';

import { Søknadsdata } from '../../types/Soknadsdata';

export enum SøknadStepId {
    BARN = 'barn',
    BOSTED = 'bosted',
    VEDLEGG = 'vedlegg',
    OPPSUMMERING = 'oppsummering',
}

export const søknadStepConfig: StepConfig<SøknadStepId, Søknadsdata> = {
    [SøknadStepId.BARN]: {
        route: 'barn',
        isCompleted: (s) => s.barn !== undefined,
    },
    [SøknadStepId.BOSTED]: {
        route: 'bosted',
        isCompleted: (s) => s.bosted !== undefined,
    },
    [SøknadStepId.VEDLEGG]: {
        route: 'vedlegg',
        isCompleted: (s) => s.vedlegg !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.BARN,
    SøknadStepId.BOSTED,
    SøknadStepId.VEDLEGG,
    SøknadStepId.OPPSUMMERING,
];

export const stepTitles: Record<SøknadStepId, string> = {
    [SøknadStepId.BARN]: 'Om barnet',
    [SøknadStepId.BOSTED]: 'Bosted',
    [SøknadStepId.VEDLEGG]: 'Vedlegg',
    [SøknadStepId.OPPSUMMERING]: 'Oppsummering',
};
