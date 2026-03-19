import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { ISODate } from '@navikt/sif-common-utils';

export interface UtenlandsoppholdApiData {
    fraOgMed: ISODate;
    tilOgMed: ISODate;
    landkode: string;
    landnavn: string;
    erEØSLand: boolean;
}

/** Midlertidig utvidelse frem til generert schema blir oppdatert */

export type SøknadApiData = aktivitetspenger.Aktivitetspengersøknad & {
    bosted: UtenlandsoppholdApiData[];
};
