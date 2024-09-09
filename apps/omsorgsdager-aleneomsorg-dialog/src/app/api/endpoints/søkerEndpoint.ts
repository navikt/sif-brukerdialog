import { isValidSøkerResponse, Søker } from '../../types/Søker';
import api, { ApiEndpoint } from '../api';

type SøkerDTO = {
    etternavn: string;
    fornavn: string;
    mellomnavn?: string;
    kjønn: string;
    fødselsnummer: string;
};

const søkerEndpoint = {
    fetch: async (): Promise<Søker> => {
        const { data } = await api.get<SøkerDTO>(ApiEndpoint.soker);
        if (!isValidSøkerResponse(data)) {
            return Promise.reject(`Invalid søkerdata`);
        }
        return Promise.resolve(data);
    },
    fetchId: async (): Promise<string> => {
        const { fødselsnummer } = await søkerEndpoint.fetch();
        return fødselsnummer;
    },
};

export default søkerEndpoint;
