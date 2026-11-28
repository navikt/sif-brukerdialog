import type { AnnetBarn } from '@sif/soknad-forms';

import type { AleneomsorgTidspunkt } from '../steps/tidspunkt-for-aleneomsorg/types';
import { SøknadStepId } from './SoknadStepId';

/** Steget kan bare fullføres når søker ikke har avtale om delt fast bosted. */
export interface OmOmsorgenForBarnSøknadsdata {
    annetBarn: AnnetBarn[];
    harAleneomsorgFor: string[];
}

export interface TidspunktForAleneomsorgSøknadsdata {
    aleneomsorgTidspunkt: Record<string, AleneomsorgTidspunkt>;
}

export type Søknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    [SøknadStepId.OM_OMSORGEN_FOR_BARN]?: OmOmsorgenForBarnSøknadsdata;
    [SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG]?: TidspunktForAleneomsorgSøknadsdata;
    [SøknadStepId.OPPSUMMERING]?: never;
};
