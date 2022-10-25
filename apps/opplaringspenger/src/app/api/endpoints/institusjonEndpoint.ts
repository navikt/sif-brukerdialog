import { Institusjon } from '../../types/Institusjon';
import api, { ApiEndpointPsb } from '../api';

const institusjonEndpoint = {
    fetch: async (): Promise<Institusjon[]> => {
        const { data } = await api.psb.get<{ institusjoner: Institusjon[] }>(ApiEndpointPsb.institusjoner);
        return Promise.resolve(data.institusjoner);
    },
};

export default institusjonEndpoint;
