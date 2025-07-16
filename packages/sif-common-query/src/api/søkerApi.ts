import { SØkerController } from '@navikt/k9-brukerdialog-prosessering-api';
import { Søker, søkerSchema } from '../types/_Søker';

/**
 * Henter informasjon om innlogget bruker fra k9-brukerdialog-prosessering-api
 *
 * @returns Promise med søkerdata
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentSøker = async (): Promise<Søker> => {
    const response = await SØkerController.hentSøker();
    return søkerSchema.parse(response.data);
};

export const hentSøkerId = async (): Promise<string> => {
    const søker = await hentSøker();
    return søker.fødselsnummer;
};
