import { StepId } from '../StepId';
import { SituasjonSøknadsdata } from './SituasjonSøknadsdata';
import { FraværSøknadsdata } from './FraværSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { DineBarnSøknadsdata } from './DineBarnSøknadsdata';

export * from './SituasjonSøknadsdata';
export * from './FraværSøknadsdata';
export * from './LegeerklæringSøknadsdata';
export * from './MedlemskapSøknadsdata';
export * from './DineBarnSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.DINE_BARN]?: DineBarnSøknadsdata;
    [StepId.SITUASJON]?: SituasjonSøknadsdata;
    [StepId.FRAVÆR]?: FraværSøknadsdata;
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
