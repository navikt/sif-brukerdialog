import mellomlagringEndpoint from '../api/endpoints/mellomlagringEndpoint';

export const useMellomlagring = () => {
    return {
        hentMellomlagring: mellomlagringEndpoint.fetch,
        slettMellomlagring: mellomlagringEndpoint.purge,
        oppdaterMellomlagring: mellomlagringEndpoint.update,
    };
};
