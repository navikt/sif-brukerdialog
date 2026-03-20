import { initK9BrukerdialogProsesseringApiClients } from '@navikt/k9-brukerdialog-prosessering-api';
import { initUngDeltakelseOpplyserApiDeltakerClient } from '@navikt/ung-deltakelse-opplyser-api-deltaker';

export const initApiClients = () => {
    initUngDeltakelseOpplyserApiDeltakerClient({
        onUnAuthorized: () => {
            globalThis.location.reload();
        },
    });

    initK9BrukerdialogProsesseringApiClients({
        frontendPath: '/aktivitetspenger-soknad/api',
        loginURL: '#',
    });
};
