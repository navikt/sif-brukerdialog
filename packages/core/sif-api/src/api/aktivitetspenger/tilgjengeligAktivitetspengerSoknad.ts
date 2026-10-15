import { BrukerdialogSøknad, TilgjengeligSøknadResponse } from '@navikt/ung-brukerdialog-api';
import { commonRequestHeaders } from '@sif/api-client';

import { handleApiError } from '../../utils/errorHandlers';

export const tilgjengeligAktivitetspengerSoknad = async (): Promise<TilgjengeligSøknadResponse> => {
    try {
        const response = await BrukerdialogSøknad.hentTilgjengeligSøknad({ headers: commonRequestHeaders });
        return response.data;
    } catch (e) {
        throw handleApiError(e, 'tilgjengeligAktivitetspengerSoknad');
    }
};
