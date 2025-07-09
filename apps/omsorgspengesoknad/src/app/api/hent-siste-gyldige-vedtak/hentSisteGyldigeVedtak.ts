import {
    HentSisteGyldigeVedtakForAktorIdResponse,
    K9SakController,
    zHentSisteGyldigeVedtakForAktorIdResponse,
} from '@navikt/k9-sak-innsyn-k9-sak-api';
import { handleApiError } from '@navikt/ung-common';
import { GyldigeVedtak } from '../../types/GyldigeVedtak';
import { BarnOppslag } from '@navikt/sif-common-query';

/**
 * Henter siste gyldige vedtak for pleietrengende.
 * @param pleietrengendeAktørId string
 * @returns {Promise<HentSisteGyldigeVedtakForAktorIdResponse[]>}
 * @throws {ApiError}
 */

const hentSisteGyldigeVedtak = async (
    pleietrengendeAktørId: string,
): Promise<HentSisteGyldigeVedtakForAktorIdResponse> => {
    try {
        const { data } = await K9SakController.hentSisteGyldigeVedtakForAktorId({ body: { pleietrengendeAktørId } });
        return zHentSisteGyldigeVedtakForAktorIdResponse.parse(data);
    } catch (e) {
        throw handleApiError(e, 'hentSisteGyldigeVedtak');
    }
};

/**
 * Henter gyldige vedtak for alle registrerte barn
 */
export const hentGyldigeVedtakForRegistrerteBarn = async (registrerteBarn: BarnOppslag[]): Promise<GyldigeVedtak> => {
    try {
        const vedtakPromises = registrerteBarn.map((barn) => hentSisteGyldigeVedtak(barn.aktørId));
        const responses = await Promise.all(vedtakPromises);
        const vedtakEntries = registrerteBarn.map((barn, index) => [barn.aktørId, responses[index]]);
        return Object.fromEntries(vedtakEntries);
    } catch {
        // Returner tomt objekt ved feil
        return {};
    }
};
