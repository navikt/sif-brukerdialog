import { SØkerController } from '@navikt/k9-brukerdialog-prosessering-api';
import { Søker, søkerResponseSchema } from '../types/søker';

/**
 * Henter informasjon om innlogget bruker fra k9-brukerdialog-prosessering-api
 *
 * @returns Promise med søkerdata
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentSøker = async (): Promise<Søker> => {
    const response = await SØkerController.hentSøker();
    return søkerResponseSchema.parse(response.data);
};

export const hentSøkerId = async (): Promise<string> => {
    const søker = await hentSøker();
    return søker.fødselsnummer;
};
