import { SøknadContextState } from '@types';

import søknadStateEndpoint from '../api/endpoints/søknadStateEndpoint';

export const lagreSøknadState = (state: SøknadContextState) => {
    const { versjon, søknadsdata, søker, søknadRoute, sak, søknadSteps, valgteEndringer: valgtEndring } = state;
    return søknadStateEndpoint.update(
        {
            barnAktørId: sak.barn.aktørId,
            søknadsdata,
            versjon,
            harArbeidsgivereIkkeISak: state.sak.harArbeidsgivereIkkeISak,
            søknadRoute,
            valgteEndringer: valgtEndring,
            søknadSteps,
            metadata: {
                updatedTimestamp: new Date().toISOString(),
            },
        },
        søker,
    );
};
