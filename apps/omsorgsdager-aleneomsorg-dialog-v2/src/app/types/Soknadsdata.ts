import { SøknadStepId } from './SoknadStepId';

export type MockStegSøknadsdata = {
    mock: true;
};

export type Søknadsdata = {
    harForståttRettigheterOgPlikter?: boolean;
    [SøknadStepId.OM_OMSORGEN_FOR_BARN]?: MockStegSøknadsdata;
    [SøknadStepId.TIDSPUNKT_FOR_ALENEOMSORG]?: MockStegSøknadsdata;
    [SøknadStepId.OPPSUMMERING]?: never;
};
