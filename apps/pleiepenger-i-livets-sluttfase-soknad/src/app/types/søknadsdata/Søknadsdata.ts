import { StepId } from '../StepId';
import { OpplysningerOmPleietrengendeSøknadsdata } from './OpplysningerOmPleietrengendeSøknadsdata';
import { LegeerklæringSøknadsdata } from './LegeerklæringSøknadsdata';
import { TidsromSøknadsdata } from './TidsromSøknadsdata';
import { ArbeidssituasjonSøknadsdata } from './ArbeidssituasjonSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';

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
    [StepId.LEGEERKLÆRING]?: LegeerklæringSøknadsdata;
    [StepId.TIDSROM]?: TidsromSøknadsdata;
    [StepId.ARBEIDSSITUASJON]?: ArbeidssituasjonSøknadsdata;
    [StepId.ARBEIDSTID]?: ArbeidstidSøknadsdata;
    [StepId.MEDLEMSKAP]?: MedlemskapSøknadsdata;
    [StepId.OPPSUMMERING]?: {
        harBekreftetOpplysninger?: boolean;
    };
    [StepId.KVITTERING]?: undefined;
}
