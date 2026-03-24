import { SØkerController } from '@navikt/k9-brukerdialog-prosessering-api';

import { Søker, søkerSchema } from '../types/Søker';
import { handleApiError } from '../utils/errorHandlers';

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
    try {
        const søker = await hentSøker();
        return søker.fødselsnummer;
    } catch (e) {
        throw handleApiError(e, 'hentSøkerId');
    }
};
