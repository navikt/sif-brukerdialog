import { MedlemskapSøknadsdata } from './MedlemskapSøknadsdata';

export interface PleietrengendeSøknadsdata {
    fødselsnummer: string;
}

export interface InstitusjonSøknadsdataRegistrert {
    type: 'registrert';
    institusjonId: string;
}
export interface InstitusjonSøknadsdataAnnen {
    type: 'egendefinert';
    navn: string;
}

export type InstitusjonSøknadsdata = InstitusjonSøknadsdataRegistrert | InstitusjonSøknadsdataAnnen;

export interface ArbeidSøknadsdata {
    startdato?: Date;
}

export interface OpplæringSøknadsdata {
    beskrivelse: string;
}

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
