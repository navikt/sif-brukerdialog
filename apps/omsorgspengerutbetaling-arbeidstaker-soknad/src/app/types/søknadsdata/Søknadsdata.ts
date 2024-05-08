import { StepId } from '../StepId';
import { SituasjonSøknadsdata } from './SituasjonSøknadsdata';
import { FraværSøknadsdata } from './FraværSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { FosterbarnSøknadsdata } from './FosterbarnSøknadsdata';
import { DineBarnSøknadsdata } from './DineBarnSøknadsdata';

export * from './FosterbarnSøknadsdata';
export * from './SituasjonSøknadsdata';
export * from './FraværSøknadsdata';
export * from './LegeerklæringSøknadsdata';
export * from './MedlemskapSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.FOSTERBARN]?: FosterbarnSøknadsdata;
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
