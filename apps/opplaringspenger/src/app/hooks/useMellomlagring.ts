import søknadStateEndpoint from '../api/endpoints/søknadStateEndpoint';

export const useMellomlagring = () => {
    return {
        hentMellomlagring: søknadStateEndpoint.fetch,
        slettMellomlagring: søknadStateEndpoint.purge,
        oppdaterMellomlagring: søknadStateEndpoint.update,
    };
};
