import { aktivitetspenger } from '@navikt/k9-brukerdialog-prosessering-api';
import { commonRequestHeaders } from '@sif/api-client';

import { handleApiError } from '../../utils/errorHandlers';

export const rapporterInntektAktivitetspenger = async (
    data: aktivitetspenger.AktivitetspengerInntektsrapportering,
): Promise<void> => {
    try {
        await aktivitetspenger.AktivitetspengerController.inntektrapportering({
            body: data,
            headers: commonRequestHeaders,
        });
    } catch (e) {
        throw handleApiError(e, 'rapporterInntektAktivitetspenger');
    }
};
