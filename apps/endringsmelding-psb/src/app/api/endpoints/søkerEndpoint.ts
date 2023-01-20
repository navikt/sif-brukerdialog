import { isValidSøkerResponse, Søker } from '../../types/Søker';
import api, { ApiEndpointPsb } from '../api';

type SøkerDTO = {
    etternavn: string;
    fornavn: string;
    mellomnavn?: string;
    kjønn: string;
    fødselsnummer: string;
};

const søkerEndpoint = {
    fetch: async (): Promise<Søker> => {
        const { data } = await api.psb.get<SøkerDTO>(ApiEndpointPsb.soker, 'ytelse=endringsmelding-pleiepenger');
        if (!isValidSøkerResponse(data)) {
            return Promise.reject('Invalid søkerdata');
        }
        return Promise.resolve(data);
    },
};

export default søkerEndpoint;
