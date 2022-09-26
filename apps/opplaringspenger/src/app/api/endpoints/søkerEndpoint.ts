import { isValidSøkerResponse, Søker } from '../../types/Søker';
import api, { ApiEndpointPsb } from '../api';

const søkerEndpoint = {
    fetch: async (): Promise<Søker> => {
        const { data } = await api.psb.get<Søker>(ApiEndpointPsb.soker);
        if (!isValidSøkerResponse(data)) {
            return Promise.reject('Invalid søkerdata');
        }
        return Promise.resolve(data);
    },
};

export default søkerEndpoint;
