import { ArbeidstidSøknadsdata } from './ArbeidstidSøknadsdata';

export * from './ArbeidstidSøknadsdata';

export interface Søknadsdata {
    id?: string;
    arbeidstid?: ArbeidstidSøknadsdata;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
}
