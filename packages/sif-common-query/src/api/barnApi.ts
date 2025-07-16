import { BarnController } from '@navikt/k9-brukerdialog-prosessering-api';
import { registrerteBarnListeSchema, RegistrertBarn } from '../types/barn';

/**
 * Henter informasjon om registrerte barn fra k9-brukerdialog-prosessering-api
 *
 * @returns Promise med liste over barn
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentBarn = async (): Promise<RegistrertBarn[]> => {
    const response = await BarnController.hentBarn();
    const data = registrerteBarnListeSchema.parse(response.data);
    return data.barn;
};
