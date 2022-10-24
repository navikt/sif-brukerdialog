import søknadStatePersistenceEndpoint from '../api/endpoints/søknadStatePersistenceEndpoint';
import { SøknadContextState } from '../types/SøknadContextState';

export const lagreSøknadState = (state: SøknadContextState) => {
    return søknadStatePersistenceEndpoint.update(state);
};
