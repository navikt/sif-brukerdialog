export enum ScenarioType {
    default = 'default',
}

export interface Søker {
    aktørId: string;
    fødselsdato: string;
    fødselsnummer: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}

export interface Barn {
    fornavn: string;
    etternavn: string;
    aktørId: string;
    fødselsdato: string;
    fødselsnummer: string;
}

export interface ScenarioData {
    søker: Søker;
    barn: Barn[];
}
