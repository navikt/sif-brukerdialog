import { Kursholder } from '../../types/Kursholder';
import api, { ApiEndpoint } from '../api';

export const kursholderEndpoint = {
    fetch: async (): Promise<Kursholder[]> => {
        try {
            const { data } = await api.get<{ kursholdere: Kursholder[] }>(ApiEndpoint.kursholder);
            return Promise.resolve(data.kursholdere);
        } catch (error) {
            return Promise.reject(error);
        }
    },
};
