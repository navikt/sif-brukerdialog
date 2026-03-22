import { BarnController } from '@navikt/k9-brukerdialog-prosessering-api';

import { RegistrertBarn, registrerteBarnListeSchema } from '../types/Barn';
import { handleApiError } from '../utils/errorHandlers';

/**
 * Henter informasjon om registrerte barn fra k9-brukerdialog-prosessering-api
 *
 * @returns Promise med liste over barn
 * @throws Error hvis API-kallet feiler eller data ikke kan parses
 */
export const hentRegistrerteBarn = async (): Promise<RegistrertBarn[]> => {
    try {
        const response = await BarnController.hentBarn();
        const data = registrerteBarnListeSchema.parse(response.data);
        return data.barn;
    } catch (e) {
        throw handleApiError(e, 'hentRegistrerteBarn');
    }
};
