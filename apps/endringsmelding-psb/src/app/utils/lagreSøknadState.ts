import søknadStateEndpoint from '../api/endpoints/søknadStateEndpoint';
import { SøknadContextState } from '../types/SøknadContextState';

export const lagreSøknadState = (state: SøknadContextState) => {
    const { versjon, søknadsdata, søker, søknadRoute } = state;
    return søknadStateEndpoint.update(
        {
            søknadsdata,
            versjon,
            søknadRoute,
        },
        søker
    );
};
