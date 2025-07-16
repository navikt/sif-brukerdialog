import { StepId } from '../StepId';
import { DeltBostedSøknadsdata } from './DeltBostedSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { OmBarnetSøknadsdata } from './OmBarnetSøknadsdata';

export * from './DeltBostedSøknadsdata';
export * from './OmBarnetSøknadsdata';
export * from './LegeerklæringSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.DELT_BOSTED]?: DeltBostedSøknadsdata;
    [StepId.OM_BARNET]?: OmBarnetSøknadsdata;
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
