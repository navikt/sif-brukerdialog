import { StepDefinition } from '@sif/soknad-app';

import { BarnSammeAdresse } from '../types/BarnSammeAdresse';
import { SøkersRelasjonTilBarnet } from '../types/SøkersRelasjonTilBarnet';
import { Søknadsdata } from '../types/Soknadsdata';
import { SøknadStepId } from '../types/SoknadStepId';

export const inkluderDeltBostedStep = (omBarnet: Søknadsdata[SøknadStepId.OM_BARNET]): boolean => {
    if (!omBarnet) {
        return false;
    }

    switch (omBarnet.type) {
        case 'registrertBarn':
            return omBarnet.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED;
        case 'annetBarn':
            return (
                omBarnet.sammeAdresse === BarnSammeAdresse.JA_DELT_BOSTED &&
                omBarnet.søkersRelasjonTilBarnet !== SøkersRelasjonTilBarnet.FOSTERFORELDER
            );
    }
};

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
        isIncluded: (s) => inkluderDeltBostedStep((s as Søknadsdata)[SøknadStepId.OM_BARNET]),
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
