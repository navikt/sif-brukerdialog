import { SøknadContextState } from '@types';
import søknadStateEndpoint from '../api/endpoints/søknadStateEndpoint';

export const lagreSøknadState = (state: SøknadContextState) => {
    const { versjon, søknadsdata, søker, søknadRoute, sak, valgtHvaSkalEndres: hvaSkalEndres } = state;
    return søknadStateEndpoint.update(
        {
            barnAktørId: sak.barn.aktørId,
            søknadsdata,
            versjon,
            harUkjentArbeidsforhold: state.sak.harUkjentArbeidsforhold,
            søknadRoute,
            hvaSkalEndres,
            metadata: {
                updatedTimestamp: new Date().toISOString(),
            },
        },
        søker
    );
};
