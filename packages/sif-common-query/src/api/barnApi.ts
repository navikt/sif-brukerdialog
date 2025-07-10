import { BarnController } from '@navikt/k9-brukerdialog-prosessering-api';
import { barnOppslagListeSchema, BarnOppslag } from '../types/barn';

/**
 * Henter informasjon om registrerte barn fra k9-brukerdialog-prosessering-api
 *
 * @returns Promise med liste over barn
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentBarn = async (): Promise<BarnOppslag[]> => {
    const response = await BarnController.hentBarn();
    const data = barnOppslagListeSchema.parse(response.data);
    return data.barn;
};
