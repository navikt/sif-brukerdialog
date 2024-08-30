import { getEnvironmentVariable } from '@navikt/sif-common-core-ds/src/utils/envUtils';
import søknadStateEndpoint from '../api/endpoints/søknadStateEndpoint';
import { SøknadContextState } from '../types/SøknadContextState';

export const lagreSøknadState = (state: SøknadContextState) => {
    if (getEnvironmentVariable('DISABLE_MELLOMLAGRING') !== 'true') {
        return søknadStateEndpoint.update(state);
    }
    return Promise.resolve();
};
