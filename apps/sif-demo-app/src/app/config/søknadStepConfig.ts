import { RegistrertBarn, Søker } from '@navikt/sif-common-query';
import { StepConfig } from '@rammeverk/types';

import { Søknadsdata } from '../types/Søknadsdata';

export enum SøknadStepId {
    BOSTED = 'bosted',
    BARN = 'barn',
    OPPSUMMERING = 'oppsummering',
}

export interface SøknadState {
    søker: Søker;
    barn: RegistrertBarn[];
    søknadsdata: Søknadsdata;
}

export const søknadStepConfig: StepConfig<Søknadsdata> = {
    [SøknadStepId.BARN]: {
        id: SøknadStepId.BARN,
        route: 'barn',
        isCompleted: (s) => s.barn !== undefined,
    },
    [SøknadStepId.BOSTED]: {
        id: SøknadStepId.BOSTED,
        route: 'bosted',
        isCompleted: (s) => s.bosted !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        id: SøknadStepId.OPPSUMMERING,
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [SøknadStepId.BOSTED, SøknadStepId.BARN, SøknadStepId.OPPSUMMERING];

export const stepTitles: Record<SøknadStepId, string> = {
    [SøknadStepId.BARN]: 'Barn',
    [SøknadStepId.BOSTED]: 'Bosted',
    [SøknadStepId.OPPSUMMERING]: 'Oppsummering',
};
