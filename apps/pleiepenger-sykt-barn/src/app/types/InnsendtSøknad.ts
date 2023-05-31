import { ISODate } from '@navikt/sif-common-utils/lib';
import { SøknadApiData } from './søknad-api-data/SøknadApiData';

enum Søknadsstatus {
    MOTTATT = 'MOTTATT',
    UNDER_BEHANDLING = 'UNDER_BEHANDLING',
    FERDIG_BEHANDLET = 'FERDIG_BEHANDLET',
}

export type InnsendtSøknadBarn = {
    aktørId?: string;
    fødselsdato: ISODate;
    navn?: string;
    fødselsnummer?: string;
};

export type InnsendtSøknadInnhold = Omit<SøknadApiData, 'barn'> & {
    barn: InnsendtSøknadBarn;
    mottatt: Date;
};

export interface InnsendtSøknad {
    søknadId: string;
    status: Søknadsstatus;
    journalpostId: string;
    endret?: Date;
    opprettet: Date;
    søknad: InnsendtSøknadInnhold;
}
