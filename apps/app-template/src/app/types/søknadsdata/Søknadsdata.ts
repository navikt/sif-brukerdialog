import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { PleietrengendeSøknadsdata } from './PleietrengendeSøknadsdata';

export * from './MedlemskapSøknadsdata';
export * from './PleietrengendeSøknadsdata';

export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
    pleietrengende?: PleietrengendeSøknadsdata;
    medlemskap?: MedlemskapSøknadsdata;
}
