import { AktivitetSøknadsdata } from './AktivitetSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';

export * from './AktivitetSøknadsdata';
export * from './ArbeidstidSøknadsdata';

export interface Søknadsdata {
    id: string;
    arbeidAktivitet?: AktivitetSøknadsdata;
    arbeidstid?: ArbeidstidSøknadsdata;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
}
