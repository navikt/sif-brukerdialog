import { AktivitetSøknadsdata } from './AktivitetSøknadsdata';
import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { LovbestemtFerieSøknadsdata } from './LovbestemtFerieSøknadsdata';

export * from './AktivitetSøknadsdata';
export * from './ArbeidstidSøknadsdata';
export * from './LovbestemtFerieSøknadsdata';

export interface Søknadsdata {
    id: string;
    aktivitet?: AktivitetSøknadsdata;
    arbeidstid?: ArbeidstidSøknadsdata;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
}
