import { initUngDeltakelseOpplyserApiClient } from '@navikt/ung-common';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiClient({
        onUnAuthorized: () => {
            window.location.reload();
        },
    });
};
