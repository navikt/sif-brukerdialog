import { AktivitetSøknadsdata } from './AktivitetSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { SakSøknadsdata } from './SakSøknadsdata';

export * from './AktivitetSøknadsdata';
export * from './ArbeidstidSøknadsdata';

export interface Søknadsdata {
    id?: string;
    sak?: SakSøknadsdata;
    aktivitet?: AktivitetSøknadsdata;
    arbeidstid?: ArbeidstidSøknadsdata;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
}
