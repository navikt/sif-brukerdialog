import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Søker } from '../server/api-models/SøkerSchema';
import { Brukerprofil } from './Brukerprofil';
import { SakerParseError } from './SakerParseError';

export interface Innsynsdata {
    søker: Søker;
    appStatus?: ApplicationState;
    brukerprofil: Brukerprofil;
    saker: PleietrengendeMedSak[];
    harSak: boolean;
    sakerParseError?: SakerParseError;
}
