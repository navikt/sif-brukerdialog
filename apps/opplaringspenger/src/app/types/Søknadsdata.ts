export interface BarnSøknadsdata {
    fornavn: string;
    etternavn: string;
    fødselsdato: Date;
}

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
    barn?: BarnSøknadsdata;
    arbeid?: ArbeidSøknadsdata;
    opplæring?: OpplæringSøknadsdata;
}
