import { PersistedVedlegg } from '@sif/soknad-forms';

import { SøknadStepId } from './SoknadStepId';

export type BarnSøknadsdata = {
    barnetSøknadenGjelder: string;
};

export type BostedSøknadsdata = {
    erBosattITrondheim: boolean;
};

export type VedleggSøknadsdata = {
    vedlegg: PersistedVedlegg[];
};

export type Søknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    [SøknadStepId.BARN]?: BarnSøknadsdata;
    [SøknadStepId.BOSTED]?: BostedSøknadsdata;
    [SøknadStepId.VEDLEGG]?: VedleggSøknadsdata;
    [SøknadStepId.OPPSUMMERING]?: never;
};
