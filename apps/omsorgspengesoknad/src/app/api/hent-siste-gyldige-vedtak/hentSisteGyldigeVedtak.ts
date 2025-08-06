import { k9Sak } from '@navikt/k9-sak-innsyn-api';
import { RegistrertBarn } from '@navikt/sif-common-query';
import { handleApiError } from '@navikt/ung-common';
import { GyldigeVedtak } from '../../types/GyldigeVedtak';

/**
 * Henter siste gyldige vedtak for pleietrengende.
 * @param pleietrengendeAktørId string
 * @returns {Promise<k9Sak.HentSisteGyldigeVedtakForAktorIdResponse>}
 * @throws {ApiError}
 */

const hentSisteGyldigeVedtak = async (
    pleietrengendeAktørId: string,
): Promise<k9Sak.HentSisteGyldigeVedtakForAktorIdResponse> => {
    try {
        const { data } = await k9Sak.K9SakController.hentSisteGyldigeVedtakForAktorId({
            body: { pleietrengendeAktørId },
        });
        return k9Sak.zHentSisteGyldigeVedtakForAktorIdResponse.parse(data);
    } catch (e) {
        throw handleApiError(e, 'hentSisteGyldigeVedtak');
    }
};

/**
 * Henter gyldige vedtak for alle registrerte barn
 */
export const hentGyldigeVedtakForRegistrerteBarn = async (
    registrerteBarn: RegistrertBarn[],
): Promise<GyldigeVedtak> => {
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
