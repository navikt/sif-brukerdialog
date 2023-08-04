export interface RegistrerteBarn {
    fornavn: string;
    etternavn: string;
    mellomnavn?: string;
    aktørId: string;
    fødselsdato: Date;
    harSammeAdresse?: boolean;
}
