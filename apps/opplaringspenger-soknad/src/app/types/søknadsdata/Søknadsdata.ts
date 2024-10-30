import { StepId } from '../StepId';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { KursSøknadsdata } from './KursSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from './ArbeidssituasjonSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { OmBarnetFormSøknadsdata } from '../../søknad/steps/om-barnet/om-barnet-form/types/OmBarnetFormSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';

export * from './LegeerklæringSøknadsdata';
export * from './KursSøknadsdata';
export * from './ArbeidssituasjonSøknadsdata';
export * from './ArbeidstidSøknadsdata';
export * from './MedlemskapSøknadsdata';
export * from '../../søknad/steps/om-barnet/om-barnet-form/types/OmBarnetFormSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.OM_BARNET]?: OmBarnetFormSøknadsdata;
    [StepId.KURS]?: KursSøknadsdata;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonSøknadsdata;
    [StepId.ARBEIDSTID]?: ArbeidstidSøknadsdata;
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
