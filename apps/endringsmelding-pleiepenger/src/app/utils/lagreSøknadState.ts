import { SøknadContextState } from '@app/types';

import { søknadStateEndpoint } from '../api/endpoints/søknadStateEndpoint';

export const lagreSøknadState = (state: SøknadContextState) => {
    const { versjon, søknadsdata, søker, valgteEndringerInitielt, søknadRoute, sak, søknadSteps, valgteEndringer } =
        state;
    return søknadStateEndpoint.update(
        {
            barnAktørId: sak.barn.aktørId,
            søknadsdata,
            versjon,
            harArbeidsgivereIkkeISak: state.sak.harArbeidsgivereIkkeISak,
            søknadRoute,
            valgteEndringer,
            valgteEndringerInitielt,
            søknadSteps,
            metadata: {
                updatedTimestamp: new Date().toISOString(),
            },
        },
        søker,
    );
};
