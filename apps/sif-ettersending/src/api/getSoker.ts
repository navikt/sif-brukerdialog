import { ApiEndpoint } from '../types/ApiEndpoint';
import { Person } from '../types/Person';
import api from './api';

const getSokerRemoteData = async (): Promise<Person> => {
    try {
        const { data } = await api.get<Person>(ApiEndpoint.SØKER);
        return Promise.resolve(data);
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getSokerId = async (): Promise<string> => {
    const søker = await getSokerRemoteData();
    return søker.fødselsnummer;
};

export default getSokerRemoteData;
