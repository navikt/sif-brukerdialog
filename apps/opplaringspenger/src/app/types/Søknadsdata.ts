import { DateRange } from '@navikt/sif-common-utils/lib';
// import { RegistrertBarn } from './RegistrertBarn';

export interface Utenlandsopphold {
    periode: DateRange;
    landkode: string;
    landnavn: string;
}

export interface Søknadsdata {
    barn?: {
        fornavn: string;
        etternavn: string;
        fødselsdato: Date;
    };
    arbeid?: {
        periode: DateRange;
    };
    medlemsskap?: {
        harBoddIUtlandet: boolean;
        utenlandsopphold: Utenlandsopphold[];
    };
}
