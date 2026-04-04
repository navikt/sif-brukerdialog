import { BarnSammeAdresse } from '@app/types/BarnSammeAdresse';
import { Søknadsdata } from '@app/types/Soknadsdata';
import { StepConfig } from '@sif/soknad/types';

import { SøknadStepId } from './SoknadStepId';

export const søknadStepConfig: StepConfig<SøknadStepId, Søknadsdata> = {
    [SøknadStepId.OM_BARNET]: {
        route: 'om-barnet',
        isCompleted: (s) => s[SøknadStepId.OM_BARNET] !== undefined,
    },
    [SøknadStepId.LEGEERKLÆRING]: {
        route: 'legeerklaring',
        isCompleted: (s) => s[SøknadStepId.LEGEERKLÆRING] !== undefined,
    },
    [SøknadStepId.DELT_BOSTED]: {
        route: 'delt-bosted',
        isIncluded: (s) => s[SøknadStepId.OM_BARNET]?.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED,
        isCompleted: (s) => s[SøknadStepId.DELT_BOSTED] !== undefined,
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
