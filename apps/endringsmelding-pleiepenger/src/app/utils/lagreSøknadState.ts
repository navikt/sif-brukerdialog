import søknadStateEndpoint from '../api/endpoints/søknadStateEndpoint';
import { SøknadContextState } from '../types/SøknadContextState';

export const lagreSøknadState = (state: SøknadContextState) => {
    const { versjon, søknadsdata, søker, søknadRoute, sak, hvaSkalEndres } = state;
    return søknadStateEndpoint.update(
        {
            barnAktørId: sak.barn.aktørId,
            søknadsdata,
            versjon,
            harUkjentArbeidsgiver: state.sak.harUkjentArbeidsgiver,
            søknadRoute,
            hvaSkalEndres,
            metadata: {
                updatedTimestamp: new Date().toISOString(),
            },
        },
        søker
    );
};
