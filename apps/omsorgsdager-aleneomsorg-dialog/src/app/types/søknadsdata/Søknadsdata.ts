import { OmOmsorgenForBarnSøknadsdata } from './OmOmsorgenForBarnSøknadsdata';
import { TidspunktForAleneomsorgSøknadsdata } from './TidspunktForAleneomsorgSøknadsdata';

export * from './OmOmsorgenForBarnSøknadsdata';
export * from './TidspunktForAleneomsorgSøknadsdata';

export interface Søknadsdata {
    id: string;
    harForståttRettigheterOgPlikter?: boolean;
    omOmsorgenForBarnData?: OmOmsorgenForBarnSøknadsdata;
    tidspunktForAleneomsorgData?: TidspunktForAleneomsorgSøknadsdata;
    harBekreftetOpplysninger?: boolean;
}
