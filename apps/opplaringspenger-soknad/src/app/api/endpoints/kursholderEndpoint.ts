import { Kursholder } from '../../types/Kursholder';
import api, { ApiEndpoint } from '../api';

const mockKursholder = {
    kursholdere: [
        {
            id: '1',
            navn: 'Hurdal syn- og mestringssenter',
        },
        {
            id: '2',
            navn: 'Solvik syn- og mestringssenter',
        },
        {
            id: '3',
            navn: 'Evenes syn- og mestringssenter',
        },
    ],
};

export const kursholderEndpoint = {
    fetch: async (): Promise<Kursholder[]> => {
        try {
            const { data } = await api.get<{ kursholdere: Kursholder[] }>(ApiEndpoint.kursholder);
            return Promise.resolve(data.kursholdere);
        } catch {
            return Promise.resolve(mockKursholder.kursholdere);
        }
    },
};
