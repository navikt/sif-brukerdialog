import søknadStatePersistenceEndpoint from '../api/endpoints/søknadStatePersistenceEndpoint';

export const useMellomlagring = () => {
    return {
        hentMellomlagring: søknadStatePersistenceEndpoint.fetch,
        slettMellomlagring: søknadStatePersistenceEndpoint.purge,
        oppdaterMellomlagring: søknadStatePersistenceEndpoint.update,
    };
};
