import { Institusjon } from '../../types/Institusjon';
import api, { ApiEndpointPsb } from '../api';

interface InstitusjonDTO {
    id: string;
    navn: string;
}

const institusjonEndpoint = {
    fetch: async (): Promise<Institusjon[]> => {
        const { data } = await api.psb.get<{ institusjoner: InstitusjonDTO[] }>(ApiEndpointPsb.institusjoner);
        return Promise.resolve(data.institusjoner);
    },
};

export default institusjonEndpoint;
