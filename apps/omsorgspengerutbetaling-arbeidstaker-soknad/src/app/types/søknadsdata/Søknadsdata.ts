import { StepId } from '../StepId';
import { SituasjonSøknadsdata } from './SituasjonSøknadsdata';
import { FraværSøknadsdata } from './FraværSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { DineBarnSøknadsdata } from './DineBarnSøknadsdata';
import { DeltBostedSøknadsdata } from './DeltBostedSøknadsdata';

export * from './SituasjonSøknadsdata';
export * from './FraværSøknadsdata';
export * from './LegeerklæringSøknadsdata';
export * from './MedlemskapSøknadsdata';
export * from './DineBarnSøknadsdata';
export * from './DeltBostedSøknadsdata';

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
