import { Søknadsdata } from '@app/types/Soknadsdata';
import { StepConfig } from '@sif/soknad/types';

import { SøknadStepId } from './SoknadStepId';

export const søknadStepConfig: StepConfig<SøknadStepId, Søknadsdata> = {
    [SøknadStepId.OM_BARNET]: {
        route: 'om-barnet',
        isCompleted: (s) => s[SøknadStepId.OM_BARNET] !== undefined,
    },
    [SøknadStepId.LEGEERKLÆRING]: {
        route: 'legeerklæring',
        isCompleted: (s) => s[SøknadStepId.LEGEERKLÆRING] !== undefined,
    },
    [SøknadStepId.DELT_BOSTED]: {
        route: 'delt-bosted',
        isCompleted: (s) => s[SøknadStepId.DELT_BOSTED] !== undefined,
    },
    [SøknadStepId.OPPSUMMERING]: {
        route: 'oppsummering',
    },
};

const baseStepOrder: SøknadStepId[] = [SøknadStepId.OM_BARNET, SøknadStepId.LEGEERKLÆRING, SøknadStepId.OPPSUMMERING];

/** Dynamisk stepOrder — inkluderer DELT_BOSTED kun hvis barnet har delt bosted */
export const getSøknadStepOrder = (inkluderDeltBosted: boolean): SøknadStepId[] => {
    if (inkluderDeltBosted) {
        return [
            SøknadStepId.OM_BARNET,
            SøknadStepId.LEGEERKLÆRING,
            SøknadStepId.DELT_BOSTED,
            SøknadStepId.OPPSUMMERING,
        ];
    }
    return baseStepOrder;
};

/** Default stepOrder uten DELT_BOSTED — brukes ved initialisering */
export const søknadStepOrder: SøknadStepId[] = baseStepOrder;
