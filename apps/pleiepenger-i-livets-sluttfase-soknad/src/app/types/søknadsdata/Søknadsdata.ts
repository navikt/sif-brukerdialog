import { StepId } from '../StepId';
import { ArbeidssituasjonSøknadsdata } from './ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { OpplysningerOmPleietrengendeSøknadsdata } from './OpplysningerOmPleietrengendeSøknadsdata';
import { TidsromSøknadsdata } from './TidsromSøknadsdata';

export * from './OpplysningerOmPleietrengendeSøknadsdata';
export * from './LegeerklæringSøknadsdata';
export * from './TidsromSøknadsdata';
export * from './ArbeidssituasjonSøknadsdata';
export * from './ArbeidstidSøknadsdata';
export * from './MedlemskapSøknadsdata';

export interface Søknadsdata {
    id?: string;
    [StepId.VELKOMMEN]?: {
        harForståttRettigheterOgPlikter?: boolean;
    };
    [StepId.OPPLYSNINGER_OM_PLEIETRENGENDE]?: OpplysningerOmPleietrengendeSøknadsdata;
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
