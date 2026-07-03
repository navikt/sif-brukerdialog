import { StepDefinition } from '@sif/soknad-app';

import { BarnSammeAdresse } from '../types/BarnSammeAdresse';
import { SøknadStepId } from '../types/SoknadStepId';
import { Søknadsdata } from '../types/Soknadsdata';

export const søknadStepConfig: Record<SøknadStepId, StepDefinition> = {
    [SøknadStepId.OM_BARNET]: {
        route: 'om-barnet',
        isCompleted: (s) => (s as Søknadsdata)[SøknadStepId.OM_BARNET] !== undefined,
    },
    [SøknadStepId.LEGEERKLÆRING]: {
        route: 'legeerklaring',
        isCompleted: (s) => (s as Søknadsdata)[SøknadStepId.LEGEERKLÆRING] !== undefined,
    },
    [SøknadStepId.DELT_BOSTED]: {
        route: 'delt-bosted',
        isIncluded: (s) => (s as Søknadsdata)[SøknadStepId.OM_BARNET]?.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED,
        isCompleted: (s) => (s as Søknadsdata)[SøknadStepId.DELT_BOSTED] !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

export const søknadStepOrder: SøknadStepId[] = [
    SøknadStepId.OM_BARNET,
    SøknadStepId.LEGEERKLÆRING,
    SøknadStepId.DELT_BOSTED,
    SøknadStepId.OPPSUMMERING,
];
