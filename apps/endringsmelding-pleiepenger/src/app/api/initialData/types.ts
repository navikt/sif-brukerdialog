import { Arbeidsgiver, K9Sak } from '@app/types';
import { Søker } from '@navikt/sif-common-api';

import { SøknadStatePersistence } from '../endpoints/søknadStateEndpoint';

/** Rådataene appen trenger ved oppstart, før de settes sammen til SøknadContextState. */
export type InitialData = {
    søker: Søker;
    k9saker: K9Sak[];
    antallSakerFørEndringsperiode: number;
    arbeidsgivere: Arbeidsgiver[];
    lagretSøknadState?: SøknadStatePersistence;
};
