import { ArbeidsgiverMedAnsettelseperioder, K9Sak } from '@app/types';
import { Søker } from '@navikt/sif-common-api';
import { DateRange } from '@navikt/sif-common-utils';

import { SøknadStatePersistence } from '../endpoints/søknadStateEndpoint';

/** Rådataene appen trenger ved oppstart, før de settes sammen til SøknadContextState. */
export type InitialData = {
    søker: Søker;
    k9saker: K9Sak[];
    /** Fra backend, som bruker Europe/Oslo */
    tillattEndringsperiode: DateRange;
    arbeidsgivere: ArbeidsgiverMedAnsettelseperioder[];
    lagretSøknadState?: SøknadStatePersistence;
};
