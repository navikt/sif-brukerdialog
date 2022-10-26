import { ArbeidSøknadsdata } from './ArbeidSøknadsdata';
import { InstitusjonSøknadsdata } from './InstitusjonSøknadsdata';
import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';
import { OpplæringSøknadsdata } from './OpplæringSøknadsdata';
import { PleietrengendeSøknadsdata } from './PleietrengendeSøknadsdata';

export * from './ArbeidSøknadsdata';
export * from './InstitusjonSøknadsdata';
export * from './MedlemskapSøknadsdata';
export * from './OpplæringSøknadsdata';
export * from './PleietrengendeSøknadsdata';

export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
    pleietrengende?: PleietrengendeSøknadsdata;
    institusjon?: InstitusjonSøknadsdata;
    medlemskap?: MedlemskapSøknadsdata;
    arbeid?: ArbeidSøknadsdata;
    opplæring?: OpplæringSøknadsdata;
}
