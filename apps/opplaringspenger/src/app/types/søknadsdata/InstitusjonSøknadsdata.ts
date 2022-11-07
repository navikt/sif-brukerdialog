export interface InstitusjonSøknadsdataRegistrert {
    type: 'registrert';
    institusjonId: string;
}
export interface InstitusjonSøknadsdataAnnen {
    type: 'egendefinert';
    navn: string;
}

export type InstitusjonSøknadsdata = InstitusjonSøknadsdataRegistrert | InstitusjonSøknadsdataAnnen;
