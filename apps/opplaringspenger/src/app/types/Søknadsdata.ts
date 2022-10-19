import { DateRange } from '@navikt/sif-common-utils/lib';

export interface Utenlandsopphold {
    periode: DateRange;
    landkode: string;
    landnavn: string;
}

export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    barn?: {
        fornavn: string;
        etternavn: string;
        fødselsdato: Date;
    };
    arbeid?: {
        periode: DateRange;
    };
    opplæring?: {
        beskrivelse: string;
        periode: {
            fra: string;
            til: string;
        };
    };
    medlemsskap?: {
        harBoddIUtlandet: boolean;
        utenlandsopphold: Utenlandsopphold[];
    };
}
