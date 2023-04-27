import { StepId } from '../StepId';
import { OmOmsorgenForBarnSøknadsdata } from './OmOmsorgenForBarnSøknadsdata';
import { TidspunktForAleneomsorgSøknadsdata } from './TidspunktForAleneomsorgSøknadsdata';

export * from './OmOmsorgenForBarnSøknadsdata';
export * from './TidspunktForAleneomsorgSøknadsdata';

export interface Søknadsdata {
    id: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.OM_OMSORGEN_FOR_BARN]?: OmOmsorgenForBarnSøknadsdata;
    [StepId.TIDSPUNKT_FOR_ALENEOMSORG]?: TidspunktForAleneomsorgSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
