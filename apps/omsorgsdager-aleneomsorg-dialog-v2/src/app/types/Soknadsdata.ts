import type { AnnetBarn } from '@sif/soknad-forms';

import { SøknadStepId } from './SoknadStepId';

export type MockStegSøknadsdata = {
    mock: true;
};

/** Steget kan bare fullføres når søker ikke har avtale om delt fast bosted. */
export interface OmOmsorgenForBarnSøknadsdata {
    annetBarn: AnnetBarn[];
    harAleneomsorgFor: string[];
}

export type Søknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    [SøknadStepId.OM_OMSORGEN_FOR_BARN]?: OmOmsorgenForBarnSøknadsdata;
    [SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG]?: MockStegSøknadsdata;
    [SøknadStepId.OPPSUMMERING]?: never;
};
