import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';

export type SøknadApiData = Omit<aktivitetspenger.Aktivitetspengersøknad, 'søknadId' | 'kontonummerInfo' | 'startdato'>;
