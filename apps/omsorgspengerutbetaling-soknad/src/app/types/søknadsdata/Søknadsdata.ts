import { StepId } from '../StepId';
import { DineBarnSøknadsdata } from './DineBarnSøknadsdata';
import { FraværSøknadsdata } from './FraværSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { ArbeidSøknadsdata } from './ArbeidSøknadsdata';
import { FraværFraSøknadsdata } from './FraværFraSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';

export * from './DineBarnSøknadsdata';
export * from './FraværSøknadsdata';
export * from './LegeerklæringSøknadsdata';
export * from './ArbeidSøknadsdata';
export * from './FraværFraSøknadsdata';
export * from './MedlemskapSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.DINE_BARN]?: DineBarnSøknadsdata;
    [StepId.FRAVÆR]?: FraværSøknadsdata;
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.ARBEIDSSITUASJON]?: ArbeidSøknadsdata;
    [StepId.FRAVÆR_FRA]?: FraværFraSøknadsdata;
    [StepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
