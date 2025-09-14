import { StepId } from '../StepId';
import { DeltBostedSøknadsdata } from './DeltBostedSøknadsdata';
import { DineBarnSøknadsdata } from './DineBarnSøknadsdata';
import { FraværSøknadsdata } from './FraværSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { SituasjonSøknadsdata } from './SituasjonSøknadsdata';

export * from './DeltBostedSøknadsdata';
export * from './DineBarnSøknadsdata';
export * from './FraværSøknadsdata';
export * from './LegeerklæringSøknadsdata';
export * from './MedlemskapSøknadsdata';
export * from './SituasjonSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.DINE_BARN]?: DineBarnSøknadsdata;
    [StepId.DELT_BOSTED]?: DeltBostedSøknadsdata;
    [StepId.SITUASJON]?: SituasjonSøknadsdata;
    [StepId.FRAVÆR]?: FraværSøknadsdata;
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
