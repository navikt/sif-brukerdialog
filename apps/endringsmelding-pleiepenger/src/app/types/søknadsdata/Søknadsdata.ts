import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';
import { LovbestemtFerieSøknadsdata } from './LovbestemtFerieSøknadsdata';

export * from './ArbeidstidSøknadsdata';
export * from './LovbestemtFerieSøknadsdata';

export interface Søknadsdata {
    id: string;
    arbeidstid?: ArbeidstidSøknadsdata;
    lovbestemtFerie?: LovbestemtFerieSøknadsdata;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
}
