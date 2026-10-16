import { initUngDeltakelseOpplyserApiVeilederClient } from '@sif/ung-deltakelse-opplyser-api-veileder';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiVeilederClient({
        onUnauthorized: () => {
            window.location.reload();
        },
    });
};
