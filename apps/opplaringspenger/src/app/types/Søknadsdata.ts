import { DateRange } from '@navikt/sif-common-utils/lib';

export interface Utenlandsopphold {
    periode: DateRange;
    landkode: string;
    landnavn: string;
}

export interface Søknadsdata {
    id?: string;
    harForståttRettigheterOgPlikter?: boolean;
    harBekreftetOpplysninger?: boolean;
    barn?: {
        fornavn: string;
        etternavn: string;
        fødselsdato: Date;
    };
    arbeid?: {
        startdato: Date;
    };
    opplæring?: {
        beskrivelse: string;
    };
    medlemsskap?: {
        harBoddIUtlandet: boolean;
        utenlandsopphold: Utenlandsopphold[];
    };
}
