import {
    initK9BrukerdialogProsesseringApiClient,
    initK9BrukerdialogProsesseringUngdomsytelseApiClient,
} from '@navikt/ung-common';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiDeltakerClient({
        onUnAuthorized: () => {
            window.location.reload();
        },
    });
    initK9BrukerdialogProsesseringApiClient();
    initK9BrukerdialogProsesseringUngdomsytelseApiClient();
};
