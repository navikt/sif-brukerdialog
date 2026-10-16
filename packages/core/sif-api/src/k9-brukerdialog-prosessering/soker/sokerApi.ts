import { SØkerController } from '@sif/k9-brukerdialog-prosessering-api';

import { handleApiError } from '../../shared/errorHandlers';
import { Søker, søkerSchema } from './Soker';

/**
 * Henter informasjon om innlogget bruker fra k9-brukerdialog-prosessering-api
 *
 * @returns Promise med søkerdata
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentSøker = async (): Promise<Søker> => {
    try {
        const response = await SØkerController.hentSøker();
        return søkerSchema.parse(response.data);
    } catch (e) {
        throw handleApiError(e, 'hentSøker');
    }
};

export const hentSøkerId = async (): Promise<string> => {
    const søker = await hentSøker();
    return søker.fødselsnummer;
};
