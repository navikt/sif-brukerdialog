import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Søker } from '../server/api-models/SøkerSchema';
import { Brukerprofil } from './Brukerprofil';
import { Mellomlagringer } from './Mellomlagring';
import { InnsendtSøknad } from './InnsendtSøknad';
import { SakerParseError } from './SakerParseError';

export interface Innsynsdata {
    søker: Søker;
    appStatus?: ApplicationState;
    innsendteSøknader: InnsendtSøknad[];
    brukerprofil: Brukerprofil;
    mellomlagring: Mellomlagringer;
    saker: PleietrengendeMedSak[];
    saksbehandlingstidUker?: number;
    harSak: boolean;
    sakerParseError?: SakerParseError;
}
