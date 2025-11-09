import { ApplicationState } from '@navikt/appstatus-react-ds/src/hooks/useGetApplicationStatus';
import { SakerMetadataDto } from '@navikt/k9-sak-innsyn-api/src/generated/innsyn';

import { PleietrengendeMedSak } from '../server/api-models/PleietrengendeMedSakSchema';
import { Søker } from '../server/api-models/SøkerSchema';
import { SakerParseError } from './SakerParseError';

export interface Innsynsdata {
    søker: Søker;
    appStatus?: ApplicationState;
    sakerMetadata: SakerMetadataDto[];
    /** @deprecated Bruk sakerMetadata i stedet. Beholdes midlertidig for bakoverkompatibilitet */
    saker: PleietrengendeMedSak[];
    harSak: boolean;
    sakerParseError?: SakerParseError;
}
