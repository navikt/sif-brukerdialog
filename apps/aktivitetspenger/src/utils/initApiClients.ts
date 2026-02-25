import { initK9BrukerdialogProsesseringApiClient } from '@navikt/ung-common';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiDeltakerClient({
        onUnAuthorized: () => {
            globalThis.location.reload();
        },
    });
    initK9BrukerdialogProsesseringApiClient();
};
