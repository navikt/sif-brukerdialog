import { StepId } from '../StepId';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { TidsromSøknadsdata } from './TidsromSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from './ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { OmBarnetSøknadsdata } from './OmBarnetSøknadsdata';

export * from './LegeerklæringSøknadsdata';
export * from './TidsromSøknadsdata';
export * from './ArbeidssituasjonSøknadsdata';
export * from './ArbeidstidSøknadsdata';
export * from './MedlemskapSøknadsdata';
export * from './OmBarnetSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.OM_BARNET]?: OmBarnetSøknadsdata;
    [StepId.TIDSROM]?: TidsromSøknadsdata;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonSøknadsdata;
    [StepId.ARBEIDSTID]?: ArbeidstidSøknadsdata;
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
