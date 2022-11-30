import { AktivitetSøknadsdata } from './AktivitetSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';

export * from './ArbeidstidSøknadsdata';
export * from './AktivitetSøknadsdata';

export interface Søknadsdata {
    id?: string;
    aktivitet?: AktivitetSøknadsdata;
    arbeidstid?: ArbeidstidSøknadsdata;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
}
