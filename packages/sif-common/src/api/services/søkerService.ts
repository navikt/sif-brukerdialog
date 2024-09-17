import { k9BrukerdialogApiClient } from '../apiClient';
import { Søker } from '../types';
import { søkerResponseSchema } from '../schemas/søkerSchema';

export const fetchSøker = async (): Promise<Søker> => {
    const response = await k9BrukerdialogApiClient.get(`/oppslag/soker`);
    return søkerResponseSchema.parse(response.data);
};

export const fetchSøkerId = async (): Promise<string> => {
    const søker = await fetchSøker();
    return søker.fødselsnummer;
};
