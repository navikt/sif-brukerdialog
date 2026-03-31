import { BaseSøknadsdata } from '@sif/soknad/types';

import { SøknadStepId } from '../setup/config/SoknadStepId';

export type OmBarnetSøknadsdata = {
    // TODO: implementeres i fase 5a
};

export type LegeerklæringSøknadsdata = {
    // TODO: implementeres i fase 5b
};

export type DeltBostedSøknadsdata = {
    // TODO: implementeres i fase 5c
};

export interface Søknadsdata extends BaseSøknadsdata {
    [SøknadStepId.OM_BARNET]?: OmBarnetSøknadsdata;
    [SøknadStepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [SøknadStepId.DELT_BOSTED]?: DeltBostedSøknadsdata;
}
