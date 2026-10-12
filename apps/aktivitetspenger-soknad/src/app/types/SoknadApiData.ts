import type { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { ISODate } from '@sif/utils';

export type SøknadApiData = Omit<aktivitetspenger.Aktivitetspengersøknad, 'startdato'> & {
    startdato?: ISODate;
};
