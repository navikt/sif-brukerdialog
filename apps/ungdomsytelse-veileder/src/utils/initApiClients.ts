import { initUngDeltakelseOpplyserApiVeilederClient } from '@navikt/ung-deltakelse-opplyser-api-veileder';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiVeilederClient({
        onUnAuthorized: () => {
            window.location.reload();
        },
    });
};
