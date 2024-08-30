import { StepId } from '../StepId';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { KursSøknadsdata } from './KursSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from './ArbeidssituasjonSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { OmBarnetSøknadsdata } from './OmBarnetSøknadsdata';

export * from './LegeerklæringSøknadsdata';
export * from './KursSøknadsdata';
export * from './ArbeidssituasjonSøknadsdata';
export * from './MedlemskapSøknadsdata';
export * from './OmBarnetSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.OM_BARNET]?: OmBarnetSøknadsdata;
    [StepId.KURS]?: KursSøknadsdata;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonSøknadsdata;
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
