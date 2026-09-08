import { BrukerdialogSøknad, TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';

import { handleApiError } from '../../utils/errorHandlers';
import { commonRequestHeader } from '../../utils/initApiClient';

export const tilgjengeligAktivitetspengerSoknad = async (): Promise<TilgjengeligSøknadResponse> => {
    try {
        const response = await BrukerdialogSøknad.tilgjengeligSøknad({
            headers: commonRequestHeader,
        });
        return response.data;
    } catch (e) {
        throw handleApiError(e, 'tilgjengeligAktivitetspengerSoknad');
    }
};
