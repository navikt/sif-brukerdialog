import { k9Sak } from '@navikt/k9-sak-innsyn-api';

import {
    SisteGyldigeVedtakForAktørId,
    zSisteGyldigeVedtakForAktørId,
} from '../../types/omsorgsdager-kronisk-sykt-barn/SisteGyldigeVedtakForAktorId';
import { handleApiError } from '../../utils/errorHandlers';

export const hentSisteGyldigeVedtakForAktørId = async (aktørId: string): Promise<SisteGyldigeVedtakForAktørId> => {
    try {
        const { data } = await k9Sak.K9SakController.hentSisteGyldigeVedtakForAktorId({
            body: { pleietrengendeAktørId: aktørId },
        });
        return zSisteGyldigeVedtakForAktørId.parse(data);
    } catch (e) {
        throw handleApiError(e, `hentSisteGyldigeVedtak`);
    }
};
