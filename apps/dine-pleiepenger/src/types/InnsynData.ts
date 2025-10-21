import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Søker } from '../server/api-models/SøkerSchema';
import { Brukerprofil } from './Brukerprofil';
import { InnsendtSøknad } from './InnsendtSøknad';
import { SakerParseError } from './SakerParseError';

export interface Innsynsdata {
    søker: Søker;
    appStatus?: ApplicationState;
    innsendteSøknader: InnsendtSøknad[];
    brukerprofil: Brukerprofil;
    saker: PleietrengendeMedSak[];
    harSak: boolean;
    sakerParseError?: SakerParseError;
}
